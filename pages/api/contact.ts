import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { LRUCache } from 'lru-cache';

const rateLimitCache = new LRUCache<string, number>({
  max: 500,
  ttl: 10 * 60 * 1000, // 10 minutes
});

// the second step of the form only adds details to an existing request, so it has its own counter
const detailsRateLimitCache = new LRUCache<string, number>({
  max: 500,
  ttl: 10 * 60 * 1000,
});

const PRIVACY_POLICY_VERSION = '2026-10-09';
const RATE_LIMIT = 5; // max new requests per IP per TTL window
const DETAILS_RATE_LIMIT = 10; // max detail updates per IP per TTL window
const TELEGRAM_MAX = 4000; // Telegram rejects messages over 4096 characters

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  datasetTitle?: string;
  jobTitle?: string;
  company?: string;
  dataTypes?: string[];
  source?: string;
  marketingConsent?: boolean;
  /** two-step form: 'initial' is the quick first step, 'details' adds to the same request */
  stage?: 'initial' | 'details';
  /** id of the Telegram message created at the first step, so the second step can update it */
  telegramMessageId?: number;
  volume?: string;
  timeline?: string;
  regions?: string;
  ndaNeeded?: boolean;
};

function text(value: unknown, max = 2000): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim().slice(0, max);
  return trimmed || undefined;
}

export function normalizeContactPayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== 'object') return null;

  const payload = body as Record<string, unknown>;
  const email = text(payload.email, 320) ?? '';
  const message = text(payload.message, 5000) ?? '';
  const fullName = [text(payload.firstName, 100), text(payload.lastName, 100)]
    .filter(Boolean)
    .join(' ');
  const name = fullName || text(payload.name, 200) || 'Website visitor';
  const dataTypes = Array.isArray(payload.dataTypes)
    ? payload.dataTypes
        .map((item) => text(item, 60))
        .filter((item): item is string => Boolean(item))
        .slice(0, 12)
    : [];

  if (!email || !message) return null;

  const result: ContactPayload = { name, email, message };
  const datasetTitle = text(payload.datasetTitle, 300);
  const jobTitle = text(payload.jobTitle, 200);
  const company = text(payload.company, 200);
  const source = text(payload.source, 100);
  if (datasetTitle) result.datasetTitle = datasetTitle;
  if (jobTitle) result.jobTitle = jobTitle;
  if (company) result.company = company;
  if (dataTypes.length) result.dataTypes = dataTypes;
  if (source) result.source = source;
  if (payload.marketingConsent === true) result.marketingConsent = true;
  if (payload.stage === 'initial' || payload.stage === 'details') result.stage = payload.stage;
  if (
    typeof payload.telegramMessageId === 'number' &&
    Number.isSafeInteger(payload.telegramMessageId) &&
    payload.telegramMessageId > 0
  ) {
    result.telegramMessageId = payload.telegramMessageId;
  }
  const volume = text(payload.volume, 100);
  const timeline = text(payload.timeline, 100);
  const regions = text(payload.regions, 300);
  if (volume) result.volume = volume;
  if (timeline) result.timeline = timeline;
  if (regions) result.regions = regions;
  if (payload.ndaNeeded === true) result.ndaNeeded = true;
  return result;
}

function getRateLimitedIP(req: NextApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    typeof forwarded === 'string'
      ? (forwarded.split(',')[0] ?? 'unknown')
      : (req.socket.remoteAddress ?? 'unknown');
  return ip;
}

function telegramConfigured(): boolean {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID);
}

async function telegramRequest(method: string, body: Record<string, unknown>): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/${method}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, ...body }),
        signal: controller.signal,
      },
    );
    if (!res.ok) throw new Error(`Telegram API error: ${res.status}`);
    return typeof res.json === 'function' ? await res.json().catch(() => undefined) : undefined;
  } finally {
    clearTimeout(timeout);
  }
}

/** Sends a message and returns its id, so a later step can update the same message. */
export async function sendTelegramMessage(text: string): Promise<number | undefined> {
  const data = (await telegramRequest('sendMessage', { text })) as
    | { result?: { message_id?: number } }
    | undefined;
  return data?.result?.message_id;
}

