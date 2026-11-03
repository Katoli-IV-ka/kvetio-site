import { createHmac, timingSafeEqual } from 'node:crypto';
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

const PRIVACY_POLICY_VERSION = '2026-11-03';
const RATE_LIMIT = 5; // max new requests per IP per TTL window
const DETAILS_RATE_LIMIT = 10; // max detail updates per IP per TTL window

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  datasetTitle?: string;
  jobTitle?: string;
  company?: string;
  dataTypes?: string[];
  source?: string;
  /** two-step form: 'initial' is the quick first step, 'details' adds to the same request */
  stage?: 'initial' | 'details';
  /** signed proof of the Telegram message created at the first step (see createEditToken) */
  editToken?: string;
  volume?: string;
  timeline?: string;
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
  if (payload.stage === 'initial' || payload.stage === 'details') result.stage = payload.stage;
  const editToken = text(payload.editToken, 300);
  if (editToken) result.editToken = editToken;
  const volume = text(payload.volume, 100);
  const timeline = text(payload.timeline, 100);
  if (volume) result.volume = volume;
  if (timeline) result.timeline = timeline;
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

const EDIT_TOKEN_TTL_MS = 60 * 60 * 1000; // the second form step must follow within an hour

function editSignature(messageId: number, expires: number, email: string): string {
  return createHmac('sha256', `contact-form-edit:${process.env.TELEGRAM_BOT_TOKEN ?? ''}`)
    .update(`${messageId}.${expires}.${email.toLowerCase()}`)
    .digest('base64url');
}

/**
 * Proof that this browser created the Telegram message and may complete it. The raw message id is
 * never handed out: otherwise anyone could send another id and overwrite earlier requests.
 */
export function createEditToken(messageId: number, email: string, now = Date.now()): string {
  const expires = now + EDIT_TOKEN_TTL_MS;
  return `${messageId}.${expires}.${editSignature(messageId, expires, email)}`;
}

/** The message id when the token is genuine, unexpired and issued for this e-mail; otherwise undefined. */
export function readEditToken(
  token: string | undefined,
  email: string,
  now = Date.now(),
): number | undefined {
  const [id, expiresText, signature] = (token ?? '').split('.');
  const messageId = Number(id);
  const expires = Number(expiresText);
  if (!signature || !Number.isSafeInteger(messageId) || messageId <= 0 || !(expires > now)) {
    return undefined;
  }
  const expected = Buffer.from(editSignature(messageId, expires, email));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return undefined;
  return messageId;
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
export async function sendTelegramMessage(
  text: string,
  parseMode?: 'HTML',
): Promise<number | undefined> {
  const data = (await telegramRequest('sendMessage', {
    text,
    ...(parseMode && { parse_mode: parseMode }),
  })) as { result?: { message_id?: number } } | undefined;
  return data?.result?.message_id;
}

export async function editTelegramMessage(
  messageId: number,
  text: string,
  parseMode?: 'HTML',
): Promise<void> {
  await telegramRequest('editMessageText', {
    message_id: messageId,
    text,
    ...(parseMode && { parse_mode: parseMode }),
  });
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The Telegram message (HTML mode): groups of filled-in fields, then the request text. */
export function formatTelegramMessage(payload: ContactPayload): string {
  const line = (label: string, value: string | undefined) =>
    value ? `<b>${label}:</b> ${escapeHtml(value)}` : undefined;
  const group = (lines: (string | undefined)[]) => lines.filter(Boolean).join('\n');
  const blocks = [
    group([
      line('Имя', payload.name),
      line('Email', payload.email),
      line('Role', payload.jobTitle),
      line('Company', payload.company),
    ]),
    group([
      line('Data type', payload.dataTypes?.join(', ')),
      line('Scale', payload.volume),
      line('Timeline', payload.timeline),
      line('NDA needed', payload.ndaNeeded ? 'yes' : undefined),
      line('Heard about us', payload.source),
    ]),
    payload.datasetTitle ? line('Датасет', payload.datasetTitle) : '',
    `<b>Сообщение:</b> ${escapeHtml(payload.message.slice(0, 3000))}`,
  ].filter(Boolean);
  return `🆕 Новая заявка <b>Kvetio</b>\n\n${blocks.join('\n\n')}`;
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
    jobTitle,
    company,
    dataTypes,
    source,
    volume,
    timeline,
    ndaNeeded,
    editToken,
  } = payload;
  const details = [
    jobTitle && `Title: ${jobTitle}`,
    company && `Company: ${company}`,
    dataTypes && `Data type: ${dataTypes.join(', ')}`,
    volume && `Scale: ${volume}`,
    timeline && `Timeline: ${timeline}`,
    ndaNeeded && 'NDA needed: yes',
    source && `Heard about us: ${source}`,
    `Consent to reply (Privacy Policy ${PRIVACY_POLICY_VERSION}): given ${new Date().toISOString()}`,
  ].filter((line): line is string => Boolean(line));
  const escape = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  let delivered = false;
  // a detail update edits the first message only when it carries a valid token for this e-mail
  const editableId = isDetails ? readEditToken(editToken, email) : undefined;
  let newTelegramId: number | undefined = editableId;

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
    const telegramText = formatTelegramMessage(payload);
    try {
      if (editableId) {
        try {
          await editTelegramMessage(editableId, telegramText, 'HTML');
        } catch (error) {
          // the first message may be gone or unchanged; send the full request again instead
          console.error('Contact form: Telegram edit failed, sending a new message', error);
          newTelegramId = await sendTelegramMessage(telegramText, 'HTML');
        }
      } else {
        newTelegramId = await sendTelegramMessage(telegramText, 'HTML');
      }
      delivered = true;
    } catch (error) {
      console.error('Contact form: Telegram failed', error);
    }
  }

  if (!delivered) {
    return res.status(502).json({ message: 'Could not deliver the message' });
  }

  return res.status(200).json({
    message: 'Message sent successfully',
    ...(newTelegramId && { editToken: createEditToken(newTelegramId, email) }),
  });
}
