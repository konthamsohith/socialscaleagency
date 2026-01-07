import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Play,
  CheckCircle2,
  Quote,
  Activity,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
} from "lucide-react";

const reviews = [
  {
    id: "REV-091",
    name: "Rob West",
    role: "CEO of Kingdom Advisors",
    image: "https://i.pravatar.cc/150?u=rob",
    content:
      "SocialScale has greatly exceeded our expectations. The communication is always excellent, the turnaround is extremely quick, and the strategies are spot on!",
    metrics: { scale: "+124%", speed: "Ultra" },
  },
  {
    id: "REV-104",
    name: "Dom Tyler",
    role: "CEO of Kinsta",
    image: "https://i.pravatar.cc/150?u=dom",
    content:
      "The level of leverage provided was professional, attentive, and valuable. Their turnaround times are impressively fast! We scaled 3x in two months.",
    metrics: { scale: "300%", speed: "2.4ms" },
  },
  {
    id: "REV-042",
    name: "Sarah Jenkins",
    role: "Marketing Director at TechFlow",
    image: "https://i.pravatar.cc/150?u=sarah2",
    content:
      "The AI-powered scaling engine is not just hype. We saw a 400% increase in engagement within the first quarter. SocialScale has become the backbone of our strategy.",
    fullWidth: true,
    metrics: { scale: "+400%", speed: "Instant" },
  },
];

export const AboutTestimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="py-10 md:py-14 bg-[#020617] relative overflow-hidden"
    >
      {/* Background Technical Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#0037FF05_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:50px_50px]" />
        <motion.div
          style={{ y }}
          className="absolute -top-1/2 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[140px] -z-10"
        />
      </div>

      <div className="max-w-[1900px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header - Validation System */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 md:gap-12 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-4 md:mb-6">
              <ShieldCheck size={12} className="md:w-[14px] md:h-[14px]" />
              <span className="text-[8px] md:text-[10px] font-mono font-black uppercase tracking-[0.3em]">
                External Validation // System Verified
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-archivo font-black text-white tracking-tighter leading-[0.85] uppercase">
              Proven <br />
              <span className="text-blue-600 italic">Protocols.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 pb-2"
          >
            <div className="flex flex-col items-center md:items-end">
              <span className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Global Satisfaction
              </span>
              <span className="text-xl md:text-2xl font-archivo font-black text-white">
                99.8%
              </span>
            </div>
            <div className="h-8 md:h-12 w-px bg-white/10" />
            <div className="flex flex-col items-center md:items-end">
              <span className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Verified Reviews
              </span>
              <span className="text-xl md:text-2xl font-archivo font-black text-blue-600">
                500+
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Featured Video Dossier */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="group relative bg-[#050b1d] rounded-[1.5rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-700 hover:border-blue-500/30">
              {/* Technical Header */}
              <div className="p-4 flex justify-between items-center bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Activity size={10} className="text-blue-500" />
                  <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                    Live Feed // Case: #L-672
                  </span>
                </div>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                </div>
              </div>

              <div className="relative aspect-[3/2] md:aspect-[4/5] overflow-hidden">
                <motion.img
                  alt="Pri Patel Video Testimonial"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    className="w-16 h-16 bg-blue-600/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-blue-400/30 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-500"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={24} className="ml-1 fill-current" />
                  </motion.button>
                </div>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-px w-6 bg-blue-600" />
                    <span className="text-[9px] font-mono text-blue-400 font-bold uppercase tracking-widest">
                      Identity Confirmed
                    </span>
                  </div>
                  <h3 className="text-white text-2xl font-archivo font-black mb-0.5 uppercase tracking-tighter">
                    Pri Patel
                  </h3>
                  <p className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">
                    Product Designer // LightDash
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Log Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative bg-[#050b1d] p-5 md:p-6 rounded-[1.25rem] border border-white/5 flex flex-col justify-between transition-all duration-700 hover:border-blue-500/30 hover:-translate-y-2 ${
                  review.fullWidth ? "md:col-span-2" : ""
                }`}
              >
                {/* ID Tag */}
                <div className="absolute top-4 right-5 text-[10px] font-mono text-white/10 group-hover:text-blue-600/20 transition-colors font-black">
                  {review.id}
                </div>

                <div className="relative">
                  <div className="mb-3 opacity-20 group-hover:opacity-100 group-hover:text-blue-600 transition-all duration-500">
                    <Quote size={18} />
                  </div>

                  <p
                    className={`font-archivo text-slate-300 leading-relaxed mb-4 transition-colors group-hover:text-white ${
                      review.fullWidth ? "text-lg md:text-xl" : "text-sm"
                    }`}
                  >
                    "{review.content}"
                  </p>

                  {/* Profile & Logic Check */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#020617] border border-white/5 overflow-hidden group-hover:border-blue-600/30 transition-all duration-500">
                        <img
                          alt={review.name}
                          className="w-full h-full object-cover transition-all duration-700"
                          src={review.image}
                        />
                      </div>
                      <div>
                        <h4 className="font-archivo font-black text-xs text-white uppercase tracking-tight">
                          {review.name}
                        </h4>
                        <p className="text-[9px] font-mono font-medium text-slate-500 uppercase tracking-widest">
                          {review.role.split(" at ")[0]}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-2 px-2 py-0.5 rounded-lg bg-blue-600/5 border border-blue-500/10">
                        <TrendingUp size={10} className="text-blue-500" />
                        <span className="text-[9px] font-mono text-blue-400 font-bold">
                          {review.metrics.scale}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={10} className="text-emerald-500" />
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-tighter">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Support Collective CTA Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[1.25rem] p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 group overflow-hidden relative"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <MessageSquare size={18} className="text-blue-200" />
                  <span className="text-[10px] font-mono text-blue-100 font-bold uppercase tracking-[0.3em]">
                    Communication Protocol
                  </span>
                </div>
                <h3 className="text-white text-3xl md:text-4xl font-archivo font-black tracking-tighter uppercase leading-none">
                  Ready to be our next <br />
                  <span className="text-blue-200 italic">Success Dossier?</span>
                </h3>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="relative z-10 px-8 py-4 bg-white rounded-2xl text-[#0037FF] font-archivo font-black uppercase tracking-widest text-sm flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all"
              >
                Initiate Scale
                <Play size={14} className="fill-current" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