export async function editTelegramMessage(messageId: number, text: string): Promise<void> {
  await telegramRequest('editMessageText', { message_id: messageId, text });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // hidden field that only bots fill in: pretend it worked and drop the request
  const body: unknown = req.body;
  if (body && typeof body === 'object' && text((body as Record<string, unknown>).website)) {
    return res.status(200).json({ message: 'Message sent successfully' });
  }

  const payload = normalizeContactPayload(req.body);

  if (!payload) {
    return res.status(400).json({ message: 'Email and message are required' });
  }

  const isDetails = payload.stage === 'details';
  const cache = isDetails ? detailsRateLimitCache : rateLimitCache;
  const limit = isDetails ? DETAILS_RATE_LIMIT : RATE_LIMIT;
  const ip = getRateLimitedIP(req);
  const count = cache.get(ip) ?? 0;

  if (count >= limit) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  cache.set(ip, count + 1);

  const {
    name,
    email,
    message,
    datasetTitle,
    jobTitle,
    company,
    dataTypes,
    source,
    marketingConsent,
    volume,
    timeline,
    regions,
    ndaNeeded,
    telegramMessageId,
  } = payload;
  const details = [
    jobTitle && `Title: ${jobTitle}`,
    company && `Company: ${company}`,
    dataTypes && `Data type: ${dataTypes.join(', ')}`,
    volume && `Scale: ${volume}`,
    timeline && `Timeline: ${timeline}`,
    regions && `Countries / regions: ${regions}`,
    ndaNeeded && 'NDA needed: yes',
    source && `Heard about us: ${source}`,
    `Consent to reply (Privacy Policy ${PRIVACY_POLICY_VERSION}): given ${new Date().toISOString()}`,
    `Marketing e-mail consent: ${marketingConsent ? 'YES' : 'no'}`,
  ].filter((line): line is string => Boolean(line));
  const escape = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  let delivered = false;
  let newTelegramId: number | undefined = telegramMessageId;

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: `"${name}" <${process.env.GMAIL_USER}>`,
        to: 'kvetio.data@gmail.com',
        subject: `${isDetails ? 'Details added: ' : ''}New contact form message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n${details.join('\n')}${details.length ? '\n' : ''}\n${message}`,
        html: `<p><strong>Name:</strong> ${escape(name)}</p><p><strong>Email:</strong> ${escape(email)}</p>${details.map((line) => `<p>${escape(line)}</p>`).join('')}<p><strong>Message:</strong><br/>${escape(message)}</p>`,
      });
      delivered = true;
    } catch (error) {
      console.error('Contact form: e-mail failed', error);
    }
  }

  if (telegramConfigured()) {
    const header =
      payload.stage === 'initial'
        ? '📬 Новая заявка (шаг 1 из 2, детали могут прийти позже)'
        : isDetails
          ? '📬 Заявка (шаг 2 из 2: детали добавлены)'
          : '📬 Новое сообщение с формы';
    const telegramText = (
      `${header}\n\n` +
      (datasetTitle ? `📦 Датасет: ${datasetTitle}\n\n` : '') +
      `Имя: ${name}\n` +
      `Email: ${email}\n` +
      (details.length ? `${details.join('\n')}\n` : '') +
      '\n' +
      `Сообщение:\n${message}`
    ).slice(0, TELEGRAM_MAX);
    try {
      if (isDetails && telegramMessageId) {
        try {
          await editTelegramMessage(telegramMessageId, telegramText);
        } catch (error) {
          // the first message may be gone or unchanged; send the full request again instead
          console.error('Contact form: Telegram edit failed, sending a new message', error);
          newTelegramId = await sendTelegramMessage(telegramText);
        }
      } else {
        newTelegramId = await sendTelegramMessage(telegramText);
      }
      delivered = true;
    } catch (error) {
      console.error('Contact form: Telegram failed', error);
    }
  }

  if (!delivered) {
    return res.status(502).json({ message: 'Could not deliver the message' });
  }

  return res
    .status(200)
    .json({ message: 'Message sent successfully', telegramMessageId: newTelegramId });
}
