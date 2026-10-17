import { profile } from '../../data/profile';
import { ArrowUpRight, MailIcon, WhatsAppIcon, whatsappHref } from './Icons';

const labels: Record<string, string> = { linkedin: 'LinkedIn', github: 'GitHub', twitter: 'X / Twitter' };

/** Email + WhatsApp as glossy icon rows, then any social links filled in profile.ts. */
export function SocialLinks({ className = '' }: { className?: string }) {
  const links = Object.entries(profile.links).filter(([, url]) => !!url);
  return (
    <ul className={`socials ${className}`}>
      {profile.email && (
        <li>
          <a href={`mailto:${profile.email}`} className="contact-chip">
            <span className="contact-chip__icon contact-chip__icon--mail"><MailIcon /></span>
            <span className="contact-chip__text"><small>Email</small>{profile.email}</span>
          </a>
        </li>
      )}
      {profile.whatsapp && (
        <li>
          <a href={whatsappHref(profile.whatsapp, profile.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="contact-chip">
            <span className="contact-chip__icon contact-chip__icon--wa"><WhatsAppIcon /></span>
            <span className="contact-chip__text"><small>WhatsApp</small>{profile.phoneDisplay}</span>
          </a>
        </li>
      )}
      {links.map(([key, url]) => (
        <li key={key}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="social-link">{labels[key] ?? key} <ArrowUpRight /></a>
        </li>
      ))}
    </ul>
  );
}
