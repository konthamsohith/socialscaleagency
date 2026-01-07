import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Globe,
  MessageSquare,
  Cpu,
  Settings2,
  Lock,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { Button } from "../../ui/Button";
import { useRef } from "react";

const systemModules = [
  {
    id: "ARCH-01",
    name: "Neural Backbone",
    desc: "Private cluster deployment for zero-latency processing.",
    icon: Cpu,
    metric: "99.99% Uptime",
    color: "blue",
  },
  {
    id: "ARCH-02",
    name: "Global Node Sync",
    desc: "Multi-region replication with automatic failover protocols.",
    icon: Globe,
    metric: "Global CDN",
    color: "indigo",
  },
  {
    id: "ARCH-03",
    name: "Security Shield",
    desc: "Enterprise-grade encryption with custom key management.",
    icon: Lock,
    metric: "AES-256 GCM",
    color: "purple",
  },
  {
    id: "ARCH-04",
    name: "Protocol Bridge",
    desc: "Deep API integration with custom webhook architectures.",
    icon: Settings2,
    metric: "Custom SDK",
    color: "blue",
  },
];

export const PricingEnterprise = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 bg-[#010409] relative overflow-hidden"
    >
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(0,102,255,0.15),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[linear-gradient(to_top,rgba(1,4,9,1),transparent)] z-10" />

        {/* Animated Grid Floor */}
        <div className="absolute bottom-0 left-0 w-full h-[40%] md:h-[60%] bg-[linear-gradient(rgba(0,102,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] [mask-image:linear-gradient(to_bottom,transparent,black)] [transform:perspective(1000px)_rotateX(60deg)] origin-bottom" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-12 lg:gap-16 items-center">
          {/* Left Column: The Monolith Branding */}
          <div className="lg:col-span-5 relative text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 md:space-y-8"
            >
              <div className="inline-flex items-center gap-4 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full mx-auto lg:mx-0">
                <ShieldAlert size={14} className="text-blue-500" />
                <span className="text-[10px] font-mono font-black text-blue-400 uppercase tracking-[0.4em]">
                  Restricted Access // Tier-03
                </span>
              </div>

              <h2 className="text-6xl md:text-8xl lg:text-[8rem] font-archivo font-black text-white leading-[0.8] uppercase tracking-tighter">
                Enter <br />
                <span className="text-blue-600 italic">Prise.</span>
              </h2>

              <div className="h-px w-24 bg-gradient-to-r from-blue-600 to-transparent my-6 md:my-10 mx-auto lg:mx-0" />

              <p className="text-lg md:text-xl font-archivo text-slate-400 leading-tight max-w-md mx-auto lg:mx-0">
                Uncompromising architecture for
                <span className="text-white italic"> global scale. </span>
                Initialize your private neural infrastructure.
              </p>

              <div className="pt-6 md:pt-8">
                <Button
                  size="lg"
                  className="group/btn relative px-8 md:px-10 py-6 md:py-8 bg-white text-black hover:bg-blue-600 hover:text-white transition-all duration-500 rounded-none font-archivo font-black uppercase tracking-[0.3em] text-[10px] md:text-xs overflow-hidden w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    Initialize Protocol <ArrowRight size={16} />
                  </span>
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                </Button>
              </div>
            </motion.div>

            {/* Floating Terminal Code Snip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-32 -left-10 hidden xl:block p-6 bg-[#0A0C10] border border-white/5 rounded-xl shadow-2xl backdrop-blur-xl"
            >
              <div className="flex gap-1.5 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
              <pre className="text-[10px] font-mono text-blue-400/80 leading-relaxed">
                <code>{`> Initializing scale_engine...\n> Verifying auth_token...\n> Deploying private_cluster_v6\n> Status: READY_FOR_DOMINATION`}</code>
              </pre>
            </motion.div>
          </div>

          {/* Right Column: System Modules Grid */}
          <div className="lg:col-span-7">
            <motion.div
              style={{ rotate, scale }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {systemModules.map((module, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group/module p-6 bg-white/[0.02] border border-white/5 hover:border-blue-600/30 transition-all duration-700 relative overflow-hidden flex flex-col justify-between h-full min-h-[260px]"
                >
                  {/* Decorative ID */}
                  <span className="absolute top-5 right-5 text-[10px] font-mono text-slate-700 group-hover/module:text-blue-600/40 transition-colors">
                    {module.id}
                  </span>

                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-blue-500 group-hover/module:bg-blue-600 group-hover/module:text-white transition-all duration-500 shadow-xl">
                      <module.icon size={24} strokeWidth={1.5} />
                    </div>

                    <div>
                      <h3 className="text-lg font-archivo font-black text-white uppercase tracking-tight mb-2">
                        {module.name}
                      </h3>
                      <p className="text-[13px] font-archivo text-slate-500 leading-relaxed">
                        {module.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between items-end border-t border-white/5 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-slate-600 uppercase tracking-widest mb-1">
                        Performance
                      </span>
                      <span className="text-[11px] font-mono text-blue-400 font-bold uppercase">
                        {module.metric}
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover/module:bg-blue-600 group-hover/module:border-blue-600 transition-all duration-500">
                      <ChevronRight size={14} className="text-white" />
                    </div>
                  </div>

                  {/* Subtle Background Glow */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl group-hover/module:bg-blue-600/10 transition-all duration-700" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Console Status Strip */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-between items-center gap-8">
          <div className="flex items-center gap-12">
            {[
              { label: "Architecture", val: "STAK_v9.0" },
              { label: "Deployment", val: "Multi-Region" },
              { label: "Encryption", val: "End-to-End" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest mb-1 font-bold">
                  {stat.label}
                </span>
                <span className="text-[13px] font-mono text-white/90 font-black uppercase tracking-tighter">
                  {stat.val}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-green-500 uppercase font-black">
                All Systems Operational
              </span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors cursor-pointer group">
              <MessageSquare size={16} />
              <span className="text-[10px] font-mono uppercase font-black tracking-widest">
                Live Architect Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
