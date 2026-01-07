import { motion } from "framer-motion";
import { Send, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Button } from "../../ui/Button";

export const BlogNewsletter = () => {
  return (
    <section className="py-24 md:py-40 bg-[#020617] relative overflow-hidden">
      {/* Technical Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[4rem] p-8 md:p-20 overflow-hidden relative text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="px-4 py-1.5 bg-blue-600 rounded-sm text-[10px] font-mono font-black text-white uppercase tracking-[0.4em]">
                Direct Uplink // INTEL
              </div>
              <h2 className="text-4xl md:text-7xl font-archivo font-black text-white tracking-tighter uppercase leading-[0.9]">
                Stay <span className="text-blue-600 italic">Synchronized.</span>
              </h2>
              <p className="text-lg md:text-xl font-archivo text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Join our private intelligence feed. Get raw algorithmic data and 
                high-velocity strategies delivered to your console.
              </p>
            </div>

            <div className="max-w-md mx-auto relative group">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter secure email..."
                  className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white font-archivo text-sm focus:outline-none focus:border-blue-600 transition-all placeholder:text-slate-600"
                />
                <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-10 py-5 font-archivo font-black uppercase tracking-[0.2em] text-[10px] group/btn shadow-xl shadow-blue-600/20">
                  Connect <Send size={14} className="ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-10 pt-10 border-t border-white/5">
              {[
                { icon: Zap, label: "Weekly Dispatch" },
                { icon: ShieldCheck, label: "Data Integrity" },
                { icon: Sparkles, label: "Exclusive Alpha" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-500">
                  <item.icon size={16} className="text-blue-500/60" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Industrial Scanning Line */}
          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-px bg-blue-500/10 z-20 pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
};

