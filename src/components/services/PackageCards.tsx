'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Sparkles } from 'lucide-react';
import Link from 'next/link';

const packages = [
    {
        id: 'starter',
        name: 'Starter',
        tagline: 'Get the basics covered',
        price: '99',
        originalPrice: '149',
        icon: Zap,
        color: 'from-blue-500 to-blue-600',
        popular: false,
        features: [
            'French SIM card activation',
            'Basic bank account guidance',
            'Document checklist',
            'Email support',
            '1 consultation call',
        ],
        notIncluded: [
            'Housing assistance',
            'CAF application help',
            'Job assistance',
            'Priority support',
        ],
    },
    {
        id: 'essential',
        name: 'Essential',
        tagline: 'Everything you need to survive',
        price: '249',
        originalPrice: '349',
        icon: Star,
        color: 'from-gold-500 to-gold-600',
        popular: true,
        features: [
            'Everything in Starter',
            'Housing search assistance',
            'Bank account activation',
            'CAF subsidy application',
            'SIM card with student plan',
            '3 consultation calls',
            'WhatsApp support',
        ],
        notIncluded: [
            'Job assistance',
            'Airport pickup',
            'Personal consultant',
        ],
    },
    {
        id: 'comfort',
        name: 'Comfort',
        tagline: 'Stress-free transition',
        price: '449',
        originalPrice: '599',
        icon: Crown,
        color: 'from-purple-500 to-purple-600',
        popular: false,
        features: [
            'Everything in Essential',
            'Premium housing options',
            'Job search assistance',
            'CV & Cover letter help',
            'Unlimited consultations',
            'Priority WhatsApp support',
            'Transport card assistance',
            'University enrollment help',
        ],
        notIncluded: [
            'Airport pickup',
            'Dedicated consultant',
        ],
    },
    {
        id: 'vip',
        name: 'VIP',
        tagline: 'Complete white-glove service',
        price: '799',
        originalPrice: '999',
        icon: Sparkles,
        color: 'from-navy-600 to-navy-700',
        popular: false,
        features: [
            'Everything in Comfort',
            'Dedicated personal consultant',
            'Airport pickup & city tour',
            'Furnished apartment hunting',
            'All paperwork handled',
            'Job interview preparation',
            'French language resources',
            'Exclusive partner discounts',
            'Emergency 24/7 support',
        ],
        notIncluded: [],
    },
];

export default function PackageCards() {
    return (
        <section className="section bg-white" id="packages">
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
                        Choose Your Package
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-navy-700 mb-4">
                        Simple, Transparent <span className="text-gold-500">Pricing</span>
                    </h2>
                    <p className="text-lg text-navy-600/70 max-w-2xl mx-auto mb-8">
                        Pick the package that fits your needs. All prices are one-time fees with no hidden costs.
                    </p>

                    {/* Billing toggle - future feature */}
                    {/* <div className="inline-flex items-center gap-4 p-1 bg-beige-100 rounded-full">
            <button
              onClick={() => setBillingCycle('one-time')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingCycle === 'one-time'
                  ? 'bg-navy-700 text-white'
                  : 'text-navy-600'
              }`}
            >
              One-time
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-navy-700 text-white'
                  : 'text-navy-600'
              }`}
            >
              Monthly
            </button>
          </div> */}
                </motion.div>

                {/* Package cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative bg-white rounded-3xl border-2 overflow-hidden
                        transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
                        ${pkg.popular
                                    ? 'border-gold-400 shadow-xl scale-105 z-10'
                                    : 'border-beige-200'}`}
                        >
                            {/* Popular badge */}
                            {pkg.popular && (
                                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-gold-400 to-gold-500 
                              text-navy-900 text-center py-1.5 text-sm font-bold">
                                    ⭐ Most Popular
                                </div>
                            )}

                            <div className={`p-6 ${pkg.popular ? 'pt-12' : ''}`}>
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pkg.color}
                              flex items-center justify-center mb-4`}>
                                    <pkg.icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-navy-700 mb-1">{pkg.name}</h3>
                                <p className="text-navy-500 text-sm mb-4">{pkg.tagline}</p>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-navy-700">€{pkg.price}</span>
                                        <span className="text-lg text-navy-400 line-through">€{pkg.originalPrice}</span>
                                    </div>
                                    <p className="text-sm text-navy-500">One-time payment</p>
                                </div>

                                {/* CTA */}
                                <Link
                                    href={`#contact?package=${pkg.id}`}
                                    className={`block w-full py-3 rounded-xl font-semibold text-center
                           transition-all duration-200 mb-6
                           ${pkg.popular
                                            ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-navy-900 hover:from-gold-300 hover:to-gold-400'
                                            : 'bg-navy-100 text-navy-700 hover:bg-navy-200'}`}
                                >
                                    Get Started
                                </Link>

                                {/* Features */}
                                <div className="space-y-3">
                                    {pkg.features.map((feature) => (
                                        <div key={feature} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-green-600" />
                                            </div>
                                            <span className="text-sm text-navy-600">{feature}</span>
                                        </div>
                                    ))}
                                    {pkg.notIncluded.map((feature) => (
                                        <div key={feature} className="flex items-start gap-3 opacity-60">
                                            <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-xs text-gray-500">—</span>
                                            </div>
                                            <span className="text-sm text-navy-500">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-navy-500 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        30-day money-back guarantee
                        <span className="mx-2">•</span>
                        Secure payments
                        <span className="mx-2">•</span>
                        No hidden fees
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
