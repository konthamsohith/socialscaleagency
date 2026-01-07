import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  BarChart3,
} from "lucide-react";
import { AnimatedNumber } from "../../ui/AnimatedNumber";

const stats = [
  {
    icon: BarChart3,
    value: 10000,
    label: "Clients Scaled",
    suffix: "+",
    desc: "Deployment units successfully integrated.",
  },
  {
    icon: Users,
    value: 2,
    label: "Followers Gained",
    suffix: "M+",
    desc: "Aggregated network expansion signals.",
  },
  {
    icon: Heart,
    value: 50,
    label: "Engagement Signals",
    suffix: "M+",
    desc: "Neural-optimized interaction triggers.",
  },
  {
    icon: MessageCircle,
    value: 99,
    label: "Client Retention",
    suffix: "%",
    desc: "System reliability and uptime index.",
  },
];

export const CaseStudiesStats = () => {
  return (
    <section className="py-24 md:py-32 bg-[#F8FAFC] border-y border-slate-100 relative overflow-hidden">
      {/* Decorative Technical Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-8"
          >
            <TrendingUp size={14} />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">
              Network Track Record // AGGREGATED
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-archivo font-black text-slate-900 tracking-tighter leading-none uppercase mb-6"
          >
            Cumulative <br />
            <span className="text-blue-600 italic">Impact.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                <stat.icon size={28} strokeWidth={1.5} />
              </div>

              <div className="flex items-baseline gap-1 mb-2 whitespace-nowrap">
                <div className="text-4xl md:text-5xl font-archivo font-black text-slate-900">
                  <AnimatedNumber value={stat.value} />
                </div>
                <span className="text-2xl font-archivo font-black text-blue-600">
                  {stat.suffix}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </h3>
                <div className="h-[2px] w-8 bg-blue-600 rounded-full group-hover:w-full transition-all duration-700" />
                <p className="text-[13px] font-archivo text-slate-500 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
