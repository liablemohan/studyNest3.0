'use client';

import React, { useRef, useState, useCallback, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';

// Planet data with enhanced properties
const planets = [
    {
        id: 'housing',
        name: 'Housing',
        description: 'Find your perfect Parisian home with our trusted housing partners.',
        baseColor: '#22c55e',
        glowColor: '#4ade80',
        atmosphereColor: '#86efac',
        position: [4, 1.5, -2] as [number, number, number],
        size: 0.6,
        icon: '🏠',
        link: '/services#housing',
        rings: true,
        ringColor: '#22c55e',
    },
    {
        id: 'banking',
        name: 'Banking',
        description: 'Open your French bank account with same-day activation support.',
        baseColor: '#3b82f6',
        glowColor: '#60a5fa',
        atmosphereColor: '#93c5fd',
        position: [-4, 0.8, -2.5] as [number, number, number],
        size: 0.7,
        icon: '🏦',
        link: '/services#banking',
        rings: false,
    },
    {
        id: 'sim',
        name: 'SIM Card',
        description: 'Stay connected with student-friendly mobile plans.',
        baseColor: '#ec4899',
        glowColor: '#f472b6',
        atmosphereColor: '#f9a8d4',
        position: [2.5, -1.8, -1.5] as [number, number, number],
        size: 0.5,
        icon: '📱',
        link: '/services#sim',
        rings: true,
        ringColor: '#ec4899',
    },
    {
        id: 'subsidy',
        name: 'Subsidies',
        description: 'Claim up to €200/month in CAF housing subsidies.',
        baseColor: '#f59e0b',
        glowColor: '#fbbf24',
        atmosphereColor: '#fcd34d',
        position: [-3, -1.5, -1] as [number, number, number],
        size: 0.55,
        icon: '💰',
        link: '/services#subsidy',
        rings: false,
    },
    {
        id: 'jobs',
        name: 'Jobs',
        description: 'Find part-time jobs that fit your student schedule.',
        baseColor: '#8b5cf6',
        glowColor: '#a78bfa',
        atmosphereColor: '#c4b5fd',
        position: [0.5, 2.5, -2.5] as [number, number, number],
        size: 0.6,
        icon: '💼',
        link: '/services#jobs',
        rings: true,
        ringColor: '#8b5cf6',
    },
];

// Enhanced Planet Component with realistic 3D effects
interface EnhancedPlanetProps {
    planet: typeof planets[0];
    isHovered: boolean;
    isFaded: boolean;
    onHover: (id: string | null) => void;
}

function EnhancedPlanet({ planet, isHovered, isFaded, onHover }: EnhancedPlanetProps) {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);
    const ringsRef = useRef<THREE.Mesh>(null);
    const [showPopup, setShowPopup] = useState(false);

    // Animation
    useFrame((state) => {
        if (groupRef.current) {
            // Orbit around own axis
            groupRef.current.rotation.y += 0.003;
        }

        if (meshRef.current) {
            // Scale effect on hover
            const targetScale = isHovered ? 1.15 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }

        if (glowRef.current) {
            // Pulsating glow
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
            const glowScale = isHovered ? pulse * 1.3 : pulse * 1.1;
            glowRef.current.scale.setScalar(glowScale);
        }

        if (atmosphereRef.current) {
            // Atmosphere rotation
            atmosphereRef.current.rotation.y -= 0.002;
            atmosphereRef.current.rotation.z += 0.001;
        }

        if (ringsRef.current) {
            // Ring rotation
            ringsRef.current.rotation.z += 0.005;
        }
    });

    const handlePointerEnter = useCallback(() => {
        onHover(planet.id);
        setShowPopup(true);
        document.body.style.cursor = 'pointer';
    }, [onHover, planet.id]);

    const handlePointerLeave = useCallback(() => {
        onHover(null);
        setShowPopup(false);
        document.body.style.cursor = 'default';
    }, [onHover]);

    const handleClick = useCallback(() => {
        window.location.href = planet.link;
    }, [planet.link]);

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.2}
            floatIntensity={0.4}
        >
            <group ref={groupRef} position={planet.position}>
                {/* Core planet sphere with enhanced materials */}
                <mesh
                    ref={meshRef}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                    onClick={handleClick}
                >
                    <sphereGeometry args={[planet.size, 64, 64]} />
                    <meshPhysicalMaterial
                        color={planet.baseColor}
                        metalness={0.3}
                        roughness={0.4}
                        clearcoat={0.5}
                        clearcoatRoughness={0.2}
                        envMapIntensity={1}
                        transparent
                        opacity={isFaded ? 0.15 : 1}
                    />
                </mesh>

                {/* Inner glow layer */}
                <mesh ref={glowRef}>
                    <sphereGeometry args={[planet.size * 1.02, 32, 32]} />
                    <meshBasicMaterial
                        color={planet.glowColor}
                        transparent
                        opacity={isHovered ? 0.4 : isFaded ? 0.05 : 0.2}
                        side={THREE.BackSide}
                    />
                </mesh>

                {/* Outer atmosphere */}
                <mesh ref={atmosphereRef}>
                    <sphereGeometry args={[planet.size * 1.15, 32, 32]} />
                    <meshBasicMaterial
                        color={planet.atmosphereColor}
                        transparent
                        opacity={isHovered ? 0.25 : isFaded ? 0.02 : 0.1}
                        side={THREE.BackSide}
                    />
                </mesh>

                {/* Surface details - small floating particles */}
                {!isFaded && [...Array(8)].map((_, i) => {
                    const angle = (i / 8) * Math.PI * 2;
                    const radius = planet.size * 1.3;
                    return (
                        <mesh
                            key={i}
                            position={[
                                Math.cos(angle) * radius,
                                Math.sin(angle * 0.5) * radius * 0.3,
                                Math.sin(angle) * radius,
                            ]}
                        >
                            <sphereGeometry args={[0.03, 8, 8]} />
                            <meshBasicMaterial
                                color={planet.glowColor}
                                transparent
                                opacity={isHovered ? 0.8 : 0.4}
                            />
                        </mesh>
                    );
                })}

                {/* Rings (for some planets) */}
                {planet.rings && (
                    <mesh ref={ringsRef} rotation={[Math.PI / 3, 0, 0]}>
                        <ringGeometry args={[planet.size * 1.4, planet.size * 1.8, 64]} />
                        <meshBasicMaterial
                            color={planet.ringColor}
                            transparent
                            opacity={isHovered ? 0.5 : isFaded ? 0.05 : 0.25}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                )}

                {/* Orbital ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[planet.size * 1.2, planet.size * 1.22, 64]} />
                    <meshBasicMaterial
                        color={planet.glowColor}
                        transparent
                        opacity={isHovered ? 0.6 : isFaded ? 0.03 : 0.15}
                        side={THREE.DoubleSide}
                    />
                </mesh>

                {/* Icon */}
                <Html
                    center
                    distanceFactor={6}
                    style={{
                        opacity: isFaded ? 0.15 : 1,
                        transition: 'opacity 0.3s ease',
                        pointerEvents: 'none',
                    }}
                >
                    <div className="text-4xl select-none drop-shadow-lg">{planet.icon}</div>
                </Html>

                {/* Info popup */}
                {showPopup && (
                    <Html
                        center
                        position={[0, planet.size + 1, 0]}
                        style={{ pointerEvents: 'none' }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl
                         border border-white/50 w-64 text-center"
                            style={{
                                boxShadow: `0 0 40px ${planet.glowColor}40, 0 20px 60px rgba(0,0,0,0.3)`,
                            }}
                        >
                            <div
                                className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl"
                                style={{ backgroundColor: `${planet.baseColor}20` }}
                            >
                                {planet.icon}
                            </div>
                            <h3 className="font-bold text-navy-700 text-lg mb-2">{planet.name}</h3>
                            <p className="text-navy-600/70 text-sm mb-4">{planet.description}</p>
                            <span
                                className="inline-block px-4 py-2 text-xs font-semibold rounded-full"
                                style={{
                                    backgroundColor: `${planet.baseColor}20`,
                                    color: planet.baseColor,
                                }}
                            >
                                Click to explore →
                            </span>
                        </motion.div>
                    </Html>
                )}
            </group>
        </Float>
    );
}

