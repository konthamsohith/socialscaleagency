import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Cpu, Activity } from "lucide-react";
import { Button } from "../../ui/Button";

export const ServicesHero = () => {
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
      className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-48 lg:pb-32 overflow-hidden brand-bg min-h-[90vh] flex items-center"
    >
      <style>{`
        .brand-bg {
          background: radial-gradient(circle at 50% 100%, #ffffff 0%, #f0f7ff 40%, #e0f0ff 100%);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            style={{ y, opacity }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-8 shadow-sm backdrop-blur-sm"
            >
              <Cpu size={14} className="animate-pulse" />
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">
                Core-Intelligence v6.0
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-8xl font-archivo font-black text-slate-900 tracking-tighter leading-[0.85] uppercase mb-8"
            >
              Strategic <br />
              <span className="text-blue-600 italic">Growth</span> Modules.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl font-archivo font-normal text-slate-500 leading-relaxed mb-12 max-w-lg"
            >
              Architecting high-velocity social ecosystems through neural optimization
              and algorithmic authority. We don't just grow accounts—we build legacies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700 border-none px-10 py-6 rounded-full font-archivo font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 group"
                onClick={() => (window.location.href = "/contact")}
              >
                Initialize Scale
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white/50 backdrop-blur-md text-slate-900 border border-slate-200 hover:bg-white px-10 py-6 rounded-full font-archivo font-black text-sm uppercase tracking-widest transition-all"
              >
                Our Protocols
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual Side - Industrial Technical Components */}
          <div className="relative hidden lg:block h-[600px]">
            {/* Floating Technical Card 1 */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-72 bg-white/80 backdrop-blur-xl p-6 rounded-[2rem] border border-blue-100 shadow-[0_20px_50px_rgba(0,55,255,0.05)] z-20"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Activity size={24} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Efficiency</span>
                  <span className="text-xl font-archivo font-black text-blue-600">98.4%</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "98.4%" }}
                    transition={{ duration: 2, delay: 1 }}
                    className="h-full bg-blue-600 rounded-full"
                  />
                </div>
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-tighter">Neural Signal Resonance: OPTIMIZED</p>
              </div>
            </motion.div>

            {/* Floating Technical Card 2 */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-10 left-0 w-80 bg-slate-900 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl z-30 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-white/50 uppercase tracking-[0.3em]">Live Feed // Growth</span>
                </div>
                <h3 className="text-3xl font-archivo font-black text-white uppercase mb-4 tracking-tight">Real-Time <br /> Scale.</h3>
                <div className="flex items-end gap-2 h-24">
                  {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: 1.5 + (i * 0.1) }}
                      className="flex-1 bg-blue-500/40 rounded-t-sm"
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Background Mesh/Grid for Hero */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

