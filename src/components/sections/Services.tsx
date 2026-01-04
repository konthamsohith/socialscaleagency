
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Mail, MessageCircle, UserCheck, Sparkles, ArrowUpRight, Instagram, Linkedin, Youtube, Music } from 'lucide-react';

// Custom Icons for precision matching


const XIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 4l11.733 16h6.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
);

const FacebookIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);



const SpotifyIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 11s2.5-1.5 8 1" />
        <path d="M7.5 14.5s2.5-1.5 7.5 0.5" />
        <path d="M7 17.5s2-1 6.5 0" />
    </svg>
);





const AnimatedDatabase = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
);

const AnimatedBarChart = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20V14" />
    </svg>
);

export const Services = () => {
    const [isBefore, setIsBefore] = React.useState(false);

    // Scroll Animation Hooks for AI Content Studio Card
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center center"]
    });
    const xLeft = useTransform(scrollYProgress, [0, 1], [-45, -100]);
    const xRight = useTransform(scrollYProgress, [0, 1], [45, 100]);
    const rotateLeft = useTransform(scrollYProgress, [0, 1], [-10, -20]);
    const rotateRight = useTransform(scrollYProgress, [0, 1], [10, 20]);
    const opacityBack = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    // Automatic toggle every 3 seconds
    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsBefore(prev => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const toggleBeforeAfter = () => setIsBefore(!isBefore);

    return (
        <section id="services" className="py-24 px-6 bg-[#F8FAFC] overflow-hidden">
            <div className="max-w-7xl mx-auto w-full space-y-8">

                {/* PART 1: Social Growth Automation */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT COLUMN: Text Content & Small Cards */}
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-archivo font-semibold text-[56px] leading-[62px] text-black mb-8"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#0037FF]">
                                    <path d="M12 0C13.5 7.5 16.5 10.5 24 12C16.5 13.5 13.5 16.5 12 24C10.5 16.5 7.5 13.5 0 12C7.5 10.5 10.5 7.5 12 0Z" />
                                </svg>
                                <span className="font-archivo font-normal text-[14px] leading-[17px] text-black uppercase">SERVICES</span>
                            </div>
                            AI-Powered Scaling Engine
                        </motion.h2>

                        {/* Bullet Points */}
                        <div className="space-y-4 mb-10">
                            {[
                                { title: "Smart Engagement:", text: "Interact with your ideal audience 24/7." },
                                { title: "Viral Analysis:", text: "Predict which content will go viral before posting." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.05 * i }}
                                    className="flex items-start gap-3"
                                >
                                    <Sparkles size={18} className="text-[#0037FF] mt-1 shrink-0" />
                                    <p className="font-archivo font-normal text-[16px] leading-[22px] text-[#6D6D6D]">
                                        <span className="font-archivo font-medium text-[16px] leading-[22px] text-black">{item.title}</span> {item.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Small Cards Grid */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            {/* Card 1: Audience Analytics */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -5 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-white border border-slate-100 rounded-2xl p-6 transition-all duration-300"
                            >
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-[#0055FF]">
                                    <AnimatedDatabase size={24} />
                                </div>
                                <h3 className="font-archivo font-semibold text-[24px] leading-[26px] text-black mb-2">Audience Analytics</h3>
                                <p className="font-archivo font-normal text-[14px] leading-[20px] text-[#6D6D6D] leading-relaxed">
                                    Turn follower data into loyal communities. Know exactly who interacts and why.
                                </p>
                            </motion.div>

                            {/* Card 2: Organic Reach */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -5 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-white border border-slate-100 rounded-2xl p-6 transition-all duration-300"
                            >
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-[#0055FF]">
                                    <AnimatedBarChart size={24} />
                                </div>
                                <h3 className="font-archivo font-semibold text-[24px] leading-[26px] text-black mb-2">Organic Reach</h3>
                                <p className="font-archivo font-normal text-[14px] leading-[20px] text-[#6D6D6D] leading-relaxed">
                                    Expand your visibility naturally. No bots, just real people discovering your brand.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: 24/7 Management Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#D2E7FE] rounded-[32px] p-6"
                    >
                        <div className="mb-6">
                            <h3 className="font-archivo font-semibold text-[24px] leading-[26px] text-black mb-2">24/7 Community Management.</h3>
                            <p className="font-archivo font-normal text-[14px] leading-[20px] text-[#6D6D6D]">Your account grows while you sleep. Never miss a DM or comment again.</p>
                        </div>

                        <div className="bg-white rounded-[24px] shadow-sm h-[320px] relative overflow-hidden w-full flex items-end justify-center">
                            <div className="relative h-[300px] w-full max-w-[500px] mx-auto flex items-end justify-center">

                                {/* Background Arches - Moved inside button for perfect concentricity */}

                                {/* Floating Icons - Absolutely Positioned for Alignment */}
                                {/* Left Far */}
                                <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-[60px] left-[20px] p-3 bg-white rounded-xl shadow-lg border border-blue-100 text-[#0055FF] z-30"
                                >
                                    <Calendar size={24} />
                                </motion.div>

                                {/* Left Near */}
                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-[130px] left-[120px] p-3 bg-white rounded-xl shadow-lg border border-blue-100 text-[#0055FF] z-30"
                                >
                                    <Mail size={24} />
                                </motion.div>

                                {/* Right Near */}
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute bottom-[130px] right-[120px] p-3 bg-white rounded-xl shadow-lg border border-blue-100 text-[#0055FF] z-30"
                                >
                                    <MessageCircle size={24} />
                                </motion.div>

                                {/* Right Far */}
                                <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                    className="absolute bottom-[60px] right-[20px] p-3 bg-white rounded-xl shadow-lg border border-blue-100 text-[#0055FF] z-30"
                                >
                                    <UserCheck size={24} />
                                </motion.div>

                                {/* Central Logic Lines - Perfectly Connecting Icons to Center */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 500 250">
                                    <defs>
                                        <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#0055FF" stopOpacity="0" />
                                            <stop offset="50%" stopColor="#0055FF" stopOpacity="0.5" />
                                            <stop offset="100%" stopColor="#0055FF" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    {[
                                        // Left Far (Calendar): x=44 (20+24 center), y=190 (250-60). Target Center: x=250, y=220
                                        { d: "M 44 190 Q 150 190 220 220", delay: 0 },
                                        // Left Near (Mail): x=144 (120+24), y=120 (250-130). Target Center: x=250, y=220
                                        { d: "M 144 120 Q 200 150 220 220", delay: 0.1 },
                                        // Right Near (Message): x=356 (500-120-24), y=120. Target Center: x=280, y=220
                                        { d: "M 356 120 Q 300 150 280 220", delay: 0.2 },
                                        // Right Far (User): x=456 (500-20-24), y=190. Target Center: x=280, y=220
                                        { d: "M 456 190 Q 350 190 280 220", delay: 0.3 }
                                    ].map((item, i) => (
                                        <g key={i}>
                                            {/* Static Faint Line */}
                                            <path d={item.d} stroke="#E2E8F0" strokeWidth="1" fill="none" />
                                            {/* Traveling Data Packet */}
                                            <motion.path
                                                d={item.d}
                                                stroke="#0055FF"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeDasharray="0 40 4 40"
                                                animate={{ strokeDashoffset: [0, -84] }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: item.delay }}
                                            />
                                        </g>
                                    ))}
                                </svg>

                                {/* Center Pill Button - Positioned consistently */}
                                <div className="relative z-10 mb-8">
                                    {/* Background Arches - Strictly Concentric to Button */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none -z-20">
                                        <motion.div
                                            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.3, 0.5] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute w-[400px] h-[400px] rounded-full border border-blue-100"
                                        />
                                        <motion.div
                                            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 0.6, 0.8] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                            className="absolute w-[300px] h-[300px] rounded-full border border-blue-100 bg-blue-50/30"
                                        />
                                        <div className="absolute w-[200px] h-[200px] rounded-full border border-blue-200 bg-white" />
                                    </div>

                                    <div className="bg-[#0055FF] text-white px-8 py-3 rounded-xl shadow-lg shadow-blue-900/20 font-medium text-sm border border-blue-500/30 flex items-center gap-2">
                                        SocialScale
                                    </div>
                                    <div className="absolute inset-0 bg-blue-600 blur-xl opacity-40 -z-10 rounded-xl animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>


                {/* PART 2: Strategy & Content */}
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Card 1: Viral Growth Strategy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#D2E7FE] rounded-[32px] p-6"
                    >
                        <h3 className="font-archivo font-semibold text-[24px] leading-[26px] text-black mb-2">Viral Growth Strategy</h3>
                        <p className="font-archivo font-normal text-[14px] leading-[20px] text-[#6D6D6D] mb-6">Data-backed roadmaps to skyrocket your follower count.</p>

                        <div className="bg-white rounded-[24px] p-6 shadow-sm h-[320px] relative overflow-hidden group">
                            {/* Before Badge */}
                            {/* Before/After Toggle Badge */}
                            <button
                                onClick={toggleBeforeAfter}
                                className={`absolute top-8 right-8 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 z-10 transition-colors duration-300 ${isBefore
                                    ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                    : "bg-blue-50 text-[#0037FF] hover:bg-blue-100"
                                    }`}
                            >
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${isBefore ? "border-purple-700" : "border-[#0037FF]"
                                    }`}>
                                    <ArrowUpRight size={10} className={`transform transition-transform duration-300 ${isBefore ? "rotate-0 text-purple-700" : "rotate-180 text-[#0037FF]"}`} />
                                </div>
                                {isBefore ? "Before" : "After"}
                            </button>

                            {/* Chart Container */}
                            <div className="absolute bottom-6 left-8 right-8">
                                <div className="flex items-end gap-3 h-[180px] relative">
                                    {/* Axis Lines */}
                                    <div className="absolute left-0 top-0 bottom-0 w-8 border-r-2 border-slate-300 flex flex-col justify-between py-2 pr-2">
                                        <div className="h-0.5 w-2 bg-slate-400 ml-auto rounded-full" />
                                        <div className="h-0.5 w-3 bg-slate-400 ml-auto rounded-full" />
                                        <div className="h-0.5 w-2 bg-slate-400 ml-auto rounded-full" />
                                        <div className="h-0.5 w-3 bg-slate-400 ml-auto rounded-full" />
                                    </div>

                                    {/* Bars & Labels */}
                                    <div className="flex-1 flex flex-col gap-6 pl-12">

                                        {/* Row 1: Growth */}
                                        <div className="flex items-center gap-4">
                                            <motion.div
                                                animate={{ width: isBefore ? "20%" : "100%" }}
                                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                                className={`h-10 rounded-lg border relative transition-all duration-500 ${isBefore
                                                    ? "bg-slate-200 border-slate-300"
                                                    : "bg-[#0037FF]/10 border-[#0037FF]"
                                                    }`}
                                            >
                                                <motion.div
                                                    key={isBefore ? "before-growth" : "after-growth"}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className={`absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap transition-colors duration-500 ${isBefore ? "bg-slate-400" : "bg-[#001766]"
                                                        }`}
                                                >
                                                    {isBefore ? "Followers +10%" : "Followers +500%"}
                                                </motion.div>
                                            </motion.div>
                                        </div>

                                        {/* Row 2: Efficiency */}
                                        <div className="flex items-center gap-4">
                                            <motion.div
                                                animate={{ width: isBefore ? "15%" : "70%" }}
                                                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                                                className={`h-10 rounded-lg border relative transition-all duration-500 ${isBefore
                                                    ? "bg-slate-200 border-slate-300"
                                                    : "bg-[#0037FF]/10 border-[#0037FF]"
                                                    }`}
                                            >
                                                <motion.div
                                                    key={isBefore ? "before-efficiency" : "after-efficiency"}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className={`absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap transition-colors duration-500 ${isBefore ? "bg-slate-400" : "bg-[#0027b3]"
                                                        }`}
                                                >
                                                    {isBefore ? "Engagement +5%" : "Engagement +300%"}
                                                </motion.div>
                                            </motion.div>
                                        </div>

                                        {/* Row 3: Cost */}
                                        <div className="flex items-center gap-4">
                                            <motion.div
                                                animate={{ width: isBefore ? "90%" : "20%" }}
                                                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                                                className={`h-10 rounded-lg border relative transition-all duration-500 ${isBefore
                                                    ? "bg-red-100 border-red-200"
                                                    : "bg-[#0037FF]/10 border-[#0037FF]"
                                                    }`}
                                            >
                                                <motion.div
                                                    key={isBefore ? "before-cost" : "after-cost"}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className={`absolute right-2 top-1/2 -translate-y-1/2 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap transition-colors duration-500 ${isBefore ? "bg-red-500" : "bg-[#0037FF]"
                                                        }`}
                                                >
                                                    {isBefore ? "Ad Spend +100%" : "Ad Spend -100%"}
                                                </motion.div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                                {/* Skeleton Lines at bottom */}
                                <div className="mt-6 flex flex-col gap-2 opacity-80">
                                    <div className="bg-slate-200 h-2 w-full rounded-full" />
                                    <div className="bg-slate-200 h-2 w-2/3 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: AI Content Studio */}
                    <motion.div
                        ref={cardRef}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#D2E7FE] rounded-[32px] p-6"
                    >
                        <h3 className="font-archivo font-semibold text-[24px] leading-[26px] text-black mb-2">AI Content Studio</h3>
                        <p className="font-archivo font-normal text-[14px] leading-[20px] text-[#6D6D6D] mb-6">Generate weeks of trending social content in seconds.</p>

                        <div className="bg-[#F8FAFC] rounded-[24px] p-0 shadow-sm border border-slate-100 h-[320px] relative overflow-hidden flex items-center justify-center">
                            {/* Folder Stack */}
                            <div className="relative w-64 h-48">
                                {/* Back Folder Left */}
                                <motion.div
                                    style={{ x: xLeft, rotate: rotateLeft, opacity: opacityBack }}
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{
                                        duration: 0.8, ease: "easeOut",
                                        y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="absolute inset-0 bg-[#DBEAFE] rounded-xl border-[3px] border-[#0037FF] shadow-sm z-0"
                                >
                                    <div className="absolute -top-3 left-[-3px] w-24 h-5 bg-[#DBEAFE] rounded-t-lg border-t-[3px] border-l-[3px] border-r-[3px] border-[#0037FF]" />
                                </motion.div>

                                {/* Back Folder Right */}
                                <motion.div
                                    style={{ x: xRight, rotate: rotateRight, opacity: opacityBack }}
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{
                                        duration: 0.8, ease: "easeOut",
                                        y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
                                    }}
                                    className="absolute inset-0 bg-[#DBEAFE] rounded-xl border-[3px] border-[#0037FF] shadow-sm z-0"
                                >
                                    <div className="absolute -top-3 left-[-3px] w-24 h-5 bg-[#DBEAFE] rounded-t-lg border-t-[3px] border-l-[3px] border-r-[3px] border-[#0037FF]" />
                                </motion.div>

                                {/* Main Folder */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 z-20"
                                >
                                    {/* Folder Backing (Blue + Tab) */}
                                    <div className="absolute inset-0 bg-[#DBEAFE] rounded-xl border-[3px] border-[#0037FF] shadow-xl">
                                        <div className="absolute -top-[15px] left-[-3px] w-28 h-6 bg-[#DBEAFE] rounded-t-xl border-t-[3px] border-l-[3px] border-r-[3px] border-[#0037FF]" />
                                    </div>

                                    {/* Folder Front (White Sheet) */}
                                    <div className="absolute bottom-0 w-full h-[92%] bg-white rounded-xl border-[3px] border-[#0037FF] z-10 overflow-hidden">


                                        {/* Content Layout - Animated Social Marquee */}
                                        <div className="flex flex-col gap-6 w-full h-full justify-center overflow-hidden py-4">
                                            {/* Top Row: Scrolls Left */}
                                            <div className="w-full flex overflow-hidden">
                                                <motion.div
                                                    className="flex items-center flex-nowrap"
                                                    animate={{ x: ["0%", "-25%"] }}
                                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                                    style={{ width: "fit-content" }}
                                                >
                                                    {/* Set 1 */}
                                                    <div className="flex gap-8 items-center pr-8">
                                                        <Instagram size={28} className="text-[#0037FF]" />
                                                        <Linkedin size={28} className="text-[#0037FF]" />
                                                        <Youtube size={28} className="text-[#0037FF]" />
                                                    </div>
                                                    {/* Set 2 */}
                                                    <div className="flex gap-8 items-center pr-8">
                                                        <Instagram size={28} className="text-[#0037FF]" />
                                                        <Linkedin size={28} className="text-[#0037FF]" />
                                                        <Youtube size={28} className="text-[#0037FF]" />
                                                    </div>
                                                    {/* Set 3 */}
                                                    <div className="flex gap-8 items-center pr-8">
                                                        <Instagram size={28} className="text-[#0037FF]" />
                                                        <Linkedin size={28} className="text-[#0037FF]" />
                                                        <Youtube size={28} className="text-[#0037FF]" />
                                                    </div>
                                                    {/* Set 4 */}
                                                    <div className="flex gap-8 items-center pr-8">
                                                        <Instagram size={28} className="text-[#0037FF]" />
                                                        <Linkedin size={28} className="text-[#0037FF]" />
                                                        <Youtube size={28} className="text-[#0037FF]" />
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* Bottom Row: Scrolls Right */}
                                            <div className="w-full flex overflow-hidden">
                                                <motion.div
                                                    className="flex items-center flex-nowrap"
                                                    animate={{ x: ["-25%", "0%"] }}
                                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                                    style={{ width: "fit-content" }}
                                                >
                                                    {/* Set 1 */}
                                                    <div className="flex gap-8 items-center pr-8">
                                                        <XIcon size={28} className="text-[#0037FF]" />
                                                        <FacebookIcon size={28} className="text-[#0037FF]" />
                                                        <Music size={28} className="text-[#0037FF]" />
                                                        <SpotifyIcon size={28} className="text-[#0037FF]" />
                                                    </div>
                                                    {/* Set 2 */}
                                                    <div className="flex gap-8 items-center pr-8">
                                                        <XIcon size={28} className="text-[#0037FF]" />
                                                        <FacebookIcon size={28} className="text-[#0037FF]" />
                                                        <Music size={28} className="text-[#0037FF]" />
                                                        <SpotifyIcon size={28} className="text-[#0037FF]" />
                                                    </div>
                                                    {/* Set 3 */}
                                                    <div className="flex gap-8 items-center pr-8">
                                                        <XIcon size={28} className="text-[#0037FF]" />
                                                        <FacebookIcon size={28} className="text-[#0037FF]" />
                                                        <Music size={28} className="text-[#0037FF]" />
                                                        <SpotifyIcon size={28} className="text-[#0037FF]" />
                                                    </div>
                                                    {/* Set 4 */}
                                                    <div className="flex gap-8 items-center pr-8">
                                                        <XIcon size={28} className="text-[#0037FF]" />
                                                        <FacebookIcon size={28} className="text-[#0037FF]" />
                                                        <Music size={28} className="text-[#0037FF]" />
                                                        <SpotifyIcon size={28} className="text-[#0037FF]" />
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                </div>

            </div>
        </section >
    );
};