// Enhanced Pierre the Pilot - 3D Biplane
interface PierreProps {
    mousePosition: { x: number; y: number };
}

function PierreThePilot({ mousePosition }: PierreProps) {
    const groupRef = useRef<THREE.Group>(null);
    const propellerRef = useRef<THREE.Group>(null);
    const targetPosition = useRef(new THREE.Vector3(0, 0, 1));

    useFrame(() => {
        if (groupRef.current) {
            // Smooth cursor following
            targetPosition.current.set(
                mousePosition.x * 3.5,
                mousePosition.y * 2.5,
                1.5
            );
            groupRef.current.position.lerp(targetPosition.current, 0.04);

            // Banking on turn
            const targetRotationZ = -mousePosition.x * 0.4;
            const targetRotationX = mousePosition.y * 0.2;
            groupRef.current.rotation.z = THREE.MathUtils.lerp(
                groupRef.current.rotation.z,
                targetRotationZ,
                0.05
            );
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                targetRotationX,
                0.05
            );
        }

        // Spinning propeller
        if (propellerRef.current) {
            propellerRef.current.rotation.z += 0.5;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={3} rotationIntensity={0.1} floatIntensity={0.2}>
                {/* Main fuselage */}
                <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <capsuleGeometry args={[0.12, 0.5, 12, 24]} />
                    <meshPhysicalMaterial
                        color="#f9d872"
                        metalness={0.4}
                        roughness={0.3}
                        clearcoat={0.8}
                    />
                </mesh>

                {/* Cockpit */}
                <mesh position={[0.1, 0.12, 0]}>
                    <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshPhysicalMaterial
                        color="#87ceeb"
                        metalness={0.1}
                        roughness={0.1}
                        transparent
                        opacity={0.7}
                    />
                </mesh>

                {/* Upper wing */}
                <mesh position={[0, 0.15, 0]}>
                    <boxGeometry args={[0.15, 0.02, 0.9]} />
                    <meshPhysicalMaterial
                        color="#f9d872"
                        metalness={0.3}
                        roughness={0.4}
                    />
                </mesh>

                {/* Lower wing */}
                <mesh position={[0, -0.08, 0]}>
                    <boxGeometry args={[0.12, 0.02, 0.8]} />
                    <meshPhysicalMaterial
                        color="#f9d872"
                        metalness={0.3}
                        roughness={0.4}
                    />
                </mesh>

                {/* Wing struts */}
                {[-0.25, 0.25].map((z) => (
                    <mesh key={z} position={[0, 0.035, z]}>
                        <cylinderGeometry args={[0.01, 0.01, 0.23, 8]} />
                        <meshStandardMaterial color="#8B4513" metalness={0.5} roughness={0.5} />
                    </mesh>
                ))}

                {/* Tail */}
                <mesh position={[-0.35, 0.08, 0]}>
                    <boxGeometry args={[0.15, 0.15, 0.02]} />
                    <meshPhysicalMaterial color="#f9d872" metalness={0.3} roughness={0.4} />
                </mesh>

                {/* Tail horizontal */}
                <mesh position={[-0.35, 0.05, 0]}>
                    <boxGeometry args={[0.1, 0.02, 0.25]} />
                    <meshPhysicalMaterial color="#f9d872" metalness={0.3} roughness={0.4} />
                </mesh>

                {/* Propeller hub */}
                <mesh position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.04, 0.05, 0.05, 16]} />
                    <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Propeller blades */}
                <group ref={propellerRef} position={[0.38, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((rotation, i) => (
                        <mesh key={i} rotation={[0, 0, rotation]}>
                            <boxGeometry args={[0.02, 0.25, 0.01]} />
                            <meshStandardMaterial color="#2d3748" metalness={0.7} roughness={0.3} />
                        </mesh>
                    ))}
                </group>

                {/* Red beret (pilot hat) */}
                <mesh position={[0.1, 0.22, 0]} rotation={[0.2, 0, 0.1]}>
                    <sphereGeometry args={[0.08, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#ef4444" />
                </mesh>

                {/* Beret top */}
                <mesh position={[0.12, 0.26, 0]}>
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshStandardMaterial color="#dc2626" />
                </mesh>

                {/* Goggles */}
                <group position={[0.18, 0.13, 0]}>
                    <mesh position={[0, 0, 0.05]}>
                        <torusGeometry args={[0.035, 0.012, 8, 16]} />
                        <meshStandardMaterial color="#78350f" metalness={0.6} roughness={0.3} />
                    </mesh>
                    <mesh position={[0, 0, -0.05]}>
                        <torusGeometry args={[0.035, 0.012, 8, 16]} />
                        <meshStandardMaterial color="#78350f" metalness={0.6} roughness={0.3} />
                    </mesh>
                    {/* Goggle lenses */}
                    <mesh position={[0.01, 0, 0.05]}>
                        <circleGeometry args={[0.03, 16]} />
                        <meshPhysicalMaterial color="#fef3c7" transparent opacity={0.5} />
                    </mesh>
                    <mesh position={[0.01, 0, -0.05]}>
                        <circleGeometry args={[0.03, 16]} />
                        <meshPhysicalMaterial color="#fef3c7" transparent opacity={0.5} />
                    </mesh>
                </group>

                {/* Wheels */}
                {[-0.12, 0.12].map((z) => (
                    <group key={z} position={[0, -0.2, z]}>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[0.04, 0.015, 8, 16]} />
                            <meshStandardMaterial color="#1a1a1a" />
                        </mesh>
                        {/* Wheel struts */}
                        <mesh position={[0, 0.06, 0]} rotation={[0, 0, 0.2 * (z > 0 ? 1 : -1)]}>
                            <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
                            <meshStandardMaterial color="#4a5568" metalness={0.7} roughness={0.3} />
                        </mesh>
                    </group>
                ))}

                {/* Trail particles */}
                {[...Array(6)].map((_, i) => (
                    <mesh key={i} position={[-0.5 - i * 0.12, Math.sin(i * 0.8) * 0.03, Math.cos(i * 0.5) * 0.02]}>
                        <sphereGeometry args={[0.025 - i * 0.003, 8, 8]} />
                        <meshBasicMaterial color="#fef9e7" transparent opacity={0.8 - i * 0.12} />
                    </mesh>
                ))}
            </Float>
        </group>
    );
}

