
import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

const stats = [
    { value: 850, suffix: "+", label: "Happy Customers", sub: "Growing Daily", decimals: 0 },
    { value: 5.0, suffix: "M+", label: "Followers Delivered", sub: "Real & Active", decimals: 1 },
    { value: 99, suffix: "%", label: "Success Rate", sub: "Guaranteed", decimals: 0 },
    { value: 24, suffix: "/7", label: "Customer Support", sub: "Always Here", decimals: 0 },
];

const Counter = ({ value, suffix, decimals = 0 }: { value: number, suffix: string, decimals?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => latest.toFixed(decimals));

    useEffect(() => {
        if (isInView) {
            animate(count, value, { duration: 4, ease: "easeOut" });
        }
    }, [count, isInView, value]);

    return (
        <span ref={ref} className="flex justify-center items-baseline tabular-nums leading-none">
            <motion.span>{rounded}</motion.span>
            <span>{suffix}</span>
        </span>
    );
};

export const Stats = () => {
    return (
        <section className="py-20 bg-white border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-12">
                    <h2 className="font-archivo font-semibold text-[24px] leading-[26px] text-black mb-2">Trusted by Millions Worldwide</h2>
                    <p className="font-archivo font-normal text-[16px] leading-[22px] text-[#6D6D6D] max-w-2xl mx-auto">
                        Join the community of successful brands and influencers who've transformed their social presence with our proven strategies.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-4 flex flex-col items-center"
                        >
                            <div className="font-archivo font-bold text-[48px] leading-[53px] text-black mb-2">
                                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                            </div>
                            <div className="font-archivo font-semibold text-[16px] leading-[22px] text-black mb-1">{stat.label}</div>
                            <div className="font-archivo font-normal text-[16px] leading-[22px] text-[#6D6D6D]">{stat.sub}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
