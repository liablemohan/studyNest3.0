'use client';

import React from 'react';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import FloatingMascot from '@/components/FloatingMascot';
import PackageCards from '@/components/services/PackageCards';
import ServiceSection from '@/components/services/ServiceSection';
import { motion } from 'framer-motion';
import { Home, Building2, Smartphone, PiggyBank, Briefcase } from 'lucide-react';

const services = [
    {
        id: 'housing',
        title: 'Housing & Accommodation',
        subtitle: 'Find Your Home',
        icon: Home,
        color: 'from-green-500 to-green-600',
        description: 'Finding a place to live in Paris can be overwhelming. We partner with trusted agencies and verified landlords to help you find safe, affordable, and convenient housing near your university.',
        features: [
            'Verified landlord network',
            'Student-friendly neighborhoods',
            'Help with lease signing',
            'Move-in support',
            'Roommate matching service',
            'Furnished options available',
            'Security deposit guidance',
            'Utility setup assistance',
        ],
    },
    {
        id: 'banking',
        title: 'Banking & Bank Account',
        subtitle: 'Digital Banking Made Easy',
        icon: Building2,
        color: 'from-blue-500 to-blue-600',
        description: 'Opening a French bank account is essential for rent, CAF subsidies, and daily life. We guide you through the process with our partner banks for quick, hassle-free activation.',
        features: [
            'Same-day account activation',
            'No minimum balance required',
            'Free student bank cards',
            'Mobile banking setup',
            'International transfers',
            'IBAN for CAF & salary',
            'Partner bank discounts',
            'English-speaking support',
        ],
    },
    {
        id: 'sim',
        title: 'SIM Card & Mobile Plans',
        subtitle: 'Stay Connected',
        icon: Smartphone,
        color: 'from-pink-500 to-pink-600',
        description: 'Stay connected with affordable French mobile plans. We help you choose the best carrier and plan for your needs, with preferential rates for students.',
        features: [
            'French phone number',
            'Unlimited calls & texts',
            'High-speed 5G data',
            'EU roaming included',
            'No long-term contracts',
            'Easy top-up options',
            'Student discount rates',
            'eSIM support available',
        ],
    },
    {
        id: 'subsidy',
        title: 'Subsidy & CAF Claims',
        subtitle: 'Get Up to €200/Month',
        icon: PiggyBank,
        color: 'from-gold-500 to-gold-600',
        description: 'CAF (Caisse d\'Allocations Familiales) provides housing subsidies for students. The application process is complex, but we handle it for you to maximize your benefits.',
        features: [
            'Full CAF application support',
            'Document preparation',
            'Eligibility assessment',
            'Follow-up with CAF office',
            'Appeals if needed',
            'Up to €200/month savings',
            'APL vs ALS guidance',
            'Timeline management',
        ],
    },
    {
        id: 'jobs',
        title: 'Job Assistance',
        subtitle: 'Launch Your Career',
        icon: Briefcase,
        color: 'from-purple-500 to-purple-600',
        description: 'Looking for part-time work or internships? We help you navigate the French job market with CV preparation, interview coaching, and connections to student-friendly employers.',
        features: [
            'French CV formatting',
            'Cover letter templates',
            'Interview preparation',
            'Work permit guidance',
            'Partner company network',
            'Part-time job listings',
            'Internship connections',
            'LinkedIn optimization',
        ],
    },
];

export default function ServicesPage() {
    return (
        <main className="bg-beige-100">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-16 bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-gold-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-gold-500/20 text-gold-400 
                           rounded-full text-sm font-semibold mb-4">
                            Our Services
                        </span>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Everything You Need for
                            <span className="block text-gold-400">Your Parisian Journey</span>
                        </h1>
                        <p className="text-xl text-beige-200/80 max-w-3xl mx-auto">
                            From finding your first apartment to landing your dream internship,
                            we&apos;ve got you covered every step of the way.
                        </p>
                    </motion.div>

                    {/* Quick links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4 mt-12"
                    >
                        {services.map((service) => (
                            <a
                                key={service.id}
                                href={`#${service.id}`}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full
                         text-beige-100 hover:bg-white/20 transition-colors"
                            >
                                <service.icon className="w-4 h-4" />
                                <span className="text-sm font-medium">{service.title.split(' ')[0]}</span>
                            </a>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Package Cards */}
            <PackageCards />

            {/* Service Sections */}
            {services.map((service, index) => (
                <ServiceSection
                    key={service.id}
                    {...service}
                    reverse={index % 2 === 1}
                />
            ))}

            {/* CTA */}
            <section className="section bg-beige-100">
                <div className="container mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-navy-700 to-navy-800 rounded-3xl p-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-beige-200/80 mb-8 text-lg">
                            Book a free consultation and let&apos;s plan your Parisian adventure together.
                        </p>
                        <a
                            href="#packages"
                            className="btn btn-secondary text-lg px-8 py-4"
                        >
                            Choose Your Package
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
            <FloatingMascot />
        </main>
    );
}
