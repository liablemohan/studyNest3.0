'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { Plane, Sparkles, MapPin } from 'lucide-react';
import Image from 'next/image';

// Preload Pierre model
useGLTF.preload('/models/pierre-mascot.glb');

// 3D Pierre Model Component
interface PierreModelProps {
    mousePosition: { x: number; y: number };
    scale: number;
}

function PierreModel({ mousePosition, scale }: PierreModelProps) {
    const meshRef = useRef<any>();
    const { scene } = useGLTF('/models/pierre-mascot.glb');

    useFrame(() => {
        if (meshRef.current) {
            // Subtle rotation based on mouse position
            meshRef.current.rotation.y = mousePosition.x * 0.3;
            meshRef.current.rotation.x = mousePosition.y * 0.1;
        }
    });

    return (
        <primitive
            ref={meshRef}
            object={scene.clone(true)}
            scale={scale}
            position={[0, -0.5, 0]}
        />
    );
}

// 3D Canvas Component
function Pierre3DCanvas({ mousePosition, modelScale }: { mousePosition: { x: number; y: number }; modelScale: number }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            className="w-full h-full"
            gl={{
                antialias: true,
                alpha: true,
                toneMapping: 2,
                toneMappingExposure: 1.2
            }}
        >
            {/* Professional Three-Point Lighting Setup */}

            {/* Ambient & Environment */}
            <ambientLight intensity={1.2} color="#ffffff" />
            <hemisphereLight
                intensity={0.6}
                color="#ffffff"
                groundColor="#b8a890"
                position={[0, 50, 0]}
            />

            {/* Key Light (Main) - Bright from front-right */}
            <directionalLight
                position={[5, 5, 5]}
                intensity={2.0}
                color="#fff5e6"
            />

            {/* Fill Light - Softer from left */}
            <directionalLight
                position={[-4, 3, 3]}
                intensity={1.2}
                color="#e8f4f8"
            />

            {/* Back Light (Rim) - Creates outline */}
            <directionalLight
                position={[0, 3, -5]}
                intensity={1.5}
                color="#ffd89b"
            />

            {/* Top Light - Adds definition */}
            <pointLight
                position={[0, 10, 0]}
                intensity={1.0}
                color="#ffffff"
                distance={20}
                decay={2}
            />

            {/* Accent Lights for extra dimension */}
            <pointLight
                position={[3, 2, 3]}
                intensity={0.8}
                color="#fff9e6"
            />
            <pointLight
                position={[-3, -1, 2]}
                intensity={0.6}
                color="#e6f3ff"
            />

            <Suspense fallback={null}>
                <PierreModel mousePosition={mousePosition} scale={modelScale} />
            </Suspense>

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 1.8}
                autoRotate
                autoRotateSpeed={0.5}
            />
        </Canvas>
    );
}

export default function PierreBannerCard() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMounted, setIsMounted] = useState(false);
    const [screenWidth, setScreenWidth] = useState(1024);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        setIsMounted(true);

        // Track screen width for responsive scaling
        const updateScreenWidth = () => {
            setScreenWidth(window.innerWidth);
        };

        updateScreenWidth();
        window.addEventListener('resize', updateScreenWidth);

        return () => window.removeEventListener('resize', updateScreenWidth);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        setMousePosition({ x, y });
    };

    // Calculate responsive scale for Pierre model - ensures full model visibility
    const getModelScale = () => {
        if (screenWidth >= 1024) return 1.8;  // Desktop
        if (screenWidth >= 768) return 1.5;   // Tablet
        if (screenWidth >= 640) return 1.2;   // Large mobile
        return 1.0;                            // Small mobile
    };

    const features = [
        { icon: MapPin, text: 'Navigate French bureaucracy with ease' },
        { icon: Plane, text: 'Seamless transition from arrival to settlement' },
        { icon: Sparkles, text: 'Expert guidance every step of the way' },
    ];

    return (
        <section className="section bg-gradient-to-br from-beige-50 via-white to-beige-50 overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-navy-600 to-navy-700 text-white rounded-full text-sm font-semibold mb-4">
                                <Plane className="w-4 h-4" />
                                Your Journey Starts Here
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-5xl font-bold text-navy-700 leading-tight"
                        >
                            Welcome to Your{' '}
                            <span className="bg-gradient-to-r from-gold-500 to-gold-600 bg-clip-text text-transparent">
                                Parisian Adventure
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg text-navy-600/80 leading-relaxed"
                        >
                            StudyNest is your trusted companion for settling into life in Paris.
                            From finding the perfect accommodation to navigating French bureaucracy,
                            we make your transition seamless and stress-free.
                        </motion.p>

                        {/* Features */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="space-y-4"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-beige-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center flex-shrink-0">
                                        <feature.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-navy-700 font-medium">{feature.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <a
                                href="/services"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-navy-600 to-navy-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                            >
                                Explore Our Services
                                <Sparkles className="w-5 h-5" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right: Pierre 3D Model - Responsive across all devices */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 w-full"
                        onMouseMove={handleMouseMove}
                    >
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            {/* Subtle gradient background for depth */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-gold-50/30 rounded-full blur-3xl opacity-60" />

                            {/* Glow effect behind model */}
                            <div className="absolute inset-0 bg-gradient-radial from-gold-200/20 via-transparent to-transparent rounded-full" />

                            {/* 3D Model on larger screens, 2D image on small mobile */}
                            {isMounted ? (
                                screenWidth >= 640 ? (
                                    <div className="relative w-full h-full">
                                        <Pierre3DCanvas mousePosition={mousePosition} modelScale={getModelScale()} />
                                    </div>
                                ) : (
                                    <div className="relative w-full h-full flex items-center justify-center p-4">
                                        <Image
                                            src="/images/pierre-mascot.png"
                                            alt="Pierre the Pilot Mascot"
                                            width={400}
                                            height={400}
                                            className="w-full h-full object-contain drop-shadow-2xl"
                                            priority
                                        />
                                    </div>
                                )
                            ) : (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <div className="w-12 h-12 border-4 border-gold-400 border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}

                            {/* Floating decorative elements */}
                            {!prefersReducedMotion && (
                                <>
                                    <motion.div
                                        className="absolute top-8 right-8 w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg"
                                        animate={{ y: [0, -15, 0] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <span className="text-3xl">🇫🇷</span>
                                    </motion.div>

                                    <motion.div
                                        className="absolute bottom-8 left-8 w-20 h-20 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg"
                                        animate={{ y: [0, 15, 0] }}
                                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                                    >
                                        <span className="text-4xl">✈️</span>
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
