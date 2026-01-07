import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  Zap,
  Heart,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Terminal,
  Activity,
} from "lucide-react";

const values = [
  {
    id: "VAL-01",
    icon: <Cpu size={24} />,
    title: "Neural Synergy",
    description:
      "We fuse advanced machine learning with human intuition. Our 'Core-Intelligence' protocol ensures that algorithms serve creators, not the other way around.",
    metric: "98.4% Optimization",
    status: "Operational",
  },
  {
    id: "VAL-02",
    icon: <Heart size={24} />,
    title: "Empathy-First Data",
    description:
      "Numbers tell a story, but humans live it. We prioritize ethical growth architectures that protect creator wellbeing while maximizing influence.",
    metric: "100% Non-Bot",
    status: "Active",
  },
  {
    id: "VAL-03",
    icon: <ShieldCheck size={24} />,
    title: "Immutable Truth",
    description:
      "Total transparency is our default state. Every metric we provide is verifiable, data-backed, and stripped of vanity-layer noise.",
    metric: "Real-time Audits",
    status: "Verified",
  },
  {
    id: "VAL-04",
    icon: <Zap size={24} />,
    title: "Rapid Iteration",
    description:
      "The social landscape shifts in milliseconds. Our engineering culture is built for speed—shipping optimizations faster than the market can react.",
    metric: "< 2ms Latency",
    status: "Accelerated",
  },
];

export const AboutCulture = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-24 relative bg-[#020617] overflow-hidden"
    >
      {/* High-Tech Background Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scanning Line */}
        <motion.div
          style={{ top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
          className="absolute left-0 w-full h-px bg-blue-500/30 z-10"
        />

        {/* Dark Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Cyber Glows */}
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.3, 0.1]),
            scale: useTransform(smoothProgress, [0, 0.5, 1], [1, 1.5, 1]),
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-600/10 rounded-full blur-[160px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Header - Terminal Style */}
        <div className="flex flex-col items-start mb-10 md:mb-16 border-l border-blue-500/30 pl-5 md:pl-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="px-2 py-0.5 rounded-sm bg-blue-600/10 border border-blue-600/20 text-blue-400 text-[8px] md:text-[9px] font-mono uppercase tracking-[0.3em]">
              Terminal.exe // Culture.log
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] md:text-[9px] font-mono text-slate-500 uppercase">
                System: Online
              </span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-[5rem] font-archivo font-black text-white tracking-tighter leading-[0.85] mb-6 md:mb-8 uppercase"
          >
            DATA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500">
              PHILOSOPHY.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-xl bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl"
          >
            <p className="text-base md:text-lg font-archivo font-normal text-slate-400 leading-relaxed">
              We are a <span className="text-white italic">collective</span> of
              engineers architecting the future of influence through algorithmic
              precision.
            </p>
          </motion.div>
        </div>

        {/* Dynamic Card Interaction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition duration-700 blur-lg -z-10" />

              <div className="relative h-full bg-slate-950/50 backdrop-blur-xl border border-white/5 rounded-[1.25rem] p-5 md:p-6 overflow-hidden group-hover:border-white/10 transition-all duration-500">
                {/* ID & Status Line */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 font-mono text-[9px]">
                      {value.id}
                    </span>
                    <div className="h-px w-4 bg-blue-500/20" />
                    <span className="text-slate-500 font-mono text-[8px] uppercase tracking-widest">
                      {value.status}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    {value.icon}
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-archivo font-black text-white mb-2 group-hover:translate-x-1 transition-transform duration-500">
                  {value.title}
                </h3>

                <p className="font-archivo font-normal text-slate-400 text-[13px] leading-relaxed mb-6 opacity-80">
                  {value.description}
                </p>

                {/* Metric Strip */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Activity size={10} className="text-blue-500" />
                    <span className="text-[8px] font-mono text-blue-500/80 uppercase tracking-widest">
                      Efficacy
                    </span>
                  </div>
                  <span className="text-white font-archivo font-bold text-[11px]">
                    {value.metric}
                  </span>
                </div>

                {/* Scanning Corner */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* The Collective - High Contrast CTA */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 md:mt-12 relative group max-w-xl mx-auto"
        >
          <div className="bg-white rounded-[1.25rem] md:rounded-[1.5rem] p-4 md:p-6 flex flex-col items-center text-center overflow-hidden relative border border-slate-100 shadow-xl">
            {/* CTA Inner Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,55,255,0.03),transparent_70%)]" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-40" />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white mb-4 shadow-lg"
              >
                <Terminal size={14} />
              </motion.div>

              <h3 className="text-xl md:text-2xl font-archivo font-black text-black tracking-tighter leading-tight mb-2">
                INITIATE THE <br />
                <span className="text-[#0037FF] italic">COLLECTIVE.</span>
              </h3>

              <p className="max-w-[280px] text-xs font-archivo font-normal text-slate-500 leading-relaxed mb-6">
                Our mission is fueled by the brightest minds. Join our core
                architectural team.
              </p>

              <div className="flex flex-col items-center gap-4">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.img
                      key={i}
                      whileHover={{ y: -3, zIndex: 50 }}
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white shadow-md transition-all duration-500 cursor-pointer"
                      src={`https://i.pravatar.cc/150?u=arch${i}`}
                      alt="Collective Member"
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#000" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-archivo font-black uppercase tracking-widest text-[8px] flex items-center gap-2 shadow-md transition-all duration-500"
                >
                  Join the Mission
                  <ArrowRight size={12} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
