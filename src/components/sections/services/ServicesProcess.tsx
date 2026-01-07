import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { 
  ClipboardCheck, 
  Settings, 
  Play, 
  TrendingUp,
  ArrowRight,
  Zap,
  Repeat
} from "lucide-react";

const steps = [
  {
    title: "Technical Audit",
    description: "Deep-dive analysis of current assets and competitive gravity signals.",
    icon: ClipboardCheck,
    color: "bg-blue-600",
    id: "STEP_01"
  },
  {
    title: "Engine Calibration",
    description: "Niche-specific system configuration based on target audience behavior.",
    icon: Settings,
    color: "bg-indigo-600",
    id: "STEP_02"
  },
  {
    title: "Deployment",
    description: "Executing precise content drops to capture immediate market momentum.",
    icon: Play,
    color: "bg-blue-700",
    id: "STEP_03"
  },
  {
    title: "Hyper-Scale",
    description: "Aggressive optimization to reach viral escape velocity in real-time.",
    icon: TrendingUp,
    color: "bg-emerald-600",
    id: "STEP_04"
  }
];

export const ServicesProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useSpring(
    useTransform(scrollYProgress, [0.2, 0.8], [0, 1]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <section 
      ref={containerRef}
      className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <Repeat size={14} className="text-blue-600 animate-spin-slow" />
            <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-[0.3em]">
              Operational Lifecycle // LOOP_v2.0
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-archivo font-black text-slate-900 tracking-tighter leading-none uppercase mb-8"
          >
            The Optimization <br />
            <span className="text-blue-600 italic">Lifecycle.</span>
          </motion.h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Track */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block">
            <motion.div 
              style={{ scaleY: pathLength, transformOrigin: "top" }}
              className="absolute inset-0 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            />
          </div>

          <div className="space-y-12 md:space-y-32">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative">
                  <div className={`flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}>
                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="w-full md:w-1/2 p-4"
                    >
                      <div className={`bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.02)] group hover:border-blue-500/20 transition-all duration-500 ${isEven ? "md:mr-12" : "md:ml-12"}`}>
                        <div className="flex items-center gap-4 mb-6">
                          <span className="text-[10px] font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase">{step.id}</span>
                          <div className="h-px flex-1 bg-slate-50" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-archivo font-black text-slate-900 mb-4 uppercase tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-slate-500 font-archivo font-medium leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* Center Marker */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 hidden md:block">
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-xl border-4 border-white`}
                      >
                        <step.icon size={20} />
                      </motion.div>
                    </div>

                    {/* Spacer for Mobile layout sync */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Integration Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 max-w-4xl mx-auto bg-slate-900 rounded-[3rem] p-8 md:p-12 overflow-hidden relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <Zap size={16} className="text-blue-400" />
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.3em]">Acceleration Protocol</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-archivo font-black text-white uppercase tracking-tighter leading-tight">
                Ready to Initiate <br />
                <span className="text-blue-400 italic">Hyper-Growth?</span>
              </h3>
            </div>
            <button className="bg-white text-slate-900 px-10 py-5 rounded-full font-archivo font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-white/5 group">
              Start Module <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

