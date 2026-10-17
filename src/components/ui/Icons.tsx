interface IconProps {
  size?: number;
  className?: string;
}

export function MailIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7.5l7.2 5.1a1.4 1.4 0 0 0 1.6 0L20 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12.04 2.5a9.43 9.43 0 0 0-8.08 14.3L2.5 21.5l4.83-1.43A9.43 9.43 0 1 0 12.04 2.5Zm0 17.2a7.77 7.77 0 0 1-3.96-1.08l-.28-.17-2.87.85.86-2.8-.19-.29a7.78 7.78 0 1 1 6.44 3.49Zm4.27-5.82c-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.52.12-.16.23-.6.76-.74.91-.13.16-.27.18-.5.06a6.37 6.37 0 0 1-1.88-1.16 7.05 7.05 0 0 1-1.3-1.62c-.14-.23-.02-.36.1-.47.1-.1.23-.27.35-.41.12-.14.16-.23.23-.39.08-.16.04-.29-.02-.41-.06-.12-.52-1.26-.72-1.72-.19-.45-.38-.39-.52-.4h-.45a.86.86 0 0 0-.62.29 2.6 2.6 0 0 0-.82 1.94 4.52 4.52 0 0 0 .95 2.4 10.36 10.36 0 0 0 3.97 3.5c.55.24.99.38 1.32.49.56.18 1.06.15 1.46.09.45-.07 1.38-.56 1.57-1.11.2-.55.2-1.02.14-1.11-.06-.1-.21-.16-.44-.27Z"
      />
    </svg>
  );
}

export function ArrowUpRight({ size = 14, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const whatsappHref = (number: string, message: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
