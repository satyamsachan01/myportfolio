import { profile } from '../../data/profile';
import { useExperience } from '../../hooks/useExperience';
import { WhatsAppIcon, whatsappHref } from './Icons';

/** A glossy water-drop WhatsApp button, shown once the visitor is through the gate. */
export function FloatingWhatsApp() {
  const { phase } = useExperience();
  if (!profile.whatsapp || phase !== 'entered') return null;
  return (
    <a
      className="wa-drop"
      href={whatsappHref(profile.whatsapp, profile.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp, ${profile.phoneDisplay}`}
    >
      <WhatsAppIcon size={26} />
      <span className="wa-drop__label">Chat on WhatsApp</span>
    </a>
  );
}
