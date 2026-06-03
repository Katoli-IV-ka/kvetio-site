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
};

export function normalizeContactPayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== 'object') return null;

  const payload = body as Partial<Record<'name' | 'email' | 'message' | 'datasetTitle', unknown>>;
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';
  const name =
    typeof payload.name === 'string' && payload.name.trim()
      ? payload.name.trim()
      : 'Website visitor';
  const datasetTitle =
    typeof payload.datasetTitle === 'string' && payload.datasetTitle.trim()
      ? payload.datasetTitle.trim()
      : undefined;

  if (!email || !message) return null;

  return { name, email, message, datasetTitle };
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

  const { name, email, message, datasetTitle } = payload;

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
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`,
    });
  }
  const telegramText =
    `📬 Новое сообщение с формы\n\n` +
    (datasetTitle ? `📦 Датасет: ${datasetTitle}\n\n` : '') +
    `Имя: ${name}\n` +
    `Email: ${email}\n\n` +
    `Сообщение:\n${message}`;
  await sendTelegramMessage(telegramText);

  return res.status(200).json({ message: 'Message sent successfully' });
}
