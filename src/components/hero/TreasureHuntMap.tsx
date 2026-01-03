'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Service spots on the Paris "treasure map"
const serviceSpots = [
    {
        id: 'banking',
        name: 'Banking',
        icon: '🏦',
        description: 'Open your French bank account with same-day activation support. We partner with student-friendly banks.',
        position: { x: 20, y: 35 },
        link: '/services#banking',
        color: '#3b82f6',
    },
    {
        id: 'housing',
        name: 'Accommodation',
        icon: '🏠',
        description: 'Find your perfect Parisian home with our trusted housing partners. Studio, shared, or residence.',
        position: { x: 75, y: 25 },
        link: '/services#housing',
        color: '#22c55e',
    },
    {
        id: 'travel',
        name: 'Travel',
        icon: '✈️',
        description: 'Navigate Paris like a local! Get your Navigo pass and discover the best student travel deals.',
        position: { x: 50, y: 55 },
        link: '/services#travel',
        color: '#8b5cf6',
    },
    {
        id: 'sim',
        name: 'SIM Card',
        icon: '📱',
        description: 'Stay connected with student-friendly mobile plans. Unlimited data, calls, and texts at student prices.',
        position: { x: 30, y: 70 },
        link: '/services#sim',
        color: '#ec4899',
    },
    {
        id: 'subsidy',
        name: 'Subsidies',
        icon: '💰',
        description: 'Claim up to €200/month in CAF housing subsidies. We handle the paperwork for you!',
        position: { x: 80, y: 65 },
        link: '/services#subsidy',
        color: '#f59e0b',
    },
];

// Trail path connecting the spots (SVG path coordinates)
const trailPath = "M 20 35 Q 35 20, 50 55 T 75 25 Q 85 45, 80 65 L 30 70";

