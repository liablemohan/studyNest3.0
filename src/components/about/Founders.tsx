'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const founders = [
    {
        name: 'Alexandre Martin',
        role: 'CEO & Co-Founder',
        bio: 'Former international student from Brazil, Alexandre experienced firsthand the challenges of settling in Paris. With a background in business administration, he leads StudyNest\'s strategic vision.',
        image: '/images/founders/alex.jpg',
        country: '🇧🇷',
        social: {
            linkedin: '#',
            twitter: '#',
            email: 'alex@studynest.fr',
        },
    },
    {
        name: 'Sophie Chen',
        role: 'COO & Co-Founder',
        bio: 'Sophie moved from China to France for her Master\'s degree. Her experience navigating French bureaucracy inspired her to co-found StudyNest and streamline the process for others.',
        image: '/images/founders/sophie.jpg',
        country: '🇨🇳',
        social: {
            linkedin: '#',
            twitter: '#',
            email: 'sophie@studynest.fr',
        },
    },
    {
        name: 'Raj Patel',
        role: 'CTO & Co-Founder',
        bio: 'A software engineer from India, Raj builds the technology that powers StudyNest. He\'s passionate about using tech to solve real-world problems for students.',
        image: '/images/founders/raj.jpg',
        country: '🇮🇳',
        social: {
            linkedin: '#',
            twitter: '#',
            email: 'raj@studynest.fr',
        },
    },
];

export default function Founders() {
    return (
        <section className="section bg-beige-50">
            <div className="container mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 
                         rounded-full text-sm font-semibold mb-4">
                        Leadership
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mb-4">
                        Meet Our <span className="text-gold-500">Founders</span>
                    </h2>
                    <p className="text-lg text-navy-600/70 max-w-2xl mx-auto">
                        International students turned entrepreneurs, united by a mission to help
                        others have a smoother journey.
                    </p>
                </motion.div>

                {/* Founders grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {founders.map((founder, index) => (
                        <motion.div
                            key={founder.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl
                        transition-shadow duration-300"
                        >
                            {/* Image placeholder */}
                            <div className="h-64 bg-gradient-to-br from-navy-600 to-navy-800 
                            flex items-center justify-center relative">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold-400 to-gold-500
                              flex items-center justify-center text-5xl font-bold text-navy-900">
                                    {founder.name.charAt(0)}
                                </div>
                                {/* Country flag */}
                                <div className="absolute top-4 right-4 text-3xl">{founder.country}</div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-navy-700">{founder.name}</h3>
                                <p className="text-amber-800 font-semibold mb-4">{founder.role}</p>
                                <p className="text-navy-600/70 text-sm leading-relaxed mb-6">
                                    {founder.bio}
                                </p>

                                {/* Social links */}
                                <div className="flex gap-3">
                                    <a
                                        href={founder.social.linkedin}
                                        className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center
                             text-navy-600 hover:bg-navy-700 hover:text-white transition-colors"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={founder.social.twitter}
                                        className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center
                             text-navy-600 hover:bg-navy-700 hover:text-white transition-colors"
                                    >
                                        <Twitter className="w-4 h-4" />
                                    </a>
                                    <a
                                        href={`mailto:${founder.social.email}`}
                                        className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center
                             text-navy-600 hover:bg-navy-700 hover:text-white transition-colors"
                                    >
                                        <Mail className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Join the team CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-navy-600 mb-4">Want to join our team?</p>
                    <a
                        href="#careers"
                        className="btn btn-primary"
                    >
                        View Open Positions
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
