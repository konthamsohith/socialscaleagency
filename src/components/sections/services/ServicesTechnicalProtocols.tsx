import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  Cpu,
  BarChart3,
  Settings2,
  Headphones,
  ShieldCheck,
  Terminal,
  Server
} from "lucide-react";

const protocols = [
  {
    id: "PROT-01",
    title: "Neural Content Architect",
    description: "Multi-modal AI synthesize content engineered to trigger specific behavioral responses and platform-specific resonance.",
    icon: Cpu,
    metric: "99.4% Resonance",
    load: "OPTIMIZED"
  },
  {
    id: "PROT-02",
    title: "Quantum Analytics Suite",
    description: "Predictive modeling identified growth bottlenecks and accelerated ROI through micro-adjustment injection.",
    icon: BarChart3,
    metric: "< 1ms Latency",
    load: "ENCRYPTED"
  },
  {
    id: "PROT-03",
    title: "Profile Integrity Audit",
    description: "150-point technical inspection ensuring digital footprint alignment with current algorithmic trust signals.",
    icon: Settings2,
    metric: "100% Trust Score",
    load: "VERIFIED"
  },
  {
    id: "PROT-04",
    title: "Collective Support Layer",
    description: "Human-AI hybrid strategic oversight providing rapid response to social market volatility.",
    icon: Headphones,
    metric: "24/7 Monitoring",
    load: "ACTIVE"
  }
];

export const ServicesTechnicalProtocols = () => {
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
      className="py-24 md:py-32 bg-[#020617] relative overflow-hidden"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
          className="absolute left-0 w-full h-px bg-blue-500/20 z-10"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px]" />
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.1, 0.2, 0.1]),
            scale: useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1]),
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-start mb-20 border-l border-blue-500/30 pl-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="px-2 py-0.5 rounded-sm bg-blue-600/10 border border-blue-600/20 text-blue-400 text-[9px] font-mono uppercase tracking-[0.3em]">
              Infrastructure.log // PROTOCOL_STACK
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">System: OPTIMAL</span>
            </div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-archivo font-black text-white tracking-tighter leading-none uppercase mb-8"
          >
            Algorithmic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 italic">
              Infrastructure.
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl"
          >
            <p className="text-lg font-archivo font-normal text-slate-400 leading-relaxed">
              The backend architecture powering every deployment. We fuse <span className="text-white italic">quantum computing</span> with neural modeling to ensure your growth is immutable.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {protocols.map((protocol, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-slate-950/50 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 overflow-hidden group-hover:border-white/10 transition-all duration-500 h-full">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <protocol.icon size={28} />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{protocol.id}</span>
                      <div className="h-px w-4 bg-blue-500/20" />
                      <span className="text-blue-400 font-mono text-[9px] uppercase tracking-tighter">{protocol.load}</span>
                    </div>
                    <span className="text-[11px] font-mono text-white font-black">{protocol.metric}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-archivo font-black text-white mb-4 uppercase tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                  {protocol.title}
                </h3>
                <p className="text-slate-400 font-archivo font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {protocol.description}
                </p>

                {/* Decorative scanning element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Footer Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-40"
        >
          {[
            { label: "Throughput", val: "Neural-Link Sync", icon: Server },
            { label: "Security", val: "AES-256 Dynamic", icon: ShieldCheck },
            { label: "Console", val: "Terminal v6.0.4", icon: Terminal },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <item.icon size={16} className="text-blue-500" />
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">{item.label}</span>
                <span className="text-[10px] font-mono text-white font-black uppercase">{item.val}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

