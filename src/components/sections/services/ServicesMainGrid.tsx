import { motion } from "framer-motion";
import { 
  Linkedin, 
  Instagram, 
  Youtube, 
  MessageCircle, 
  ArrowRight,
  TrendingUp,
  Zap,
  Activity,
  Layers,
  Globe
} from "lucide-react";

const TikTokIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
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

const XIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h6.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const mainServices = [
  {
    id: "MOD-01",
    title: "LinkedIn",
    focus: "Network Authority",
    icon: Linkedin,
    description: "Establishing professional dominance through strategic signal injection and AI-optimized thought leadership.",
    metrics: { multiplier: "3.4x", type: "Professional", status: "Active" },
    color: "text-blue-700",
    bg: "bg-blue-50/50"
  },
  {
    id: "MOD-02",
    title: "Instagram",
    focus: "Visual Resonance",
    icon: Instagram,
    description: "Architecting immersive visual ecosystems designed for maximum organic reach and behavioral conversion.",
    metrics: { multiplier: "5.2x", type: "Visual", status: "Optimal" },
    color: "text-pink-600",
    bg: "bg-pink-50/50"
  },
  {
    id: "MOD-03",
    title: "TikTok",
    focus: "Viral Propulsion",
    icon: TikTokIcon,
    description: "Harnessing algorithmic gravity to project your brand into the center of high-frequency social trends.",
    metrics: { multiplier: "12x", type: "Short-form", status: "Accelerated" },
    color: "text-slate-900",
    bg: "bg-slate-50/50"
  },
  {
    id: "MOD-04",
    title: "YouTube",
    focus: "Retention Ecosystems",
    icon: Youtube,
    description: "Constructing deep-funnel video infrastructures that transform passive viewers into lifelong brand advocates.",
    metrics: { multiplier: "4.8x", type: "Long-form", status: "Stable" },
    color: "text-red-600",
    bg: "bg-red-50/50"
  },
  {
    id: "MOD-05",
    title: "X Systems",
    focus: "Real-Time Signal",
    icon: XIcon,
    description: "High-frequency deployment modules engineered to capture instantaneous market attention and drive narrative.",
    metrics: { multiplier: "2.9x", type: "Dynamic", status: "Active" },
    color: "text-slate-900",
    bg: "bg-slate-100/50"
  },
  {
    id: "MOD-06",
    title: "Quora",
    focus: "Expert Validation",
    icon: MessageCircle,
    description: "Scaling intellectual authority through high-visibility knowledge deployment in high-intent social verticals.",
    metrics: { multiplier: "2.1x", type: "Knowledge", status: "Verified" },
    color: "text-red-800",
    bg: "bg-red-50/50"
  }
];

export const ServicesMainGrid = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header - Industrial Style */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12 border-l-2 border-blue-600 pl-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <Layers size={14} className="text-blue-600" />
              <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-[0.4em]">
                Deployment Modules // GRID_v2
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-archivo font-black text-slate-900 tracking-tighter leading-none uppercase"
            >
              Cross-Platform <br />
              <span className="text-blue-600 italic">Domination.</span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex flex-col items-end gap-4"
          >
            <div className="flex items-center gap-4 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
              <Activity size={14} className="text-blue-600" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Global Sync: ACTIVE</span>
            </div>
            <p className="text-right text-slate-400 text-sm font-archivo font-medium max-w-[280px] italic">
              "We engineer psychological assets designed to conquer every relevant social vertical."
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-full"
            >
              <div className="relative h-full bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:border-blue-500/20 group-hover:shadow-[0_30px_60px_rgba(0,55,255,0.08)] group-hover:-translate-y-2">
                
                <div className="flex justify-between items-start mb-10">
                  <div className="flex flex-col gap-2">
                    <div className="inline-flex items-center px-3 py-1 bg-blue-50/50 backdrop-blur-sm border border-blue-100 rounded-lg">
                      <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">
                        {service.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter font-bold">Protocol Active</span>
                    </div>
                  </div>
                  <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl border border-transparent group-hover:border-slate-100`}>
                    <service.icon size={28} className={service.color} />
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-[11px] font-mono text-blue-600 font-bold uppercase tracking-[0.35em] block mb-3">
                    {service.focus}
                  </span>
                  <h3 className="text-3xl font-archivo font-black text-slate-900 leading-none uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <div className="h-0.5 w-12 bg-blue-600 mt-4 group-hover:w-full transition-all duration-700 origin-left" />
                </div>

                <p className="text-[15px] text-slate-500 leading-relaxed mb-10 font-archivo font-medium">
                  {service.description}
                </p>

                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-50 mt-auto">
                  {Object.entries(service.metrics).map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-[8px] font-mono text-slate-400 uppercase tracking-tighter mb-1 font-bold">
                        {key}
                      </span>
                      <span className="text-[11px] font-mono text-blue-600 font-black uppercase">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Industrial Edge Markers */}
                <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-slate-50 group-hover:border-blue-500/20 transition-colors rounded-tr-[2.5rem]" />
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-slate-50 group-hover:border-blue-500/20 transition-colors rounded-bl-[2.5rem]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Footer Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 pt-12 border-t border-slate-100 flex flex-wrap justify-center gap-12 opacity-60"
        >
          {[
            { label: "Deployment", val: "Edge-Latency Optimized", icon: Zap },
            { label: "Architecture", val: "Distributed Neural Link", icon: Globe },
            { label: "Encryption", val: "End-to-End Dynamic", icon: Activity },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <item.icon size={16} className="text-blue-600" />
              <div className="flex flex-col">
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">{item.label}</span>
                <span className="text-[10px] font-mono text-slate-900 font-black uppercase">{item.val}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

