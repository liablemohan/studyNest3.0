'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'glass' | 'elevated' | 'bordered';
    className?: string;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

export default function Card({
    children,
    variant = 'default',
    className = '',
    hover = true,
    padding = 'md',
    onClick,
}: CardProps) {
    const baseStyles = 'rounded-2xl transition-all duration-300';

    const variants = {
        default: 'bg-white shadow-md',
        glass: `
      bg-white/25 backdrop-blur-xl
      border border-white/20
    `,
        elevated: `
      bg-white shadow-xl
      border border-beige-200
    `,
        bordered: `
      bg-white border-2 border-navy-100
    `,
    };

    const paddings = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const hoverStyles = hover
        ? 'hover:shadow-2xl hover:-translate-y-1 cursor-pointer'
        : '';

    return (
        <motion.div
            className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${hoverStyles} ${className}`}
            onClick={onClick}
            whileHover={hover ? { y: -4 } : undefined}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
}

// Sub-components for structured cards
export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <h3 className={`text-xl font-bold text-navy-700 ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <p className={`text-navy-600/70 mt-1 ${className}`}>{children}</p>;
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={className}>{children}</div>;
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`mt-4 pt-4 border-t border-beige-200 ${className}`}>{children}</div>;
}
