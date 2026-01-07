import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CreditCard, Sparkles, Zap, ShieldCheck } from "lucide-react";

export const PricingHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative pt-20 pb-12 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden brand-bg min-h-[70vh] md:min-h-[80vh] flex items-center"
    >
      <style>{`
        .brand-bg {
          background: radial-gradient(circle at 50% 100%, #ffffff 0%, #f0f7ff 40%, #e0f0ff 100%);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full text-center">
        <motion.div
          style={{ y, opacity }}
          className="flex flex-col items-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-8 shadow-sm backdrop-blur-sm"
          >
            <CreditCard size={14} className="animate-pulse" />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">
              Subscription Modules // v6.0.4
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-archivo font-black text-slate-900 tracking-tighter leading-[0.9] sm:leading-[0.85] uppercase mb-6 md:mb-8"
          >
            Scalable <br />
            <span className="text-blue-600 italic">Investment</span> Units.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl font-archivo font-normal text-slate-500 leading-relaxed mb-10 md:mb-12 max-w-2xl px-4 md:px-0"
          >
            Choose your deployment tier. Precision-engineered credit systems
            designed to power your growth engine at any velocity.
          </motion.p>

          {/* Technical Badges Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-12 pt-10 md:pt-12 border-t border-slate-200/60 w-full max-w-3xl mx-auto"
          >
            {[
              { icon: Zap, label: "Processing", val: "Priority" },
              { icon: ShieldCheck, label: "Security", val: "AES-256" },
              { icon: Sparkles, label: "Integrity", val: "100% Organic" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-2 ${
                  i === 2 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-1">
                  <stat.icon size={18} className="md:w-5 md:h-5" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </span>
                <span className="text-xl font-archivo font-black text-slate-900 uppercase">
                  {stat.val}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
    </section>
  );
};
