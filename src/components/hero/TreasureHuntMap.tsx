'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
        position: { x: 18, y: 48 },
        link: '/services#banking',
        color: '#3b82f6',
    },
    {
        id: 'housing',
        name: 'Accommodation',
        icon: '🏠',
        description: 'Find your perfect Parisian home with our trusted housing partners. Studio, shared, or residence.',
        position: { x: 50, y: 55 },
        link: '/services#housing',
        color: '#22c55e',
    },
    {
        id: 'travel',
        name: 'Travel',
        icon: '✈️',
        description: 'Navigate Paris like a local! Get your Navigo pass and discover the best student travel deals.',
        position: { x: 75, y: 25 },
        link: '/services#travel',
        color: '#8b5cf6',
    },
    {
        id: 'sim',
        name: 'SIM Card',
        icon: '📱',
        description: 'Stay connected with student-friendly mobile plans. Unlimited data, calls, and texts at student prices.',
        position: { x: 28, y: 72 },
        link: '/services#sim',
        color: '#ec4899',
    },
    {
        id: 'subsidy',
        name: 'Subsidies',
        icon: '💰',
        description: 'Claim up to €200/month in CAF housing subsidies. We handle the paperwork for you!',
        position: { x: 72, y: 58 },
        link: '/services#subsidy',
        color: '#f59e0b',
    },
];

// 3D Pierre Model Component with brighter lighting
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

// Brighter lighting for Pierre
function Pierre3DCanvas({ mousePosition }: { mousePosition: { x: number; y: number } }) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: 'transparent' }}>
            {/* Stronger ambient light for overall brightness */}
            <ambientLight intensity={1.5} />
            {/* Main key light - bright warm */}
            <directionalLight position={[5, 5, 5]} intensity={2} color="#fff5e6" />
            {/* Fill light from the left */}
            <directionalLight position={[-5, 3, 5]} intensity={1.2} color="#e6f0ff" />
            {/* Rim light from behind */}
            <directionalLight position={[0, -3, -5]} intensity={0.8} color="#ffd700" />
            {/* Top light for highlights */}
            <pointLight position={[0, 5, 3]} intensity={1} color="#ffffff" />
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

            {/* Interactive Map Area with vintage Paris map background */}
            <div
                ref={containerRef}
                className="relative mx-auto max-w-6xl aspect-[16/10] rounded-3xl 
                    shadow-2xl cursor-crosshair overflow-hidden"
            >
                {/* Vintage Paris Map Background Image */}
                <Image
                    src="/images/paris-map-background.jpg"
                    alt="Vintage Paris Map"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Service Spots - No trails, just spots */}
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
                                    opacity: isFaded ? 0.5 : 1,
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
                                            opacity: [0.6, 0, 0],
                                        }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                )}

                                {/* Main spot */}
                                <div
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl md:text-2xl
                                        shadow-xl border-3 border-white transition-all duration-300"
                                    style={{
                                        backgroundColor: isHovered || isClicked ? spot.color : '#fff',
                                        boxShadow: isHovered || isClicked
                                            ? `0 0 25px ${spot.color}90, 0 4px 15px rgba(0,0,0,0.3)`
                                            : '0 4px 15px rgba(0,0,0,0.3)',
                                    }}
                                >
                                    {spot.icon}
                                </div>

                                {/* Label below icon */}
                                <motion.div
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 
                                        whitespace-nowrap text-xs font-bold text-navy-800
                                        bg-white/95 px-2 py-1 rounded-full shadow-md"
                                    animate={{ opacity: isFaded ? 0.4 : 1 }}
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
                                            className="absolute left-1/2 -translate-x-1/2 mt-14
                                                bg-white rounded-2xl p-5 shadow-2xl w-60 md:w-72 text-center
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
                                                className="w-11 h-11 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl"
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

                {/* Pierre the Pilot - with enhanced lighting */}
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
                            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center text-3xl md:text-4xl 
                                drop-shadow-lg bg-white/90 rounded-full border-2 border-gold-400 shadow-lg">
                                🧑‍✈️
                            </div>
                            <AnimatePresence>
                                {!hoveredSpot && !clickedSpot && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute -top-9 left-1/2 -translate-x-1/2 
                                            bg-white px-3 py-1 rounded-full shadow-lg text-xs font-medium
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
