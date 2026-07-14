interface IconPartProps {
  className?: string;
}

export const SunGlyph = ({ className }: IconPartProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={className}>
    <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />
    <path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" />
  </svg>
);

export const MoonGlyph = ({ className }: IconPartProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20 14.8A8.5 8.5 0 1 1 9.2 4a7 7 0 0 0 10.8 10.8Z" />
  </svg>
);

export const CloudGlyph = ({ className }: IconPartProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M6.5 19a4.5 4.5 0 0 1-.4-8.98A5.5 5.5 0 0 1 16.9 8.6 4.5 4.5 0 0 1 17.5 19h-11Z" />
  </svg>
);

export const FogGlyph = ({ className }: IconPartProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={className}>
    <path d="M4 9h16M4 13h16M4 17h10" />
  </svg>
);

export const BoltGlyph = ({ className }: IconPartProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M13 2 5 14h5l-1 8 8-12h-5l1-8Z" />
  </svg>
);

export const RainGlyph = ({ className }: IconPartProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={className}>
    <path d="M7 16v4M12 16v4M17 16v4" />
  </svg>
);

export const SnowGlyph = ({ className }: IconPartProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="7" cy="18" r="1.2" />
    <circle cx="12" cy="19.5" r="1.2" />
    <circle cx="17" cy="18" r="1.2" />
  </svg>
);
