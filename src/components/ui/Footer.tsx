'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
    const [currentYear, setCurrentYear] = useState<number | null>(null);

    // eslint-disable-next-line react-compiler/react-compiler, react-hooks/set-state-in-effect
    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const quickLinks = [
        { href: '/services#housing', label: 'Housing' },
        { href: '/services#banking', label: 'Banking' },
        { href: '/services#sim', label: 'SIM Cards' },
        { href: '/services#subsidy', label: 'Subsidies' },
        { href: '/services#jobs', label: 'Job Assistance' },
    ];

    const companyLinks = [
        { href: '/about', label: 'About Us' },
        { href: '/partners', label: 'Partners' },
        { href: '#', label: 'Careers' },
        { href: '#', label: 'Blog' },
        { href: '#', label: 'Contact' },
    ];

    return (
        <footer className="bg-navy-700 text-white">
            {/* Main Footer - Optimized for mobile */}
            <div className="container mx-auto px-4 pt-18 sm:pt-28 md:pt-36 pb-10 sm:pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 pt-18 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 text-center sm:text-left">
                    {/* Brand Column */}
                    <div className="space-y-5 sm:space-y-6">
                        <Link href="/" className="flex items-center gap-3 justify-center sm:justify-start">
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 overflow-hidden">
                                <Image
                                    src="/images/studynest-logo.png"
                                    alt="StudyNest"
                                    fill
                                    className="object-contain"
                                    sizes="48px"
                                />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold font-display">
                                Study<span className="text-gold-400">Nest</span>
                            </span>
                        </Link>
                        <p className="text-beige-300 leading-relaxed text-sm sm:text-base max-w-xs mx-auto sm:mx-0">
                            Your trusted companion for a seamless transition to Parisian student life.
                            We handle the paperwork, so you can focus on your dreams.
                        </p>
                        {/* Social Links - improved touch targets */}
                        <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start">
                            {[
                                { icon: Facebook, href: '#' },
                                { icon: Instagram, href: '#' },
                                { icon: Linkedin, href: '#' },
                                { icon: Twitter, href: '#' },
                            ].map(({ icon: Icon, href }, index) => (
                                <a
                                    key={index}
                                    href={href}
                                    className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold-500 active:bg-gold-600 transition-colors duration-200"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-gold-400">Our Services</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-beige-300 hover:text-gold-400 transition-colors text-sm sm:text-base py-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-gold-400">Company</h4>
                        <ul className="space-y-2 sm:space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-beige-300 hover:text-gold-400 transition-colors text-sm sm:text-base py-1 inline-block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info Only - Newsletter removed */}
                    <div>
                        <h4 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-gold-400">Get In Touch</h4>
                        <ul className="space-y-3 sm:space-y-4">
                            <li className="flex items-start gap-3 justify-center sm:justify-start">
                                <MapPin size={18} className="text-gold-400 mt-1 flex-shrink-0" />
                                <span className="text-beige-300 text-sm sm:text-base">
                                    123 Boulevard Saint-Germain<br />
                                    75006 Paris, France
                                </span>
                            </li>
                            <li className="flex items-center gap-3 justify-center sm:justify-start">
                                <Mail size={18} className="text-gold-400" />
                                <a href="mailto:hello@studynest.fr" className="text-beige-300 hover:text-gold-400 text-sm sm:text-base py-1">
                                    hello@studynest.fr
                                </a>
                            </li>
                            <li className="flex items-center gap-3 justify-center sm:justify-start">
                                <Phone size={18} className="text-gold-400" />
                                <a href="tel:+33123456789" className="text-beige-300 hover:text-gold-400 text-sm sm:text-base py-1">
                                    +33 1 23 45 67 89
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 py-4 sm:py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                        <p className="text-beige-400 text-xs sm:text-sm text-center md:text-left">
                            © {currentYear ?? '2026'} StudyNest. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-beige-400">
                            <a href="#" className="hover:text-gold-400 py-1">Privacy Policy</a>
                            <a href="#" className="hover:text-gold-400 py-1">Terms of Service</a>
                            <a href="#" className="hover:text-gold-400 py-1">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    );
}
