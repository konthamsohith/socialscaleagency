import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import { Button } from "../../ui/Button";

const plans = [
  {
    id: "TIER-01",
    name: "Growth",
    price: "29",
    description: "Ideal for individual creators seeking high-impact velocity.",
    features: [
      "2,500 Credits / mo",
      "Access 7 Platforms",
      "Standard Processing",
      "Email Support",
      "Analytics Dashboard",
      "Core AI Models",
    ],
    metrics: { credits: "2.5K", speed: "Standard", type: "Personal" },
    highlight: false,
    icon: Zap,
    color: "text-blue-600",
    bg: "bg-blue-50/50",
  },
  {
    id: "TIER-02",
    name: "Business",
    price: "79",
    description:
      "Professional infrastructure for high-scale brands & agencies.",
    features: [
      "10,000 Credits / mo",
      "Access 7 Platforms",
      "Priority Signal Processing",
      "Dedicated Manager",
      "24/7 VIP Support",
      "Custom Campaigns",
      "Advanced Neural Models",
    ],
    metrics: { credits: "10K", speed: "Priority", type: "Pro" },
    highlight: true,
    icon: Sparkles,
    color: "text-blue-600",
    bg: "bg-blue-600",
  },
];

export const PricingPlans = () => {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-10 md:gap-8 max-md:border-l-0 border-l-2 border-blue-600 pl-6 md:pl-8 relative">
          <div className="absolute left-0 top-0 w-[2px] h-full bg-blue-600 md:hidden" />
          <div className="max-w-2xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center md:justify-start gap-3 mb-6"
            >
              <Layers size={14} className="text-blue-600" />
              <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-[0.4em]">
                Allocation Modules // GRID_v2
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-7xl font-archivo font-black text-slate-900 tracking-tighter leading-none uppercase"
            >
              Deployment <br />
              <span className="text-blue-600 italic">Packages.</span>
            </motion.h2>
          </div>
          <p className="text-slate-500 font-archivo font-medium max-w-sm text-center md:text-right leading-relaxed italic text-sm md:text-base px-4 md:px-0">
            "Choose the modular unit that aligns with your desired growth
            trajectory."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group relative h-full"
            >
              <div
                className={`relative h-full bg-white rounded-[3rem] border transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-4 overflow-hidden
                ${
                  plan.highlight
                    ? "border-blue-600 shadow-[0_30px_80px_rgba(0,55,255,0.12)]"
                    : "border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.03)] group-hover:border-blue-500/30 group-hover:shadow-[0_30px_60px_rgba(0,55,255,0.08)]"
                } 
              `}
              >
                {plan.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
                )}

                {plan.highlight && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1.5 rounded-b-2xl text-[10px] font-mono font-black uppercase tracking-[0.2em] shadow-lg z-20">
                    High-Velocity Recommendation
                  </div>
                )}

                <div className="relative z-10 p-5 md:p-6 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-2">
                      <div className="inline-flex items-center px-3 py-1 bg-blue-50/50 backdrop-blur-xl border border-blue-100 rounded-lg shadow-sm">
                        <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">
                          {plan.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-1">
                        <motion.div
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                        />
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter font-bold">
                          Module Active
                        </span>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className={`w-10 h-10 rounded-[0.75rem] ${
                        plan.highlight
                          ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                          : "bg-slate-100/50 text-blue-600 border border-slate-200"
                      } flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl`}
                    >
                      <plan.icon size={20} />
                    </motion.div>
                  </div>

                  <div className="mb-5">
                    <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-[0.4em] block mb-2">
                      {plan.name} Infrastructure
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-archivo font-black text-slate-300">
                        $
                      </span>
                      <h3 className="text-5xl sm:text-6xl font-archivo font-black text-slate-900 tracking-tighter uppercase leading-none">
                        {plan.price}
                      </h3>
                      <span className="text-base font-archivo font-bold text-slate-400 lowercase tracking-tight">
                        /cycle
                      </span>
                    </div>
                    <div className="h-[2px] w-10 bg-blue-600 mt-5 group-hover:w-full transition-all duration-700 origin-left shadow-[0_0_15px_rgba(37,99,235,0.3)]" />
                  </div>

                  <p className="text-[13px] text-slate-500 leading-relaxed mb-6 font-archivo font-medium">
                    {plan.description}
                  </p>

                  <div className="space-y-2 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className="mt-1 flex-shrink-0 w-4 h-4 rounded bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-300">
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span className="text-[13px] font-archivo font-medium text-slate-600 leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-4">
                    <Button
                      size="lg"
                      className={`w-full py-4 rounded-[1rem] font-archivo font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl group/btn ${
                        plan.highlight
                          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30"
                          : "bg-slate-900 text-white hover:bg-black shadow-slate-900/30"
                      }`}
                    >
                      Initialize Module{" "}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-5 mt-6 border-t border-slate-100/80 relative">
                    {Object.entries(plan.metrics).map(([key, val]) => (
                      <div key={key} className="flex flex-col overflow-hidden">
                        <span className="text-[7px] sm:text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-1 font-bold truncate">
                          {key}
                        </span>
                        <span
                          className={`text-[9px] sm:text-[11px] font-mono font-black uppercase truncate ${
                            plan.highlight ? "text-blue-600" : "text-slate-900"
                          }`}
                        >
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ top: "-10%" }}
                  whileHover={{ top: "110%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute left-0 w-full h-px bg-blue-500/20 z-20 shadow-[0_0_15px_rgba(59,130,246,0.2)] opacity-0 group-hover:opacity-100"
                />

                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-slate-100 group-hover:border-blue-500/20 transition-colors rounded-tr-[3rem]" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-slate-100 group-hover:border-blue-500/20 transition-colors rounded-bl-[3rem]" />
              </div>
            </motion.div>
          ))}

          <div className="flex flex-col gap-4 h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-[#020617] p-5 md:p-6 rounded-[2.5rem] border border-white/10 hover:border-blue-500/30 transition-all duration-700 flex flex-col gap-4 relative overflow-hidden group flex-grow"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col gap-2">
                    <div className="inline-flex items-center px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">
                        MOD-ENT
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter font-black">
                        Architecture: CUSTOM
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg">
                    <Cpu size={20} />
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-2xl font-archivo font-black text-white leading-none uppercase tracking-tight">
                    Enterprise
                  </h3>
                  <p className="text-slate-400 font-archivo font-medium text-[13px] mt-2 leading-relaxed">
                    Tailored for global agencies requiring unlimited scale.
                  </p>
                </div>

                <Button className="w-full bg-white text-slate-900 hover:bg-blue-50 rounded-[1rem] py-5 font-archivo font-black uppercase tracking-widest text-[9px] transition-all shadow-xl group/btn">
                  Initialize Custom{" "}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>

                <div className="mt-6 space-y-2">
                  {[
                    "Custom design system setup",
                    "Integration with your stack",
                    "Priority onboarding & support",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-4 h-4 bg-blue-600/20 border border-blue-600/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShieldCheck
                          size={10}
                          className="text-blue-400"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="font-archivo font-bold text-[11px] leading-[18px] text-slate-300 uppercase tracking-tight">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-white p-5 md:p-6 rounded-[2.5rem] border border-slate-200/60 hover:border-blue-500/20 transition-all duration-700 flex flex-col justify-between group overflow-hidden relative"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-[0.75rem] bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm border border-blue-100">
                    <Layers size={16} />
                  </div>
                  <div>
                    <h3 className="font-archivo font-black text-slate-900 uppercase text-base leading-tight">
                      Still deciding?
                    </h3>
                    <p className="text-[9px] font-mono text-slate-400 uppercase tracking-[0.2em] mt-0.5">
                      Exploration
                    </p>
                  </div>
                </div>

                <p className="text-[12px] text-slate-500 font-archivo font-medium mb-4 leading-relaxed">
                  Calibrate your growth engine with our architecture team.
                </p>

                <button className="w-full text-blue-600 font-archivo font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-2 hover:gap-4 transition-all duration-300 mt-auto pt-1 group/support">
                  INITIATE DIALOGUE{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover/support:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
