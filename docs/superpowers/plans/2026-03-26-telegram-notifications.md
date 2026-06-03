# Telegram Notifications Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add parallel Telegram group notifications to the contact form API endpoint alongside existing Gmail email delivery.

**Architecture:** A single `sendTelegramMessage` function is added to `pages/api/contact.ts`. The existing standalone `await transporter.sendMail(...)` is replaced with `Promise.all([sendMail, sendTelegramMessage])`. No new npm dependencies. Plain text messages only (no `parse_mode`) to avoid Markdown injection from user input. `AbortController` provides a 5-second fetch timeout.

**Tech Stack:** Next.js 16 API routes, TypeScript, Vitest 4, native `fetch`

---

## File Map

| Action | File                            | Purpose                                                      |
| ------ | ------------------------------- | ------------------------------------------------------------ |
| Create | `vitest.config.ts`              | Vitest config (none exists)                                  |
| Create | `__tests__/api/contact.test.ts` | Unit tests for contact handler                               |
| Modify | `pages/api/contact.ts`          | Add `sendTelegramMessage`, replace sendMail with Promise.all |
| Modify | `.env.local`                    | Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` (manual)     |

---

### Task 1: Add Vitest config

No `vitest.config.ts` exists in the project. Without it, `vitest` uses defaults which may not resolve TypeScript paths correctly.

**Files:**

- Create: `vitest.config.ts`

- [ ] **Step 1: Create vitest config**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: false,
  },
});
```

- [ ] **Step 2: Verify vitest runs**

```bash
npm test
```

Expected: "No test files found, exiting with code 1" or similar (no tests yet, but config loads without errors).

- [ ] **Step 3: Commit**

```bash
git add vitest.config.ts
git commit -m "chore: add vitest config"
```

---

### Task 2: Write failing tests for sendTelegramMessage

**Files:**

- Create: `__tests__/api/contact.test.ts`

- [ ] **Step 1: Create test file with failing test for sendTelegramMessage**

```ts
// __tests__/api/contact.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';

// We test sendTelegramMessage in isolation by importing the handler module
// and mocking global fetch before each test.

const TELEGRAM_TOKEN = 'test-token';
const TELEGRAM_CHAT_ID = '-1001234567890';

describe('sendTelegramMessage', () => {
  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = TELEGRAM_TOKEN;
    process.env.TELEGRAM_CHAT_ID = TELEGRAM_CHAT_ID;
  });

  it('calls Telegram API with correct URL and body', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
    });
    vi.stubGlobal('fetch', mockFetch);

    // Dynamic import after env vars are set and fetch is mocked
    const { sendTelegramMessage } = await import('../../pages/api/contact');

    await sendTelegramMessage('Hello test');

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toBe(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`);
    expect(options.method).toBe('POST');
    const body = JSON.parse(options.body);
    expect(body.chat_id).toBe(TELEGRAM_CHAT_ID);
    expect(body.text).toBe('Hello test');
    expect(body.parse_mode).toBeUndefined();

    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('throws when Telegram API returns non-ok response', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
    });
    vi.stubGlobal('fetch', mockFetch);

    const { sendTelegramMessage } = await import('../../pages/api/contact');

    await expect(sendTelegramMessage('Hello')).rejects.toThrow('Telegram API error: 401');

    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('throws on fetch timeout (AbortError)', async () => {
    const mockFetch = vi
      .fn()
      .mockRejectedValue(
        Object.assign(new Error('The operation was aborted'), { name: 'AbortError' }),
      );
    vi.stubGlobal('fetch', mockFetch);

    const { sendTelegramMessage } = await import('../../pages/api/contact');

    await expect(sendTelegramMessage('Hello')).rejects.toThrow();

    vi.unstubAllGlobals();
    vi.resetModules();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test
```

Expected: FAIL — `sendTelegramMessage` is not exported from `pages/api/contact.ts`

---

### Task 3: Implement sendTelegramMessage and update handler

**Files:**

- Modify: `pages/api/contact.ts`

- [ ] **Step 1: Add `sendTelegramMessage` export and replace sendMail with Promise.all**

Replace the entire file content with:

```ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { LRUCache } from 'lru-cache';

const rateLimitCache = new LRUCache<string, number>({
  max: 500,
  ttl: 10 * 60 * 1000, // 10 minutes
});

const RATE_LIMIT = 3; // max requests per IP per TTL window

function getRateLimitedIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    typeof forwarded === 'string'
      ? (forwarded.split(',')[0] ?? 'unknown')
      : (req.socket.remoteAddress ?? 'unknown');
  return ip;
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const ip = getRateLimitedIP(req);
  const count = rateLimitCache.get(ip) ?? 0;

  if (count >= RATE_LIMIT) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  rateLimitCache.set(ip, count + 1);

  const { name, email, message } = req.body as {
    name: string;
    email: string;
    message: string;
  };

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const telegramText =
    `📬 Новое сообщение с формы\n\n` +
    `Имя: ${name}\n` +
    `Email: ${email}\n\n` +
    `Сообщение:\n${message}`;

  await Promise.all([
    transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: 'contact@kvet.io',
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`,
    }),
    sendTelegramMessage(telegramText),
  ]);

  return res.status(200).json({ message: 'Message sent successfully' });
}
```

- [ ] **Step 2: Run tests to verify they pass**

```bash
npm test
```

Expected: All 3 tests PASS

- [ ] **Step 3: Run TypeScript check**

```bash
npm run tc
```

Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add pages/api/contact.ts __tests__/api/contact.test.ts
git commit -m "feat: add Telegram notifications to contact form"
```

---

### Task 4: Add environment variables (manual step)

This task cannot be automated — env vars must be set manually.

**Files:**

- Modify: `.env.local` (not committed to git)

- [ ] **Step 1: Create a Telegram bot**

1. Open Telegram, search for `@BotFather`
2. Send `/newbot`, follow prompts
3. Copy the token (format: `123456:ABC-DEF...`)

- [ ] **Step 2: Add bot to your private group**

1. Open your private Telegram group
2. Add the bot as **admin** (some group types only allow admins to send messages)

- [ ] **Step 3: Get the group Chat ID**

1. Send any message in the group
2. Open in browser: `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates`
3. Find `"chat":{"id": ...}` — group IDs are negative (e.g., `-1001234567890`)

- [ ] **Step 4: Add to `.env.local`**

```
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_CHAT_ID=-1001234567890
```

- [ ] **Step 5: Verify bot works by running dev server and submitting the contact form**

```bash
npm run dev
```

Open `http://localhost:4000`, submit the contact form, confirm:

- Message arrives in your Telegram group
- Email arrives in `contact@kvet.io`
