import { motion } from "framer-motion";
import { Send, User, Mail, MessageSquare, Activity, ShieldCheck, Zap } from "lucide-react";
import { Button } from "../../ui/Button";

export const ContactForm = () => {
  return (
    <section className="py-16 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Left Column: System Status */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-8 md:mb-12"
              >
                <h3 className="text-3xl md:text-5xl font-archivo font-black text-slate-900 tracking-tighter uppercase mb-4 md:mb-6">
                  Communication <br />
                  <span className="text-blue-600">Protocol.</span>
                </h3>
                <p className="text-base md:text-lg text-slate-500 font-archivo leading-relaxed mb-6 md:mb-8">
                  Initialize a secure uplink with our growth architects. All data packets are encrypted and prioritized via our rapid response buffer.
                </p>
              </motion.div>

              <div className="space-y-3 md:space-y-4 max-w-md mx-auto lg:mx-0">
                {[
                  { icon: Activity, label: "Response Latency", val: "< 2.4 Hours", color: "text-blue-600" },
                  { icon: ShieldCheck, label: "Uplink Security", val: "AES-256 Encrypted", color: "text-emerald-500" },
                  { icon: Zap, label: "System Priority", val: "High Efficiency", color: "text-amber-500" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <stat.icon size={18} className={stat.color} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest font-black">{stat.label}</span>
                      <span className="text-[13px] font-archivo font-black text-slate-900 uppercase">{stat.val}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Technical Blueprint Decoration */}
              <div className="mt-12 p-6 border border-slate-100 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                </div>
                <div className="flex flex-col gap-2 opacity-40 group-hover:opacity-100 transition-all duration-700">
                  <div className="h-1 w-2/3 bg-blue-600/20 rounded-full" />
                  <div className="h-1 w-full bg-blue-600/10 rounded-full" />
                  <div className="h-1 w-1/2 bg-blue-600/20 rounded-full" />
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.4em] mt-6 block">
                  // Network_Pulse_Active
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-200 p-6 md:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.04)] relative"
            >
              {/* Industrial Edge Markers */}
              <div className="absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 pointer-events-none opacity-10">
                <div className="absolute top-6 md:top-8 right-6 md:right-8 w-1 h-8 md:h-12 bg-slate-900" />
                <div className="absolute top-6 md:top-8 right-6 md:right-8 h-1 w-8 md:w-12 bg-slate-900" />
              </div>

              <form className="space-y-6 md:space-y-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest ml-4">Full_Name</label>
                    <div className="relative group">
                      <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="text"
                        placeholder="IDENTIFY..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl pl-14 pr-6 py-4 md:py-5 text-sm font-archivo text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest ml-4">Email_Address</label>
                    <div className="relative group">
                      <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="email"
                        placeholder="UPLINK_ADDR..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl pl-14 pr-6 py-4 md:py-5 text-sm font-archivo text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest ml-4">Communication_Type</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Growth', 'Strategy', 'Support', 'Other'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        className="px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border border-slate-100 bg-slate-50 text-[9px] md:text-[10px] font-mono font-bold text-slate-500 hover:border-blue-600/30 hover:bg-white hover:text-blue-600 transition-all uppercase tracking-widest"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest ml-4">Message_Payload</label>
                  <div className="relative group">
                    <MessageSquare size={16} className="absolute left-5 top-5 md:top-6 text-slate-300 group-focus-within:text-blue-600 transition-colors" />
                    <textarea
                      rows={5}
                      placeholder="ENTER_DATA..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl pl-14 pr-6 py-4 md:py-5 text-sm font-archivo text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all placeholder:text-slate-300 resize-none"
                    />
                  </div>
                </div>

                <Button className="group/btn relative w-full py-6 md:py-8 bg-slate-900 text-white hover:bg-blue-600 border-none transition-all duration-500 rounded-xl md:rounded-2xl font-archivo font-black uppercase tracking-[0.4em] text-xs overflow-hidden shadow-2xl">
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    Transmit Payload <Send size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                </Button>

                <div className="flex items-center justify-center gap-2 pt-4">
                  <div className="w-1 h-1 rounded-full bg-slate-200" />
                  <span className="text-[8px] font-mono text-slate-400 uppercase tracking-[0.5em]">
                    System_Ready_For_Transmission
                  </span>
                  <div className="w-1 h-1 rounded-full bg-slate-200" />
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

