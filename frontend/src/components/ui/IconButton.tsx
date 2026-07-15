import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const IconButton = ({ className = "", children, ...nativeButtonProps }: IconButtonProps) => (
  <button
    className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...nativeButtonProps}
  >
    {children}
  </button>
);
