'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="section bg-beige-100 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-100/50 via-transparent to-gold-100/50" />

            <div className="container mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900
                        rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-16 text-center overflow-hidden"
                >
                    {/* Decorative elements - smaller on mobile */}
                    <div className="absolute top-0 left-0 w-32 sm:w-64 h-32 sm:h-64 bg-gold-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-blue-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                    {/* Floating stars - reduced on mobile for performance */}
                    <div className="hidden sm:block">
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-gold-400"
                                style={{
                                    top: `${20 + Math.random() * 60}%`,
                                    left: `${10 + Math.random() * 80}%`,
                                }}
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            >
                                <Sparkles className="w-4 h-4" />
                            </motion.div>
                        ))}
                    </div>

                    <div className="relative z-10">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="inline-block px-3 sm:px-4 py-1.5 bg-gold-500/20 text-gold-400 
                                rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
                        >
                            Start Your Journey
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6"
                        >
                            Ready to Make Paris
                            <span className="block text-gold-400">Your New Home?</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-sm sm:text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0"
                        >
                            Join thousands of international students who chose the stress-free way
                            to start their Parisian adventure. Book a free consultation today.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2 sm:px-0"
                        >
                            <Link
                                href="/services"
                                className="btn bg-gradient-to-r from-gold-400 to-gold-500 text-navy-900
                                    text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] hover:from-gold-300 hover:to-gold-400
                                    shadow-lg shadow-gold-500/30"
                            >
                                View Packages
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Link>
                            <Link
                                href="/about"
                                className="btn bg-white/10 text-white border border-white/20
                                    text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] hover:bg-white/20"
                            >
                                Learn More
                            </Link>
                        </motion.div>

                        {/* Trust indicator - stacked on mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 text-white/70 text-xs sm:text-sm"
                        >
                            <span className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-400" />
                                Free consultation
                            </span>
                            <span className="hidden sm:inline mx-1">•</span>
                            <span>No hidden fees</span>
                            <span className="hidden sm:inline mx-1">•</span>
                            <span>Money-back guarantee</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
