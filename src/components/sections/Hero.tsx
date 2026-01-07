import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";

export const Hero: React.FC = () => {
    const lenis = useLenis();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative overflow-hidden brand-bg">

            <style>{`
        .hero-text-shadow {
          text-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .brand-bg {
          background: radial-gradient(circle at 50% 100%, #ffffff 0%, #ebf8ff 40%, #bfdbfe 100%);
        }
      `}</style>

            <div className="min-h-screen flex items-center relative py-20 lg:py-0">
                <div className="w-full max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* LEFT COLUMN: TEXT CONTENT */}
                    <motion.div
                        style={{ y, opacity }}
                        className="flex-1 text-left z-10 relative"
                    >
                        <h1
                            className="font-archivo font-semibold text-[64px] leading-[70px] text-black mb-8 hero-text-shadow tracking-tight"
                        >
                            Power
                            <span className="inline-flex align-middle mx-3 md:mx-5 transform translate-y-[-4px]">
                                <div
                                    className="bg-[#0051FF]/80 backdrop-blur-md border border-white/20 p-2 md:p-3 rounded-2xl shadow-[0_15px_30px_-5px_rgba(0,81,255,0.3)] flex items-center justify-center"
                                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                                >
                                    <div className="grid grid-cols-2 gap-1 md:gap-1.5">
                                        {/* Instagram */}
                                        <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                        {/* TikTok */}
                                        <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
                                        </svg>
                                        {/* Facebook */}
                                        <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                        {/* LinkedIn */}
                                        <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </div>
                                </div>
                            </span>
                            up
                            <br />
                            your socials.
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-10 leading-relaxed" style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 400 }}>
                            Boost LinkedIn followers, Instagram engagement, and social media growth with proven strategies.
                        </p>

                        <div className="relative inline-block group mb-16 lg:mb-0">
                            <div className="absolute -inset-1 bg-[#0051FF] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
                            <a
                                href="#start-growing"
                                onClick={(e) => {
                                    e.preventDefault();
                                    const el = document.querySelector("#start-growing");
                                    if (el) lenis?.scrollTo(el as HTMLElement);
                                }}
                                className="relative flex items-center bg-[#0051FF] text-white text-lg px-8 py-4 rounded-full shadow-[0_10px_25px_-5px_rgba(0,81,255,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(0,81,255,0.6)] hover:scale-105 transition-all duration-200"
                                style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 400 }}
                            >
                                Schedule Meet <span className="ml-2">→</span>
                            </a>
                        </div>

                        {/* Floating Instagram Profiles (Clustered Below Button) */}
                        <div className="absolute top-full lg:left-64 -mt-4 hidden lg:block pointer-events-none w-[500px] h-[300px]">
                            {/* Sarah Creative - Instagram Layout */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                                transition={{
                                    opacity: { duration: 1, delay: 0.5 },
                                    x: { duration: 1, delay: 0.5 },
                                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="absolute top-0 left-0 w-52"
                            >
                                {/* Stacked Background */}
                                <div className="absolute -inset-2 bg-blue-100/60 rounded-2xl -rotate-6 shadow-md border border-blue-200/50"></div>

                                <div className="relative bg-white p-2.5 rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                            <span className="font-bold text-slate-900 text-[10px]">sarah_creative</span>
                                        </div>
                                        <svg className="w-3 h-3 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                                    </div>

                                    {/* Profile Info Row */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full p-[1.5px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                                                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80" className="w-full h-full rounded-full object-cover border-2 border-white" alt="Sarah" />
                                            </div>
                                        </div>
                                        <div className="flex-1 flex justify-between text-center pr-2">
                                            <div>
                                                <p className="font-bold text-slate-900 text-[11px]">182</p>
                                                <p className="text-[9px] text-slate-500">Posts</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-[11px]">12.5k</p>
                                                <p className="text-[9px] text-slate-500">Followers</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-[11px]">432</p>
                                                <p className="text-[9px] text-slate-500">Following</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <div className="mb-2">
                                        <p className="font-bold text-slate-900 text-[10px]">Sarah Jenkins</p>
                                        <p className="text-[9px] text-slate-600 leading-tight">Digital Creator 🎨<br />Capturing moments ✨</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-1.5 mb-2">
                                        <button className="flex-1 bg-[#0095F6] text-white text-[10px] font-bold py-1 rounded-lg">Follow</button>
                                        <button className="flex-1 bg-slate-100 text-slate-900 text-[10px] font-bold py-1 rounded-lg">Message</button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Alex Tech - Instagram Layout */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0, y: [0, 15, 0] }}
                                transition={{
                                    opacity: { duration: 1, delay: 0.8 },
                                    x: { duration: 1, delay: 0.8 },
                                    y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                }}
                                className="absolute top-12 left-32 w-52 z-[1]"
                            >
                                {/* Stacked Background */}
                                <div className="absolute -inset-2 bg-blue-100/60 rounded-2xl rotate-3 shadow-md border border-blue-200/50"></div>

                                <div className="relative bg-white p-2.5 rounded-xl shadow-xl border border-slate-100 overflow-hidden">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                                            <span className="font-bold text-slate-900 text-[10px]">alex_techwins</span>
                                        </div>
                                        <svg className="w-3 h-3 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                                    </div>

                                    {/* Profile Info Row */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full p-[1.5px] bg-slate-100">
                                                <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80" className="w-full h-full rounded-full object-cover border-2 border-white" alt="Alex" />
                                            </div>
                                        </div>
                                        <div className="flex-1 flex justify-between text-center pr-2">
                                            <div>
                                                <p className="font-bold text-slate-900 text-[11px]">542</p>
                                                <p className="text-[9px] text-slate-500">Posts</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-[11px]">85.2k</p>
                                                <p className="text-[9px] text-slate-500">Followers</p>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-[11px]">120</p>
                                                <p className="text-[9px] text-slate-500">Following</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <div className="mb-2">
                                        <p className="font-bold text-slate-900 text-[10px]">Alex Thompson</p>
                                        <p className="text-[9px] text-slate-600 leading-tight">Tech Reviewer 📱<br />New video every Friday! 🎥</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-1.5 mb-2">
                                        <button className="flex-1 bg-slate-100 text-slate-900 text-[10px] font-bold py-1 rounded-lg">Following</button>
                                        <button className="flex-1 bg-slate-100 text-slate-900 text-[10px] font-bold py-1 rounded-lg">Message</button>
                                    </div>
                                </div>

                            </motion.div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: FULL PROFILES */}
                    <motion.div
                        className="flex-1 w-full relative z-20"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative items-center justify-center pt-10">

                            {/* BEFORE PROFILE CARD */}
                            <div className="relative w-full max-w-[300px]">
                                <span className="absolute -top-10 left-4 text-slate-400 text-xs font-archivo font-bold tracking-[0.2em] uppercase opacity-70">Before</span>

                                {/* Floating Badges (Reference Image Exact) */}
                                <div className="absolute -top-6 -left-6 bg-white p-2.5 rounded-xl shadow-lg -rotate-6 border border-red-50 z-30">
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Followers</p>
                                    <div className="text-red-500 font-black text-sm flex items-center gap-1">
                                        <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                                        </svg>
                                        20
                                    </div>
                                </div>

                                <div className="absolute top-40 -right-6 bg-white p-2.5 rounded-xl shadow-lg rotate-3 border border-red-50 z-30">
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Profile views</p>
                                    <div className="text-red-500 font-black text-sm flex items-center gap-1">
                                        <svg className="w-3 h-3 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                                        </svg>
                                        -14%
                                    </div>
                                </div>

                                {/* Stacked Effect */}
                                <div className="absolute -inset-3 bg-blue-100/60 rounded-[2.8rem] -rotate-2 shadow-md border border-blue-200/50"></div>
                                <div className="relative bg-white rounded-[2.2rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] border border-white -rotate-2 hover:rotate-0 transition-transform duration-500 text-left">

                                    {/* Muted Banner with Camera Icon */}
                                    <div className="h-16 bg-slate-100 relative">
                                        <div className="absolute top-3 right-3 bg-slate-200/50 p-1.5 rounded-lg opacity-40">
                                            <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 10c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm9-3h-1c-.552 0-1-.448-1-1s-.448-1-1-1h-12c-.552 0-1 .448-1 1s-.448 1-1 1h-1c-1.654 0-3 1.346-3 3v10c0 1.654 1.346 3 3 3h18c1.654 0 3-1.346 3-3v-10c0-1.654-1.346-3-3-3zm-9 13.5c-3.033 0-5.5-2.467-5.5-5.5s2.467-5.5 5.5-5.5 5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5z" />
                                            </svg>
                                        </div>
                                        <div className="absolute bottom-2 right-3 text-[5px] font-black text-slate-300 uppercase tracking-widest">No stats available</div>
                                    </div>

                                    <div className="px-5 pb-6 pt-0 -mt-10 relative z-10">
                                        {/* Profile Pic with Plus Icon */}
                                        <div className="relative mb-4 inline-block">
                                            <img
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwRuiEzzK2gTED0K2ybqP9yB7EVBMaEHGpemWwBVpzN2eKFKNjA2Pf9RdCfJR9vomKL-GINyEp066FNim4OXk0-7IJ6JhIKUYMw6l5377OLNjCAqDc0fYVfWis-kw6dnu0n8r6RePnYNHD_EneFZErCU8tO-QgSKrQFMKeGy5SMfCumUdzpbuVNSfEJOQlVWNjq0UhLmrokeoGQimMoVxGt9VODUcNgrxtfyte692RqdFiC8MLUsJWZCDa6PTA9oUJBNiDz1QD5Mo"
                                                className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-sm bg-slate-100"
                                                alt="Dylan McKay"
                                            />
                                            <div className="absolute bottom-1 right-1 bg-[#0A66C2] rounded-full p-1 border-[3px] border-white shadow-lg">
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="font-archivo font-bold text-xl text-slate-900 mb-0.5 tracking-tight">Dylan McKay</h3>
                                        <p className="text-slate-600 text-xs font-bold mb-0.5">Chill guy</p>
                                        <p className="text-slate-400 text-[10px] mb-3 leading-snug">Passionate about tech & innovation</p>

                                        <div className="text-[#0A66C2] text-[10px] font-bold mb-5 flex gap-2.5">
                                            <span>20 followers</span>
                                            <span className="text-slate-300">•</span>
                                            <span>2 connections</span>
                                        </div>

                                        {/* Reference Buttons */}
                                        <div className="flex items-center gap-2 w-full pt-1">
                                            <button className="flex-[3] bg-[#0A66C2] text-white text-[10px] font-bold py-2 px-4 rounded-full">Open to</button>
                                            <button className="flex-[3] bg-white border border-slate-300 text-slate-500 text-[10px] font-bold py-2 px-4 rounded-full whitespace-nowrap">Add section</button>
                                            <button className="flex-1 bg-white border border-slate-300 rounded-full p-2 flex justify-center items-center">
                                                <div className="flex gap-0.5">
                                                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* AFTER PROFILE CARD (FULL PAGE) */}
                            <div className="relative w-full max-w-[300px]">
                                <span className="absolute -top-10 right-4 text-[#0A66C2] text-xs font-archivo font-bold tracking-[0.2em] uppercase opacity-90">After</span>

                                {/* Growth Badges ( emerald for after ) */}
                                <div className="absolute -top-6 -right-6 bg-white p-2.5 rounded-xl shadow-lg rotate-6 border border-emerald-50 z-30">
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Followers</p>
                                    <div className="text-emerald-500 font-extrabold text-sm flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                                        </svg>
                                        +2,400
                                    </div>
                                </div>

                                <div className="absolute top-72 -left-6 bg-white p-2.5 rounded-xl shadow-lg -rotate-3 border border-emerald-50 z-30">
                                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Profile views</p>
                                    <div className="text-emerald-500 font-extrabold text-sm flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                                        </svg>
                                        +340%
                                    </div>
                                </div>

                                {/* Stacked Effect */}
                                <div className="absolute -inset-3 bg-blue-100/40 rounded-[2.8rem] rotate-2 shadow-md border border-blue-200/50"></div>
                                <div className="relative bg-white rounded-[2.2rem] overflow-hidden shadow-[0_35px_80px_-15px_rgba(0,0,0,0.18)] border border-white rotate-2 hover:rotate-0 transition-transform duration-500 text-left">

                                    {/* Vibrant Banner */}
                                    <div className="h-16 bg-gradient-to-br from-[#0077b5] to-[#0a66c2] relative">
                                        <div className="absolute top-3 right-3 bg-white/20 p-2 rounded-lg backdrop-blur-md border border-white/30">
                                            <div className="text-[5px] font-black text-white leading-tight uppercase tracking-tighter">
                                                VERIFIED EXPERT
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-5 pb-6 pt-0 -mt-10 relative z-10">
                                        <div className="relative mb-4 inline-block">
                                            <img
                                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwRuiEzzK2gTED0K2ybqP9yB7EVBMaEHGpemWwBVpzN2eKFKNjA2Pf9RdCfJR9vomKL-GINyEp066FNim4OXk0-7IJ6JhIKUYMw6l5377OLNjCAqDc0fYVfWis-kw6dnu0n8r6RePnYNHD_EneFZErCU8tO-QgSKrQFMKeGy5SMfCumUdzpbuVNSfEJOQlVWNjq0UhLmrokeoGQimMoVxGt9VODUcNgrxtfyte692RqdFiC8MLUsJWZCDa6PTA9oUJBNiDz1QD5Mo"
                                                className="w-20 h-20 rounded-full border-[5px] border-white object-cover shadow-lg bg-slate-100 ring-4 ring-blue-50"
                                                alt="Dylan McKay"
                                            />
                                            <div className="absolute bottom-1 right-1 bg-emerald-500 rounded-full p-1.5 border-[3px] border-white shadow-xl">
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" />
                                                </svg>
                                            </div>
                                        </div>

                                        <h3 className="font-archivo font-bold text-xl text-slate-900 mb-0.5 tracking-tight">Dylan McKay</h3>
                                        <p className="text-slate-600 text-xs font-bold mb-0.5">(He/Him)</p>
                                        <p className="text-slate-400 text-[10px] mb-3 leading-snug">CEO & Founder</p>

                                        <div className="text-[#0A66C2] text-[10px] font-bold mb-5 flex gap-2.5">
                                            <span>2,400 followers</span>
                                            <span className="text-slate-300">•</span>
                                            <span>500+ connections</span>
                                        </div>

                                        {/* Standardized Buttons */}
                                        <div className="flex items-center gap-2 w-full pt-1">
                                            <button className="flex-[3] bg-[#0A66C2] text-white text-[10px] font-bold py-2 px-4 rounded-full">Open to</button>
                                            <button className="flex-[3] bg-white border border-slate-300 text-slate-500 text-[10px] font-bold py-2 px-4 rounded-full whitespace-nowrap">Add section</button>
                                            <button className="flex-1 bg-white border border-slate-300 rounded-full p-2 flex justify-center items-center">
                                                <div className="flex gap-0.5">
                                                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                                    <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
