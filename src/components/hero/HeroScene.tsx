'use client';

import React, { useRef, useState, useCallback, Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Html, Line, Trail } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import Link from 'next/link';

// Planet data - Le Petit Prince style
const planets = [
    {
        id: 'accommodation',
        name: 'Accommodation',
        description: 'Find your perfect Parisian home with our trusted housing partners.',
        baseColor: '#22c55e',
        glowColor: '#4ade80',
        position: [0, 0, 0] as [number, number, number],
        size: 0.8,
        icon: '🏠',
        link: '/services#housing',
        orbitingItems: 'buildings',
    },
    {
        id: 'banking',
        name: 'Banking',
        description: 'Open your French bank account with same-day activation support.',
        baseColor: '#f59e0b',
        glowColor: '#fbbf24',
        position: [5, 2, -3] as [number, number, number],
        size: 0.7,
        icon: '💳',
        link: '/services#banking',
        orbitingItems: 'coins',
    },
    {
        id: 'sim',
        name: 'SIM Card',
        description: 'Stay connected with student-friendly mobile plans.',
        baseColor: '#ec4899',
        glowColor: '#f472b6',
        position: [-5, -1, -2] as [number, number, number],
        size: 0.6,
        icon: '📄',
        link: '/services#sim',
        orbitingItems: 'sims',
    },
    {
        id: 'travel',
        name: 'Travel',
        description: 'Explore Europe with exclusive student travel deals.',
        baseColor: '#3b82f6',
        glowColor: '#60a5fa',
        position: [4, -3, -4] as [number, number, number],
        size: 0.65,
        icon: '✈️',
        link: '/services#subsidy',
        orbitingItems: 'planes',
    },
    {
        id: 'jobs',
        name: 'Jobs',
        description: 'Find part-time jobs that fit your student schedule.',
        baseColor: '#8b5cf6',
        glowColor: '#a78bfa',
        position: [-4, 3, -3] as [number, number, number],
        size: 0.55,
        icon: '💼',
        link: '/services#jobs',
        orbitingItems: 'briefcases',
    },
];

// =====================================================
// ORBITING ELEMENTS
// =====================================================

// Orbiting Buildings (for Accommodation planet)
function OrbitingBuildings({ planetSize }: { planetSize: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.008;
        }
    });

    return (
        <group ref={groupRef}>
            {[0, Math.PI * 0.66, Math.PI * 1.33].map((angle, i) => {
                const radius = planetSize * 2;
                const heights = [0.15, 0.25, 0.2];
                return (
                    <group key={i} rotation={[0, angle, 0]}>
                        <mesh position={[radius, 0, 0]}>
                            <boxGeometry args={[0.08, heights[i], 0.08]} />
                            <meshStandardMaterial color="#cbd5e1" metalness={0.3} roughness={0.7} />
                        </mesh>
                        {/* Windows */}
                        {[...Array(3)].map((_, w) => (
                            <mesh key={w} position={[radius + 0.041, -heights[i] / 2 + 0.05 + w * 0.06, 0]}>
                                <boxGeometry args={[0.001, 0.03, 0.03]} />
                                <meshBasicMaterial color="#fef08a" />
                            </mesh>
                        ))}
                    </group>
                );
            })}
        </group>
    );
}

