'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Heart, Target, Sparkles } from 'lucide-react';

export default function OurStory() {
    return (
        <section className="section bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-100 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-navy-100 text-navy-700 
                           rounded-full text-sm font-semibold mb-4">
                            Our Story
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mb-6">
                            From Students,
                            <span className="text-gold-500"> For Students</span>
                        </h2>

                        <div className="space-y-6 text-navy-600/80 leading-relaxed">
                            <p>
                                StudyNest was born from a simple frustration: navigating the maze of French
                                bureaucracy as an international student is <strong>unnecessarily hard</strong>.
                            </p>
                            <p>
                                When our founders arrived in Paris in 2019, they spent weeks trying to open
                                a bank account, months waiting for housing, and countless hours deciphering
                                CAF forms. They knew there had to be a better way.
                            </p>
                            <p>
                                In 2021, StudyNest was launched with one mission: <strong>make the transition
                                    to Paris seamless</strong>. We&apos;ve since helped over 5,000 students from 80+
                                countries focus on what matters most—their studies and new adventures.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-10">
                            {[
                                { number: '2021', label: 'Founded' },
                                { number: '5,000+', label: 'Students' },
                                { number: '80+', label: 'Countries' },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-2xl md:text-3xl font-bold text-navy-700">{stat.number}</div>
                                    <div className="text-sm text-navy-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Rocket, title: 'Mission', desc: 'Simplify student transitions to France', color: 'from-blue-500 to-blue-600' },
                                { icon: Target, title: 'Vision', desc: 'Be the #1 student support platform in Europe', color: 'from-gold-500 to-gold-600' },
                                { icon: Heart, title: 'Values', desc: 'Student-first, transparent, reliable', color: 'from-pink-500 to-pink-600' },
                                { icon: Sparkles, title: 'Promise', desc: 'Your success is our success', color: 'from-purple-500 to-purple-600' },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="bg-beige-50 rounded-2xl p-6 border border-beige-200
                           hover:shadow-lg transition-shadow"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color}
                                flex items-center justify-center mb-4`}>
                                        <item.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-navy-700 mb-1">{item.title}</h3>
                                    <p className="text-sm text-navy-500">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
