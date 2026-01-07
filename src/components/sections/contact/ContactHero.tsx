import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mail, MessageSquare, Terminal, Zap } from "lucide-react";

export const ContactHero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden"
    >
      {/* Background Infrastructure */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#F8FAFC]" />
        <div className="absolute inset-0 brand-bg opacity-40" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Animated Perspective Grid */}
        <div className="absolute bottom-0 left-0 right-0 h-full bg-[perspective(1000px)_rotateX(60deg)] overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f608_1px,transparent_1px),linear-gradient(to_bottom,#3b82f608_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:linear-gradient(to_top,black,transparent)]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 px-3 py-1.5 md:px-4 md:py-2 bg-white rounded-xl md:rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Terminal size={12} className="md:w-[14px] md:h-[14px]" />
            </div>
            <span className="text-[8px] md:text-[10px] font-mono font-black text-blue-600 uppercase tracking-[0.3em] md:tracking-[0.4em]">
              Initialize_Communication // v2.0
            </span>
          </motion.div>

          <motion.div style={{ y, opacity }} className="max-w-5xl px-4">
            <h1 className="text-4xl sm:text-6xl md:text-9xl lg:text-[10rem] font-archivo font-black text-slate-900 tracking-tighter leading-[0.8] uppercase mb-8 md:mb-12">
              Get In <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 italic">
                Touch.
              </span>
            </h1>
            <p className="text-base md:text-xl lg:text-2xl text-slate-500 font-archivo max-w-2xl mx-auto leading-relaxed">
              Ready to scale your digital presence? Our algorithmic growth protocols are ready for initialization.
            </p>
          </motion.div>

          {/* Quick Contact Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
            {[
              { icon: Mail, label: "Email Terminal", val: "sales@socialscale.agency", color: "blue" },
              { icon: MessageSquare, label: "Live Protocol", val: "Schedule a Discovery Call", color: "indigo" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="group flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-600/30 transition-all cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors`}>
                  <item.icon size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-black">{item.label}</span>
                  <span className="text-[13px] font-archivo font-black text-slate-900 uppercase">{item.val}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Atmospheric Decorations */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl animate-pulse" />
    </section>
  );
};

