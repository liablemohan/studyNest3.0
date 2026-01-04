'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Copy } from 'lucide-react';

const testimonials = [
    {
        name: 'Priya Sharma',
        country: '🇮🇳 India',
        university: 'Sorbonne University',
        image: '/images/testimonials/priya.jpg',
        text: 'StudyNest made my transition to Paris incredibly smooth. They helped me get my apartment, bank account, and CAF subsidy all sorted before I even landed!',
        rating: 5,
    },
    {
        name: 'Lucas Silva',
        country: '🇧🇷 Brazil',
        university: 'Sciences Po',
        image: '/images/testimonials/lucas.jpg',
        text: 'The team is amazing! They speak multiple languages and really understand what international students go through. Worth every euro.',
        rating: 5,
    },
    {
        name: 'Yuki Tanaka',
        country: '🇯🇵 Japan',
        university: 'ESSEC Business School',
        image: '/images/testimonials/yuki.jpg',
        text: 'I was nervous about the French bureaucracy, but StudyNest handled everything. I could focus on my studies from day one.',
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="section bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 text-white relative overflow-hidden">
            {/* Background decoration - hidden on mobile */}
            <div className="absolute inset-0 opacity-10 hidden md:block">
                <div className="absolute top-20 left-10 text-[200px]">
                    <Quote />
                </div>
                <div className="absolute bottom-20 right-10 text-[200px] rotate-180">
                    <Quote />
                </div>
            </div>

            <div className="container mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-400 rounded-full text-sm font-semibold mb-4">
                        Student Stories
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                        What Our <span className="text-gold-400">Students</span> Say
                    </h2>
                    <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto px-4 sm:px-0">
                        Real stories from real students who made Paris their new home with StudyNest.
                    </p>
                </motion.div>

                {/* Testimonials grid - single column on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/10 hover:bg-white/10 transition-colors duration-300"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-gold-400 text-gold-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-beige-100/90 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                                &ldquo;{testimonial.text}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-900 font-bold text-base sm:text-lg">
                                    {testimonial.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</div>
                                    <div className="text-xs sm:text-sm text-white/70">
                                        {testimonial.country} • {testimonial.university}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-10 sm:mt-16 text-center"
                >
                    <p className="text-white/70 mb-4 sm:mb-6 text-sm sm:text-base">Trusted by students from top universities</p>
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 items-center opacity-60">
                        {['Sorbonne', 'Sciences Po', 'ESSEC', 'HEC Paris', 'INSEAD'].map((uni) => (
                            <div
                                key={uni}
                                className="text-sm sm:text-lg font-semibold text-white/80 px-3 sm:px-4 py-1.5 sm:py-2 border border-white/10 rounded-lg"
                            >
                                {uni}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
