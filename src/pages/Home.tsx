
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { SEO } from '../components/common/SEO';
import { Stats } from '../components/sections/Stats';
import { Benefits } from '../components/sections/Benefits';
import { Suspense, lazy } from 'react';

// Lazy load heavy graphical sections
const Services = lazy(() => import('../components/sections/Services').then(module => ({ default: module.Services })));
const Integrations = lazy(() => import('../components/sections/Integrations').then(module => ({ default: module.Integrations })));
const Testimonials = lazy(() => import('../components/sections/Testimonials').then(module => ({ default: module.Testimonials })));
const Pricing = lazy(() => import('../components/sections/Pricing').then(module => ({ default: module.Pricing })));

export const Home = () => {
    return (
        <div className="min-h-screen bg-white selection:bg-electric-purple/20 selection:text-electric-purple">
            <SEO 
                title="SocialScale | High-Velocity Social Media Growth Engine"
                description="Scale your social presence with AI-driven strategies. Specializing in LinkedIn, Instagram, and TikTok growth for modern brands and creators."
            />
            <Navbar />
            <main>
                <Hero />
                <Stats />
                <Benefits />

                <Suspense fallback={<div className="h-screen bg-white" />}>
                    <Services />
                    <Testimonials />
                    <Pricing />
                    <Integrations />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};
