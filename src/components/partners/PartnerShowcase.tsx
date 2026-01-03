'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, MapPin, Phone, Mail, Globe, ChevronRight, Star } from 'lucide-react';

interface Partner {
    id: string;
    name: string;
    category: string;
    description: string;
    longDescription: string;
    logo: string;
    color: string;
    featured: boolean;
    services: string[];
    discount?: string;
    website: string;
    contact?: {
        phone?: string;
        email?: string;
        address?: string;
    };
}

const partners: Partner[] = [
    {
        id: 'bnp-paribas',
        name: 'BNP Paribas',
        category: 'Banking',
        description: 'Leading French bank with student-friendly accounts and digital banking.',
        longDescription: 'BNP Paribas is one of France\'s largest banks, offering specialized student accounts with no monthly fees, instant IBAN for CAF applications, and a robust mobile app. StudyNest students get priority processing.',
        logo: '🏦',
        color: 'from-green-500 to-green-600',
        featured: true,
        services: ['Student accounts', 'Free bank cards', 'Mobile banking', 'International transfers'],
        discount: '€50 welcome bonus',
        website: 'https://mabanque.bnpparibas',
        contact: {
            phone: '+33 1 40 14 00 00',
            email: 'students@bnpparibas.com',
        },
    },
    {
        id: 'studapart',
        name: 'Studapart',
        category: 'Housing',
        description: 'Student housing marketplace with verified listings across France.',
        longDescription: 'Studapart connects students with verified landlords and housing options. From studios to coliving spaces, they offer flexible leases perfect for international students.',
        logo: '🏠',
        color: 'from-blue-500 to-blue-600',
        featured: true,
        services: ['Verified listings', 'Flexible leases', 'Furniture packages', 'Rental insurance'],
        discount: '10% off first month',
        website: 'https://studapart.com',
        contact: {
            email: 'support@studapart.com',
        },
    },
    {
        id: 'free-mobile',
        name: 'Free Mobile',
        category: 'Telecom',
        description: 'Affordable mobile plans with unlimited data and EU roaming.',
        longDescription: 'Free Mobile offers some of the best value mobile plans in France. Their 5G plans include unlimited data, calls, and texts, plus free EU roaming - perfect for students who travel.',
        logo: '📱',
        color: 'from-pink-500 to-pink-600',
        featured: true,
        services: ['Unlimited 5G data', 'EU roaming', 'eSIM support', 'No contracts'],
        discount: '€2/month for 6 months',
        website: 'https://mobile.free.fr',
        contact: {
            phone: '+33 1 78 56 95 60',
        },
    },
    {
        id: 'immojeune',
        name: 'ImmoJeune',
        category: 'Housing',
        description: 'Youth housing specialist with budget-friendly options.',
        longDescription: 'ImmoJeune specializes in affordable housing for students and young professionals. They offer a wide range of options from student residences to private rentals.',
        logo: '🏡',
        color: 'from-purple-500 to-purple-600',
        featured: false,
        services: ['Student residences', 'Shared apartments', 'All-inclusive rent', 'Virtual tours'],
        website: 'https://immojeune.com',
    },
    {
        id: 'boursorama',
        name: 'Boursorama',
        category: 'Banking',
        description: 'Digital bank with zero fees and excellent international features.',
        longDescription: 'Boursorama is France\'s leading online bank, offering completely free accounts with no conditions. Perfect for tech-savvy students who prefer digital banking.',
        logo: '💳',
        color: 'from-orange-500 to-orange-600',
        featured: false,
        services: ['100% online', 'Free Visa card', 'No fees abroad', 'Real-time notifications'],
        discount: '€130 welcome bonus',
        website: 'https://boursorama.com',
    },
    {
        id: 'sosh',
        name: 'Sosh',
        category: 'Telecom',
        description: 'Orange\'s digital brand with reliable network and flexible plans.',
        longDescription: 'Sosh operates on Orange\'s premium network, offering reliable coverage and great data packages at competitive prices. No commitment required.',
        logo: '📲',
        color: 'from-coral-500 to-coral-600',
        featured: false,
        services: ['Orange network', 'Flexible data', 'No commitment', 'International options'],
        website: 'https://sosh.fr',
    },
];

const categories = ['All', 'Banking', 'Housing', 'Telecom'];

