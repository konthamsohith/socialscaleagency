import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  Terminal,
} from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SEO } from "../components/common/SEO";
import { blogPosts } from "../data/blogData";
import { Button } from "../components/ui/Button";

export const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p: any) => p.id === id);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-archivo font-black text-slate-900 mb-4 uppercase tracking-tighter">
            REPORT_NOT_FOUND
          </h1>
          <p className="text-slate-500 mb-8 font-archivo">
            The requested data packet does not exist in the registry.
          </p>
          <Button onClick={() => navigate("/blog")} className="rounded-xl px-8">
            Return to Archive
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SEO 
        title={`${post.title} | Knowledge Registry`}
        description={post.excerpt}
        image={post.image}
        type="article"
      />
      <Navbar />

      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[100] origin-left"
        style={{ scaleX }}
      />

      <main className="pt-24 md:pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto" ref={containerRef}>
          {/* Back Action */}
          <Link
            to="/blog"
            className="group flex items-center gap-3 text-[10px] font-mono font-black text-blue-600 uppercase tracking-[0.4em] mb-12 w-fit"
          >
            <div className="w-8 h-8 rounded-full border border-blue-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
              <ArrowLeft size={14} />
            </div>
            Back to Registry
          </Link>

          {/* Report Header */}
          <header className="mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="px-3 py-1 bg-white rounded-lg shadow-sm border border-slate-100 text-[10px] font-mono font-black text-blue-600 uppercase tracking-widest">
                {post.category}
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                  Status: DEPLOYED
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-6xl font-archivo font-black text-slate-900 tracking-tighter uppercase leading-[1.1] md:leading-[0.9] mb-8"
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 md:gap-8 py-6 md:py-8 border-y border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <User size={18} className="text-slate-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest">
                    Analyst
                  </span>
                  <span className="text-[11px] md:text-sm font-archivo font-black text-slate-900 uppercase">
                    {post.author}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Calendar size={18} className="text-slate-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest">
                    Deployment
                  </span>
                  <span className="text-[11px] md:text-sm font-archivo font-black text-slate-900 uppercase">
                    {post.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Clock size={18} className="text-slate-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest">
                    Dwell_Time
                  </span>
                  <span className="text-[11px] md:text-sm font-archivo font-black text-slate-900 uppercase">
                    {post.readTime}
                  </span>
                </div>
              </div>
            </motion.div>
          </header>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative aspect-video md:aspect-[21/9] rounded-2xl md:rounded-[2.5rem] overflow-hidden mb-12 md:mb-16 shadow-2xl shadow-blue-900/5"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            <div className="absolute top-4 left-4 md:top-8 md:left-8">
              <div className="px-3 py-1.5 md:px-4 md:py-2 bg-white/90 backdrop-blur-xl rounded-lg md:rounded-xl border border-white shadow-xl flex items-center gap-2 md:gap-3">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[10px] md:text-xs font-mono font-black text-slate-900 uppercase tracking-widest">
                  {post.id}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Body Content */}
            <div className="lg:col-span-8">
              <article
                className="prose-custom max-w-none 
                [&>h3]:font-archivo [&>h3]:font-black [&>h3]:uppercase [&>h3]:tracking-tighter [&>h3]:text-2xl [&>h3]:text-blue-600 [&>h3]:mt-10 [&>h3]:mb-4
                [&>p]:text-slate-600 [&>p]:leading-relaxed [&>p]:font-archivo [&>p]:mb-6 [&>p]:text-base md:[&>p]:text-lg
                [&>strong]:text-slate-900 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2 [&>ul]:text-slate-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share & Feedback */}
              <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">
                    Share_Report
                  </span>
                  <div className="flex gap-2">
                    {[Share2, ArrowUpRight].map((Icon, i) => (
                      <button
                        key={i}
                        className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600/30 transition-all shadow-sm"
                      >
                        <Icon size={18} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Metrics */}
            <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8">
              <div className="bg-white rounded-3xl md:rounded-[2rem] border border-slate-200 p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <Activity size={18} className="text-blue-600" />
                  <span className="text-[10px] font-mono font-black text-slate-900 uppercase tracking-[0.2em]">
                    Algorithmic_KPIs
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="flex flex-col gap-1 border-l-2 border-blue-500 pl-4">
                    <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest">
                      Engagement_Lift
                    </span>
                    <span className="text-2xl md:text-3xl font-archivo font-black text-slate-900">
                      {post.metrics.engagement}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 border-l-2 border-emerald-500 pl-4">
                    <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-widest">
                      Reach_Volume
                    </span>
                    <span className="text-2xl md:text-3xl font-archivo font-black text-slate-900">
                      {post.metrics.reach}
                    </span>
                  </div>
                </div>

                <div className="mt-10 md:mt-12 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      Verified Report
                    </span>
                  </div>
                  <p className="text-[10px] font-archivo text-slate-400 leading-relaxed">
                    This analysis has been synchronized with the core growth
                    engine and verified for deployment.
                  </p>
                </div>
              </div>

              {/* Newsletter Callout */}
              <div className="bg-slate-900 rounded-3xl md:rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                  <Terminal size={40} />
                </div>
                <span className="text-[8px] font-mono font-black text-blue-400 uppercase tracking-[0.4em] mb-4 block">
                  // UPLINK_CORE
                </span>
                <h4 className="text-xl font-archivo font-black uppercase tracking-tighter mb-4">
                  Get Weekly <br />
                  <span className="text-blue-400">Intelligence.</span>
                </h4>
                <div className="space-y-3 relative z-10">
                  <input
                    type="email"
                    placeholder="ENTER_EMAIL..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-mono text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-white/20"
                  />
                  <Button className="w-full py-4 text-[10px] tracking-[0.2em] bg-blue-600 hover:bg-blue-700 border-none rounded-xl">
                    Join Registry
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
