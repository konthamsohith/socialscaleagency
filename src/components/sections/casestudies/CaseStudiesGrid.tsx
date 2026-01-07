import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ExternalLink, 
  Target, 
  Zap, 
  TrendingUp, 
  Users, 
  Layout, 
  Globe,
  Quote
} from "lucide-react";
import { Button } from "../../ui/Button";

const caseStudies = [
  {
    id: "CASE-01",
    client: "TechStartup Inc.",
    industry: "B2B SaaS",
    platform: "LinkedIn",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    challenge: "Establishing global thought leadership and attracting enterprise-tier decision makers.",
    solution: "Neural-optimized content deployment and high-precision signal targeting for key stakeholders.",
    metrics: [
      { label: "Followers", before: "2.5K", after: "25K", color: "blue" },
      { label: "Lead Gen", before: "5/mo", after: "85/mo", color: "blue" },
      { label: "Engagement", before: "1.2%", after: "8.5%", color: "blue" }
    ],
    testimonial: "The architecture behind their growth is unparalleled. We've scaled our presence to match our enterprise goals.",
    author: "CEO, TechStartup"
  },
  {
    id: "CASE-02",
    client: "Fashion Brand Co.",
    industry: "E-commerce",
    platform: "Instagram",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    challenge: "Rapid expansion into new global markets while maintaining brand aesthetic and high conversion.",
    solution: "Cross-regional algorithmic synchronization and automated visual optimization sequences.",
    metrics: [
      { label: "Followers", before: "5K", after: "150K", color: "pink" },
      { label: "Ad Clicks", before: "50/mo", after: "2.5K/mo", color: "pink" },
      { label: "Likes", before: "200", after: "8.5K", color: "pink" }
    ],
    testimonial: "Direct correlation between their growth signals and our revenue. Essential infrastructure for modern fashion.",
    author: "Marketing Director"
  },
  {
    id: "CASE-03",
    client: "Venture Creator",
    industry: "Media",
    platform: "TikTok",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    challenge: "Sustainable viral velocity and monetizing content through high-impact brand partnerships.",
    solution: "Trend-prediction modeling and high-velocity follower acquisition protocols.",
    metrics: [
      { label: "Followers", before: "10K", after: "500K", color: "emerald" },
      { label: "Views/Vid", before: "5K", after: "250K", color: "emerald" },
      { label: "Revenue", before: "$0", after: "$45K/mo", color: "emerald" }
    ],
    testimonial: "SocialScale didn't just grow my numbers; they built a sustainable business engine around my content.",
    author: "Alex M., Content Creator"
  }
];

export const CaseStudiesGrid = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-10 border-l-2 border-blue-600 pl-6 md:pl-8">
          <div className="max-w-2xl text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center md:justify-start gap-3 mb-6"
            >
              <Target size={14} className="text-blue-600" />
              <span className="text-[10px] font-mono font-black text-blue-600 uppercase tracking-[0.4em]">
                Deployment Dossiers // STACK_v2
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-7xl font-archivo font-black text-slate-900 tracking-tighter leading-none uppercase"
            >
              Client <br />
              <span className="text-blue-600 italic">Benchmarks.</span>
            </motion.h2>
          </div>
          <p className="text-slate-500 font-archivo font-medium max-w-sm text-center md:text-right leading-relaxed italic text-sm md:text-base">
            "Analyzing the architectural impact of high-velocity social deployment."
          </p>
        </div>

        {/* Dossier Grid */}
        <div className="space-y-32">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}
            >
              {/* Visual Module */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-4 bg-slate-50 rounded-[2.5rem] -z-10 group-hover:bg-blue-50 transition-colors duration-700" />
                
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                    src={study.image}
                    alt={study.client}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                  
                  {/* Platform Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full text-white">
                      <Globe size={14} className="text-blue-400" />
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest">{study.platform}</span>
                    </div>
                  </div>

                  {/* Identification Tag */}
                  <div className="absolute bottom-6 right-6">
                    <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded text-white/80 text-[9px] font-mono uppercase tracking-tighter">
                      REF_ID: {study.id}
                    </div>
                  </div>
                </div>

                {/* Industrial Edge Markers */}
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-slate-200 group-hover:border-blue-500/30 transition-colors rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-slate-200 group-hover:border-blue-500/30 transition-colors rounded-bl-3xl" />
              </div>

              {/* Data Module */}
              <div className="w-full lg:w-1/2 space-y-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] font-bold">
                      {study.industry} // ARCHIVE_v6
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-archivo font-black text-slate-900 tracking-tighter uppercase leading-none mb-6">
                    {study.client}
                  </h3>
                  <div className="h-1 w-20 bg-blue-600 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[10px] font-mono text-blue-600 uppercase font-black tracking-widest mb-3 flex items-center gap-2">
                      <Layout size={12} /> The Challenge
                    </h4>
                    <p className="text-slate-500 font-archivo leading-relaxed text-sm md:text-base">
                      {study.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-blue-600 uppercase font-black tracking-widest mb-3 flex items-center gap-2">
                      <Zap size={12} /> The Solution
                    </h4>
                    <p className="text-slate-500 font-archivo leading-relaxed text-sm md:text-base">
                      {study.solution}
                    </p>
                  </div>
                </div>

                {/* Performance Dashboard */}
                <div className="grid grid-cols-3 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 relative overflow-hidden group/dash">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-2 font-bold truncate">{metric.label}</span>
                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="text-[10px] font-mono text-slate-300 line-through truncate">{metric.before}</span>
                        <span className="text-lg md:text-xl font-archivo font-black text-slate-900 truncate">{metric.after}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp size={10} className="text-emerald-500" />
                        <span className="text-[10px] font-mono font-black text-emerald-600">INCREASED</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Intelligence Quote */}
                <div className="relative p-8 bg-blue-600 rounded-3xl text-white shadow-2xl shadow-blue-500/20 overflow-hidden">
                  <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/5 rotate-12" />
                  <p className="relative z-10 text-lg font-archivo font-medium italic leading-relaxed mb-6">
                    "{study.testimonial}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-[2px] bg-white/30" />
                    <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">
                      // AUTH: {study.author}
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="ghost" className="group/btn text-blue-600 font-black uppercase tracking-[0.2em] text-xs p-0 flex items-center gap-4 hover:bg-transparent">
                    View Full Technical Report <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