export default function PartnerShowcase() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

    const filteredPartners = selectedCategory === 'All'
        ? partners
        : partners.filter(p => p.category === selectedCategory);

    return (
        <section className="section bg-white">
            <div className="container mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 
                         rounded-full text-sm font-semibold mb-4">
                        Trusted Partners
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-700 mb-4">
                        Our <span className="text-gold-500">Partner Network</span>
                    </h2>
                    <p className="text-lg text-navy-600/70 max-w-2xl mx-auto">
                        We&apos;ve partnered with the best service providers in France to offer you
                        exclusive deals and premium support.
                    </p>
                </motion.div>

                {/* Category filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-5 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                                ? 'bg-navy-700 text-white'
                                : 'bg-beige-100 text-navy-600 hover:bg-beige-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Featured partners */}
                <div className="mb-12">
                    <h3 className="text-lg font-semibold text-navy-700 mb-6 flex items-center gap-2">
                        <Star className="w-5 h-5 text-gold-500" />
                        Featured Partners
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {filteredPartners.filter(p => p.featured).map((partner, index) => (
                            <motion.div
                                key={partner.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedPartner(partner)}
                                className="relative bg-white rounded-3xl border-2 border-gold-200 p-6
                         cursor-pointer hover:shadow-2xl hover:-translate-y-2 
                         transition-all duration-300 overflow-hidden"
                            >
                                {/* Background gradient */}
                                <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-r ${partner.color} opacity-10`} />

                                {/* Discount badge */}
                                {partner.discount && (
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-gold-500 text-navy-900
                                text-xs font-bold rounded-full">
                                        {partner.discount}
                                    </div>
                                )}

                                <div className="relative">
                                    {/* Logo */}
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${partner.color}
                                flex items-center justify-center text-3xl mb-4`}>
                                        {partner.logo}
                                    </div>

                                    <span className="inline-block px-2 py-0.5 bg-beige-100 text-navy-500
                                 text-xs font-medium rounded mb-2">
                                        {partner.category}
                                    </span>
                                    <h4 className="text-xl font-bold text-navy-700 mb-2">{partner.name}</h4>
                                    <p className="text-navy-600/70 text-sm mb-4">{partner.description}</p>

                                    <div className="flex items-center gap-2 text-navy-700 font-semibold text-sm">
                                        Learn more <ChevronRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* All partners grid */}
                <div>
                    <h3 className="text-lg font-semibold text-navy-700 mb-6">All Partners</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPartners.map((partner, index) => (
                            <motion.div
                                key={partner.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedPartner(partner)}
                                className="bg-beige-50 rounded-2xl p-5 cursor-pointer
                         hover:bg-white hover:shadow-lg transition-all duration-300
                         flex items-start gap-4"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.color}
                              flex items-center justify-center text-2xl flex-shrink-0`}>
                                    {partner.logo}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-bold text-navy-700 truncate">{partner.name}</h4>
                                        {partner.featured && (
                                            <Star className="w-4 h-4 text-gold-500 flex-shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-sm text-navy-500">{partner.category}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-navy-400" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Partner detail modal */}
                <AnimatePresence>
                    {selectedPartner && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPartner(null)}
                            className="fixed inset-0 bg-navy-900/50 backdrop-blur-sm z-50
                       flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            >
                                {/* Header */}
                                <div className={`bg-gradient-to-r ${selectedPartner.color} p-8 text-white`}>
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-4xl">
                                            {selectedPartner.logo}
                                        </div>
                                        <div>
                                            <span className="inline-block px-2 py-0.5 bg-white/20 rounded text-sm mb-2">
                                                {selectedPartner.category}
                                            </span>
                                            <h3 className="text-2xl font-bold">{selectedPartner.name}</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8">
                                    {/* Discount banner */}
                                    {selectedPartner.discount && (
                                        <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 mb-6
                                  flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center">
                                                <Star className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-navy-700">StudyNest Exclusive</p>
                                                <p className="text-gold-700">{selectedPartner.discount}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Description */}
                                    <p className="text-navy-600 leading-relaxed mb-6">
                                        {selectedPartner.longDescription}
                                    </p>

                                    {/* Services */}
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-navy-700 mb-3">Services Offered</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedPartner.services.map((service) => (
                                                <span
                                                    key={service}
                                                    className="px-3 py-1 bg-beige-100 text-navy-600 rounded-full text-sm"
                                                >
                                                    {service}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Contact */}
                                    {selectedPartner.contact && (
                                        <div className="mb-6">
                                            <h4 className="font-semibold text-navy-700 mb-3">Contact</h4>
                                            <div className="space-y-2">
                                                {selectedPartner.contact.phone && (
                                                    <div className="flex items-center gap-2 text-navy-600">
                                                        <Phone className="w-4 h-4" />
                                                        {selectedPartner.contact.phone}
                                                    </div>
                                                )}
                                                {selectedPartner.contact.email && (
                                                    <div className="flex items-center gap-2 text-navy-600">
                                                        <Mail className="w-4 h-4" />
                                                        {selectedPartner.contact.email}
                                                    </div>
                                                )}
                                                {selectedPartner.contact.address && (
                                                    <div className="flex items-center gap-2 text-navy-600">
                                                        <MapPin className="w-4 h-4" />
                                                        {selectedPartner.contact.address}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* CTA buttons */}
                                    <div className="flex gap-4">
                                        <a
                                            href={selectedPartner.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 btn btn-primary"
                                        >
                                            Visit Website
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                        <button
                                            onClick={() => setSelectedPartner(null)}
                                            className="btn btn-outline"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
