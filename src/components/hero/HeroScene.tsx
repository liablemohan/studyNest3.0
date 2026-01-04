'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroScene() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Dark Navy Blue Background - solid color as base */}
            <div className="absolute inset-0 bg-navy-900" />

            {/* Video Background (if available) */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                poster="/images/paris-hero-poster.jpg"
            >
                <source src="/videos/paris-hero.mp4" type="video/mp4" />
            </video>

            {/* Dark navy overlay for consistent dark look */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/90 via-navy-800/85 to-navy-900/95" />

            {/* Animated particles overlay - reduced for mobile performance */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gold-400/40 rounded-full"
                        initial={{
                            x: `${Math.random() * 100}%`,
                            y: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [null, '-100%'],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: 'linear',
                        }}
                        style={{
                            width: 2 + Math.random() * 3,
                            height: 2 + Math.random() * 3,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center px-5 sm:px-6 max-w-5xl"
                >
                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 
                            rounded-full text-white/90 text-xs sm:text-sm font-medium mb-4 sm:mb-6"
                    >
                        ✨ Your trusted partner for student life in Paris
                    </motion.span>

                    {/* Main heading - First line in WHITE for legibility */}
                    <h1
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 font-display leading-tight"
                        style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
                    >
                        <span className="text-white">Begin Your</span>
                        <span
                            className="block text-gold-400"
                            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
                        >
                            Parisian Journey
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-base sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2"
                        style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}
                    >
                        From housing to banking, from SIM cards to subsidies —
                        we make settling in Paris effortless for international students.
                    </p>

                    {/* CTAs - improved mobile touch targets */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                        <Link
                            href="/services"
                            className="btn btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] shadow-2xl hover:shadow-gold-500/25 transition-shadow"
                        >
                            Explore Services
                        </Link>
                        <Link
                            href="/about"
                            className="btn btn-outline-light text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] border-2 border-white/30 text-white
                                hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm"
                        >
                            Learn About Us
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-8 text-white/70 text-xs sm:text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-gold-400">✓</span>
                            <span>5000+ Students Helped</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gold-400">✓</span>
                            <span>Same-Day Support</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gold-400">✓</span>
                            <span>Trusted Partners</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
                >
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                </motion.div>
            </motion.div>
        </div>
    );
}
