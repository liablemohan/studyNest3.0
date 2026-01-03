'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroScene() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                poster="/images/paris-hero-poster.jpg"
            >
                <source src="/videos/paris-hero.mp4" type="video/mp4" />
                {/* Fallback gradient if video doesn't load */}
            </video>

            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/50 to-navy-900/80" />

            {/* Animated particles overlay for visual interest */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gold-400/30 rounded-full"
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
                    className="text-center px-4 max-w-5xl"
                >
                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 
                            rounded-full text-white/90 text-sm font-medium mb-6"
                    >
                        ✨ Your trusted partner for student life in Paris
                    </motion.span>

                    {/* Main heading */}
                    <h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-display leading-tight"
                        style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
                    >
                        Begin Your
                        <span
                            className="block text-gold-400"
                            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}
                        >
                            Parisian Journey
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p
                        className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed"
                        style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}
                    >
                        From housing to banking, from SIM cards to subsidies —
                        we make settling in Paris effortless for international students.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/services"
                            className="btn btn-secondary text-lg px-8 py-4 shadow-2xl hover:shadow-gold-500/25 transition-shadow"
                        >
                            Explore Services
                        </Link>
                        <Link
                            href="/about"
                            className="btn border-2 border-white text-white hover:bg-white hover:text-navy-700 
                                text-lg px-8 py-4 transition-all duration-300"
                            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}
                        >
                            Our Story
                        </Link>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-7 h-12 rounded-full border-2 border-white/40 flex justify-center pt-2.5">
                        <motion.div
                            className="w-2 h-3 rounded-full bg-white/60"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                        />
                    </div>
                    <p className="text-white/50 text-xs mt-2 text-center">Scroll to explore</p>
                </motion.div>
            </div>

            {/* Bottom gradient transition to next section */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-beige-100 to-transparent z-20" />
        </div>
    );
}
