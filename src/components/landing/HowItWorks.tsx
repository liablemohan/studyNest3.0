'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Users, Rocket, PartyPopper } from 'lucide-react';

const steps = [
    {
        icon: ClipboardCheck,
        step: '01',
        title: 'Book a Consultation',
        description: 'Tell us about your needs and we&apos;ll create a personalized plan for your journey.',
        color: 'from-blue-500 to-blue-600',
    },
    {
        icon: Users,
        step: '02',
        title: 'Meet Your Team',
        description: 'Get paired with dedicated advisors who know the ins and outs of Parisian life.',
        color: 'from-purple-500 to-purple-600',
    },
    {
        icon: Rocket,
        step: '03',
        title: 'We Handle Everything',
        description: 'From paperwork to reservations, we take care of the tedious stuff.',
        color: 'from-gold-500 to-gold-600',
    },
    {
        icon: PartyPopper,
        step: '04',
        title: 'Welcome to Paris!',
        description: 'Arrive stress-free with everything set up and ready for your new adventure.',
        color: 'from-green-500 to-green-600',
    },
];

export default function HowItWorks() {
    return (
        <section className="section bg-beige-100">
            <div className="container mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-navy-100 text-navy-700 
                         rounded-full text-sm font-semibold mb-4">
                        Simple Process
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-navy-700 mb-4">
                        How <span className="text-gold-500">StudyNest</span> Works
                    </h2>
                    <p className="text-lg text-navy-600/70 max-w-2xl mx-auto">
                        Four simple steps to transform your transition from stressful to seamless.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-navy-200 via-gold-300 to-navy-200 -translate-y-1/2" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-beige-200
                              hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
                              relative z-10">
                                    {/* Step number */}
                                    <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-xl
                                bg-gradient-to-br ${step.color} text-white
                                flex items-center justify-center font-bold text-lg
                                shadow-lg`}>
                                        {step.step}
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color}
                                flex items-center justify-center mb-5`}>
                                        <step.icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-xl font-bold text-navy-700 mb-3">{step.title}</h3>
                                    <p className="text-navy-600/70">{step.description}</p>
                                </div>

                                {/* Arrow for desktop */}
                                {index < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                                        <div className="w-8 h-8 bg-white rounded-full border border-beige-200 shadow
                                  flex items-center justify-center text-gold-500">
                                            →
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <a href="/services" className="btn btn-primary text-lg px-8 py-4">
                        Start Your Journey Today
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