// Central sun/star
function CentralStar() {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
        if (glowRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime) * 0.1 + 1;
            glowRef.current.scale.setScalar(pulse);
        }
    });

    return (
        <group position={[0, 0, -8]}>
            {/* Core */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshBasicMaterial color="#fbbf24" transparent opacity={0.3} />
            </mesh>
            {/* Inner glow */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="#f59e0b" transparent opacity={0.15} />
            </mesh>
            {/* Outer glow */}
            <mesh>
                <sphereGeometry args={[3, 32, 32]} />
                <meshBasicMaterial color="#fcd34d" transparent opacity={0.05} />
            </mesh>
            {/* Light rays */}
            <pointLight color="#fbbf24" intensity={2} distance={20} />
        </group>
    );
}

// Main Scene
function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
    const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

    const handleHover = useCallback((id: string | null) => {
        setHoveredPlanet(id);
    }, []);

    return (
        <>
            {/* Camera */}
            <perspectiveCamera position={[0, 0, 8]} fov={45} />

            {/* Enhanced Lighting */}
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#fef9e7" />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
            <pointLight position={[5, -5, 5]} intensity={0.5} color="#a78bfa" />
            <spotLight
                position={[0, 15, 5]}
                intensity={1}
                color="#d69e2e"
                angle={0.4}
                penumbra={0.5}
            />

            {/* Stars background */}
            <Stars
                radius={150}
                depth={60}
                count={4000}
                factor={5}
                saturation={0.2}
                fade
                speed={0.5}
            />

            {/* Central star */}
            <CentralStar />

            {/* Space dust particles */}
            {useMemo(() => [...Array(50)].map((_, i) => {
                const x = (Math.random() - 0.5) * 20;
                const y = (Math.random() - 0.5) * 15;
                const z = (Math.random() - 0.5) * 10 - 5;
                return (
                    <mesh key={i} position={[x, y, z]}>
                        <sphereGeometry args={[0.01 + Math.random() * 0.02, 6, 6]} />
                        <meshBasicMaterial
                            color={['#fbbf24', '#60a5fa', '#a78bfa', '#4ade80'][Math.floor(Math.random() * 4)]}
                            transparent
                            opacity={0.4 + Math.random() * 0.3}
                        />
                    </mesh>
                );
            }), [])}

            {/* Planets */}
            {planets.map((planet) => (
                <EnhancedPlanet
                    key={planet.id}
                    planet={planet}
                    isHovered={hoveredPlanet === planet.id}
                    isFaded={hoveredPlanet !== null && hoveredPlanet !== planet.id}
                    onHover={handleHover}
                />
            ))}

            {/* Pierre the Pilot */}
            <PierreThePilot mousePosition={mousePosition} />
        </>
    );
}

