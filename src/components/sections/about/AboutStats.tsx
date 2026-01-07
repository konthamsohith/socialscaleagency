import { motion } from "framer-motion";
import { AnimatedNumber } from "../../ui/AnimatedNumber";

const stats = [
  {
    value: 850,
    suffix: "+",
    label: "Happy Customers",
    sublabel: "Growing Daily",
  },
  {
    value: 5.0,
    suffix: "M+",
    label: "Followers Delivered",
    sublabel: "Real & Active",
  },
  {
    value: 99,
    suffix: "%",
    label: "Success Rate",
    sublabel: "Guaranteed",
  },
  {
    value: "24/7",
    suffix: "",
    label: "Customer Support",
    sublabel: "Always Here",
  },
];

export const AboutStats = () => {
  return (
    <section className="py-16 md:py-20 bg-[#F8FAFC] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-archivo font-black text-slate-900 mb-4 uppercase tracking-tighter">
            Trusted by Millions Worldwide
          </h2>
          <p className="text-sm md:text-base font-archivo font-normal text-[#6D6D6D] max-w-2xl mx-auto">
            Join the community of successful brands and influencers who've
            transformed their social presence with our proven strategies.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 md:gap-y-12 lg:gap-y-0 relative">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`flex flex-col items-center justify-center text-center px-4 ${
                index < 3 ? "lg:border-r border-slate-200" : ""
              } ${index === 1 ? "max-md:border-none lg:border-r" : ""}`}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
            >
              <div className="text-5xl lg:text-6xl font-archivo font-bold text-black tracking-tight mb-2">
                {typeof stat.value === "string" ? (
                  stat.value
                ) : (
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-archivo font-bold text-black">
                  {stat.label}
                </span>
                <span className="text-xs font-archivo font-normal text-[#6D6D6D]">
                  {stat.sublabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
