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

        // Create timeline for coordinated animations
        const timeline = anime.createTimeline({
            defaults: {
                easing: 'outExpo',
            }
        });

        // Animate the connection line growing
        if (lineRef.current) {
            timeline.add(lineRef.current, {
                scaleX: [0, 1],
                duration: 800,
            });
        }

        // Animate step cards appearing one by one
        if (stepsRef.current) {
            const cards = stepsRef.current.querySelectorAll('.step-card');
            cards.forEach((card, i) => {
                timeline.add(card, {
                    translateY: [60, 0],
                    opacity: [0, 1],
                    duration: 600,
                }, i === 0 ? '-=400' : `-=${600 - 150}`);
            });

            // Animate step numbers popping in
            const numbers = stepsRef.current.querySelectorAll('.step-number');
            numbers.forEach((num, i) => {
                timeline.add(num, {
                    scale: [0, 1],
                    duration: 400,
                }, i === 0 ? '-=800' : `-=${400 - 150}`);
            });

            // Animate arrow connectors
            const arrows = stepsRef.current.querySelectorAll('.step-arrow');
            arrows.forEach((arrow, i) => {
                timeline.add(arrow, {
                    scale: [0, 1],
                    opacity: [0, 1],
                    duration: 300,
                }, i === 0 ? '-=600' : `-=${300 - 150}`);
            });

            // Animate icons with elastic easing
            const icons = stepsRef.current.querySelectorAll('.step-icon');
            icons.forEach((icon, i) => {
                timeline.add(icon, {
                    scale: [0.5, 1],
                    duration: 800,
                    easing: 'outElastic(1, 0.5)',
                }, i === 0 ? '-=800' : `-=${800 - 100}`);
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
                    <h2 className="text-4xl md:text-5xl font-bold text-navy-700 mb-4">
                        How <span className="text-gold-500">StudyNest</span> Works
                    </h2>
                    <p className="text-lg text-navy-600/70 max-w-2xl mx-auto">
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div
                                key={step.step}
                                className="step-card relative"
                            >
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-beige-200
                                    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300
                                    relative z-10">
                                    {/* Step number */}
                                    <div
                                        className={`step-number absolute -top-4 -right-4 w-12 h-12 rounded-xl
                                            bg-gradient-to-br ${step.color} text-white
                                            flex items-center justify-center font-bold text-lg
                                            shadow-lg`}
                                    >
                                        {step.step}
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className={`step-icon w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color}
                                            flex items-center justify-center mb-5`}
                                    >
                                        <step.icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="text-xl font-bold text-navy-700 mb-3">{step.title}</h3>
                                    <p className="text-navy-600/70">{step.description}</p>
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
                    <a href="/services" className="btn btn-primary text-lg px-8 py-4">
                        Start Your Journey Today
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
