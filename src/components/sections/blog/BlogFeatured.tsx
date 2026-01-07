import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar, Tag, User } from "lucide-react";
import { Button } from "../../ui/Button";
import { blogPosts } from "../../../data/blogData";
import { Link } from "react-router-dom";

export const BlogFeatured = () => {
  const featuredPost = blogPosts.find((p: any) => p.featured);

  if (!featuredPost) return null;

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden group border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            {/* Image Side */}
            <div className="relative h-full min-h-[300px] overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

              {/* Featured Badge */}
              <div className="absolute top-8 left-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 backdrop-blur-xl rounded-full text-white">
                  <Tag size={12} fill="white" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em]">
                    Priority Dispatch
                  </span>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-16 flex flex-col justify-center bg-slate-50 relative">
              <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-blue-600/10 rounded-tr-[3rem] pointer-events-none" />

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                      {featuredPost.date}
                    </span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                      {featuredPost.readTime} read
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-archivo font-black text-slate-900 leading-tight tracking-tighter uppercase">
                  {featuredPost.title.split(":")[0]}: <br />
                  <span className="text-blue-600 italic">
                    {featuredPost.title.split(":")[1]?.trim() || ""}
                  </span>
                </h2>

                <p className="text-lg text-slate-500 font-archivo leading-relaxed max-w-xl">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-6 flex flex-col sm:flex-row items-center gap-8 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
                      <User size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                        Author
                      </p>
                      <p className="text-sm font-archivo font-black text-slate-900 uppercase">
                        {featuredPost.author}
                      </p>
                    </div>
                  </div>

                  <Link to={`/blog/${featuredPost.id}`}>
                    <Button className="group/btn bg-slate-900 text-white hover:bg-blue-600 rounded-2xl px-8 py-6 font-archivo font-black uppercase tracking-[0.2em] text-[10px]">
                      Access Full Report{" "}
                      <ArrowRight
                        size={16}
                        className="ml-2 group-hover/btn:translate-x-1 transition-transform"
                      />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
