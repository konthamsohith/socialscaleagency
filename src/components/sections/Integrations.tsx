
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Instagram, Linkedin, Twitter, Youtube, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

// Custom TikTok Icon
const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
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

// Mock Integration Data
const integrations = [
    { name: "Instagram", icon: Instagram, color: "text-pink-600", x: "-40vw", y: "-5vh", delay: 0 },
    { name: "Youtube", icon: Youtube, color: "text-red-600", x: "-30vw", y: "-25vh", delay: 0.2 },
    { name: "Quora", icon: MessageCircle, color: "text-red-700", x: "30vw", y: "-25vh", delay: 0.4 },
    { name: "TikTok", icon: TikTokIcon, color: "text-black", x: "-30vw", y: "20vh", delay: 0.1 },
    { name: "X", icon: Twitter, color: "text-black", x: "40vw", y: "-5vh", delay: 0.3 },
    { name: "LinkedIn", icon: Linkedin, color: "text-blue-700", x: "30vw", y: "20vh", delay: 0.5 },
];

export const Integrations = () => {
    return (
        <section id="start-growing" className="py-32 px-6 relative overflow-hidden bg-[#4085FF]">
            {/* Gradient Background Mesh */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-[#6BA6FF] blur-[120px] rounded-full opacity-60" />
                <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[150%] bg-[#A8D0FF] blur-[120px] rounded-full opacity-50" />
                <div className="absolute top-[20%] left-[30%] w-[40%] h-[60%] bg-white blur-[150px] rounded-full opacity-30 mix-blend-overlay" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center justify-center min-h-[400px]">

                {/* Floating Integrations */}
                <div className="absolute inset-0 pointer-events-none hidden md:block">
                    {integrations.map((item, index) => (
                        <div
                            key={index}
                            className="absolute left-1/2 top-1/2 flex flex-col items-center gap-3"
                            style={{ transform: `translate(${item.x}, ${item.y})` }}
                        >
                            {/* Icon Card */}
                            <motion.div
                                initial={{ y: 0 }}
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
                                className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center"
                            >
                                <item.icon size={32} className={item.color} strokeWidth={2.5} />
                            </motion.div>

                            {/* Label Pill */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full font-archivo font-normal text-[14px] leading-[17px] text-black shadow-lg"
                            >
                                {item.name}
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Central Content */}
                <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto relative z-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-400/20 border border-blue-300/30 text-white font-archivo font-bold text-[14px] leading-[17px] backdrop-blur-md shadow-lg"
                    >
                        <Sparkles size={14} fill="currentColor" />
                        Start Growing
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-archivo font-semibold text-[72px] leading-[80px] text-white"
                    >
                        Ready to Scale <br /> Your Social Media?
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-blue-50 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed opacity-90"
                    >
                        Join thousands of satisfied customers and start growing your social presence today.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col sm:flex-row justify-center w-full gap-4"
                    >
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 border-none px-8 py-4 rounded-full font-archivo font-bold text-[16px] leading-[22px] shadow-2xl shadow-blue-900/20 transition-all hover:scale-105 active:scale-95">
                            Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button size="lg" className="bg-transparent text-white border-2 border-white/30 hover:bg-white/10 px-8 py-4 rounded-full font-archivo font-bold text-[16px] leading-[22px] transition-all hover:scale-105 active:scale-95">
                            Schedule Meet <Calendar className="ml-2 w-5 h-5" />
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
