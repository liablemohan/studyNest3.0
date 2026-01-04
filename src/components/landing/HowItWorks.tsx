'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Users, Rocket, PartyPopper } from 'lucide-react';

const steps = [
    {
        icon: ClipboardCheck,
        step: '01',
        title: 'Book a Consultation',
        description: 'Tell us about your needs and we\'ll create a personalized plan for your journey.',
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
    const sectionRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const hasSetupRef = useRef(false);

    // Setup: Hide elements after mount (to avoid hydration mismatch)
    useEffect(() => {
        if (!hasSetupRef.current) {
            hasSetupRef.current = true;

            // Hide connection line
            if (lineRef.current) {
                lineRef.current.style.transform = 'scaleX(0)';
            }

            // Hide step cards
            if (stepsRef.current) {
                stepsRef.current.querySelectorAll('.step-card').forEach((el) => {
                    (el as HTMLElement).style.opacity = '0';
                    (el as HTMLElement).style.transform = 'translateY(60px)';
                });

                stepsRef.current.querySelectorAll('.step-number').forEach((el) => {
                    (el as HTMLElement).style.transform = 'scale(0)';
                });

                stepsRef.current.querySelectorAll('.step-icon').forEach((el) => {
                    (el as HTMLElement).style.transform = 'scale(0.5)';
                });

                stepsRef.current.querySelectorAll('.step-arrow').forEach((el) => {
                    (el as HTMLElement).style.opacity = '0';
                    (el as HTMLElement).style.transform = 'scale(0)';
                });
            }
        }
    }, []);

    // Intersection observer for scroll-triggered animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && hasSetupRef.current) {
                        setShouldAnimate(true);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Run animations when shouldAnimate becomes true
    const runAnimations = useCallback(async () => {
        const anime = await import('animejs');

        // Animate the connection line growing
        if (lineRef.current) {
            anime.animate(lineRef.current, {
                scaleX: [0, 1],
                duration: 800,
                easing: 'outExpo',
            });
        }

        // Animate step cards appearing one by one
        if (stepsRef.current) {
            const cards = stepsRef.current.querySelectorAll('.step-card');
            cards.forEach((card, i) => {
                anime.animate(card, {
                    translateY: [60, 0],
                    opacity: [0, 1],
                    duration: 600,
                    delay: 200 + i * 150,
                    easing: 'outExpo',
                });
            });

            // Animate step numbers popping in
            const numbers = stepsRef.current.querySelectorAll('.step-number');
            numbers.forEach((num, i) => {
                anime.animate(num, {
                    scale: [0, 1],
                    duration: 400,
                    delay: 400 + i * 150,
                    easing: 'outBack',
                });
            });

            // Animate arrow connectors
            const arrows = stepsRef.current.querySelectorAll('.step-arrow');
            arrows.forEach((arrow, i) => {
                anime.animate(arrow, {
                    scale: [0, 1],
                    opacity: [0, 1],
                    duration: 300,
                    delay: 600 + i * 150,
                    easing: 'outExpo',
                });
            });

            // Animate icons with elastic easing
            const icons = stepsRef.current.querySelectorAll('.step-icon');
            icons.forEach((icon, i) => {
                anime.animate(icon, {
                    scale: [0.5, 1],
                    duration: 800,
                    delay: 300 + i * 100,
                    easing: 'outElastic(1, 0.5)',
                });
            });
        }
    }, []);

    useEffect(() => {
        if (shouldAnimate) {
            runAnimations();
        }
    }, [shouldAnimate, runAnimations]);

    return (
        <section ref={sectionRef} className="section bg-beige-100">
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
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-700 mb-4">
                        How <span className="text-gold-500">StudyNest</span> Works
                    </h2>
                    <p className="text-base sm:text-lg text-navy-600/70 max-w-2xl mx-auto px-4 sm:px-0">
                        Four simple steps to transform your transition from stressful to seamless.
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative" ref={stepsRef}>
                    {/* Connection line - animated with anime.js */}
                    <div
                        ref={lineRef}
                        className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-gold-400 to-green-500 -translate-y-1/2 origin-left"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={step.step}
                                className="step-card relative"
                            >
                                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-beige-200
                                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
                                    relative z-10">
                                    {/* Step number */}
                                    <div
                                        className={`step-number absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl
                                            bg-gradient-to-br ${step.color} text-white
                                            flex items-center justify-center font-bold text-base sm:text-lg
                                            shadow-lg`}
                                    >
                                        {step.step}
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className={`step-icon w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${step.color}
                                            flex items-center justify-center mb-4 sm:mb-5`}
                                    >
                                        <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold text-navy-700 mb-2 sm:mb-3">{step.title}</h3>
                                    <p className="text-sm sm:text-base text-navy-600/70">{step.description}</p>
                                </div>

                                {/* Arrow for desktop */}
                                {index < steps.length - 1 && (
                                    <div className="step-arrow hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                                        <div className="w-8 h-8 bg-white rounded-full border border-beige-200 shadow
                                            flex items-center justify-center text-gold-500 font-bold">
                                            →
                                        </div>
                                    </div>
                                )}
                            </div>
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
                    <a href="/services" className="btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px]">
                        Start Your Journey Today
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
