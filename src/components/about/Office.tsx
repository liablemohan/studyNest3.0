'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export default function Office() {
    return (
        <section className="section bg-white">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Map / Image placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] bg-gradient-to-br from-navy-700 to-navy-900 
                          rounded-3xl overflow-hidden relative">
                            {/* Stylized map placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold-500/20
                                flex items-center justify-center animate-pulse">
                                        <MapPin className="w-10 h-10 text-gold-400" />
                                    </div>
                                    <p className="text-white font-semibold mb-1">StudyNest HQ</p>
                                    <p className="text-beige-200/70 text-sm">Paris, France</p>
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-4 left-4 text-6xl opacity-20">🗼</div>
                            <div className="absolute bottom-4 right-4 text-4xl opacity-20">🥐</div>

                            {/* Grid pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="w-full h-full" style={{
                                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                    backgroundSize: '40px 40px',
                                }} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 
                           rounded-full text-sm font-semibold mb-4">
                            Visit Us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mb-6">
                            Our <span className="text-gold-500">Office</span>
                        </h2>
                        <p className="text-navy-600/70 mb-8 leading-relaxed">
                            Located in the heart of Paris, our office is always open for students
                            who want to drop by for a coffee and a chat about their journey.
                        </p>

                        {/* Contact cards */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 bg-beige-50 rounded-2xl">
                                <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-navy-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-navy-700 mb-1">Address</h3>
                                    <p className="text-navy-600/70">
                                        123 Boulevard Saint-Germain<br />
                                        75006 Paris, France
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-beige-50 rounded-2xl">
                                <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-navy-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-navy-700 mb-1">Office Hours</h3>
                                    <p className="text-navy-600/70">
                                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                                        Saturday: 10:00 AM - 2:00 PM
                                    </p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-beige-50 rounded-2xl">
                                    <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-navy-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-navy-500">Phone</p>
                                        <p className="font-medium text-navy-700">+33 1 23 45 67 89</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-beige-50 rounded-2xl">
                                    <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-navy-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-navy-500">Email</p>
                                        <p className="font-medium text-navy-700">hello@studynest.fr</p>
                                    </div>
                                </div>
                            </div>

                            {/* Metro access */}
                            <div className="p-4 bg-gradient-to-r from-navy-700 to-navy-800 rounded-2xl text-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                        <span className="text-lg">🚇</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-beige-200">Nearest Metro</p>
                                        <p className="font-semibold">Saint-Germain-des-Prés (Line 4)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
