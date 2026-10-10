/* eslint-disable @next/next/no-img-element -- decorative art positioned with exact crops */
import { useState } from 'react';
import type { FormEvent } from 'react';
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
          message: `Request from the kvet.io/v2 contact form. Privacy Policy accepted: yes. Marketing emails: ${marketing ? 'yes' : 'no'}.`,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
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
      className={styles.contact}
    >
      <div className={styles.contactInner}>
        <img
          className={styles.collage}
          src='/v2/contact-collage.webp'
          alt=''
        />
        <h2 className={`${styles.heading} ${styles.contactTitle}`}>
          Tell us what
          <br />
          your model
          <br />
          is missing
        </h2>
        <form
          className={styles.form}
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
                  I have read the <a href='https://kvet.io/privacy'>Privacy Policy</a> and I agree
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
                {status === 'loading' ? 'Sending…' : "Let's talk"}
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
    </section>
  );
}