// Orbiting Coins (for Banking planet)
function OrbitingCoins({ planetSize }: { planetSize: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.015;
        }
    });

    return (
        <group ref={groupRef}>
            {[0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].map((angle, i) => {
                const radius = planetSize * 1.8;
                const yOffset = Math.sin(angle * 2) * 0.2;
                return (
                    <group key={i} rotation={[0, angle, 0]}>
                        <mesh position={[radius, yOffset, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.06, 0.06, 0.015, 16]} />
                            <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
                        </mesh>
                        {/* Coin shine */}
                        <mesh position={[radius, yOffset + 0.008, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <circleGeometry args={[0.04, 16]} />
                            <meshBasicMaterial color="#fef3c7" transparent opacity={0.5} />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
}

// Orbiting SIM Cards
function OrbitingSIMs({ planetSize }: { planetSize: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.01;
            groupRef.current.rotation.z = Math.sin(Date.now() * 0.001) * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {[0, Math.PI * 0.66, Math.PI * 1.33].map((angle, i) => {
                const radius = planetSize * 2;
                return (
                    <group key={i} rotation={[0, angle, 0]}>
                        {/* SIM Card */}
                        <mesh position={[radius, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
                            <boxGeometry args={[0.12, 0.08, 0.008]} />
                            <meshStandardMaterial color="#f9a8d4" metalness={0.4} roughness={0.5} />
                        </mesh>
                        {/* Chip */}
                        <mesh position={[radius - 0.02, 0.01, 0.005]} rotation={[0, 0, Math.PI / 6]}>
                            <boxGeometry args={[0.03, 0.025, 0.003]} />
                            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
}

// Orbiting Paper Planes (for Travel planet)
function OrbitingPlanes({ planetSize }: { planetSize: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.02;
        }
    });

    return (
        <group ref={groupRef}>
            {[0, Math.PI * 0.5, Math.PI, Math.PI * 1.5].map((angle, i) => {
                const radius = planetSize * 2.2;
                const yOffset = Math.sin(angle * 3) * 0.3;
                return (
                    <group key={i} rotation={[0, angle, 0]}>
                        {/* Paper airplane body */}
                        <group position={[radius, yOffset, 0]} rotation={[0, -Math.PI / 2, Math.PI / 12]}>
                            <mesh>
                                <coneGeometry args={[0.03, 0.12, 3]} />
                                <meshStandardMaterial color="#f8fafc" metalness={0.1} roughness={0.8} side={THREE.DoubleSide} />
                            </mesh>
                            {/* Wing fold line */}
                            <mesh position={[0, -0.02, 0]} rotation={[0, 0, 0]}>
                                <boxGeometry args={[0.08, 0.002, 0.001]} />
                                <meshBasicMaterial color="#94a3b8" />
                            </mesh>
                        </group>
                    </group>
                );
            })}
        </group>
    );
}

// Orbiting Briefcases (for Jobs planet)
function OrbitingBriefcases({ planetSize }: { planetSize: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.012;
        }
    });

    return (
        <group ref={groupRef}>
            {[0, Math.PI * 0.66, Math.PI * 1.33].map((angle, i) => {
                const radius = planetSize * 1.9;
                return (
                    <group key={i} rotation={[0, angle, 0]}>
                        {/* Briefcase body */}
                        <mesh position={[radius, 0, 0]}>
                            <boxGeometry args={[0.1, 0.07, 0.03]} />
                            <meshStandardMaterial color="#7c3aed" metalness={0.4} roughness={0.6} />
                        </mesh>
                        {/* Handle */}
                        <mesh position={[radius, 0.05, 0]}>
                            <torusGeometry args={[0.025, 0.006, 8, 16, Math.PI]} />
                            <meshStandardMaterial color="#4c1d95" metalness={0.6} roughness={0.4} />
                        </mesh>
                        {/* Clasp */}
                        <mesh position={[radius, 0, 0.016]}>
                            <boxGeometry args={[0.02, 0.015, 0.003]} />
                            <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
}

// Get orbiting component based on type
function OrbitingElements({ type, planetSize }: { type: string; planetSize: number }) {
    switch (type) {
        case 'buildings': return <OrbitingBuildings planetSize={planetSize} />;
        case 'coins': return <OrbitingCoins planetSize={planetSize} />;
        case 'sims': return <OrbitingSIMs planetSize={planetSize} />;
        case 'planes': return <OrbitingPlanes planetSize={planetSize} />;
        case 'briefcases': return <OrbitingBriefcases planetSize={planetSize} />;
        default: return null;
    }
}

// =====================================================
// ROSE PETALS (Le Petit Prince reference)
// =====================================================
function RosePetals() {
    const petalsRef = useRef<THREE.Group>(null);

    // Create petal positions using useMemo for performance
    const petals = useMemo(() => {
        return [...Array(12)].map((_, i) => ({
            x: (Math.random() - 0.5) * 20,
            y: (Math.random() - 0.5) * 15 + 5,
            z: (Math.random() - 0.5) * 10,
            rotationSpeed: 0.01 + Math.random() * 0.02,
            fallSpeed: 0.005 + Math.random() * 0.01,
            swaySpeed: 0.5 + Math.random() * 0.5,
            swayAmount: 0.5 + Math.random() * 1,
            size: 0.05 + Math.random() * 0.05,
        }));
    }, []);

    useFrame((state) => {
        if (petalsRef.current) {
            petalsRef.current.children.forEach((petal, i) => {
                const data = petals[i];
                // Fall and sway
                petal.position.y -= data.fallSpeed;
                petal.position.x += Math.sin(state.clock.elapsedTime * data.swaySpeed) * 0.01;
                petal.rotation.x += data.rotationSpeed;
                petal.rotation.z += data.rotationSpeed * 0.5;

                // Reset when fallen too low
                if (petal.position.y < -8) {
                    petal.position.y = 10;
                    petal.position.x = (Math.random() - 0.5) * 20;
                }
            });
        }
    });

    return (
        <group ref={petalsRef}>
            {petals.map((petal, i) => (
                <mesh key={i} position={[petal.x, petal.y, petal.z]}>
                    <sphereGeometry args={[petal.size, 8, 4]} />
                    <meshBasicMaterial
                        color={i % 2 === 0 ? '#f43f5e' : '#fda4af'}
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            ))}
        </group>
    );
}

// =====================================================
// CONSTELLATION LINES
// =====================================================
function ConstellationLines({ activePlanetIndex, scrollProgress }: { activePlanetIndex: number; scrollProgress: number }) {
    const linesRef = useRef<THREE.Group>(null);

    // Create constellation points connecting planets
    const points: [number, number, number][] = planets.map(p => p.position);

    useFrame((state) => {
        if (linesRef.current) {
            // Subtle twinkle effect
            linesRef.current.children.forEach((line, i) => {
                const material = (line as THREE.Line).material as THREE.LineBasicMaterial;
                material.opacity = 0.2 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.1;
            });
        }
    });

    return (
        <group ref={linesRef}>
            {/* Connect each planet to nearby planets */}
            {points.map((startPoint, i) =>
                points.slice(i + 1).map((endPoint, j) => {
                    const distance = Math.sqrt(
                        Math.pow(startPoint[0] - endPoint[0], 2) +
                        Math.pow(startPoint[1] - endPoint[1], 2) +
                        Math.pow(startPoint[2] - endPoint[2], 2)
                    );
                    // Only connect relatively close planets
                    if (distance < 8) {
                        return (
                            <Line
                                key={`${i}-${j}`}
                                points={[startPoint, endPoint]}
                                color="#d69e2e"
                                lineWidth={1}
                                transparent
                                opacity={0.25}
                                dashed
                                dashScale={3}
                                dashSize={0.1}
                                dashOffset={0}
                            />
                        );
                    }
                    return null;
                })
            )}

            {/* Highlight active path */}
            {activePlanetIndex > 0 && (
                <Line
                    points={[planets[activePlanetIndex - 1].position, planets[activePlanetIndex].position]}
                    color="#fbbf24"
                    lineWidth={2}
                    transparent
                    opacity={0.6}
                />
            )}
        </group>
    );
}

// =====================================================
// PLANET WITH ASTEROID B-612 STYLE
// =====================================================
interface PlanetProps {
    planet: typeof planets[0];
    isActive: boolean;
    isFaded: boolean;
    scrollProgress: number;
}

function Planet({ planet, isActive, isFaded, scrollProgress }: PlanetProps) {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.003;
        }

        if (meshRef.current) {
            const targetScale = isActive || isHovered ? 1.15 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    const handlePointerEnter = useCallback(() => {
        setIsHovered(true);
        setShowPopup(true);
        document.body.style.cursor = 'pointer';
    }, []);

    const handlePointerLeave = useCallback(() => {
        setIsHovered(false);
        setShowPopup(false);
        document.body.style.cursor = 'default';
    }, []);

    const handleClick = useCallback(() => {
        window.location.href = planet.link;
    }, [planet.link]);

    return (
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
            <group ref={groupRef} position={planet.position}>
                {/* Asteroid-style planet with bumpy surface */}
                <mesh
                    ref={meshRef}
                    onPointerEnter={handlePointerEnter}
                    onPointerLeave={handlePointerLeave}
                    onClick={handleClick}
                >
                    <icosahedronGeometry args={[planet.size, 1]} />
                    <meshPhysicalMaterial
                        color={planet.baseColor}
                        metalness={0.2}
                        roughness={0.8}
                        flatShading
                        transparent
                        opacity={isFaded ? 0.2 : 1}
                    />
                </mesh>

                {/* Watercolor glow effect */}
                <mesh>
                    <sphereGeometry args={[planet.size * 1.3, 32, 32]} />
                    <meshBasicMaterial
                        color={planet.glowColor}
                        transparent
                        opacity={isActive || isHovered ? 0.35 : isFaded ? 0.05 : 0.15}
                        side={THREE.BackSide}
                    />
                </mesh>

                {/* Soft neon outer glow */}
                <mesh>
                    <sphereGeometry args={[planet.size * 1.6, 32, 32]} />
                    <meshBasicMaterial
                        color={planet.glowColor}
                        transparent
                        opacity={isActive || isHovered ? 0.15 : 0.05}
                        side={THREE.BackSide}
                    />
                </mesh>

                {/* Ground details - small rocks on surface */}
                {!isFaded && [...Array(5)].map((_, i) => {
                    const theta = (i / 5) * Math.PI * 2;
                    const phi = Math.PI / 2 + (Math.random() - 0.5) * 0.5;
                    const r = planet.size * 0.98;
                    return (
                        <mesh
                            key={i}
                            position={[
                                r * Math.sin(phi) * Math.cos(theta),
                                r * Math.cos(phi),
                                r * Math.sin(phi) * Math.sin(theta),
                            ]}
                        >
                            <icosahedronGeometry args={[0.04 + Math.random() * 0.03, 0]} />
                            <meshStandardMaterial color="#64748b" flatShading />
                        </mesh>
                    );
                })}

                {/* Orbiting elements */}
                {!isFaded && <OrbitingElements type={planet.orbitingItems} planetSize={planet.size} />}

                {/* Icon */}
                <Html
                    center
                    distanceFactor={5}
                    style={{
                        opacity: isFaded ? 0.2 : 1,
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
                        position={[0, planet.size + 1.2, 0]}
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

// =====================================================
// PIERRE THE PILOT ON B-612
// =====================================================
interface PierreProps {
    targetPlanetIndex: number;
    scrollProgress: number;
}

function PierreThePilot({ targetPlanetIndex, scrollProgress }: PierreProps) {
    const groupRef = useRef<THREE.Group>(null);
    const propellerRef = useRef<THREE.Group>(null);
    const targetPosition = useRef(new THREE.Vector3(0, 0, 3));

    // Calculate position based on scroll - fly between planets
    useFrame((state) => {
        if (groupRef.current) {
            // Calculate target based on scroll
            const currentPlanet = planets[targetPlanetIndex];
            const targetPos = new THREE.Vector3(
                currentPlanet.position[0],
                currentPlanet.position[1] + 1.5,
                currentPlanet.position[2] + 2
            );

            targetPosition.current.lerp(targetPos, 0.02);
            groupRef.current.position.copy(targetPosition.current);

            // Face forward with slight banking
            const direction = targetPos.clone().sub(groupRef.current.position);
            if (direction.length() > 0.1) {
                const targetRotationY = Math.atan2(direction.x, direction.z);
                groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
                groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -direction.x * 0.1, 0.05);
            }
        }

        if (propellerRef.current) {
            propellerRef.current.rotation.z += 0.5;
        }
    });

    return (
        <Trail
            width={1}
            length={6}
            color="#fbbf24"
            attenuation={(t) => t * t}
        >
            <group ref={groupRef}>
                <Float speed={3} rotationIntensity={0.08} floatIntensity={0.15}>
                    {/* Main fuselage */}
                    <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                        <capsuleGeometry args={[0.1, 0.4, 12, 24]} />
                        <meshPhysicalMaterial color="#f9d872" metalness={0.4} roughness={0.3} clearcoat={0.8} />
                    </mesh>

                    {/* Cockpit */}
                    <mesh position={[0.08, 0.1, 0]}>
                        <sphereGeometry args={[0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshPhysicalMaterial color="#87ceeb" metalness={0.1} roughness={0.1} transparent opacity={0.7} />
                    </mesh>

                    {/* Upper wing */}
                    <mesh position={[0, 0.12, 0]}>
                        <boxGeometry args={[0.12, 0.015, 0.7]} />
                        <meshPhysicalMaterial color="#f9d872" metalness={0.3} roughness={0.4} />
                    </mesh>

                    {/* Lower wing */}
                    <mesh position={[0, -0.06, 0]}>
                        <boxGeometry args={[0.1, 0.015, 0.6]} />
                        <meshPhysicalMaterial color="#f9d872" metalness={0.3} roughness={0.4} />
                    </mesh>

                    {/* Wing struts */}
                    {[-0.2, 0.2].map((z) => (
                        <mesh key={z} position={[0, 0.03, z]}>
                            <cylinderGeometry args={[0.008, 0.008, 0.18, 8]} />
                            <meshStandardMaterial color="#8B4513" metalness={0.5} roughness={0.5} />
                        </mesh>
                    ))}

                    {/* Tail vertical */}
                    <mesh position={[-0.28, 0.06, 0]}>
                        <boxGeometry args={[0.12, 0.12, 0.015]} />
                        <meshPhysicalMaterial color="#f9d872" metalness={0.3} roughness={0.4} />
                    </mesh>

                    {/* Tail horizontal */}
                    <mesh position={[-0.28, 0.04, 0]}>
                        <boxGeometry args={[0.08, 0.015, 0.2]} />
                        <meshPhysicalMaterial color="#f9d872" metalness={0.3} roughness={0.4} />
                    </mesh>

                    {/* Propeller hub */}
                    <mesh position={[0.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.03, 0.04, 0.04, 16]} />
                        <meshStandardMaterial color="#4a5568" metalness={0.8} roughness={0.2} />
                    </mesh>

                    {/* Propeller blades */}
                    <group ref={propellerRef} position={[0.31, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((rotation, i) => (
                            <mesh key={i} rotation={[0, 0, rotation]}>
                                <boxGeometry args={[0.015, 0.2, 0.008]} />
                                <meshStandardMaterial color="#2d3748" metalness={0.7} roughness={0.3} />
                            </mesh>
                        ))}
                    </group>

                    {/* Red scarf flowing behind */}
                    <group position={[-0.1, 0.08, 0]}>
                        {[0, 0.08, 0.16, 0.24].map((offset, i) => (
                            <mesh key={i} position={[-offset, -0.02 * i, Math.sin(offset * 10) * 0.03]}>
                                <boxGeometry args={[0.08 - i * 0.015, 0.04, 0.01]} />
                                <meshStandardMaterial color="#ef4444" />
                            </mesh>
                        ))}
                    </group>

                    {/* Pilot goggles */}
                    <group position={[0.14, 0.1, 0]}>
                        <mesh position={[0, 0, 0.04]}>
                            <torusGeometry args={[0.028, 0.01, 8, 16]} />
                            <meshStandardMaterial color="#78350f" metalness={0.6} roughness={0.3} />
                        </mesh>
                        <mesh position={[0, 0, -0.04]}>
                            <torusGeometry args={[0.028, 0.01, 8, 16]} />
                            <meshStandardMaterial color="#78350f" metalness={0.6} roughness={0.3} />
                        </mesh>
                    </group>

                    {/* Wheels */}
                    {[-0.1, 0.1].map((z) => (
                        <group key={z} position={[0, -0.16, z]}>
                            <mesh rotation={[Math.PI / 2, 0, 0]}>
                                <torusGeometry args={[0.035, 0.012, 8, 16]} />
                                <meshStandardMaterial color="#1a1a1a" />
                            </mesh>
                            <mesh position={[0, 0.05, 0]} rotation={[0, 0, 0.15 * (z > 0 ? 1 : -1)]}>
                                <cylinderGeometry args={[0.006, 0.006, 0.1, 6]} />
                                <meshStandardMaterial color="#4a5568" metalness={0.7} roughness={0.3} />
                            </mesh>
                        </group>
                    ))}
                </Float>
            </group>
        </Trail>
    );
}

// =====================================================
// PARALLAX STARS
// =====================================================
function ParallaxStars({ scrollY }: { scrollY: number }) {
    const layer1 = useRef<THREE.Points>(null);
    const layer2 = useRef<THREE.Points>(null);
    const layer3 = useRef<THREE.Points>(null);

    useFrame(() => {
        if (layer1.current) layer1.current.position.y = scrollY * 0.05;
        if (layer2.current) layer2.current.position.y = scrollY * 0.1;
        if (layer3.current) layer3.current.position.y = scrollY * 0.15;
    });

    return (
        <>
            <Stars ref={layer1 as any} radius={100} depth={30} count={1500} factor={4} saturation={0.1} fade speed={0.3} />
            <Stars ref={layer2 as any} radius={80} depth={40} count={1000} factor={5} saturation={0.2} fade speed={0.5} />
            <Stars ref={layer3 as any} radius={60} depth={50} count={800} factor={6} saturation={0.3} fade speed={0.7} />
        </>
    );
}

// =====================================================
// MAIN SCENE
// =====================================================
function Scene({ scrollProgress, scrollY }: { scrollProgress: number; scrollY: number }) {
    const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);

    // Calculate active planet based on scroll
    const activePlanetIndex = Math.min(
        Math.floor(scrollProgress * planets.length),
        planets.length - 1
    );

    return (
        <>
            {/* Enhanced Lighting for watercolor effect */}
            <ambientLight intensity={0.25} color="#fef9e7" />
            <pointLight position={[10, 10, 10]} intensity={1.2} color="#fef9e7" />
            <pointLight position={[-10, -5, -5]} intensity={0.4} color="#60a5fa" />
            <pointLight position={[5, -8, 5]} intensity={0.3} color="#f9a8d4" />
            <spotLight
                position={[0, 15, 5]}
                intensity={0.8}
                color="#fbbf24"
                angle={0.5}
                penumbra={0.8}
            />

            {/* Parallax star layers */}
            <ParallaxStars scrollY={scrollY} />

            {/* Constellation lines */}
            <ConstellationLines activePlanetIndex={activePlanetIndex} scrollProgress={scrollProgress} />

            {/* Rose petals */}
            <RosePetals />

            {/* Planets */}
            {planets.map((planet, index) => (
                <Planet
                    key={planet.id}
                    planet={planet}
                    isActive={index === activePlanetIndex}
                    isFaded={hoveredPlanet !== null && hoveredPlanet !== planet.id}
                    scrollProgress={scrollProgress}
                />
            ))}

            {/* Pierre the Pilot */}
            <PierreThePilot targetPlanetIndex={activePlanetIndex} scrollProgress={scrollProgress} />
        </>
    );
}

// =====================================================
// HERO SECTION COMPONENT
// =====================================================
export default function HeroScene() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrollTop / (docHeight * 0.5), 1); // Use first 50% of page for full navigation
            setScrollY(scrollTop);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[200vh]"
            style={{
                background: 'linear-gradient(180deg, #1e3a5f 0%, #0f172a 30%, #1a1a2e 60%, #0f172a 100%)',
            }}
        >
            {/* Fixed 3D Canvas */}
            <div className="fixed top-0 left-0 w-full h-screen z-0">
                <Canvas
                    dpr={[1, 2]}
                    camera={{ position: [0, 0, 10], fov: 50 }}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Suspense fallback={null}>
                        <Scene scrollProgress={scrollProgress} scrollY={scrollY} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Hero content - sticky */}
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center z-10 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center px-4"
                >
                    <motion.p
                        className="text-gold-400 text-lg md:text-xl font-medium mb-4 tracking-wider"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        ✨ Welcome to Your Little Prince Journey ✨
                    </motion.p>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display drop-shadow-2xl">
                        Navigate Paris
                        <span className="block text-gold-400 drop-shadow-lg">Like a Local</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-beige-200/90 max-w-2xl mx-auto mb-10 drop-shadow-md">
                        Join Pierre on his biplane as he guides you through the essential services
                        every international student needs in their new Parisian home.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
                        <Link
                            href="/services"
                            className="btn btn-secondary text-lg px-8 py-4 shadow-2xl hover:shadow-gold-500/30"
                        >
                            Begin Your Journey
                        </Link>
                        <Link
                            href="/about"
                            className="btn btn-outline border-white/70 text-white hover:bg-white hover:text-navy-700 text-lg px-8 py-4"
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
                    <div className="w-7 h-12 rounded-full border-2 border-gold-400/50 flex justify-center pt-2.5">
                        <motion.div
                            className="w-2 h-3 rounded-full bg-gold-400/70"
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                        />
                    </div>
                    <p className="text-gold-400/60 text-xs mt-2 text-center">Scroll to explore planets</p>
                </motion.div>
            </div>

            {/* Planet indicators */}
            <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
                {planets.map((planet, index) => (
                    <motion.div
                        key={planet.id}
                        className="flex items-center gap-3 cursor-pointer group"
                        animate={{
                            opacity: Math.floor(scrollProgress * planets.length) === index ? 1 : 0.4,
                            scale: Math.floor(scrollProgress * planets.length) === index ? 1 : 0.9,
                        }}
                        onClick={() => {
                            const targetScroll = (index / planets.length) * (document.documentElement.scrollHeight - window.innerHeight) * 0.5;
                            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                        }}
                    >
                        <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            {planet.name}
                        </span>
                        <div
                            className="w-4 h-4 rounded-full border-2 transition-all"
                            style={{
                                borderColor: planet.glowColor,
                                backgroundColor: Math.floor(scrollProgress * planets.length) === index ? planet.glowColor : 'transparent',
                            }}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Bottom gradient */}
            <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-beige-100 to-transparent z-30 pointer-events-none" />
        </div>
    );
}
