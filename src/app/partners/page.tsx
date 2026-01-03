'use client';

import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import FloatingMascot from '@/components/FloatingMascot';
import PartnerShowcase from '@/components/partners/PartnerShowcase';
import { motion } from 'framer-motion';
import { Handshake, BadgePercent, Shield, Headphones } from 'lucide-react';

const benefits = [
    {
        icon: BadgePercent,
        title: 'Exclusive Discounts',
        description: 'StudyNest students get special rates and welcome bonuses from all partners.',
    },
    {
        icon: Shield,
        title: 'Vetted & Verified',
        description: 'Every partner is carefully selected for reliability and student-friendliness.',
    },
    {
        icon: Headphones,
        title: 'Priority Support',
        description: 'Get dedicated support channels when you go through StudyNest.',
    },
    {
        icon: Handshake,
        title: 'Trusted Relationships',
        description: 'Our long-standing partnerships mean better service for you.',
    },
];

export default function PartnersPage() {
    return (
        <main className="bg-beige-100">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 right-10 w-80 h-80 bg-gold-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-400 
                           rounded-full text-sm font-semibold mb-4">
                            Partner Network
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Our <span className="text-gold-400">Partners</span>
                        </h1>
                        <p className="text-xl text-beige-200/80">
                            We&apos;ve built relationships with France&apos;s best service providers to bring
                            you exclusive deals, priority access, and seamless experiences.
                        </p>
                    </motion.div>

                    {/* Benefits grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
                    >
                        {benefits.map((benefit, index) => (
                            <div
                                key={benefit.title}
                                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10
                         text-center hover:bg-white/10 transition-colors"
                            >
                                <div className="w-12 h-12 mx-auto rounded-xl bg-gold-500/20 
                              flex items-center justify-center mb-4">
                                    <benefit.icon className="w-6 h-6 text-gold-400" />
                                </div>
                                <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                                <p className="text-sm text-beige-200/70">{benefit.description}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Partner Showcase */}
            <PartnerShowcase />

            {/* Become a Partner CTA */}
            <section className="section bg-beige-50">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-navy-700 to-navy-800 rounded-3xl p-12 text-center"
                    >
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-gold-500/20 
                          flex items-center justify-center mb-6">
                            <Handshake className="w-8 h-8 text-gold-400" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Become a Partner
                        </h2>
                        <p className="text-beige-200/80 mb-8 text-lg max-w-2xl mx-auto">
                            Are you a business looking to reach thousands of international students?
                            Partner with StudyNest and become part of our trusted network.
                        </p>
                        <a
                            href="mailto:partners@studynest.fr"
                            className="btn bg-gradient-to-r from-gold-400 to-gold-500 text-navy-900
                       text-lg px-8 py-4 hover:from-gold-300 hover:to-gold-400"
                        >
                            Contact Our Partnership Team
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Advertisement Placement Section */}
            <section className="section bg-white">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <span className="inline-block px-4 py-1.5 bg-navy-100 text-navy-700 
                           rounded-full text-sm font-semibold mb-4">
                            Advertising
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mb-4">
                            Advertise With <span className="text-gold-500">StudyNest</span>
                        </h2>
                        <p className="text-lg text-navy-600/70 max-w-2xl mx-auto">
                            Reach thousands of international students actively looking for services in Paris.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Banner Ads',
                                description: 'Premium banner placements across our website.',
                                price: 'From €299/month',
                                features: ['High visibility', 'Targeted audience', 'Analytics included'],
                            },
                            {
                                title: 'Featured Listing',
                                description: 'Become a featured partner with priority placement.',
                                price: 'From €499/month',
                                features: ['Top page position', 'Exclusive badge', 'Social promotion'],
                            },
                            {
                                title: 'Sponsored Content',
                                description: 'Native content that reaches students organically.',
                                price: 'From €799/campaign',
                                features: ['Blog features', 'Newsletter inclusion', 'Social media'],
                            },
                        ].map((option, index) => (
                            <motion.div
                                key={option.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-beige-50 rounded-3xl p-8 border border-beige-200
                         hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-xl font-bold text-navy-700 mb-2">{option.title}</h3>
                                <p className="text-navy-600/70 mb-4">{option.description}</p>
                                <p className="text-2xl font-bold text-gold-600 mb-6">{option.price}</p>
                                <ul className="space-y-2">
                                    {option.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm text-navy-600">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
            <FloatingMascot />
        </main>
    );
}
