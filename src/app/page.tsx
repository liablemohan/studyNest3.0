'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Achievements from '@/components/landing/Achievements';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import CTASection from '@/components/landing/CTASection';

// Dynamic import for 3D scene to avoid SSR issues
const HeroScene = dynamic(() => import('@/components/hero/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gradient-to-b from-navy-800 to-navy-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gold-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-beige-200">Loading your adventure...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <main>
      <Header />

      {/* 3D Hero Section */}
      <HeroScene />

      {/* Achievements & Stats */}
      <Achievements />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection />

      <Footer />
    </main>
  );
}
