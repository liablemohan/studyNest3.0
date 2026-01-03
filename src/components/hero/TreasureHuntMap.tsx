'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Service spots positioned on Paris map landmarks
const serviceSpots = [
    {
        id: 'banking',
        name: 'Banking',
        icon: '🏦',
        description: 'Open your French bank account with same-day activation support. We partner with student-friendly banks.',
        position: { x: 25, y: 40 }, // Near Opéra area
        link: '/services#banking',
        color: '#3b82f6',
        landmark: 'Opéra',
    },
    {
        id: 'housing',
        name: 'Accommodation',
        icon: '🏠',
        description: 'Find your perfect Parisian home with our trusted housing partners. Studio, shared, or residence.',
        position: { x: 70, y: 30 }, // Near Marais
        link: '/services#housing',
        color: '#22c55e',
        landmark: 'Le Marais',
    },
    {
        id: 'travel',
        name: 'Travel',
        icon: '✈️',
        description: 'Navigate Paris like a local! Get your Navigo pass and discover the best student travel deals.',
        position: { x: 50, y: 25 }, // Near Gare du Nord
        link: '/services#travel',
        color: '#8b5cf6',
        landmark: 'Gare du Nord',
    },
    {
        id: 'sim',
        name: 'SIM Card',
        icon: '📱',
        description: 'Stay connected with student-friendly mobile plans. Unlimited data, calls, and texts at student prices.',
        position: { x: 35, y: 65 }, // Near Latin Quarter
        link: '/services#sim',
        color: '#ec4899',
        landmark: 'Latin Quarter',
    },
    {
        id: 'subsidy',
        name: 'Subsidies',
        icon: '💰',
        description: 'Claim up to €200/month in CAF housing subsidies. We handle the paperwork for you!',
        position: { x: 75, y: 60 }, // Near Bercy
        link: '/services#subsidy',
        color: '#f59e0b',
        landmark: 'Bercy',
    },
];

// Create dotted path between service spots
const createDottedPath = () => {
    const points = serviceSpots.map(s => `${s.position.x} ${s.position.y}`);
    // Create a path that visits all spots
    return `M ${points[0]} L ${points[2]} L ${points[1]} L ${points[4]} L ${points[3]} Z`;
};

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
            <primitive object={clonedScene} scale={0.5} rotation={[0, Math.PI, 0]} />
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

