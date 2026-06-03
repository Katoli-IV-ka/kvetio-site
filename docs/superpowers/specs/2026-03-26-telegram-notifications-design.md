# Design: Telegram Notifications for Contact Form

**Date:** 2026-03-26
**Status:** Approved

## Overview

Add Telegram group notifications to the existing contact form API endpoint. Messages will be sent to both Gmail (existing) and a private Telegram group simultaneously. No new npm dependencies required.

## Architecture

Single API route `pages/api/contact.ts` is modified to run two notification channels in parallel via `Promise.all`:

1. **Email** — existing nodemailer/Gmail logic, unchanged
2. **Telegram** — new `fetch` call to Telegram Bot API `sendMessage` endpoint

If either channel fails, `Promise.all` rejects and the client receives a 500 error. This is intentional: silent failures would cause lost messages.

The existing standalone `await transporter.sendMail(...)` call is **replaced** (not supplemented) by the `Promise.all` block. This is important to avoid sending duplicate emails.

## Implementation Details

### Telegram send function

A small async function `sendTelegramMessage(text: string): Promise<void>` added above the handler. It calls:

```
POST https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage
Body: { chat_id: TELEGRAM_CHAT_ID, text }
```

- **No `parse_mode`** — plain text only. This avoids Markdown injection from user-supplied input (e.g., a name like `*bold*` or unbalanced `_` characters that would cause Telegram to reject the message with a non-ok response).
- The function uses `AbortController` with a **5-second timeout** to prevent the serverless function from hanging if Telegram's API is slow.
- Throws if the response is not ok.

```ts
async function sendTelegramMessage(text: string): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID, // passed as string, not cast to Number
          text,
        }),
        signal: controller.signal,
      },
    );
    if (!res.ok) throw new Error(`Telegram API error: ${res.status}`);
  } finally {
    clearTimeout(timeout);
  }
}
```

### Message format (plain text)

```
📬 Новое сообщение с формы

Имя: {name}
Email: {email}

Сообщение:
{message}
```

### Parallel execution

The existing `await transporter.sendMail(...)` line is removed and replaced with:

```ts
await Promise.all([
  transporter.sendMail({ ... }),         // existing options unchanged
  sendTelegramMessage(telegramText),     // new
]);
```

## Environment Variables

Add to `.env.local` (never commit to git):

| Variable             | Description                                                                  |
| -------------------- | ---------------------------------------------------------------------------- |
| `TELEGRAM_BOT_TOKEN` | Token from @BotFather                                                        |
| `TELEGRAM_CHAT_ID`   | Chat ID of the private group (negative integer for groups, passed as string) |

**If either variable is missing at runtime:** `TELEGRAM_BOT_TOKEN` undefined produces URL `https://api.telegram.org/botundefined/sendMessage` which returns a 401 from Telegram; `TELEGRAM_CHAT_ID` undefined sends `chat_id: undefined` which returns a 400 from Telegram. Both cause `sendTelegramMessage` to throw and the client to receive 500. There is no startup guard — the error surfaces on first form submission.

**Important:** `TELEGRAM_CHAT_ID` must be passed as a string in the JSON body. Do not cast it with `Number()` — group chat IDs are large negative integers that lose precision in JavaScript's float64.

### How to get TELEGRAM_CHAT_ID

1. Create a bot via @BotFather → copy the token
2. Add the bot to the private group as admin (to be able to send messages)
3. Send any message in the group
4. Call `https://api.telegram.org/bot{TOKEN}/getUpdates` in the browser
5. Find `"chat":{"id": ...}` in the response — group IDs are negative (e.g., `-1001234567890`)

## Rate Limiting

Existing LRU-based rate limiting (3 requests per IP per 10 min) remains unchanged. The rate limit counter is incremented **before** sends execute (inherited from current implementation). This means a failed send (e.g., Telegram down) still consumes a rate limit slot. This is intentional: it prevents abuse via retry-on-failure loops.

## Error Handling

- Missing env vars → Telegram returns non-ok → function throws → `Promise.all` rejects → client gets 500
- Telegram API timeout (>5s) → `AbortController` fires → fetch throws `AbortError` → `Promise.all` rejects → client gets 500
- Telegram API non-ok response → function throws with status code in message → client gets 500

## Files Changed

- `pages/api/contact.ts` — add `sendTelegramMessage`, replace standalone `await transporter.sendMail` with `Promise.all`
- `.env.local` — add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` (manual step, not committed)

## Out of Scope

- Retry logic for failed Telegram calls
- Storing messages in a database
- Removing email notifications
