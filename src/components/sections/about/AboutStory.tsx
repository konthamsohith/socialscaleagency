import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  Rocket,
  Sparkles,
  Zap,
  ArrowRight,
  History,
  Milestone,
} from "lucide-react";
import { Button } from "../../ui/Button";

const timelineItems = [
  {
    year: "2018",
    phase: "PHASE 01",
    title: "The Genesis",
    content:
      "Born from a vision to humanize digital engagement. We started with a simple script that prioritized meaningful interactions over vanity metrics.",
    side: "left",
    icon: <Sparkles size={20} className="text-white" />,
    color: "#0037FF",
    glow: "rgba(0, 55, 255, 0.2)",
  },
  {
    year: "2019",
    phase: "PHASE 02",
    title: "Traction",
    content:
      "10,000 creators joined the movement. We proved that organic growth could be systematized without sacrificing authenticity.",
    side: "right",
    icon: <Rocket size={20} className="text-white" />,
    color: "#8B5CF6",
    glow: "rgba(139, 92, 246, 0.2)",
  },
  {
    year: "2021",
    phase: "PHASE 03",
    title: "AI Breakthrough",
    content:
      "Deployment of 'Core-Intelligence.' Our neural engine began processing millions of signals to predict viral content patterns with 85% accuracy.",
    side: "left",
    icon: <Zap size={20} className="text-white" />,
    color: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.2)",
  },
  {
    year: "2024",
    phase: "CURRENT",
    title: "The Ecosystem",
    content:
      "Beyond a tool—a global infrastructure. Empowering the world's most influential brands to scale their message with integrity.",
    side: "right",
    isHighlight: true,
    icon: <Milestone size={20} className="text-white" />,
    color: "#10B981",
    glow: "rgba(16, 185, 129, 0.2)",
  },
];

export const AboutStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useSpring(
    useTransform(scrollYProgress, [0.1, 0.8], [0, 1]),
    {
      stiffness: 100,
      damping: 30,
    }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-56 overflow-hidden bg-[#FBFDFF]"
    >
      {/* Dynamic Mesh Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px]" />

        {/* Grain Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        <motion.div
          style={{
            opacity: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.3, 0.8, 0.3]
            ),
            y: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_50%_50%,rgba(0,55,255,0.05),transparent_70%)] rounded-full blur-[100px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Industrial Tech Style */}
        <div className="flex flex-col items-center mb-24 md:mb-48">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-8 md:w-12 bg-blue-600/30" />
            <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-blue-600/5 border border-blue-600/10 backdrop-blur-sm">
              <History size={12} className="md:w-[14px] md:h-[14px] text-blue-600" />
              <span className="text-[8px] md:text-[10px] font-archivo font-black text-blue-600 uppercase tracking-[0.2em]">
                System Log: Evolution
              </span>
            </div>
            <div className="h-px w-8 md:w-12 bg-blue-600/30" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-6xl md:text-9xl font-archivo font-black text-black tracking-tighter leading-none text-center uppercase"
          >
            OUR <span className="text-blue-600 italic">LEGACY</span> IN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
              REAL-TIME.
            </span>
          </motion.h2>
        </div>

        {/* Timeline Core */}
        <div className="relative max-w-6xl mx-auto">
          {/* Enhanced Track with Glow Effect */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleY: pathLength, transformOrigin: "top" }}
              className="absolute inset-0 bg-gradient-to-b from-blue-600 via-purple-600 to-indigo-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
            />

            {/* Traveling Spark */}
            <motion.div
              style={{
                top: useTransform(pathLength, [0, 1], ["0%", "100%"]),
                opacity: useTransform(
                  pathLength,
                  [0, 0.05, 0.95, 1],
                  [0, 1, 1, 0]
                ),
              }}
              className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-white to-transparent z-10"
            />
          </div>

          {timelineItems.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative flex items-center mb-32 md:mb-56"
              >
                {/* Horizontal Connector Line (Desktop) */}
                <div
                  className={`hidden md:block absolute top-1/2 h-px bg-slate-100 -translate-y-1/2 ${
                    isEven ? "right-1/2 w-16" : "left-1/2 w-16"
                  }`}
                />

                {/* Content Block */}
                <div
                  className={`flex w-full ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isEven ? -100 : 100,
                      rotateY: isEven ? 20 : -20,
                    }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                    className={`w-full md:w-[46%] ml-12 md:ml-0 group perspective-1000`}
                  >
                    <div className="relative bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden group-hover:border-blue-100/50">
                      {/* Abstract Background Year - Parallax */}
                      <motion.span
                        style={{
                          y: useTransform(scrollYProgress, [0, 1], [20, -20]),
                        }}
                        className="absolute -top-4 -right-4 text-9xl font-archivo font-black text-slate-50 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none"
                      >
                        {item.year}
                      </motion.span>

                      {/* Header Info */}
                      <div className="flex items-center gap-4 mb-6">
                        <span className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-archivo font-black text-slate-400 tracking-widest">
                          {item.phase}
                        </span>
                        <div className="h-px flex-1 bg-slate-50" />
                        <span className="text-sm font-archivo font-bold text-blue-600">
                          {item.year}
                        </span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-archivo font-bold text-black mb-4 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 font-archivo font-normal text-lg leading-relaxed mb-10">
                        {item.content}
                      </p>

                      {item.isHighlight && (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            size="lg"
                            className="w-full bg-slate-900 text-white hover:bg-black font-archivo font-bold rounded-2xl py-8 shadow-xl shadow-slate-200"
                            onClick={() => (window.location.href = "/contact")}
                          >
                            JOIN THE FUTURE
                            <ArrowRight className="ml-2 w-5 h-5" />
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* Perspective Marker */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20">
                  <motion.div
                    style={{
                      scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.3]),
                      backgroundColor: item.color,
                      boxShadow: `0 0 30px ${item.glow}`,
                    }}
                    className="w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-[1.25rem] flex items-center justify-center border-[3px] md:border-4 border-white shadow-2xl relative"
                    whileHover={{ rotate: 15 }}
                  >
                    <div className="scale-75 md:scale-100">
                      {item.icon}
                    </div>

                    {/* Floating Label (Desktop) */}
                    <div
                      className={`hidden md:block absolute whitespace-nowrap top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-white border border-slate-100 shadow-xl shadow-slate-100/50 ${
                        isEven
                          ? "left-[calc(100%+24px)]"
                          : "right-[calc(100%+24px)]"
                      }`}
                    >
                      <span className="text-xs font-archivo font-black text-black uppercase tracking-widest">
                        {item.title}
                      </span>
                    </div>
                  </motion.div>

                  {item.isHighlight && (
                    <motion.div
                      className="absolute inset-0 rounded-xl md:rounded-[1.25rem]"
                      style={{ backgroundColor: item.color }}
                      animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
