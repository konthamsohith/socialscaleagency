import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Search } from "lucide-react";

const categories = [
  "All Modules",
  "Algorithmic Data",
  "Platform Strategy",
  "Neural Growth",
  "Case Analysis",
  "Tech Updates",
];

export const BlogHero = () => {
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
      className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden brand-bg min-h-[60vh] flex items-center"
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
            <BookOpen size={14} className="animate-pulse" />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">
              Intelligence Feed // v4.0.1
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-archivo font-black text-slate-900 tracking-tighter leading-[0.9] sm:leading-[0.85] uppercase mb-8"
          >
            Knowledge <br />
            <span className="text-blue-600 italic">Repository.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl font-archivo font-normal text-slate-500 leading-relaxed mb-12 max-w-2xl px-4 md:px-0"
          >
            Decoding the social algorithms. Expert analysis, technical
            frameworks, and high-velocity growth protocols for the digital frontier.
          </motion.p>

          {/* Technical Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="relative group mb-8">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search knowledge database..."
                className="w-full bg-white/50 backdrop-blur-xl border border-slate-200 rounded-2xl py-5 pl-14 pr-6 text-sm font-archivo focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all shadow-sm"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest transition-all ${i === 0
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-white border border-slate-200 text-slate-500 hover:border-blue-600/30 hover:text-blue-600 shadow-sm"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
    </section>
  );
};

