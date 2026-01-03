'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Service spots on the Paris "treasure map"
const serviceSpots = [
    {
        id: 'banking',
        name: 'Banking',
        icon: '🏦',
        description: 'Open your French bank account with same-day activation support. We partner with student-friendly banks.',
        position: { x: 20, y: 45 },
        link: '/services#banking',
        color: '#3b82f6',
    },
    {
        id: 'housing',
        name: 'Accommodation',
        icon: '🏠',
        description: 'Find your perfect Parisian home with our trusted housing partners. Studio, shared, or residence.',
        position: { x: 80, y: 40 },
        link: '/services#housing',
        color: '#22c55e',
    },
    {
        id: 'travel',
        name: 'Travel',
        icon: '✈️',
        description: 'Navigate Paris like a local! Get your Navigo pass and discover the best student travel deals.',
        position: { x: 50, y: 35 },
        link: '/services#travel',
        color: '#8b5cf6',
    },
    {
        id: 'sim',
        name: 'SIM Card',
        icon: '📱',
        description: 'Stay connected with student-friendly mobile plans. Unlimited data, calls, and texts at student prices.',
        position: { x: 35, y: 55 },
        link: '/services#sim',
        color: '#ec4899',
    },
    {
        id: 'subsidy',
        name: 'Subsidies',
        icon: '💰',
        description: 'Claim up to €200/month in CAF housing subsidies. We handle the paperwork for you!',
        position: { x: 70, y: 60 },
        link: '/services#subsidy',
        color: '#f59e0b',
    },
];

// Trail path connecting the spots (SVG path coordinates)
const trailPath = "M 20 45 Q 35 30, 50 35 T 80 40 Q 75 50, 70 60 L 35 55 Z";

// 3D Pierre Model Component
interface PierreModelProps {
    mousePosition: { x: number; y: number };
}

function PierreModel({ mousePosition }: PierreModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF('/models/pierre-mascot.glb');
    const clonedScene = React.useMemo(() => scene.clone(), [scene]);

    useFrame(() => {
        if (groupRef.current) {
            const targetX = (mousePosition.x - 50) / 15;
            const targetY = -(mousePosition.y - 50) / 15;

            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08);
            groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);

            const targetRotationZ = (targetX - groupRef.current.position.x) * 0.5;
            groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotationZ, 0.1);
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            <primitive object={clonedScene} scale={0.5} rotation={[0, 0, 0]} />
        </group>
    );
}

useGLTF.preload('/models/pierre-mascot.glb');

function Pierre3DCanvas({ mousePosition }: { mousePosition: { x: number; y: number } }) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: 'transparent' }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, -5, 5]} intensity={0.3} />
            <Suspense fallback={null}>
                <PierreModel mousePosition={mousePosition} />
            </Suspense>
        </Canvas>
    );
}

