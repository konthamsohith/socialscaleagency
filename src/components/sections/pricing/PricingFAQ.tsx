import { motion } from "framer-motion";
import { HelpCircle, Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What are credits?",
    answer: "Credits are our internal currency system. Each high-impact action (like gaining a targeted follower or generating engagement) costs a fixed number of credits based on platform-specific difficulty."
  },
  {
    question: "Can I change plans later?",
    answer: "Yes. You can upgrade or re-calibrate your plan at any time through the terminal. Changes are applied instantly to your deployment stack."
  },
  {
    question: "Do unused credits roll over?",
    answer: "To maintain network equilibrium, monthly allocations do not roll over. We recommend optimizing your spend to utilize your full quota each cycle."
  },
  {
    question: "Is there a free trial?",
    answer: "We offer a 7-day technical verification period. If the system doesn't meet your performance benchmarks within the first week, we provide a full refund."
  }
];

export const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-32 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-6 md:mb-8"
          >
            <HelpCircle size={14} />
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em]">
              Support Knowledge Base
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-archivo font-black text-slate-900 tracking-tighter leading-none uppercase mb-6 md:mb-8"
          >
            System <br />
            <span className="text-blue-600 italic">Clarification.</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group border rounded-3xl transition-all duration-500 ${
                  isOpen ? 'bg-white border-blue-200 shadow-xl' : 'bg-white/50 border-slate-100 hover:border-blue-100'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <span className={`text-lg md:text-xl font-archivo font-black uppercase tracking-tight transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-8 pt-0">
                    <p className="text-slate-500 font-archivo font-medium leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

