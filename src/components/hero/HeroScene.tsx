'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Geometric shapes for floating animation
const GEOMETRIC_SHAPES = [
    { type: 'circle', size: 60, x: 10, y: 15, color: 'rgba(251, 191, 36, 0.1)' },
    { type: 'square', size: 80, x: 85, y: 20, color: 'rgba(147, 197, 253, 0.08)' },
    { type: 'triangle', size: 70, x: 20, y: 75, color: 'rgba(251, 191, 36, 0.12)' },
    { type: 'circle', size: 50, x: 75, y: 80, color: 'rgba(96, 165, 250, 0.1)' },
    { type: 'square', size: 40, x: 50, y: 10, color: 'rgba(251, 191, 36, 0.08)' },
];

// Mobile detection hook
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}

export default function HeroScene() {
    const [isMounted, setIsMounted] = useState(false);
    const isMobile = useIsMobile();
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // This is necessary to prevent hydration mismatches when rendering client-only elements
    // eslint-disable-next-line react-compiler/react-compiler, react-hooks/set-state-in-effect
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />

            {/* Radial gradient overlay for depth */}
            <div className="absolute inset-0 bg-radial-gradient opacity-60"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.08) 0%, transparent 70%)' }} />

            {/* Floating geometric shapes - client-side only, reduced on mobile */}
            {isMounted && !prefersReducedMotion && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {GEOMETRIC_SHAPES.slice(0, isMobile ? 2 : 5).map((shape, i) => (
                        <div
                            key={i}
                            className="geo-shape absolute animate-fade-in-up"
                            style={{
                                left: `${shape.x}%`,
                                top: `${shape.y}%`,
                                width: shape.size,
                                height: shape.size,
                                animationDelay: `${1 + i * 0.15}s`,
                                willChange: 'transform, opacity',
                            }}
                        >
                            {shape.type === 'circle' && (
                                <div
                                    className="w-full h-full rounded-full border-2 border-gold-400/20 animate-float"
                                    style={{
                                        background: shape.color,
                                        boxShadow: '0 0 40px rgba(251, 191, 36, 0.15)',
                                        animationDelay: `${i * 0.3}s`,
                                        willChange: 'transform',
                                    }}
                                />
                            )}
                            {shape.type === 'square' && (
                                <div
                                    className="w-full h-full border-2 border-blue-400/20 animate-float-slow"
                                    style={{
                                        background: shape.color,
                                        transform: 'rotate(45deg)',
                                        boxShadow: '0 0 40px rgba(147, 197, 253, 0.15)',
                                        animationDelay: `${i * 0.3}s`,
                                        willChange: 'transform',
                                    }}
                                />
                            )}
                            {shape.type === 'triangle' && (
                                <div
                                    className="w-0 h-0 animate-float"
                                    style={{
                                        borderLeft: `${shape.size / 2}px solid transparent`,
                                        borderRight: `${shape.size / 2}px solid transparent`,
                                        borderBottom: `${shape.size}px solid ${shape.color}`,
                                        filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.2))',
                                        animationDelay: `${i * 0.3}s`,
                                        willChange: 'transform',
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* CSS sparkle particles - reduced count for mobile performance */}
            {isMounted && !prefersReducedMotion && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(isMobile ? 8 : 15)].map((_, i) => (
                        <div
                            key={i}
                            className="sparkle"
                            style={{
                                left: `${(i * 6.67) % 100}%`,
                                top: `${(i * 7.13) % 100}%`,
                                animationDelay: `${i * 0.2}s`,
                                willChange: 'transform, opacity',
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Main content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="text-center px-5 sm:px-6 max-w-5xl">
                    {/* Badge */}
                    <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-xs sm:text-sm font-medium mb-4 sm:mb-6 animate-bounce-in">
                        ✨ Your trusted partner for student life in Paris
                    </span>

                    {/* Main heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 font-display leading-tight" style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
                        <span className="text-white block animate-slide-up">Begin Your</span>
                        <span className="text-gold-400 block animate-slide-up-delayed animate-shimmer">Parisian Journey</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2 animate-fade-in" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)', animationDelay: '1.5s', opacity: 0, animationFillMode: 'forwards' }}>
                        From housing to banking, from SIM cards to subsidies —
                        we make settling in Paris effortless for international students.
                    </p>

                    {/* CTAs with pulse effect */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0 cta-buttons">
                        <Link
                            href="/services"
                            className="btn btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] shadow-2xl hover:shadow-gold-500/25 transition-shadow animate-pulse-slow"
                        >
                            Explore Services
                        </Link>
                        <Link
                            href="/about"
                            className="btn btn-outline-light text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm"
                        >
                            Learn About Us
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-8 text-white/70 text-xs sm:text-sm trust-indicators">
                        <div className="flex items-center gap-2">
                            <span className="text-gold-400">✓</span>
                            <span>5000+ Students Helped</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gold-400">✓</span>
                            <span>Same-Day Support</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gold-400">✓</span>
                            <span>Trusted Partners</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator with bounce */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2 animate-bounce-slow">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                </div>
            </div>

            <style jsx>{`
                @keyframes pulse-slow {
                    0%, 100% { box-shadow: 0 25px 50px -12px rgba(251, 191, 36, 0.25); }
                    50% { box-shadow: 0 25px 50px -12px rgba(251, 191, 36, 0.4); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
