import Link from 'next/link';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { CTA_LABEL } from '../content';
import styles from '../v2.module.css';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'ratelimit' | 'invalid';

const MESSAGES: Record<Exclude<Status, 'idle' | 'loading'>, string> = {
  success: 'Thanks! We got your request and will reply by email.',
  error: 'Something went wrong. Please try again or write to contact@kvet.io.',
  ratelimit: 'Too many requests. Please try again in a few minutes.',
  invalid: 'Please fill in your name, email and accept the Privacy Policy.',
};

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !privacy) {
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
          message: [
            request.trim(),
            `Request from the kvet.io${window.location.pathname} contact form. Privacy Policy accepted: yes. Marketing emails: ${marketing ? 'yes' : 'no'}.`,
          ]
            .filter(Boolean)
            .join('\n\n'),
          marketingConsent: marketing,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setRequest('');
        setPrivacy(false);
        setMarketing(false);
      } else if (res.status === 429) {
        setStatus('ratelimit');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const message = status === 'idle' || status === 'loading' ? null : MESSAGES[status];

  return (
    <section
      id='contact'
      className={styles.section}
      data-tone='alt'
    >
      <div className={styles.sectionInner}>
        <div className={styles.contactGrid}>
          <div className={styles.contactLead}>
            <h2 className={styles.heading}>Tell us what data your model needs.</h2>
            <p className={styles.sectionLead}>
              Describe the model, the data it is missing and the scale you have in mind. We will
              come back with questions and a proposed setup.
            </p>
            <ul className={styles.contactLinks}>
              <li>
                <a href='mailto:contact@kvet.io'>contact@kvet.io</a>
              </li>
              <li>
                <a
                  href='https://www.linkedin.com/company/kvet-io'
                  target='_blank'
                  rel='noreferrer'
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <form
            className={`${styles.form} ${styles.contactForm}`}
            onSubmit={onSubmit}
            noValidate
          >
            <div className={styles.fields}>
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
            </div>
            <textarea
              className={`${styles.field} ${styles.textarea} ${styles.requestField}`}
              name='request'
              placeholder='What data does your model need?'
              aria-label='What data does your model need?'
              rows={2}
              value={request}
              onChange={(event) => setRequest(event.target.value)}
            />
            <div className={styles.formRow}>
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
                {message && (
                  <p
                    className={`${styles.status} ${status === 'success' ? '' : styles.statusError}`}
                    role='status'
                  >
                    {message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
