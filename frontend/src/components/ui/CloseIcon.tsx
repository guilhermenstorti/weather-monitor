interface CloseIconProps {
  className?: string;
}

export const CloseIcon = ({ className }: CloseIconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