// 3D Icon Component with perspective and shadow
function Icon3D({ icon, color, isHovered }: { icon: string; color: string; isHovered: boolean }) {
    return (
        <div
            className="relative w-16 h-16 transition-all duration-300"
            style={{
                transform: isHovered ? 'perspective(500px) rotateX(-10deg) translateY(-5px)' : 'perspective(500px) rotateX(0deg)',
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Shadow layer */}
            <div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full blur-sm transition-all duration-300"
                style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                }}
            />

            {/* Base layer (3D depth effect) */}
            <div
                className="absolute inset-0 rounded-2xl"
                style={{
                    background: `linear-gradient(180deg, ${color}dd 0%, ${color}88 100%)`,
                    transform: 'translateZ(-10px)',
                    boxShadow: `0 10px 30px ${color}50`,
                }}
            />

            {/* Front face */}
            <div
                className="relative w-full h-full rounded-2xl flex items-center justify-center text-3xl
                    border-2 border-white/50 overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${color}ff 0%, ${color}cc 50%, ${color}99 100%)`,
                    boxShadow: `
                        inset 0 2px 10px rgba(255,255,255,0.3),
                        inset 0 -2px 10px rgba(0,0,0,0.2),
                        0 8px 20px ${color}40
                    `,
                }}
            >
                {/* Shine effect */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
                    }}
                />
                <span className="relative z-10 drop-shadow-md">{icon}</span>
            </div>
        </div>
    );
}

export default function TreasureHuntMap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);
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
                    Explore <span className="text-gold-500">Paris</span> with Pierre
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-navy-600/70 max-w-2xl mx-auto"
                >
                    Navigate your Parisian adventure! Move your cursor to guide Pierre across the city.
                </motion.p>
            </div>

            {/* Paris Map Area */}
            <div
                ref={containerRef}
                className="relative mx-auto max-w-6xl aspect-[16/9] rounded-3xl overflow-hidden 
                    shadow-2xl cursor-none border-4 border-gold-400/50"
                style={{
                    background: `
                        linear-gradient(135deg, #f5e6c8 0%, #e8d4a8 30%, #dcc690 60%, #d4bc7a 100%)
                    `,
                }}
            >
                {/* Paris Map styled background */}
                <div className="absolute inset-0">
                    {/* Map grid pattern */}
                    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Major roads */}
                        <line x1="0" y1="50" x2="100" y2="50" stroke="#8b7355" strokeWidth="0.5" />
                        <line x1="50" y1="0" x2="50" y2="100" stroke="#8b7355" strokeWidth="0.5" />
                        <line x1="20" y1="0" x2="80" y2="100" stroke="#8b7355" strokeWidth="0.3" />
                        <line x1="80" y1="0" x2="20" y2="100" stroke="#8b7355" strokeWidth="0.3" />

                        {/* Arc patterns like Paris arrondissements */}
                        <circle cx="50" cy="50" r="15" fill="none" stroke="#8b7355" strokeWidth="0.3" />
                        <circle cx="50" cy="50" r="30" fill="none" stroke="#8b7355" strokeWidth="0.3" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#8b7355" strokeWidth="0.3" />
                    </svg>

                    {/* Seine River */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path
                            d="M 0 55 Q 25 45, 50 50 T 100 45"
                            fill="none"
                            stroke="#7cb5c9"
                            strokeWidth="3"
                            opacity="0.5"
                        />
                        <path
                            d="M 0 55 Q 25 45, 50 50 T 100 45"
                            fill="none"
                            stroke="#a3d5e8"
                            strokeWidth="1.5"
                            opacity="0.7"
                        />
                    </svg>

                    {/* Eiffel Tower silhouette */}
                    <div className="absolute left-[15%] top-[35%] w-16 h-24 opacity-30">
                        <svg viewBox="0 0 50 80" className="w-full h-full">
                            <path d="M25 0 L30 25 L35 60 L40 80 L10 80 L15 60 L20 25 Z" fill="#5c4a32" />
                            <rect x="15" y="20" width="20" height="3" fill="#5c4a32" />
                            <rect x="12" y="45" width="26" height="3" fill="#5c4a32" />
                        </svg>
                    </div>

                    {/* Notre-Dame silhouette */}
                    <div className="absolute left-[55%] top-[48%] w-12 h-10 opacity-20">
                        <svg viewBox="0 0 40 30" className="w-full h-full">
                            <rect x="5" y="10" width="30" height="20" fill="#5c4a32" />
                            <polygon points="10,10 20,0 30,10" fill="#5c4a32" />
                        </svg>
                    </div>

                    {/* Arc de Triomphe */}
                    <div className="absolute left-[10%] top-[25%] w-8 h-8 opacity-20">
                        <svg viewBox="0 0 30 30" className="w-full h-full">
                            <path d="M5 30 L5 10 Q15 0, 25 10 L25 30" fill="#5c4a32" />
                        </svg>
                    </div>

                    {/* Sacré-Cœur */}
                    <div className="absolute left-[45%] top-[10%] w-10 h-10 opacity-20">
                        <svg viewBox="0 0 40 40" className="w-full h-full">
                            <circle cx="20" cy="15" r="10" fill="#5c4a32" />
                            <circle cx="12" cy="20" r="6" fill="#5c4a32" />
                            <circle cx="28" cy="20" r="6" fill="#5c4a32" />
                            <rect x="8" y="22" width="24" height="18" fill="#5c4a32" />
                        </svg>
                    </div>
                </div>

                {/* Map title badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full
                    text-sm font-bold text-navy-700 shadow-md border border-gold-300">
                    🗺️ Paris, France
                </div>

                {/* Compass */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full
                    flex items-center justify-center shadow-md border border-gold-300">
                    <svg viewBox="0 0 24 24" className="w-6 h-6">
                        <polygon points="12,2 14,10 12,8 10,10" fill="#dc2626" />
                        <polygon points="12,22 14,14 12,16 10,14" fill="#1e3a5f" />
                        <text x="12" y="6" textAnchor="middle" fontSize="4" fill="#dc2626" fontWeight="bold">N</text>
                    </svg>
                </div>

                {/* Dotted trail connecting spots */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    {/* Draw dotted lines between consecutive spots */}
                    {serviceSpots.map((spot, i) => {
                        if (i === serviceSpots.length - 1) return null;
                        const nextSpot = serviceSpots[(i + 1) % serviceSpots.length];
                        return (
                            <motion.line
                                key={`line-${i}`}
                                x1={spot.position.x}
                                y1={spot.position.y}
                                x2={nextSpot.position.x}
                                y2={nextSpot.position.y}
                                stroke="#8b5a2b"
                                strokeWidth="0.8"
                                strokeDasharray="3 3"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.8 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                            />
                        );
                    })}

                    {/* Connect last to first for a closed loop */}
                    <motion.line
                        x1={serviceSpots[serviceSpots.length - 1].position.x}
                        y1={serviceSpots[serviceSpots.length - 1].position.y}
                        x2={serviceSpots[0].position.x}
                        y2={serviceSpots[0].position.y}
                        stroke="#8b5a2b"
                        strokeWidth="0.8"
                        strokeDasharray="3 3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.8 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: serviceSpots.length * 0.2 }}
                    />
                </svg>

                {/* Service Spots with 3D Icons */}
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
                            <Link href={spot.link}>
                                <motion.div
                                    className="relative cursor-pointer"
                                    animate={{
                                        scale: isHovered ? 1.2 : isFaded ? 0.8 : 1,
                                        opacity: isFaded ? 0.4 : 1,
                                    }}
                                    transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                                >
                                    {/* Pulse ring when hovered */}
                                    {isHovered && (
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl"
                                            style={{ backgroundColor: spot.color }}
                                            animate={{
                                                scale: [1, 2, 2],
                                                opacity: [0.5, 0, 0],
                                            }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    )}

                                    {/* 3D Icon */}
                                    <Icon3D icon={spot.icon} color={spot.color} isHovered={isHovered} />

                                    {/* Landmark label */}
                                    <motion.div
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 
                                            whitespace-nowrap text-xs font-bold px-2 py-1 rounded-full
                                            bg-white/90 shadow-md border border-gold-200"
                                        style={{ color: spot.color }}
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
                                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 
                                            bg-white rounded-2xl p-5 shadow-2xl w-72 text-center z-50"
                                        style={{
                                            border: `3px solid ${spot.color}`,
                                            boxShadow: `0 10px 40px ${spot.color}30`,
                                        }}
                                    >
                                        <div
                                            className="w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center text-3xl"
                                            style={{
                                                background: `linear-gradient(135deg, ${spot.color}30 0%, ${spot.color}10 100%)`,
                                            }}
                                        >
                                            {spot.icon}
                                        </div>
                                        <h3 className="font-bold text-navy-700 text-lg mb-1">{spot.name}</h3>
                                        <p className="text-xs text-navy-500 mb-2">📍 {spot.landmark}</p>
                                        <p className="text-navy-600/70 text-sm mb-4">{spot.description}</p>
                                        <span
                                            className="inline-block px-4 py-2 text-xs font-semibold rounded-full text-white shadow-md"
                                            style={{
                                                background: `linear-gradient(135deg, ${spot.color} 0%, ${spot.color}cc 100%)`,
                                            }}
                                        >
                                            Click to explore →
                                        </span>

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

                {/* Pierre the Pilot */}
                {has3DModel ? (
                    <div className="absolute inset-0 z-20 pointer-events-none">
                        <Pierre3DCanvas mousePosition={mousePosition} />
                    </div>
                ) : (
                    <motion.div
                        className="absolute z-20 pointer-events-none"
                        style={{ left: `${pierrePosition.x}%`, top: `${pierrePosition.y}%` }}
                        animate={{ rotate: (mousePosition.x - pierrePosition.x) * 2 }}
                    >
                        <div className="relative -translate-x-1/2 -translate-y-1/2">
                            <div className="w-16 h-16 flex items-center justify-center text-4xl drop-shadow-lg
                                bg-white/80 rounded-full border-2 border-gold-400 shadow-lg">
                                🧑‍✈️
                            </div>
                            <AnimatePresence>
                                {!hoveredSpot && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute -top-10 left-1/2 -translate-x-1/2 
                                            bg-white px-3 py-1.5 rounded-full shadow-lg text-xs font-medium
                                            text-navy-700 whitespace-nowrap border border-gold-200"
                                    >
                                        Let&apos;s explore! ✨
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}

                {/* Mobile instructions */}
                <div className="absolute bottom-4 left-4 right-4 text-center md:hidden">
                    <p className="text-sm text-navy-700 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow">
                        Tap on spots to explore services
                    </p>
                </div>
            </div>

            {/* Mobile-friendly list */}
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
                            <p className="text-xs text-navy-500">{spot.landmark}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
