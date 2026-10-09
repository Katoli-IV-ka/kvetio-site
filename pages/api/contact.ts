import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { LRUCache } from 'lru-cache';

const rateLimitCache = new LRUCache<string, number>({
  max: 500,
  ttl: 10 * 60 * 1000, // 10 minutes
});

const RATE_LIMIT = 3; // max requests per IP per TTL window

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  datasetTitle?: string;
  jobTitle?: string;
  company?: string;
  dataTypes?: string[];
  source?: string;
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

  const payload = normalizeContactPayload(req.body);

  if (!payload) {
    return res.status(400).json({ message: 'Email and message are required' });
  }

  const { name, email, message, datasetTitle, jobTitle, company, dataTypes, source } = payload;
  const details = [
    jobTitle && `Title: ${jobTitle}`,
    company && `Company: ${company}`,
    dataTypes && `Data type: ${dataTypes.join(', ')}`,
    source && `Heard about us: ${source}`,
  ].filter((line): line is string => Boolean(line));
  const escape = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: 'kvetio.data@gmail.com',
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n${details.join('\n')}${details.length ? '\n' : ''}\n${message}`,
      html: `<p><strong>Name:</strong> ${escape(name)}</p><p><strong>Email:</strong> ${escape(email)}</p>${details.map((line) => `<p>${escape(line)}</p>`).join('')}<p><strong>Message:</strong><br/>${escape(message)}</p>`,
    });
  }
  const telegramText =
    `📬 Новое сообщение с формы\n\n` +
    (datasetTitle ? `📦 Датасет: ${datasetTitle}\n\n` : '') +
    `Имя: ${name}\n` +
    `Email: ${email}\n` +
    (details.length ? `${details.join('\n')}\n` : '') +
    '\n' +
    `Сообщение:\n${message}`;
  await sendTelegramMessage(telegramText);

  return res.status(200).json({ message: 'Message sent successfully' });
}
