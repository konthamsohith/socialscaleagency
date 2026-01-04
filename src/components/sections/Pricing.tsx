import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

// Kept structure, updated copy slightly to match context
const plans = [
    {
        name: "Growth",
        price: "29",
        description: "For creators scaling up.",
        features: [
            "2,500 Credits / mo",
            "Access 7 Platforms",
            "Scale to 20k Credits",
            "Instagram Follower: 5 Credits",
            "Instagram Likes: 5 / Credit",
            "LinkedIn Follower: 20 Credits",
            "LinkedIn Like: 10 Credits"
        ],
        highlight: false,
        buttonText: "Get Started"
    },
    {
        name: "Business",
        price: "79",
        description: "Power for brands & agencies.",
        features: [
            "10,000 Credits / mo",
            "Access 7 Platforms",
            "Dedicated Manager",
            "24/7 VIP Support",
            "Instagram Follower: 5 Credits",
            "Instagram Likes: 5 / Credit",
            "LinkedIn Follower: 20 Credits",
            "LinkedIn Like: 10 Credits"
        ],
        highlight: true,
        buttonText: "Get Started"
    }
];

export const Pricing = () => {
    return (
        <section id="pricing" className="py-32 px-6 bg-slate-50">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-2xl mx-auto mb-20"
                >
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#0037FF]">
                            <path d="M12 0C13.5 7.5 16.5 10.5 24 12C16.5 13.5 13.5 16.5 12 24C10.5 16.5 7.5 13.5 0 12C7.5 10.5 10.5 7.5 12 0Z" />
                        </svg>
                        <span className="font-archivo font-normal text-[14px] leading-[17px] text-black uppercase">PRICING</span>
                    </div>
                    <h2 className="font-archivo font-semibold text-[56px] leading-[62px] text-black mb-6">Flexible Pricing Plans</h2>
                    <p className="font-archivo font-normal text-[20px] leading-[28px] text-[#6D6D6D]">
                        Ready to scale your socials? Choose the perfect plan for you.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`
                                relative p-2 rounded-[32px] flex flex-col h-full
                                ${plan.highlight
                                    ? 'bg-gradient-to-b from-[#E0F2FF] to-[#F0F8FF] border border-blue-200 shadow-xl'
                                    : 'bg-slate-100 border border-slate-200'}
                            `}
                        >
                            {/* Inner White Card */}
                            <div className="bg-white rounded-[24px] p-8 shadow-sm border border-slate-100/50">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-blue-100 text-[#0037FF]' : 'bg-slate-100 text-slate-600'}`}>
                                        {plan.highlight ? <Sparkles size={24} /> : <Check size={24} />}
                                    </div>
                                    <h3 className="font-archivo font-medium text-[36px] leading-[40px] text-black tracking-tight">
                                        {plan.name}
                                    </h3>
                                </div>
                                <p className="font-archivo font-normal text-[16px] leading-[22px] text-[#6D6D6D] mb-8 h-10">
                                    {plan.description}
                                </p>

                                <div className="flex flex-col-reverse xl:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-50">
                                    <Button
                                        className={`w-full xl:w-auto rounded-full px-6 py-6 font-archivo font-semibold text-[16px] leading-[22px] no-underline whitespace-nowrap ${plan.highlight
                                            ? 'bg-[#0037FF] text-white hover:bg-blue-700 border-none'
                                            : 'bg-white text-black border border-slate-200 hover:bg-slate-50'
                                            }`}
                                        variant={plan.highlight ? 'primary' : 'secondary'}
                                    >
                                        {plan.buttonText} <ArrowRight size={18} className="ml-2" />
                                    </Button>
                                    <div className="flex items-baseline gap-0.5">
                                        <span className="font-archivo font-semibold text-[24px] leading-[26px] text-black">$</span>
                                        <span className="font-archivo font-bold text-[48px] leading-[53px] text-black">{plan.price}</span>
                                        <span className="font-archivo font-semibold text-[24px] leading-[26px] text-black ml-1">/month</span>
                                    </div>
                                </div>
                            </div>

                            {/* Features Grid - Outside Inner Card */}
                            <div className="p-8 flex-grow">
                                <div className="grid grid-cols-1 gap-y-4">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-black text-white' : 'bg-black text-white'}`}>
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                            <span className="font-archivo font-normal text-[16px] leading-[22px] text-black">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Manual Column 3: Stacked Cards */}
                    <div className="flex flex-col gap-6 h-full">
                        {/* Enterprise Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-xl transition-shadow flex flex-col gap-6"
                        >
                            <div>
                                <h3 className="font-archivo font-medium text-[36px] leading-[40px] text-black mb-2">Enterprise</h3>
                                <p className="font-archivo font-normal text-[16px] leading-[22px] text-[#6D6D6D]">Tailored for your team.</p>
                            </div>

                            <Button variant="secondary" className="w-full justify-between group bg-white border border-slate-200 hover:bg-slate-50 font-archivo font-semibold text-[16px] leading-[22px] text-black">
                                Get a Quote
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Button>

                            <div className="space-y-4">
                                {[
                                    "Custom design system setup",
                                    "Integration with your stack",
                                    "Priority onboarding & support"
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm">
                                        <div className="w-5 h-5 bg-[#0037FF] rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check size={12} className="text-white" />
                                        </div>
                                        <span className="font-archivo font-normal text-[16px] leading-[22px] text-black">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Still deciding? Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-3xl border border-slate-200 hover:shadow-xl transition-shadow flex flex-col justify-between flex-grow"
                        >
                            <div className="mb-6">
                                <h3 className="font-archivo font-medium text-[36px] leading-[40px] text-black mb-2">Still deciding?</h3>
                                <p className="font-archivo font-normal text-[16px] leading-[22px] text-[#6D6D6D]">Explore features or reach out.</p>

                            </div>

                            <Button variant="secondary" className="w-full justify-between group bg-white border border-slate-200 hover:bg-slate-50 font-archivo font-semibold text-[16px] leading-[22px] text-black">
                                Let's talk
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