export default function HeroScene() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            setMousePosition({ x, y });
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen bg-gradient-to-b from-navy-800 via-navy-900 to-navy-900"
            onMouseMove={handleMouseMove}
        >
            {/* 3D Canvas */}
            <Canvas
                className="absolute inset-0"
                dpr={[1, 2]}
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <Scene mousePosition={mousePosition} />
                </Suspense>
            </Canvas>

            {/* Overlay content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center px-4"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)' }}>
                        Your Parisian
                        <span className="block text-gold-400" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}>Adventure Awaits</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
                        Navigate your student journey with Pierre as your guide through housing,
                        banking, and everything in between.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
                        <Link
                            href="/services"
                            className="btn btn-secondary text-lg px-8 py-4 shadow-2xl"
                        >
                            Explore Services
                        </Link>
                        <Link
                            href="/about"
                            className="btn border-2 border-white text-white hover:bg-white hover:text-navy-700 text-lg px-8 py-4"
                            style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                        >
                            Our Story
                        </Link>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-7 h-12 rounded-full border-2 border-white/40 flex justify-center pt-2.5">
                        <motion.div
                            className="w-2 h-3 rounded-full bg-white/60"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                        />
                    </div>
                    <p className="text-white/50 text-xs mt-2 text-center">Scroll to explore</p>
                </motion.div>
            </div>

            {/* Gradient overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-beige-100 to-transparent z-20" />
        </div>
    );
}
