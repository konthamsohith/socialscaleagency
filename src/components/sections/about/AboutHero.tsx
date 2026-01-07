import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "../../ui/Button";
import { ArrowRight, Play, TrendingUp, Check } from "lucide-react";

export const AboutHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative pt-24 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-32 overflow-hidden brand-bg"
    >
      <style>{`
        .brand-bg {
          background: radial-gradient(circle at 50% 100%, #ffffff 0%, #ebf8ff 40%, #bfdbfe 100%);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="space-y-6 md:space-y-8 max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-[#0037FF]"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.span>
              <span className="text-[10px] md:text-xs font-archivo font-semibold uppercase tracking-wider text-[#0037FF]">
                About SocialScale
              </span>
            </motion.div>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-archivo font-black text-black leading-[1.1] uppercase tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Behind SocialScale — <br />
              The Team Powering{" "}
              <motion.span
                className="relative whitespace-nowrap text-[#0037FF] inline-block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Growth
                <motion.svg
                  className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300/60 -z-10"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 10"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                  ></path>
                </motion.svg>
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-base md:text-lg font-archivo font-normal text-[#6D6D6D] leading-relaxed max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              We are a team of data scientists, creative strategists, and AI
              engineers dedicated to redefining social media influence. Our
              AI-powered platform helps thousands of brands scale effortlessly,
              turning data into actionable growth strategies.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button
                size="lg"
                className="bg-[#0037FF] text-white hover:bg-blue-700 border-none px-8 py-4 rounded-full font-archivo font-bold text-[16px] leading-[22px]"
                onClick={() => (window.location.href = "/contact")}
              >
                Schedule a Meet
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-black border border-slate-200 hover:bg-slate-50 px-8 py-4 rounded-full font-archivo font-semibold text-[16px] leading-[22px]"
              >
                <Play className="mr-2 w-5 h-5 text-[#0037FF]" />
                See Our Story
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual Content - Floating Cards */}
          <div className="relative h-[600px] w-full hidden lg:block">
            {/* Background Blobs */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>

            <div className="relative h-full w-full">
              {/* Card 1: Team Member */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 right-4 w-64 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg z-20 border border-slate-100"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    alt="Team Member"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                    src="https://i.pravatar.cc/150?u=sarah"
                  />
                  <div>
                    <h4 className="font-archivo font-bold text-sm text-black">
                      Sarah Jenkins
                    </h4>
                    <p className="text-xs font-archivo font-normal text-[#6D6D6D]">
                      Head of Growth
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-[#0037FF] text-[10px] rounded-md font-archivo font-medium">
                    Strategy
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-600 text-[10px] rounded-md font-archivo font-medium">
                    +142% Reach
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#0037FF] h-full rounded-full w-3/4"></div>
                </div>
              </motion.div>

              {/* Card 2: Main Chart */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-[20%] left-[10%] w-80 bg-white p-5 rounded-2xl shadow-xl z-30 border border-slate-100"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-xs font-archivo font-medium uppercase tracking-wide text-[#6D6D6D]">
                      Monthly Growth
                    </p>
                    <h3 className="text-2xl font-archivo font-bold text-black mt-1">
                      2.4M{" "}
                      <span className="text-sm font-normal text-green-500 ml-1">
                        ↑ 12.5%
                      </span>
                    </h3>
                  </div>
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#0037FF]">
                    <TrendingUp size={20} />
                  </div>
                </div>
                <div className="flex items-end justify-between h-24 gap-2">
                  <div className="w-full bg-blue-50 rounded-t-sm h-[40%]"></div>
                  <div className="w-full bg-blue-100 rounded-t-sm h-[60%]"></div>
                  <div className="w-full bg-blue-200 rounded-t-sm h-[45%]"></div>
                  <div className="w-full bg-blue-300 rounded-t-sm h-[75%]"></div>
                  <div className="w-full bg-[#0037FF] rounded-t-sm h-[90%] relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-archivo">
                      Peak Performance
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Engineer */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-10 left-0 w-64 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg z-20 border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <img
                    alt="Team Member"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                    src="https://i.pravatar.cc/150?u=david"
                  />
                  <div>
                    <h4 className="font-archivo font-bold text-sm text-black">
                      David Chen
                    </h4>
                    <p className="text-xs font-archivo font-normal text-[#6D6D6D]">
                      AI Engineer
                    </p>
                  </div>
                  <button className="ml-auto w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[#0037FF] shadow-sm hover:scale-105 transition-transform">
                    <span className="text-sm">+</span>
                  </button>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-[10px] font-archivo font-medium text-[#6D6D6D]">
                    Active Projects
                  </span>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] ring-2 ring-white">
                      🤖
                    </div>
                    <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center text-[10px] ring-2 ring-white">
                      📊
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[8px] ring-2 ring-white text-[#6D6D6D] font-bold">
                      +3
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 4: Success Rate */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
                className="absolute bottom-20 right-8 bg-white p-3 rounded-xl shadow-lg border border-slate-100 z-10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <Check size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-archivo font-normal text-[#6D6D6D]">
                      Success Rate
                    </p>
                    <p className="font-archivo font-bold text-black">99.8%</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
