'use client';

import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import FloatingMascot from '@/components/FloatingMascot';
import OurStory from '@/components/about/OurStory';
import Founders from '@/components/about/Founders';
import Office from '@/components/about/Office';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <main className="bg-beige-100">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-gold-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-400 
                           rounded-full text-sm font-semibold mb-4">
                            About Us
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            We&apos;re Building the Future of
                            <span className="block text-gold-400">Student Mobility</span>
                        </h1>
                        <p className="text-xl text-beige-200/80 max-w-3xl mx-auto">
                            From students who faced the struggles, to a team dedicated to making
                            your transition to Paris as smooth as a croissant.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <OurStory />

            {/* Founders */}
            <Founders />

            {/* Office */}
            <Office />

            {/* CTA Section */}
            <section className="section bg-beige-50">
                <div className="container mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-gold-400 to-gold-500 rounded-3xl p-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-navy-800/80 mb-8 text-lg max-w-2xl mx-auto">
                            Join the thousands of students who trusted StudyNest to guide them
                            through their Parisian adventure.
                        </p>
                        <a
                            href="/services"
                            className="btn bg-navy-700 text-white hover:bg-navy-600 text-lg px-8 py-4"
                        >
                            Explore Our Services
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
            <FloatingMascot />
        </main>
    );
}