export default function TreasureHuntMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);
    const [pierrePosition, setPierrePosition] = useState({ x: 50, y: 50 });

    // Track mouse movement for Pierre to follow
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setMousePosition({ x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Smooth Pierre following with lag
    useEffect(() => {
        const interval = setInterval(() => {
            setPierrePosition(prev => ({
                x: prev.x + (mousePosition.x - prev.x) * 0.08,
                y: prev.y + (mousePosition.y - prev.y) * 0.08,
            }));
        }, 16);

        return () => clearInterval(interval);
    }, [mousePosition]);

    // Check if Pierre is near a spot
    useEffect(() => {
        const nearSpot = serviceSpots.find(spot => {
            const distance = Math.sqrt(
                Math.pow(pierrePosition.x - spot.position.x, 2) +
                Math.pow(pierrePosition.y - spot.position.y, 2)
            );
            return distance < 12;
        });
        setHoveredSpot(nearSpot?.id || null);
    }, [pierrePosition]);

    return (
        <section className="relative py-20 bg-gradient-to-b from-beige-100 via-beige-50 to-white overflow-hidden">
            {/* Section header */}
            <div className="container mx-auto px-4 mb-12 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block px-4 py-1.5 bg-navy-100 text-navy-700 
                        rounded-full text-sm font-semibold mb-4"
                >
                    Your Student Journey
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-navy-700 mb-4"
                >
                    Explore with <span className="text-gold-500">Pierre</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-navy-600/70 max-w-2xl mx-auto"
                >
                    Move your cursor to guide Pierre through your Parisian adventure.
                    Hover over each stop to discover how we help!
                </motion.p>
            </div>

            {/* Interactive Map Area */}
            <div
                ref={containerRef}
                className="relative mx-auto max-w-6xl aspect-[16/9] rounded-3xl overflow-hidden 
                    bg-gradient-to-br from-beige-200 via-beige-100 to-gold-50
                    border-4 border-beige-300 shadow-2xl cursor-none"
            >
                {/* Map background pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a5f' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                {/* Paris landmarks silhouette (decorative) */}
                <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
                    <svg viewBox="0 0 1200 150" className="w-full h-full" fill="#1e3a5f">
                        {/* Eiffel Tower */}
                        <path d="M580 150 L600 20 L620 150 M585 80 L615 80 M575 120 L625 120" strokeWidth="8" stroke="#1e3a5f" fill="none" />
                        {/* Buildings */}
                        <rect x="100" y="100" width="60" height="50" />
                        <rect x="180" y="80" width="40" height="70" />
                        <rect x="240" y="110" width="50" height="40" />
                        <rect x="700" y="90" width="80" height="60" />
                        <rect x="800" y="100" width="50" height="50" />
                        <rect x="900" y="70" width="60" height="80" />
                        <rect x="1000" y="110" width="70" height="40" />
                    </svg>
                </div>

                {/* Treasure trail SVG */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    {/* Dotted trail path */}
                    <motion.path
                        d={trailPath}
                        fill="none"
                        stroke="#d69e2e"
                        strokeWidth="0.5"
                        strokeDasharray="2 2"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />

                    {/* Glowing trail effect */}
                    <motion.path
                        d={trailPath}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="0.3"
                        strokeDasharray="1 3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.5 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                </svg>

                {/* Service Spots */}
                {serviceSpots.map((spot) => {
                    const isHovered = hoveredSpot === spot.id;
                    const isFaded = hoveredSpot !== null && !isHovered;

                    return (
                        <div
                            key={spot.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                            style={{
                                left: `${spot.position.x}%`,
                                top: `${spot.position.y}%`,
                            }}
                        >
                            {/* Spot marker */}
                            <Link href={spot.link}>
                                <motion.div
                                    className="relative cursor-pointer"
                                    animate={{
                                        scale: isHovered ? 1.3 : isFaded ? 0.8 : 1,
                                        opacity: isFaded ? 0.3 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Glow ring */}
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        style={{ backgroundColor: spot.color }}
                                        animate={{
                                            scale: isHovered ? [1, 1.8, 1.8] : 1,
                                            opacity: isHovered ? [0.5, 0, 0] : 0,
                                        }}
                                        transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
                                    />

                                    {/* Main spot */}
                                    <div
                                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl
                                            shadow-lg border-4 border-white transition-all duration-300"
                                        style={{
                                            backgroundColor: isHovered ? spot.color : '#fff',
                                            boxShadow: isHovered ? `0 0 30px ${spot.color}80` : undefined,
                                        }}
                                    >
                                        {spot.icon}
                                    </div>

                                    {/* Label */}
                                    <motion.div
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 
                                            whitespace-nowrap text-sm font-bold text-navy-700"
                                        animate={{ opacity: isFaded ? 0.3 : 1 }}
                                    >
                                        {spot.name}
                                    </motion.div>
                                </motion.div>
                            </Link>

                            {/* Popup */}
                            <AnimatePresence>
                                {isHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 
                                            bg-white rounded-2xl p-5 shadow-2xl w-72 text-center z-50
                                            border-2"
                                        style={{ borderColor: spot.color }}
                                    >
                                        <div
                                            className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl"
                                            style={{ backgroundColor: `${spot.color}20` }}
                                        >
                                            {spot.icon}
                                        </div>
                                        <h3 className="font-bold text-navy-700 text-lg mb-2">{spot.name}</h3>
                                        <p className="text-navy-600/70 text-sm mb-3">{spot.description}</p>
                                        <span
                                            className="inline-block px-4 py-2 text-xs font-semibold rounded-full text-white"
                                            style={{ backgroundColor: spot.color }}
                                        >
                                            Click to explore →
                                        </span>

                                        {/* Arrow pointing down */}
                                        <div
                                            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 
                                                border-l-8 border-r-8 border-t-8 
                                                border-l-transparent border-r-transparent"
                                            style={{ borderTopColor: spot.color }}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}

                {/* Pierre the Pilot - Mascot following cursor */}
                <motion.div
                    className="absolute z-20 pointer-events-none"
                    style={{
                        left: `${pierrePosition.x}%`,
                        top: `${pierrePosition.y}%`,
                    }}
                    animate={{
                        rotate: (mousePosition.x - pierrePosition.x) * 2,
                    }}
                >
                    <div className="relative -translate-x-1/2 -translate-y-1/2">
                        {/* If you have Pierre image, use Image component */}
                        {/* For now, using a placeholder character */}
                        <div className="w-20 h-20 relative">
                            {/* Try to load Pierre image, fallback to emoji character */}
                            <Image
                                src="/images/pierre-mascot.png"
                                alt="Pierre the Pilot"
                                width={80}
                                height={80}
                                className="object-contain drop-shadow-lg"
                                onError={(e) => {
                                    // Fallback handled by displaying emoji instead
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                            {/* Fallback emoji pilot */}
                            <div className="absolute inset-0 flex items-center justify-center text-5xl 
                                drop-shadow-lg animate-bounce-subtle">
                                🧑‍✈️
                            </div>
                        </div>

                        {/* Speech bubble when near a spot */}
                        <AnimatePresence>
                            {!hoveredSpot && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute -top-12 left-1/2 -translate-x-1/2 
                                        bg-white px-3 py-1.5 rounded-full shadow-lg text-xs font-medium
                                        text-navy-700 whitespace-nowrap"
                                >
                                    Follow me! ✨
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Instructions overlay for mobile */}
                <div className="absolute bottom-4 left-4 right-4 text-center md:hidden">
                    <p className="text-sm text-navy-600/70 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2">
                        Tap on spots to explore services
                    </p>
                </div>
            </div>

            {/* Mobile-friendly list below map */}
            <div className="container mx-auto px-4 mt-12 md:hidden">
                <div className="grid grid-cols-2 gap-4">
                    {serviceSpots.map((spot) => (
                        <Link
                            key={spot.id}
                            href={spot.link}
                            className="p-4 bg-white rounded-xl shadow-md border border-beige-200
                                hover:shadow-lg transition-shadow text-center"
                        >
                            <div className="text-3xl mb-2">{spot.icon}</div>
                            <h3 className="font-bold text-navy-700 text-sm">{spot.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
