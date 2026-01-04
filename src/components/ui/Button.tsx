'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-gradient-to-r from-navy-600 to-navy-700 text-white shadow-lg shadow-navy-700/30 hover:from-navy-500 hover:to-navy-600 hover:-translate-y-0.5 focus:ring-navy-500',
    secondary: 'bg-gradient-to-r from-gold-400 to-gold-500 text-navy-900 shadow-lg shadow-gold-500/30 hover:from-gold-300 hover:to-gold-400 hover:-translate-y-0.5 focus:ring-gold-400',
    outline: 'bg-transparent border-2 border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white focus:ring-navy-500',
    ghost: 'bg-transparent text-navy-700 hover:bg-navy-100 focus:ring-navy-300',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {content}
    </button>
  );
}
