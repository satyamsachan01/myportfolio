import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/profile';
import { mailtoFor, submitContact, type ContactPayload } from '../../utils/submitContact';
import { useSectionLink } from '../../hooks/useSectionLink';
import { SocialLinks } from '../ui/SocialLinks';
import { Reveal } from '../ui/Reveal';
import { SectionHeader } from '../ui/SectionHeader';
import { MailIcon, WhatsAppIcon, whatsappHref } from '../ui/Icons';

const SERVICES = ['Full-Stack Development', 'WordPress', 'Shopify', 'WooCommerce', 'E-commerce', 'WordPress Malware Cleanup', 'SEO', 'AEO', 'GEO', 'AI-Powered Products', 'Multiple Services'];
const BUDGETS = ['Not sure yet', 'Under ₹25,000', '₹25,000 to ₹75,000', '₹75,000 to ₹2,00,000', 'Above ₹2,00,000'];

type Errors = Partial<Record<keyof ContactPayload, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'not-configured' | 'error';

const EMPTY: ContactPayload = { name: '', email: '', company: '', service: '', budget: '', message: '' };

function validate(d: ContactPayload): Errors {
  const e: Errors = {};
  if (d.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim())) e.email = 'Please enter a valid email address.';
  if (!d.service) e.service = 'Please choose a service.';
  if (d.message.trim().length < 20) e.message = 'Please describe the project in at least 20 characters.';
  return e;
}

export function Contact() {
  const [data, setData] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const go = useSectionLink();

  // "Work with me" cards can pre-select a service.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const service = (e as CustomEvent<string>).detail;
      if (SERVICES.includes(service)) setData((d) => ({ ...d, service }));
    };
    window.addEventListener('portfolio:prefill', onPrefill);
    return () => window.removeEventListener('portfolio:prefill', onPrefill);
  }, []);

  const update = (k: keyof ContactPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    const found = validate(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (honeypot) return; // bot
    setStatus('sending');
    const res = await submitContact(data);
    if (res.status === 'sent') {
      setStatus('sent');
      setData(EMPTY);
    } else if (res.status === 'not-configured') {
      setStatus('not-configured');
    } else {
      setStatus('error');
      setErrorMsg(res.message);
    }
  };

  const fieldProps = (k: keyof ContactPayload) => ({
    id: `cf-${k}`,
    name: k,
    value: data[k],
    onChange: update(k),
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `cf-${k}-err` : undefined,
  });

  const err = (k: keyof ContactPayload) => errors[k] && <p className="field__error" id={`cf-${k}-err`}>{errors[k]}</p>;

  return (
    <section id="contact" className="section portal" aria-labelledby="contact-title">
      <div className="portal__door" aria-hidden="true">
        <div className="portal__frame"><div className="portal__light" /></div>
        <div className="portal__floor" />
      </div>

      <div className="container portal__inner">
        <div className="portal__copy">
          <SectionHeader
            chapter="contact"
            eyebrow="The final portal"
            title="Your next idea"
            accent="could start here."
            lead="A website, a store, a search strategy or an AI feature. Tell me the problem and I will tell you honestly how I would solve it."
            id="contact-title"
          />
          {profile.openTo && <p className="status-pill"><i aria-hidden="true" />{profile.openTo}</p>}
          <Reveal delay={0.24} className="portal__actions">
            <a href="#contact-form" className="btn btn--primary" onClick={(e) => { e.preventDefault(); formRef.current?.querySelector<HTMLElement>('input')?.focus(); formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }}>
              Start a project
            </a>
            {profile.whatsapp && (
              <a href={whatsappHref(profile.whatsapp, profile.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn--wa">
                <WhatsAppIcon /> WhatsApp me
              </a>
            )}
            {profile.email && <a href={`mailto:${profile.email}`} className="btn"><MailIcon /> Email me</a>}
          </Reveal>
          <SocialLinks className="portal__socials" />
        </div>

        <form ref={formRef} id="contact-form" className="form" onSubmit={onSubmit} noValidate aria-describedby="form-status">
          <div className="form__row">
            <div className="field">
              <label htmlFor="cf-name">Name *</label>
              <input type="text" autoComplete="name" {...fieldProps('name')} />
              {err('name')}
            </div>
            <div className="field">
              <label htmlFor="cf-email">Email *</label>
              <input type="email" autoComplete="email" inputMode="email" {...fieldProps('email')} />
              {err('email')}
            </div>
          </div>
          <div className="field">
            <label htmlFor="cf-company">Company <span className="field__opt">(optional)</span></label>
            <input type="text" autoComplete="organization" {...fieldProps('company')} />
          </div>
          <div className="form__row">
            <div className="field">
              <label htmlFor="cf-service">Required service *</label>
              <select {...fieldProps('service')}>
                <option value="">Choose a service…</option>
                {SERVICES.map((s) => <option key={s}>{s}</option>)}
              </select>
              {err('service')}
            </div>
            <div className="field">
              <label htmlFor="cf-budget">Budget range <span className="field__opt">(optional)</span></label>
              <select {...fieldProps('budget')}>
                <option value="">Select a range…</option>
                {BUDGETS.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="cf-message">Project description *</label>
            <textarea rows={5} {...fieldProps('message')} />
            {err('message')}
          </div>
          <div className="field field--hp" aria-hidden="true">
            <label htmlFor="cf-website">Website</label>
            <input id="cf-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </div>

          <button type="submit" className="btn btn--primary form__submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : "Let's build something"}
          </button>

          <div id="form-status" className="form__status" role="status" aria-live="polite">
            {status === 'sent' && (
              <motion.p className="status status--ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                Thank you. Your message was delivered. I'll reply by email soon.{' '}
                <a href="/" onClick={go('home')}>Back to the beginning ↑</a>
              </motion.p>
            )}
            {status === 'not-configured' && (
              <p className="status status--warn">
                This form isn't connected to a mail service yet, so nothing was sent.
                {profile.email ? (
                  <> You can send the same details by email instead: <a href={mailtoFor(profile.email, data)}>open an email with your message</a>.</>
                ) : ' Please use one of the links on this page instead.'}
              </p>
            )}
            {status === 'error' && (
              <p className="status status--err">
                {errorMsg} Your message was not sent.
                {profile.email && <> You can <a href={mailtoFor(profile.email, data)}>send it by email</a> instead.</>}
              </p>
            )}
            {status === 'idle' && (
              <p className="form__hint">Fields marked * are required.</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
