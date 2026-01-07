import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  User,
  Layout,
  ExternalLink,
  Search,
  Filter,
  Activity,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "../../ui/Button";
import { blogPosts } from "../../../data/blogData";
import { Link } from "react-router-dom";

export const BlogGrid = () => {
  return (
    <section className="py-20 md:py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Refined Technical Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Intelligence Header - Compact */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center text-blue-600">
                <Layout size={14} />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-mono font-black text-blue-600 uppercase tracking-[0.4em]">
                  Registry // Access_v9.4
                </span>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-archivo font-black text-slate-900 tracking-tighter leading-[0.9] uppercase"
            >
              Intelligence{" "}
              <span className="text-blue-600 italic">Archive.</span>
            </motion.h2>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative group flex-grow lg:flex-grow-0">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors"
                  size={12}
                />
                <input
                  type="text"
                  placeholder="SCAN_REGISTRY..."
                  className="w-full lg:w-[200px] bg-slate-50 border-none rounded-lg pl-10 pr-4 py-2 text-[8px] font-mono font-bold text-slate-900 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-slate-300"
                />
              </div>
              <div className="w-px h-5 bg-slate-100 hidden lg:block" />
              <Button
                variant="ghost"
                size="sm"
                className="rounded-lg font-archivo font-black uppercase text-[8px] tracking-widest px-3 h-8"
              >
                <Filter size={10} className="mr-1.5" /> Filter
              </Button>
            </div>

            <div className="flex items-center gap-4 px-2">
              <div className="flex items-center gap-1">
                <Activity size={8} className="text-blue-600" />
                <span className="text-[7px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Load: 4.2%
                </span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck size={8} className="text-emerald-500" />
                <span className="text-[7px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Secure
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Zap size={8} className="text-amber-500" />
                <span className="text-[7px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dossier Grid - Compact 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {blogPosts.map((post: any, index: number) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-white rounded-[1.25rem] border border-slate-200 hover:border-blue-600/30 transition-all duration-500 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)] overflow-hidden relative"
            >
              <Link to={`/blog/${post.id}`} className="absolute inset-0 z-20" />
              {/* Header Visual - Reduced aspect ratio */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                />

                {/* ID Decal - Minimal */}
                <div className="absolute top-3 left-3">
                  <div className="px-2 py-0.5 bg-white/90 backdrop-blur-md rounded text-[7px] font-mono font-black text-blue-600 uppercase tracking-widest border border-white">
                    {post.id}
                  </div>
                </div>

                {/* Performance HUD - Compact */}
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-4">
                  <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-col border-l border-blue-500 pl-2">
                      <span className="text-[6px] font-mono font-black text-white/60 uppercase tracking-widest">
                        Efficiency
                      </span>
                      <span className="text-sm font-archivo font-black text-white">
                        {post.metrics.engagement}
                      </span>
                    </div>
                    <div className="flex flex-col border-l border-emerald-500 pl-2">
                      <span className="text-[6px] font-mono font-black text-white/60 uppercase tracking-widest">
                        Volume
                      </span>
                      <span className="text-sm font-archivo font-black text-white">
                        {post.metrics.reach}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Module - Reduced Padding */}
              <div className="p-5 flex flex-col flex-grow relative">
                {/* Background ID Watermark - Very small */}
                <div className="absolute top-4 right-6 text-4xl font-archivo font-black text-slate-50 leading-none select-none pointer-events-none group-hover:text-blue-50/30">
                  {post.id.split("-")[1]}
                </div>

                <div className="flex items-center gap-2 text-slate-400 mb-4 border-b border-slate-50 pb-3 relative z-10">
                  <div className="flex items-center gap-1">
                    <Calendar size={8} className="text-blue-600/50" />
                    <span className="text-[8px] font-mono font-bold uppercase tracking-widest">
                      {post.date}
                    </span>
                  </div>
                  <div className="w-0.5 h-0.5 rounded-full bg-slate-200" />
                  <span className="text-[8px] font-mono font-bold uppercase tracking-widest">
                    {post.readTime}
                  </span>
                </div>

                <div className="mb-3 relative z-10">
                  <span className="text-[7px] font-mono font-black text-blue-600 uppercase tracking-[0.2em] mb-2 block bg-blue-50 w-fit px-1.5 py-0.5 rounded-md border border-blue-100">
                    {post.category}
                  </span>
                  <h3 className="text-[15px] font-archivo font-black text-slate-900 leading-[1.2] uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                </div>

                <p className="text-[10px] font-archivo text-slate-500 leading-relaxed mb-6 flex-grow relative z-10">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                      <User size={12} className="text-slate-400" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-archivo font-black text-slate-900 uppercase">
                        {post.author}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[8px] font-mono font-black text-blue-600 uppercase tracking-[0.1em] group/link">
                    Details
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/20 group-hover/link:scale-110 transition-transform">
                      <ArrowRight size={10} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More - Compact */}
        <div className="mt-16 flex flex-col items-center gap-8">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <Button className="group/btn relative px-10 py-5 bg-slate-900 text-white hover:bg-blue-600 border-none transition-all duration-500 rounded-xl font-archivo font-black uppercase tracking-[0.3em] text-[9px] overflow-hidden shadow-xl">
            <span className="relative z-10 flex items-center gap-3">
              Load More <ExternalLink size={12} />
            </span>
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
          </Button>

          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-blue-600/30" />
              ))}
            </div>
            <span className="text-[8px] font-mono text-slate-400 uppercase tracking-[0.4em] font-black">
              // Buffer End
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
