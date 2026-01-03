'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ServiceSectionProps {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    icon: LucideIcon;
    image?: string;
    color: string;
    reverse?: boolean;
}

export default function ServiceSection({
    id,
    title,
    subtitle,
    description,
    features,
    icon: Icon,
    color,
    reverse = false,
}: ServiceSectionProps) {
    return (
        <section
            id={id}
            className={`section ${reverse ? 'bg-beige-50' : 'bg-white'}`}
        >
            <div className="container mx-auto">
                <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1"
                    >
                        <span className={`inline-block px-4 py-1.5 bg-gradient-to-r ${color} 
                           text-white rounded-full text-sm font-semibold mb-4`}>
                            {subtitle}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mb-4">
                            {title}
                        </h2>
                        <p className="text-lg text-navy-600/70 mb-8 leading-relaxed">
                            {description}
                        </p>

                        {/* Features */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start gap-3 p-3 rounded-xl bg-beige-50 border border-beige-200"
                                >
                                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${color} 
                                flex items-center justify-center flex-shrink-0`}>
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                    <span className="text-navy-700 text-sm font-medium">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: reverse ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1"
                    >
                        <div className={`relative bg-gradient-to-br ${color} rounded-3xl p-8 
                          aspect-square flex items-center justify-center
                          shadow-2xl`}>
                            {/* Decorative circles */}
                            <div className="absolute inset-4 border border-white/20 rounded-2xl" />
                            <div className="absolute inset-8 border border-white/10 rounded-xl" />

                            {/* Icon */}
                            <Icon className="w-32 h-32 text-white/90" />

                            {/* Floating elements */}
                            <motion.div
                                className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-2xl
                          flex items-center justify-center"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <span className="text-2xl">🇫🇷</span>
                            </motion.div>

                            <motion.div
                                className="absolute bottom-8 left-8 w-20 h-20 bg-white/10 rounded-2xl
                          flex items-center justify-center"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            >
                                <span className="text-3xl">✨</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
