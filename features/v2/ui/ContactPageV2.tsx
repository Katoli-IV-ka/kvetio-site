/* eslint-disable @next/next/no-img-element -- decorative art positioned with exact crops */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { clearDraft, loadDraft } from '../../contact/lib/draft';
import { contactForm } from '../../../shared/landing/site-content';
import { CTA_LABEL } from '../content';
import styles from '../v2.module.css';
import { PageShell } from './PageShell';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'ratelimit' | 'invalid';

const MESSAGES: Record<'error' | 'ratelimit' | 'invalid', string> = {
  error: 'Something went wrong. Please try again or write to contact@kvet.io.',
  ratelimit: 'Too many requests. Please try again in a few minutes.',
  invalid:
    'Please fill in name, email and your request, choose what you need and accept the Privacy Policy.',
};

export function ContactPageV2() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [source, setSource] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  // Answers typed in the old landing band are carried over through session storage.
  useEffect(() => {
    const draft = loadDraft();
    if (!draft) return;
    queueMicrotask(() => {
      setName(draft.name);
      setEmail(draft.email);
      setPrivacy(draft.consent);
      setMarketing(draft.marketing);
    });
  }, []);

  const toggleType = (type: string) =>
    setDataTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type],
    );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim() || dataTypes.length === 0 || !privacy) {
      setStatus('invalid');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          jobTitle: jobTitle.trim(),
          company: company.trim(),
          dataTypes,
          message: message.trim(),
          source,
          marketingConsent: marketing,
        }),
      });
      if (res.ok) {
        clearDraft();
        setStatus('success');
      } else {
        setStatus(res.status === 429 ? 'ratelimit' : 'error');
      }
    } catch {
      setStatus('error');
    }
  }

  const note =
    status === 'error' || status === 'ratelimit' || status === 'invalid' ? MESSAGES[status] : null;

  return (
    <PageShell>
      <section className={styles.pageHero}>
        <img
          className={styles.pageArt}
          src='/v2/contact-collage.webp'
          alt=''
        />
        <div className={styles.pageInner}>
          <h1 className={`${styles.heading} ${styles.pageTitle}`}>
            Tell us what data your model needs.
          </h1>
          {status === 'success' ? (
            <div
              className={styles.thanks}
              role='status'
            >
              <p className={styles.thanksTitle}>Thank you — message received.</p>
              <p>We&apos;ll get back to you soon.</p>
              <Link
                className={styles.pageButton}
                href='/'
              >
                Back to home
              </Link>
            </div>
          ) : (
            <form
              className={styles.pageForm}
              onSubmit={onSubmit}
              noValidate
            >
              <div className={styles.pageFields}>
                <input
                  className={styles.field}
                  type='text'
                  name='name'
                  placeholder='Name*'
                  aria-label='Name'
                  autoComplete='name'
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <input
                  className={styles.field}
                  type='email'
                  name='email'
                  placeholder='Email*'
                  aria-label='Email'
                  autoComplete='email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  className={styles.field}
                  type='text'
                  name='jobTitle'
                  placeholder='Job title'
                  aria-label='Job title'
                  autoComplete='organization-title'
                  value={jobTitle}
                  onChange={(event) => setJobTitle(event.target.value)}
                />
                <input
                  className={styles.field}
                  type='text'
                  name='company'
                  placeholder='Company'
                  aria-label='Company'
                  autoComplete='organization'
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </div>
              <fieldset className={styles.chips}>
                <legend className={styles.chipsLabel}>What do you need?*</legend>
                {contactForm.dataTypes.map((type) => (
                  <label
                    key={type}
                    className={styles.chip}
                  >
                    <input
                      type='checkbox'
                      checked={dataTypes.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </fieldset>
              <textarea
                className={`${styles.field} ${styles.textarea}`}
                name='message'
                placeholder='What data does your model need?*'
                aria-label='What data does your model need?'
                rows={3}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <select
                className={`${styles.field} ${styles.select}`}
                name='source'
                aria-label='How did you hear about us?'
                value={source}
                onChange={(event) => setSource(event.target.value)}
              >
                <option value=''>How did you hear about us?</option>
                {contactForm.sources.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
              <div className={styles.consents}>
                <label className={styles.consent}>
                  <input
                    type='checkbox'
                    name='privacy'
                    checked={privacy}
                    onChange={(event) => setPrivacy(event.target.checked)}
                  />
                  <span>
                    I have read the <Link href='/privacy-policy'>Privacy Policy</Link> and I agree
                    that Kvetio may process my name, email address and the details I provide in this
                    form in order to reply to my enquiry.
                  </span>
                </label>
                <label className={styles.consent}>
                  <input
                    type='checkbox'
                    name='marketing'
                    checked={marketing}
                    onChange={(event) => setMarketing(event.target.checked)}
                  />
                  <span>
                    Optional: I agree to receive commercial information about Kvetio&apos;s datasets
                    and services at this email address. I can withdraw this consent at any time.
                  </span>
                </label>
              </div>
              <div className={styles.submitRow}>
                <button
                  className={styles.submit}
                  type='submit'
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending…' : CTA_LABEL}
                </button>
                {note && (
                  <p
                    className={`${styles.status} ${styles.statusError}`}
                    role='status'
                  >
                    {note}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}
