import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "danger" | "warning" | "success" | string;
  size?: "small" | "medium" | "large" | string;
  ariaLabel?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  className = "",
  ariaLabel,
  ...props
}: ButtonProps) {
  const baseClasses =
    "rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClasses: Record<string, string> = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const variantClasses: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 focus:ring-pink-500 shadow-md hover:shadow-lg",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    warning:
      "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500",
    success: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500",
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
