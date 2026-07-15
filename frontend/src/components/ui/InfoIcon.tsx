interface InfoIconProps {
  className?: string;
}

export const InfoIcon = ({ className }: InfoIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5.5" />
    <circle cx="12" cy="8" r="0.75" fill="currentColor" stroke="none" />
  </svg>
);
