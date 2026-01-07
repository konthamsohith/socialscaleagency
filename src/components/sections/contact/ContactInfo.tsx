import { motion } from "framer-motion";
import { MapPin, Globe, Headphones, Mail, Terminal, ArrowUpRight } from "lucide-react";

export const ContactInfo = () => {
  return (
    <section className="py-16 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4 md:mb-6"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Globe size={14} />
            </div>
            <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-[0.4em]">
              Operational_Nodes
            </span>
          </motion.div>
          <h2 className="text-3xl md:text-6xl font-archivo font-black text-slate-900 tracking-tighter uppercase mb-4 md:mb-6 leading-none">
            Global <span className="text-blue-600 italic">Access.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              id: "NODE-01",
              title: "Digital HQ",
              desc: "Primary strategic operations and algorithmic development.",
              icon: MapPin,
              val: "Global Remote Operations",
              status: "ACTIVE",
            },
            {
              id: "NODE-02",
              title: "Direct Uplink",
              desc: "Priority communication for high-scale enterprise partnerships.",
              icon: Mail,
              val: "sales@socialscale.agency",
              status: "STANDBY",
            },
            {
              id: "NODE-03",
              title: "Technical Support",
              desc: "Maintenance and protocol optimization for existing modules.",
              icon: Headphones,
              val: "24/7 Client Dashboard",
              status: "VERIFIED",
            },
          ].map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-[2.5rem] border border-slate-200 p-8 hover:border-blue-600/30 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:border-blue-100 group-hover:bg-blue-50 transition-all">
                  <node.icon size={20} className="text-slate-400 group-hover:text-blue-600" />
                </div>
                <div className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                  <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest">{node.id}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-archivo font-black text-slate-900 uppercase mb-3 group-hover:text-blue-600 transition-colors">
                  {node.title}
                </h3>
                <p className="text-sm text-slate-500 font-archivo leading-relaxed">
                  {node.desc}
                </p>
              </div>

              <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-black mb-1">Current_Value</span>
                  <span className="text-[13px] font-archivo font-black text-slate-900 uppercase truncate max-w-[180px]">{node.val}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${node.status === 'ACTIVE' ? 'bg-green-500' : node.status === 'STANDBY' ? 'bg-amber-500' : 'bg-blue-500'} animate-pulse`} />
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-tighter">{node.status}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Terminal Footer */}
        <div className="mt-16 md:mt-20 p-6 md:p-8 bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity hidden md:block">
            <Terminal size={120} className="text-white" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-[10px] font-mono font-black text-blue-400 uppercase tracking-[0.4em] mb-3 md:mb-4 block">
                // System_Synchronized
              </span>
              <h3 className="text-xl md:text-3xl font-archivo font-black text-white uppercase tracking-tighter mb-3 md:mb-4 leading-tight">
                Ready to Initialize <br />
                <span className="text-blue-400">Scale Protocols?</span>
              </h3>
              <p className="text-slate-400 font-archivo text-xs md:text-sm leading-relaxed">
                Connect with our team to deploy high-velocity growth modules across your entire social ecosystem.
              </p>
            </div>
            <button className="w-full md:w-auto flex items-center justify-center gap-4 bg-blue-600 hover:bg-blue-500 text-white px-8 md:px-10 py-5 md:py-6 rounded-xl md:rounded-2xl font-archivo font-black uppercase text-[10px] md:text-xs tracking-[0.3em] transition-all hover:scale-105 shadow-2xl shadow-blue-600/20">
              Initialize Dialogue <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

