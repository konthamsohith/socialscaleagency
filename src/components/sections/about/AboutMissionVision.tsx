import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Target,
} from "lucide-react";
import { AnimatedNumber } from "../../ui/AnimatedNumber";

export const AboutMissionVision = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress for all animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Color & Overlay transitions
  // Improvised: Using clipPath for a liquid-style vertical reveal
  const clipPath = useTransform(
    smoothProgress,
    [0.4, 0.6],
    ["circle(0% at 50% 50%)", "circle(100% at 50% 50%)"]
  );

  const textColor = useTransform(
    smoothProgress,
    [0.45, 0.55],
    ["#020617", "#FFFFFF"]
  );

  const missionOpacity = useTransform(
    smoothProgress,
    [0, 0.35, 0.45],
    [1, 1, 0]
  );
  const missionY = useTransform(smoothProgress, [0.35, 0.45], [0, -50]);

  const visionOpacity = useTransform(
    smoothProgress,
    [0.55, 0.65, 1],
    [0, 1, 1]
  );
  const visionY = useTransform(smoothProgress, [0.5, 0.6], [50, 0]);

  const scale = useTransform(smoothProgress, [0.45, 0.55], [1, 0.95]);

  return (
    <motion.section ref={containerRef} className="relative h-[350vh] bg-white">
      {/* Side Navigation Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-12 rounded-full bg-slate-200 overflow-hidden relative"
          >
            <motion.div
              style={{
                height: useTransform(
                  smoothProgress,
                  i === 0 ? [0, 0.5] : [0.5, 1],
                  ["0%", "100%"]
                ),
              }}
              className="absolute top-0 left-0 w-full bg-[#0037FF]"
            />
          </motion.div>
        ))}
      </div>

      {/* The "Dark Mode" Transition Layer - Improvised with Liquid Circle Wipe */}
      <motion.div
        style={{
          clipPath,
          scale: useTransform(smoothProgress, [0.4, 0.6], [0.8, 1]),
        }}
        className="absolute inset-0 bg-[#020617] z-0"
      >
        {/* Vision Particle Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>

      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden z-10">
        {/* Improvised Background Ambience */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Light Mode Glow */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0, 0.5], [0.6, 0]),
              scale: useTransform(smoothProgress, [0, 0.5], [1, 1.2]),
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-50 rounded-full blur-[150px]"
          />

          {/* Dark Mode Glow */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.5, 1], [0, 0.4]),
              scale: useTransform(smoothProgress, [0.5, 1], [0.8, 1.5]),
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px]"
          />

          {/* Floating Grid (Perspective) */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.4, 0.6], [0.03, 0.1]),
              y: useTransform(smoothProgress, [0, 1], [0, -200]),
              backgroundImage: `radial-gradient(circle at 2px 2px, #0037FF 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
            className="absolute inset-0 z-0 opacity-10"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full h-full">
          {/* Transition Scale Wrapper */}
          <motion.div style={{ scale }} className="w-full h-full relative">
            {/* Mission Content */}
            <motion.div
              style={{
                opacity: missionOpacity,
                y: missionY,
                color: textColor,
                pointerEvents: useTransform(smoothProgress, (v) =>
                  v > 0.5 ? "none" : "auto"
                ),
              }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-white/50 backdrop-blur-sm text-[#0037FF] mb-12 shadow-sm"
              >
                <Target size={16} className="animate-pulse" />
                <span className="text-xs font-archivo font-bold uppercase tracking-widest">
                  Foundational Purpose
                </span>
              </motion.div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[9rem] font-archivo font-black tracking-tighter mb-4 md:mb-8 leading-none">
                THE MISSION<span className="text-[#0037FF]">.</span>
              </h2>

              <p className="text-xl sm:text-2xl md:text-5xl font-archivo font-normal max-w-4xl leading-[1.05] tracking-tight">
                To{" "}
                <span className="text-[#0037FF] font-bold italic">
                  democratize
                </span>{" "}
                social growth by providing enterprise-grade AI tools to every
                creator.
              </p>

              <div className="grid grid-cols-3 gap-4 md:gap-12 mt-12 md:mt-24 w-full max-w-5xl">
                {[
                  {
                    icon: <Globe size={20} className="md:w-[28px] md:h-[28px]" />,
                    label: "Scale",
                    val: "1M+",
                  },
                  {
                    icon: <ShieldCheck size={20} className="md:w-[28px] md:h-[28px]" />,
                    label: "Ethics",
                    val: "Trust",
                  },
                  {
                    icon: <Zap size={20} className="md:w-[28px] md:h-[28px]" />,
                    label: "Speed",
                    val: "Instant",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center gap-1 md:gap-3"
                  >
                    <div className="p-2 md:p-4 rounded-xl md:rounded-2xl bg-blue-50 text-[#0037FF] mb-1 md:mb-2">
                      {item.icon}
                    </div>
                    <span className="text-[8px] md:text-[10px] font-archivo font-bold uppercase text-slate-400 tracking-widest">
                      {item.label}
                    </span>
                    <span className="text-sm md:text-2xl font-archivo font-bold">
                      {item.val}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Vision Content */}
            <motion.div
              style={{
                opacity: visionOpacity,
                y: visionY,
                color: "#FFFFFF",
                pointerEvents: useTransform(smoothProgress, (v) =>
                  v < 0.5 ? "none" : "auto"
                ),
              }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-blue-400 mb-12">
                <Sparkles size={16} className="animate-spin-slow" />
                <span className="text-xs font-archivo font-bold uppercase tracking-widest">
                  Future Horizon
                </span>
              </div>

              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[9rem] font-archivo font-black tracking-tighter mb-4 md:mb-8 text-white leading-none uppercase">
                THE VISION<span className="text-blue-500">.</span>
              </h2>

              <p className="text-xl sm:text-2xl md:text-5xl font-archivo font-normal max-w-4xl leading-[1.05] tracking-tight text-slate-200">
                Building a digital ecosystem where{" "}
                <span className="text-blue-400 italic font-medium underline decoration-blue-500/30">
                  algorithms serve humanity
                </span>
                , not the other way around.
              </p>

              <motion.div
                className="mt-6 md:mt-12 w-full max-w-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden group relative shadow-2xl"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                {/* Animated Background Pulse */}
                <motion.div
                  className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  style={{
                    scaleX: useTransform(smoothProgress, [0.6, 0.9], [0, 1]),
                  }}
                  className="absolute top-0 left-0 right-0 h-1 md:h-1.5 bg-gradient-to-r from-[#0037FF] via-purple-500 to-blue-400 origin-left z-20"
                />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 relative z-10">
                  <div className="text-center md:text-left flex-1">
                    <motion.div
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 mb-3 md:mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                    >
                      <Sparkles size={10} className="md:w-[12px] md:h-[12px]" />
                      <span className="text-[8px] md:text-[9px] font-archivo font-bold uppercase tracking-[0.2em]">
                        Projected Economic Impact
                      </span>
                    </motion.div>

                    <h4 className="text-4xl sm:text-5xl lg:text-7xl font-archivo font-black text-white tracking-tighter flex items-center justify-center md:justify-start">
                      $
                      <AnimatedNumber
                        value={1000000000}
                        suffix="+"
                        duration={3}
                        once={false}
                      />
                    </h4>

                    <p className="text-slate-300 text-[10px] md:text-base mt-2 md:mt-3 font-archivo font-normal max-w-lg leading-relaxed">
                      Facilitated revenue for{" "}
                      <span className="text-white font-medium">
                        1M+ digital entrepreneurs
                      </span>{" "}
                      by 2026.
                    </p>
                  </div>

                  <motion.div
                    className="flex-shrink-0"
                    whileHover={{ rotate: 15, scale: 1.05 }}
                  >
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-xl group-hover:shadow-blue-500/40 transition-all duration-500">
                      <TrendingUp size={24} className="md:w-[32px] md:h-[32px]" />
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Stats Row */}
                <div className="grid grid-cols-3 gap-2 mt-6 md:mt-8 pt-6 border-t border-white/10 relative z-10">
                  {[
                    { label: "Growth", val: "340%" },
                    { label: "ROI", val: "12.4x" },
                    { label: "Global", val: "140+" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center md:text-left">
                      <p className="text-[8px] md:text-[9px] font-archivo font-bold text-slate-500 uppercase tracking-widest mb-1">
                        {stat.label}
                      </p>
                      <p className="text-sm md:text-lg font-archivo font-bold text-white">
                        {stat.val}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
