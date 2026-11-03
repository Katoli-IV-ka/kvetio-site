import Link from 'next/link';
/* eslint-disable @next/next/no-img-element -- decorative art positioned with exact crops */
import { useState } from 'react';
import type { FormEvent } from 'react';
import { contactForm } from '../../../shared/landing/site-content';
import { CONTACT_TIMELINES, CONTACT_VOLUMES, CTA_LABEL } from '../content';
import styles from '../v2.module.css';

type Status = 'idle' | 'loading' | 'error' | 'ratelimit' | 'invalid';
type Step = 'quick' | 'details' | 'done';

const MESSAGES: Record<Exclude<Status, 'idle' | 'loading'>, string> = {
  error: 'Something went wrong. Please try again or write to contact@kvet.io.',
  ratelimit: 'Too many requests. Please try again in a few minutes.',
  invalid: 'Please fill in your name, email and request, and accept the Privacy Policy.',
};

/**
 * Two-step contact form. The quick step (name, email, what data is needed) is sent as soon as it
 * is submitted, so nobody is lost before the second step; the details step then updates the same
 * request instead of creating a new one.
 */
export function Contact() {
  const [step, setStep] = useState<Step>('quick');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [dataTypes, setDataTypes] = useState<string[]>([]);
  const [volume, setVolume] = useState('');
  const [timeline, setTimeline] = useState('');
  const [ndaNeeded, setNdaNeeded] = useState(false);
  const [source, setSource] = useState('');
  const [trap, setTrap] = useState('');
  const [editToken, setEditToken] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>('idle');

  const toggleType = (type: string) =>
    setDataTypes((current) =>
      current.includes(type) ? current.filter((item) => item !== type) : [...current, type],
    );

  async function send(stage: 'initial' | 'details') {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stage,
        editToken,
        website: trap,
        name: name.trim(),
        email: email.trim(),
        message: request.trim(),
        marketingConsent: marketing,
        ...(stage === 'details' && {
          company: company.trim(),
          jobTitle: jobTitle.trim(),
          dataTypes,
          volume,
          timeline,
          ndaNeeded,
          source,
        }),
      }),
    });
    return res;
  }

  async function onQuickSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !request.trim() || !privacy) {
      setStatus('invalid');
      return;
    }
    setStatus('loading');
    try {
      const res = await send('initial');
      if (res.ok) {
        const data = (await res.json().catch(() => null)) as { editToken?: string } | null;
        setEditToken(data?.editToken);
        setStatus('idle');
        setStep('details');
      } else {
        setStatus(res.status === 429 ? 'ratelimit' : 'error');
      }
    } catch {
      setStatus('error');
    }
  }

  async function onDetailsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    try {
      const res = await send('details');
      if (res.ok) {
        setStatus('idle');
        setStep('done');
      } else {
        setStatus(res.status === 429 ? 'ratelimit' : 'error');
      }
    } catch {
      setStatus('error');
    }
  }

  const message = status === 'idle' || status === 'loading' ? null : MESSAGES[status];
  const statusNote = message && (
    <p
      className={`${styles.status} ${styles.statusError}`}
      role='status'
    >
      {step === 'details'
        ? `${message} Your request is already with us; you can skip this step.`
        : message}
    </p>
  );

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
          Tell us what data your model needs.
        </h2>

        {step === 'quick' && (
          <form
            className={styles.form}
            onSubmit={onQuickSubmit}
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
              placeholder='What data does your model need?*'
              aria-label='What data does your model need?'
              rows={2}
              value={request}
              onChange={(event) => setRequest(event.target.value)}
            />
            <div
              aria-hidden='true'
              style={{
                position: 'absolute',
                left: '-9999px',
                width: 1,
                height: 1,
                overflow: 'hidden',
              }}
            >
              <input
                type='text'
                name='website'
                tabIndex={-1}
                autoComplete='off'
                value={trap}
                onChange={(event) => setTrap(event.target.value)}
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
                    I have read the <Link href='/privacy-policy'>Privacy Policy</Link> and I agree
                    that Kvetio may process my name, email address and the details I provide in this
                    form in order to reply to my inquiry. My request is sent as soon as I submit
                    this step and is delivered to the Kvetio team by email and in a private Telegram
                    chat.
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
                {statusNote}
              </div>
            </div>
          </form>
        )}

        {step === 'details' && (
          <form
            className={styles.form}
            onSubmit={onDetailsSubmit}
            noValidate
          >
            <div className={styles.fields}>
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
              <input
                className={styles.field}
                type='text'
                name='jobTitle'
                placeholder='Role'
                aria-label='Role'
                autoComplete='organization-title'
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
              />
            </div>
            <fieldset className={styles.chips}>
              <legend className={styles.chipsLabel}>What do you need?</legend>
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
            <div className={styles.fieldsGrid}>
              <select
                className={`${styles.field} ${styles.select}`}
                name='volume'
                aria-label='Scale'
                value={volume}
                onChange={(event) => setVolume(event.target.value)}
              >
                <option value=''>Scale</option>
                {CONTACT_VOLUMES.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
              <select
                className={`${styles.field} ${styles.select}`}
                name='timeline'
                aria-label='Timeline'
                value={timeline}
                onChange={(event) => setTimeline(event.target.value)}
              >
                <option value=''>Timeline</option>
                {CONTACT_TIMELINES.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
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
            </div>
            <div className={styles.formRow}>
              <div className={styles.consents}>
                <label className={styles.consent}>
                  <input
                    type='checkbox'
                    name='nda'
                    checked={ndaNeeded}
                    onChange={(event) => setNdaNeeded(event.target.checked)}
                  />
                  <span>We will need an NDA before sharing details.</span>
                </label>
              </div>
              <div className={styles.submitRow}>
                <div className={styles.submitButtons}>
                  <button
                    className={styles.submit}
                    type='submit'
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending…' : 'Send details'}
                  </button>
                  <button
                    className={styles.skip}
                    type='button'
                    onClick={() => setStep('done')}
                  >
                    Skip
                  </button>
                </div>
                {statusNote}
              </div>
            </div>
          </form>
        )}

        {step === 'done' && (
          <p
            className={styles.formDone}
            role='status'
          >
            Thanks! We got your request and will reply by email.
          </p>
        )}
      </div>
    </section>
  );
}
