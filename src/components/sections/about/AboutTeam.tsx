import { motion } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    id: "01",
    name: "Alex Thompson",
    role: "Founder & CEO",
    focus: "Strategic Architecture",
    bio: "Visionary architect of high-scale AI ecosystems with 15+ years in neural engineering.",
    image: "https://i.pravatar.cc/800?u=alex",
    color: "#0037FF",
    metrics: { efficiency: "98.4%", stability: "99.9%", neural: "High" },
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "02",
    name: "Sarah Jenkins",
    role: "Chief Product Officer",
    focus: "Neural UX Systems",
    bio: "Pioneer in behavioral algorithms and intuitive logic flows for high-velocity growth.",
    image: "https://i.pravatar.cc/800?u=sarah",
    color: "#8B5CF6",
    metrics: { efficiency: "96.2%", stability: "98.8%", neural: "Elite" },
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "03",
    name: "Michael Chen",
    role: "Head of Engineering",
    focus: "Predictive Modeling",
    bio: "Specialist in low-latency ML deployment and massive-scale data integrity protocols.",
    image: "https://i.pravatar.cc/800?u=michael",
    color: "#10B981",
    metrics: { efficiency: "99.1%", stability: "100%", neural: "Ultra" },
    social: { linkedin: "#", twitter: "#" },
  },
  {
    id: "04",
    name: "Elena Rodriguez",
    role: "VP of Success",
    focus: "Influence Dynamics",
    bio: "Growth engine driving exponential ROI through community scaling and retention loops.",
    image: "https://i.pravatar.cc/800?u=elena",
    color: "#F59E0B",
    metrics: { efficiency: "97.5%", stability: "99.5%", neural: "High" },
    social: { linkedin: "#", twitter: "#" },
  },
];

export const AboutTeam = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="min-h-screen py-24 md:py-32 bg-white relative overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Simplified Header */}
        <div className="mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4 text-center md:text-left"
          >
            <span className="text-blue-600 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold">
              Our Leadership
            </span>
            <h2 className="text-4xl md:text-7xl font-archivo font-black text-slate-900 tracking-tighter uppercase leading-none">
              The <span className="text-blue-600 italic">Collective</span>
              <br />
              Intelligence.
            </h2>
          </motion.div>
        </div>

        {/* Simplified Identity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 bg-slate-100">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />

                {/* Minimal Social Overlay */}
                <div className="absolute bottom-6 left-6 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-900 hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-900 hover:bg-blue-400 hover:text-white transition-colors shadow-sm"
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <span className="text-blue-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                    {member.role}
                  </span>
                  <h3 className="text-2xl font-archivo font-black text-slate-900 uppercase tracking-tight">
                    {member.name}
                  </h3>
                </div>
                <p className="text-sm text-slate-500 font-archivo leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
