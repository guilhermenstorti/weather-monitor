import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-white/90 text-slate-900 hover:bg-white",
  ghost: "bg-white/10 text-white hover:bg-white/20"
};

export const Button = ({ variant = "primary", className = "", children, ...nativeButtonProps }: ButtonProps) => (
  <button
    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_CLASSES[variant]} ${className}`}
    {...nativeButtonProps}
  >
    {children}
  </button>
);
