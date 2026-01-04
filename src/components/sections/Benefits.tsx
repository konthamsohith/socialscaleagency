import { motion } from 'framer-motion';
import { TrendingUp, Bell, FileText, Linkedin, Instagram, Youtube } from 'lucide-react';

const TikTokIcon = ({ size = 14, className }: { size?: number, className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
    </svg>
);

export const Benefits = () => {
    return (
        <section id="benefits" className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#0037FF]">
                            <path d="M12 0C13.5 7.5 16.5 10.5 24 12C16.5 13.5 13.5 16.5 12 24C10.5 16.5 7.5 13.5 0 12C7.5 10.5 10.5 7.5 12 0Z" />
                        </svg>
                        <span className="font-archivo font-normal text-[14px] leading-[17px] text-black uppercase">BENEFITS</span>
                    </div>
                    <h2 className="font-archivo font-semibold text-[56px] leading-[62px] text-black mb-6">
                        Stop switching tools.<br />
                        Start driving <span className="inline-flex items-center gap-2 bg-[#0037FF] text-white px-3 py-1 rounded-xl align-middle shadow-lg shadow-blue-500/30 transform -rotate-2"><TrendingUp size="0.8em" /> growth.</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Card 1: Growth Analytics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-50 rounded-[32px] p-8 flex flex-col items-center text-center group hover:bg-slate-100 transition-colors"
                    >
                        <div className="w-full aspect-square bg-white rounded-3xl shadow-sm border border-slate-200/50 mb-8 relative overflow-hidden p-6 flex flex-col justify-end">
                            {/* Chart Mockup */}
                            <div className="absolute top-6 left-6 right-6">
                                <p className="font-archivo font-normal text-[14px] leading-[17px] text-slate-400 mb-1">Total Network</p>
                                <div className="flex items-center gap-3">
                                    <span className="font-archivo text-3xl font-bold text-slate-900">145.2k</span>
                                    <motion.span
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                                        viewport={{ once: true }}
                                        className="font-archivo bg-blue-100 text-[#0037FF] text-xs font-bold px-2 py-1 rounded-lg"
                                    >
                                        +12% <span className="font-archivo font-medium">Growth</span>
                                    </motion.span>
                                </div>
                            </div>

                            <div className="flex items-end justify-between gap-2 h-40 mt-8">
                                <motion.div initial={{ height: 0 }} whileInView={{ height: '40%' }} transition={{ delay: 0.2, duration: 0.5 }} viewport={{ once: true }} className="w-full bg-slate-100 rounded-t-lg" />
                                <motion.div initial={{ height: 0 }} whileInView={{ height: '60%' }} transition={{ delay: 0.3, duration: 0.5 }} viewport={{ once: true }} className="w-full bg-slate-100 rounded-t-lg" />
                                <motion.div initial={{ height: 0 }} whileInView={{ height: '75%' }} transition={{ delay: 0.4, duration: 0.5 }} viewport={{ once: true }} className="w-full bg-slate-100 rounded-t-lg" />
                                <motion.div initial={{ height: 0 }} whileInView={{ height: '50%' }} transition={{ delay: 0.5, duration: 0.5 }} viewport={{ once: true }} className="w-full bg-slate-100 rounded-t-lg" />
                                <motion.div
                                    initial={{ height: 0 }}
                                    whileInView={{ height: '90%' }}
                                    transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
                                    viewport={{ once: true }}
                                    className="w-full bg-[#0037FF] rounded-t-lg shadow-lg shadow-blue-500/20"
                                />
                            </div>

                            {/* Y Axis Lines mockup */}
                            <div className="absolute inset-x-6 top-24 bottom-6 flex flex-col justify-between pointer-events-none opacity-50">
                                <div className="w-full h-px bg-slate-100 border-t border-dashed border-slate-200" />
                                <div className="w-full h-px bg-slate-100 border-t border-dashed border-slate-200" />
                                <div className="w-full h-px bg-slate-100 border-t border-dashed border-slate-200" />
                            </div>
                        </div>
                        <h3 className="font-archivo font-semibold text-[24px] leading-[26px] text-black mb-3">Growth Analytics</h3>
                        <p className="font-archivo font-normal text-[16px] leading-[22px] text-[#6D6D6D]">
                            Track your follower count and engagement rates in real-time with our comprehensive dashboard.
                        </p>
                    </motion.div>

                    {/* Card 2: Multi-Platform Strategy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-50 rounded-[32px] p-8 flex flex-col items-center text-center group hover:bg-slate-100 transition-colors"
                    >
                        <div className="w-full aspect-square bg-white rounded-3xl shadow-sm border border-slate-200/50 mb-8 relative overflow-hidden flex items-center justify-center">
                            {/* Radar/Ripple Effect */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ willChange: 'transform, opacity' }}
                                    className="w-64 h-64 border border-slate-100 rounded-full absolute"
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    style={{ willChange: 'transform, opacity' }}
                                    className="w-48 h-48 border border-slate-100 rounded-full absolute"
                                />
                                <div className="w-32 h-32 border border-slate-100 rounded-full absolute" />
                            </div>

                            {/* Avatars */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                                style={{ willChange: 'transform' }}
                                className="absolute top-1/4 left-1/4 transform -translate-x-1/2"
                            >
                                <div className="bg-[#0037FF] text-white p-2 rounded-full whitespace-nowrap mb-2 shadow-sm">
                                    <Linkedin size={20} />
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-1/3 right-8"
                            >
                                <div className="bg-[#0037FF] text-white p-2 rounded-full whitespace-nowrap mb-2 shadow-sm">
                                    <Instagram size={20} />
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                className="absolute bottom-1/3 right-12"
                            >
                                <div className="bg-[#0037FF] text-white p-2 rounded-full whitespace-nowrap mt-2 shadow-sm">
                                    <TikTokIcon size={20} />
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                className="absolute bottom-1/4 left-8"
                            >
                                <div className="bg-[#0037FF] text-white p-2 rounded-full whitespace-nowrap mt-2 shadow-sm">
                                    <Youtube size={20} />
                                </div>
                            </motion.div>

                            {/* Central Node */}
                            <div className="relative z-10 w-16 h-16 bg-[#0037FF] rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30 p-4">
                                <img src="/logo1.png" alt="Platform Hub" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <h3 className="font-archivo font-semibold text-[24px] leading-[26px] text-black mb-3">Multi-Platform Strategy</h3>
                        <p className="font-archivo font-normal text-[16px] leading-[22px] text-[#6D6D6D]">
                            Orchestrate your presence across LinkedIn, Instagram, and TikTok simultaneously from one hub.
                        </p>
                    </motion.div>

                    {/* Card 3: Organic Drip Delivery */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-slate-50 rounded-[32px] p-8 flex flex-col items-center text-center group hover:bg-slate-100 transition-colors"
                    >
                        <div className="w-full aspect-square bg-white rounded-3xl shadow-sm border border-slate-200/50 mb-8 relative overflow-hidden flex flex-col items-center justify-center p-6">
                            {/* Floating Cards */}
                            <div className="relative w-full h-full">
                                {/* Card 1 */}
                                <motion.div
                                    animate={{ y: [0, -5, 0], rotate: [-3, -2, -3] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ willChange: 'transform' }}
                                    className="absolute top-8 left-0 right-0 transform -rotate-3"
                                >
                                    <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm flex items-center justify-between mx-4">
                                        <div className="w-24 h-2 bg-slate-100 rounded-full" />
                                        <div className="bg-[#0037FF] text-white text-[10px] px-2 py-1 rounded-full font-bold">Auto-Post</div>
                                    </div>
                                </motion.div>

                                {/* Card 2 */}
                                <motion.div
                                    animate={{ y: [0, 5, 0], rotate: [2, 3, 2] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute top-24 left-4 right-[-10px] transform rotate-2 z-10"
                                >
                                    <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-md flex items-center gap-3">
                                        <div className="bg-blue-50 p-1.5 rounded-lg text-[#0037FF]">
                                            <FileText size={14} />
                                        </div>
                                        <div className="text-left">
                                            <div className="text-xs font-bold text-slate-800">Viral Alert</div>
                                            <div className="text-[10px] text-slate-400">Trending on TikTok +15%</div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Card 3 */}
                                <motion.div
                                    animate={{ y: [0, -3, 0], rotate: [-1, 0, -1] }}
                                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute bottom-10 left-[-5px] right-6 transform -rotate-1"
                                >
                                    <div className="bg-white border border-slate-100 rounded-xl p-3 shadow-sm flex items-center justify-between">
                                        <div className="text-[10px] text-slate-400">Engagement Spike Detected!</div>
                                        <div className="bg-[#0037FF] text-white p-1 rounded-md">
                                            <Bell size={10} />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Connecting Line (Blue path) */}
                                <svg className="absolute inset-0 pointer-events-none opacity-20" viewBox="0 0 200 200">
                                    <motion.path
                                        d="M100,0 Q150,100 100,200"
                                        fill="none"
                                        stroke="#0037FF"
                                        strokeWidth="4"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        viewport={{ once: true }}
                                    />
                                </svg>
                            </div>
                        </div>
                        <h3 className="font-archivo font-semibold text-[24px] leading-[26px] text-black mb-3">Organic Drip Delivery</h3>
                        <p className="font-archivo font-normal text-[16px] leading-[22px] text-[#6D6D6D]">
                            Our AI gradually delivers followers and engagement to replicate natural viral growth patterns.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
