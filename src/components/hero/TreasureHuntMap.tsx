'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Service spots on the Paris "treasure map" - positioned to match the vintage map layout
const serviceSpots = [
    {
        id: 'banking',
        name: 'Banking',
        icon: '🏦',
        description: 'Open your French bank account with same-day activation support. We partner with student-friendly banks.',
        position: { x: 18, y: 55 },
        link: '/services#banking',
        color: '#8B4513', // Sepia brown to match map
    },
    {
        id: 'housing',
        name: 'Logement',
        icon: '🏠',
        description: 'Find your perfect Parisian home with our trusted housing partners. Studio, shared, or residence.',
        position: { x: 50, y: 50 },
        link: '/services#housing',
        color: '#8B4513',
    },
    {
        id: 'travel',
        name: 'Voyage',
        icon: '✈️',
        description: 'Navigate Paris like a local! Get your Navigo pass and discover the best student travel deals.',
        position: { x: 78, y: 22 },
        link: '/services#travel',
        color: '#8B4513',
    },
    {
        id: 'sim',
        name: 'Communication',
        icon: '📱',
        description: 'Stay connected with student-friendly mobile plans. Unlimited data, calls, and texts at student prices.',
        position: { x: 30, y: 75 },
        link: '/services#sim',
        color: '#8B4513',
    },
    {
        id: 'subsidy',
        name: 'Aides',
        icon: '💰',
        description: 'Claim up to €200/month in CAF housing subsidies. We handle the paperwork for you!',
        position: { x: 75, y: 55 },
        link: '/services#subsidy',
        color: '#8B4513',
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
            <ambientLight intensity={1.8} />
            <directionalLight position={[5, 5, 5]} intensity={2.5} color="#fff5e6" />
            <directionalLight position={[-5, 3, 5]} intensity={1.5} color="#e6f0ff" />
            <directionalLight position={[0, -3, -5]} intensity={1} color="#ffd700" />
            <pointLight position={[0, 5, 3]} intensity={1.5} color="#ffffff" />
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
        <section className="relative py-16 bg-gradient-to-b from-beige-100 via-beige-50 to-white overflow-visible">
            {/* Section header */}
            <div className="container mx-auto px-4 mb-8 text-center">
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
                    Aventure Académique <span className="text-gold-500">Parisienne</span>
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
                className="relative mx-auto max-w-6xl aspect-[4/3] sm:aspect-[16/12] md:aspect-[16/10] rounded-lg 
                    shadow-2xl cursor-crosshair overflow-visible"
                style={{
                    boxShadow: '0 0 60px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)',
                }}
            >
                {/* Vintage Paris Map Background Image */}
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                    <Image
                        src="/images/paris-map-background.jpg"
                        alt="Vintage Paris Map"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Service Spots - styled to blend with vintage map */}
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
                                zIndex: isClicked || isHovered ? 40 : 10,
                            }}
                        >
                            {/* Clickable spot marker - vintage style */}
                            <motion.div
                                className="relative cursor-pointer"
                                animate={{
                                    scale: isHovered || isClicked ? 1.15 : isFaded ? 0.9 : 1,
                                    opacity: isFaded ? 0.6 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                                onClick={() => handleSpotClick(spot.id)}
                            >
                                {/* Glow ring - sepia toned */}
                                {(isHovered || isClicked) && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full"
                                        style={{ backgroundColor: '#c9a66b' }}
                                        animate={{
                                            scale: [1, 1.6, 1.6],
                                            opacity: [0.5, 0, 0],
                                        }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                )}

                                {/* Main spot - vintage parchment style with improved mobile touch targets */}
                                <div
                                    className="w-12 h-12 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg sm:text-lg md:text-xl
                                        transition-all duration-300"
                                    style={{
                                        background: isHovered || isClicked
                                            ? 'linear-gradient(145deg, #d4a574 0%, #a67c52 100%)'
                                            : 'linear-gradient(145deg, #f5e6d3 0%, #e8d4b8 100%)',
                                        border: '3px solid #8B4513',
                                        boxShadow: isHovered || isClicked
                                            ? '0 4px 20px rgba(139, 69, 19, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)'
                                            : '0 3px 10px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)',
                                    }}
                                >
                                    {spot.icon}
                                </div>

                                {/* Label - matching map style */}
                                <motion.div
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 
                                        whitespace-nowrap text-xs font-bold
                                        px-2 py-0.5 rounded"
                                    style={{
                                        backgroundColor: 'rgba(245, 230, 211, 0.95)',
                                        color: '#5c3d2e',
                                        border: '1px solid #8B4513',
                                        fontFamily: 'serif',
                                    }}
                                    animate={{ opacity: isFaded ? 0.5 : 1 }}
                                >
                                    {spot.name}
                                </motion.div>
                            </motion.div>

                            {/* Popup Card - vintage styled, positioned smartly */}
                            <AnimatePresence>
                                {isClicked && (
                                    <Link href={spot.link}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                            className="absolute left-1/2 -translate-x-1/2
                                                rounded-xl p-4 shadow-2xl w-56 md:w-64 text-center
                                                cursor-pointer transition-shadow z-40"
                                            style={{
                                                // Position above if spot is in lower half, below otherwise
                                                ...(spot.position.y > 50
                                                    ? { bottom: '100%', marginBottom: '60px' }
                                                    : { top: '100%', marginTop: '60px' }
                                                ),
                                                background: 'linear-gradient(145deg, #faf6f0 0%, #f0e6d8 100%)',
                                                border: '3px solid #8B4513',
                                                boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {/* Arrow pointing to spot */}
                                            <div
                                                className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
                                                style={{
                                                    ...(spot.position.y > 50
                                                        ? {
                                                            top: '100%',
                                                            borderLeft: '10px solid transparent',
                                                            borderRight: '10px solid transparent',
                                                            borderTop: '10px solid #8B4513',
                                                        }
                                                        : {
                                                            bottom: '100%',
                                                            borderLeft: '10px solid transparent',
                                                            borderRight: '10px solid transparent',
                                                            borderBottom: '10px solid #8B4513',
                                                        }
                                                    ),
                                                }}
                                            />

                                            <div
                                                className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center text-xl"
                                                style={{
                                                    background: 'linear-gradient(145deg, #e8d4b8 0%, #d4bc9a 100%)',
                                                    border: '2px solid #8B4513',
                                                }}
                                            >
                                                {spot.icon}
                                            </div>
                                            <h3
                                                className="font-bold text-lg mb-1.5"
                                                style={{ color: '#5c3d2e', fontFamily: 'serif' }}
                                            >
                                                {spot.name}
                                            </h3>
                                            <p
                                                className="text-sm mb-3 leading-relaxed"
                                                style={{ color: '#6b5344' }}
                                            >
                                                {spot.description}
                                            </p>
                                            <span
                                                className="inline-block px-4 py-2 text-sm font-semibold rounded-full text-white
                                                    hover:opacity-90 transition-opacity"
                                                style={{
                                                    background: 'linear-gradient(145deg, #8B4513 0%, #5c3d2e 100%)',
                                                }}
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
                            <div
                                className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-2xl md:text-3xl 
                                    drop-shadow-lg rounded-full"
                                style={{
                                    background: 'linear-gradient(145deg, #f5e6d3 0%, #e8d4b8 100%)',
                                    border: '3px solid #8B4513',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                }}
                            >
                                🧑‍✈️
                            </div>
                            <AnimatePresence>
                                {!hoveredSpot && !clickedSpot && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="absolute -top-8 left-1/2 -translate-x-1/2 
                                            px-2 py-1 rounded text-xs font-medium whitespace-nowrap"
                                        style={{
                                            background: 'linear-gradient(145deg, #f5e6d3 0%, #e8d4b8 100%)',
                                            color: '#5c3d2e',
                                            border: '2px solid #8B4513',
                                            fontFamily: 'serif',
                                        }}
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

        </section>
    );
}
