'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

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
            {/* Main Footer - Added more top padding for breathing space */}
            <div className="container mx-auto px-4 pt-32 pb-16">
                <div className="grid grid-cols-1 pt-16 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="relative w-12 h-12 overflow-hidden">
                                <Image
                                    src="/images/studynest-logo.png"
                                    alt="StudyNest"
                                    fill
                                    className="object-contain"
                                    sizes="48px"
                                />
                            </div>
                            <span className="text-2xl font-bold font-display">
                                Study<span className="text-gold-400">Nest</span>
                            </span>
                        </Link>
                        <p className="text-beige-300 leading-relaxed">
                            Your trusted companion for a seamless transition to Parisian student life.
                            We handle the paperwork, so you can focus on your dreams.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {[
                                { icon: Facebook, href: '#' },
                                { icon: Instagram, href: '#' },
                                { icon: Linkedin, href: '#' },
                                { icon: Twitter, href: '#' },
                            ].map(({ icon: Icon, href }, index) => (
                                <a
                                    key={index}
                                    href={href}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center
                           hover:bg-gold-500 transition-colors duration-200"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gold-400">Our Services</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-beige-300 hover:text-gold-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gold-400">Company</h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-beige-300 hover:text-gold-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info Only - Newsletter removed */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-gold-400">Get In Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-gold-400 mt-1 flex-shrink-0" />
                                <span className="text-beige-300">
                                    123 Boulevard Saint-Germain<br />
                                    75006 Paris, France
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-gold-400" />
                                <a href="mailto:hello@studynest.fr" className="text-beige-300 hover:text-gold-400">
                                    hello@studynest.fr
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-gold-400" />
                                <a href="tel:+33123456789" className="text-beige-300 hover:text-gold-400">
                                    +33 1 23 45 67 89
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-beige-400 text-sm">
                            © {currentYear} StudyNest. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm text-beige-400">
                            <a href="#" className="hover:text-gold-400">Privacy Policy</a>
                            <a href="#" className="hover:text-gold-400">Terms of Service</a>
                            <a href="#" className="hover:text-gold-400">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