export default function TreasureHuntMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);
    const [clickedSpot, setClickedSpot] = useState<string | null>(null);
    const [pierrePosition, setPierrePosition] = useState({ x: 50, y: 50 });
    const [has3DModel, setHas3DModel] = useState(false);

    useEffect(() => {
        fetch('/models/pierre-mascot.glb', { method: 'HEAD' })
            .then((res) => setHas3DModel(res.ok))
            .catch(() => setHas3DModel(false));
    }, []);

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

    useEffect(() => {
        const interval = setInterval(() => {
            setPierrePosition(prev => ({
                x: prev.x + (mousePosition.x - prev.x) * 0.08,
                y: prev.y + (mousePosition.y - prev.y) * 0.08,
            }));
        }, 16);
        return () => clearInterval(interval);
    }, [mousePosition]);

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

    const handleSpotClick = (spotId: string) => {
        setClickedSpot(clickedSpot === spotId ? null : spotId);
    };

    return (
        <section className="relative py-20 bg-gradient-to-b from-beige-100 via-beige-50 to-white overflow-visible">
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
                    Click on each destination to discover how StudyNest helps you!
                </motion.p>
            </div>

            {/* Interactive Map Area - No overflow hidden */}
            <div
                ref={containerRef}
                className="relative mx-auto max-w-6xl aspect-[16/9] rounded-3xl 
                    border-4 border-gold-300 shadow-2xl cursor-crosshair"
                style={{
                    background: 'linear-gradient(180deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)',
                }}
            >
                {/* Paris Skyline Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
                        {/* Sky gradient */}
                        <defs>
                            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#fef3c7" />
                                <stop offset="100%" stopColor="#fcd34d" />
                            </linearGradient>
                        </defs>
                        <rect width="1200" height="400" fill="url(#skyGradient)" />

                        {/* Distant buildings - left side */}
                        <g fill="#1e3a5f" opacity="0.15">
                            <rect x="0" y="280" width="40" height="120" />
                            <rect x="50" y="260" width="35" height="140" />
                            <rect x="95" y="290" width="50" height="110" />
                            <rect x="155" y="250" width="30" height="150" />
                            <rect x="195" y="270" width="45" height="130" />
                        </g>

                        {/* Eiffel Tower - center left */}
                        <g fill="none" stroke="#1e3a5f" strokeWidth="4" opacity="0.25">
                            <path d="M350 400 L400 100 L450 400" />
                            <path d="M360 350 L440 350" />
                            <path d="M370 280 L430 280" />
                            <path d="M385 200 L415 200" />
                            <path d="M395 130 L405 130" />
                        </g>
                        <rect x="395" y="90" width="10" height="20" fill="#1e3a5f" opacity="0.25" />

                        {/* Notre-Dame - center */}
                        <g fill="#1e3a5f" opacity="0.2">
                            <rect x="550" y="280" width="100" height="120" />
                            <polygon points="550,280 600,220 650,280" />
                            <rect x="570" y="240" width="15" height="40" />
                            <rect x="615" y="240" width="15" height="40" />
                        </g>

                        {/* Sacré-Cœur - right side */}
                        <g fill="#1e3a5f" opacity="0.18">
                            <rect x="800" y="290" width="80" height="110" />
                            <circle cx="840" cy="270" r="30" />
                            <circle cx="815" cy="285" r="18" />
                            <circle cx="865" cy="285" r="18" />
                        </g>

                        {/* Arc de Triomphe - far right */}
                        <g fill="#1e3a5f" opacity="0.15">
                            <path d="M950 400 L950 300 Q990 270, 1030 300 L1030 400" />
                            <rect x="970" y="320" width="40" height="80" fill="#fcd34d" />
                        </g>

                        {/* More distant buildings - right */}
                        <g fill="#1e3a5f" opacity="0.12">
                            <rect x="1070" y="285" width="35" height="115" />
                            <rect x="1115" y="270" width="45" height="130" />
                            <rect x="1170" y="290" width="30" height="110" />
                        </g>

                        {/* Trees/Parks */}
                        <g fill="#1e3a5f" opacity="0.1">
                            <ellipse cx="280" cy="380" rx="40" ry="25" />
                            <ellipse cx="720" cy="385" rx="50" ry="20" />
                            <ellipse cx="500" cy="390" rx="35" ry="15" />
                        </g>
                    </svg>
                </div>

                {/* Dotted trail connecting spots */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <motion.path
                        d={trailPath}
                        fill="none"
                        stroke="#92400e"
                        strokeWidth="0.8"
                        strokeDasharray="2 2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                    />
                </svg>

                {/* Service Spots */}
                {serviceSpots.map((spot) => {
                    const isHovered = hoveredSpot === spot.id;
                    const isClicked = clickedSpot === spot.id;
                    const isFaded = (hoveredSpot !== null || clickedSpot !== null) && !isHovered && !isClicked;

                    return (
                        <div
                            key={spot.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                                left: `${spot.position.x}%`,
                                top: `${spot.position.y}%`,
                                zIndex: isClicked || isHovered ? 50 : 10,
                            }}
                        >
                            {/* Clickable spot marker */}
                            <motion.div
                                className="relative cursor-pointer"
                                animate={{
                                    scale: isHovered || isClicked ? 1.2 : isFaded ? 0.8 : 1,
                                    opacity: isFaded ? 0.4 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                                onClick={() => handleSpotClick(spot.id)}
                            >
                                {/* Glow ring */}
                                {(isHovered || isClicked) && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        style={{ backgroundColor: spot.color }}
                                        animate={{
                                            scale: [1, 1.8, 1.8],
                                            opacity: [0.5, 0, 0],
                                        }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                )}

                                {/* Main spot */}
                                <div
                                    className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl
                                        shadow-lg border-4 border-white transition-all duration-300"
                                    style={{
                                        backgroundColor: isHovered || isClicked ? spot.color : '#fff',
                                        boxShadow: isHovered || isClicked ? `0 0 30px ${spot.color}80` : '0 4px 15px rgba(0,0,0,0.2)',
                                    }}
                                >
                                    {spot.icon}
                                </div>

                                {/* Label below icon */}
                                <motion.div
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 
                                        whitespace-nowrap text-xs md:text-sm font-bold text-navy-800
                                        bg-white/90 px-2 py-1 rounded-full shadow-sm"
                                    animate={{ opacity: isFaded ? 0.3 : 1 }}
                                >
                                    {spot.name}
                                </motion.div>
                            </motion.div>

                            {/* Popup Card - appears when clicked */}
                            <AnimatePresence>
                                {isClicked && (
                                    <Link href={spot.link}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                            className="absolute left-1/2 -translate-x-1/2 mt-16
                                                bg-white rounded-2xl p-5 shadow-2xl w-64 md:w-72 text-center
                                                border-2 cursor-pointer hover:shadow-3xl transition-shadow"
                                            style={{
                                                borderColor: spot.color,
                                                top: '100%',
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {/* Arrow pointing up */}
                                            <div
                                                className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 
                                                    border-l-8 border-r-8 border-b-8 
                                                    border-l-transparent border-r-transparent"
                                                style={{ borderBottomColor: spot.color }}
                                            />

                                            <div
                                                className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl"
                                                style={{ backgroundColor: `${spot.color}20` }}
                                            >
                                                {spot.icon}
                                            </div>
                                            <h3 className="font-bold text-navy-700 text-lg mb-2">{spot.name}</h3>
                                            <p className="text-navy-600/70 text-sm mb-4">{spot.description}</p>
                                            <span
                                                className="inline-block px-5 py-2.5 text-sm font-semibold rounded-full text-white
                                                    hover:opacity-90 transition-opacity shadow-md"
                                                style={{ backgroundColor: spot.color }}
                                            >
                                                Learn More →
                                            </span>
                                        </motion.div>
                                    </Link>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}

                {/* Pierre the Pilot */}
                {has3DModel ? (
                    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 30 }}>
                        <Pierre3DCanvas mousePosition={mousePosition} />
                    </div>
                ) : (
                    <motion.div
                        className="absolute pointer-events-none"
                        style={{
                            left: `${pierrePosition.x}%`,
                            top: `${pierrePosition.y}%`,
                            zIndex: 30,
                        }}
                        animate={{ rotate: (mousePosition.x - pierrePosition.x) * 2 }}
                    >
                        <div className="relative -translate-x-1/2 -translate-y-1/2">
                            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl md:text-5xl 
                                drop-shadow-lg bg-white/80 rounded-full border-2 border-gold-400 shadow-lg">
                                🧑‍✈️
                            </div>
                            <AnimatePresence>
                                {!hoveredSpot && !clickedSpot && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute -top-10 left-1/2 -translate-x-1/2 
                                            bg-white px-3 py-1.5 rounded-full shadow-lg text-xs font-medium
                                            text-navy-700 whitespace-nowrap border border-gold-200"
                                    >
                                        Click a spot! ✨
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}

                {/* Click outside to close popup */}
                {clickedSpot && (
                    <div
                        className="absolute inset-0"
                        style={{ zIndex: 5 }}
                        onClick={() => setClickedSpot(null)}
                    />
                )}
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
