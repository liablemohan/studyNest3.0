'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Globe2, Trophy, TrendingUp, Heart } from 'lucide-react';

// Stats with numeric values for animation
const stats = [
    {
        icon: Users,
        number: 5000,
        suffix: '+',
        label: 'Students Helped',
        description: 'Successfully settled in Paris',
    },
    {
        icon: Building2,
        number: 50,
        suffix: '+',
        label: 'Partner Organizations',
        description: 'Banks, housing agencies & more',
    },
    {
        icon: Globe2,
        number: 80,
        suffix: '+',
        label: 'Countries',
        description: 'Students from around the world',
    },
    {
        icon: Trophy,
        number: 98,
        suffix: '%',
        label: 'Success Rate',
        description: 'In visa & subsidy applications',
    },
];

const achievements = [
    {
        icon: TrendingUp,
        title: 'Fastest Bank Account Setup',
        description: 'Get your French bank account activated within 24-48 hours with our partner banks.',
    },
    {
        icon: Heart,
        title: 'Student-First Approach',
        description: 'Every service designed specifically for the unique needs of international students.',
    },
];

// Animated counter component using anime.js v4
function AnimatedCounter({
    target,
    suffix = '',
    shouldAnimate
}: {
    target: number;
    suffix: string;
    shouldAnimate: boolean;
}) {
    const [displayValue, setDisplayValue] = useState(`0${suffix}`);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        if (shouldAnimate && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;

            // Use anime.js v4 API
            import('animejs').then((anime) => {
                const obj = { value: 0 };

                anime.animate(obj, {
                    value: target,
                    duration: 2000,
                    easing: 'outExpo',
                    onUpdate: () => {
                        setDisplayValue(Math.round(obj.value).toLocaleString() + suffix);
                    },
                });
            });
        }
    }, [shouldAnimate, target, suffix]);

    return <span>{displayValue}</span>;
}

export default function Achievements() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const statsGridRef = useRef<HTMLDivElement>(null);
    const achievementsRef = useRef<HTMLDivElement>(null);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const hasSetupRef = useRef(false);

    // Setup: Hide elements after mount (to avoid hydration mismatch)
    useEffect(() => {
        if (!hasSetupRef.current) {
            hasSetupRef.current = true;

            // Hide stat cards
            if (statsGridRef.current) {
                statsGridRef.current.querySelectorAll('.stat-card').forEach((el) => {
                    (el as HTMLElement).style.opacity = '0';
                    (el as HTMLElement).style.transform = 'translateY(40px) scale(0.9)';
                });
            }

            // Hide achievement cards
            if (achievementsRef.current) {
                achievementsRef.current.querySelectorAll('.achievement-card').forEach((el, i) => {
                    (el as HTMLElement).style.opacity = '0';
                    (el as HTMLElement).style.transform = `translateX(${i === 0 ? -50 : 50}px)`;
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

        // Animate stat cards with stagger
        if (statsGridRef.current) {
            const cards = statsGridRef.current.querySelectorAll('.stat-card');
            cards.forEach((el, i) => {
                anime.animate(el, {
                    translateY: [40, 0],
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    duration: 800,
                    delay: 200 + (i * 100),
                    easing: 'outElastic(1, 0.8)',
                });
            });
        }

        // Animate achievement cards
        if (achievementsRef.current) {
            const cards = achievementsRef.current.querySelectorAll('.achievement-card');
            cards.forEach((el, i) => {
                anime.animate(el, {
                    translateX: [i === 0 ? -50 : 50, 0],
                    opacity: [0, 1],
                    duration: 1000,
                    delay: 600 + (i * 200),
                    easing: 'outCubic',
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
        <section ref={sectionRef} className="section bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-100 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 bg-gold-100 text-gold-700 
                         rounded-full text-sm font-semibold mb-4">
                        Our Impact
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-navy-700 mb-4">
                        Trusted by Students
                        <span className="text-gold-500"> Worldwide</span>
                    </h2>
                    <p className="text-lg text-navy-600/70 max-w-2xl mx-auto">
                        We&apos;ve helped thousands of international students make Paris their home.
                        Here&apos;s what we&apos;ve achieved together.
                    </p>
                </motion.div>

                {/* Stats grid with anime.js staggered reveal */}
                <div
                    ref={statsGridRef}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="stat-card bg-gradient-to-br from-beige-50 to-white p-6 rounded-2xl
                                border border-beige-200 text-center
                                hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-xl 
                                bg-gradient-to-br from-navy-600 to-navy-700
                                flex items-center justify-center">
                                <stat.icon className="w-7 h-7 text-white" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-navy-700 mb-1">
                                <AnimatedCounter
                                    target={stat.number}
                                    suffix={stat.suffix}
                                    shouldAnimate={shouldAnimate}
                                />
                            </div>
                            <div className="font-semibold text-navy-600 mb-1">{stat.label}</div>
                            <div className="text-sm text-navy-500/70">{stat.description}</div>
                        </div>
                    ))}
                </div>

                {/* Achievement cards with anime.js slide-in */}
                <div
                    ref={achievementsRef}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {achievements.map((achievement) => (
                        <div
                            key={achievement.title}
                            className="achievement-card flex gap-5 p-6 bg-gradient-to-r from-navy-700 to-navy-800
                                rounded-2xl text-white group hover:shadow-2xl transition-shadow"
                        >
                            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gold-500/20
                                flex items-center justify-center
                                group-hover:bg-gold-500/30 transition-colors">
                                <achievement.icon className="w-7 h-7 text-gold-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-white">{achievement.title}</h3>
                                <p className="text-beige-200/80">{achievement.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Testimonial preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-beige-100 rounded-full hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex -space-x-3">
                            {['🇮🇳', '🇧🇷', '🇯🇵', '🇩🇪', '🇳🇬'].map((flag, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full bg-white border-2 border-white
                                        flex items-center justify-center text-sm"
                                >
                                    {flag}
                                </div>
                            ))}
                        </div>
                        <span className="text-sm text-navy-600 font-medium ml-2">
                            Join 5,000+ students from 80+ countries
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
