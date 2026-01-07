import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MessageCircle,
    Mail,
    ChevronDown,
    ChevronUp,
    FileQuestion,
    ExternalLink
} from 'lucide-react';

const faqs = [
    {
        question: "How long does it take to start an order?",
        answer: "Most orders start within 15-30 minutes of payment confirmation. larger packages might take slightly longer to initiate just to ensure safety."
    },
    {
        question: "Is it safe for my account?",
        answer: "Yes, we use organic methods and gradual delivery to ensure complete safety and compliance with platform terms of service."
    },
    {
        question: "Do you offer refunds?",
        answer: "We offer full refunds if an order cannot be completed. Please check our Refunds Policy page for specific conditions."
    },
    {
        question: "Can I cancel a running order?",
        answer: "Once an order status is 'Processing', it typically cannot be canceled immediately. Please contact support if you have an urgent issue."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept major credit cards (Visa, Mastercard), PayPal, and various cryptocurrencies."
    }
];

export const Support = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 font-archivo">Support & Help</h1>
                <p className="text-slate-500 mt-1">Found a bug? Need help with an order? We're here for you.</p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-600/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <MessageCircle size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                            <MessageCircle className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-archivo mb-2">Live Chat</h3>
                        <p className="text-blue-100 mb-6 text-sm">Chat with our support team in real-time for immediate assistance.</p>
                        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
                            Start Chat
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 transition-colors relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                        <Mail size={120} className="text-slate-900" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                            <Mail className="text-slate-700" size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-archivo text-slate-900 mb-2">Email Support</h3>
                        <p className="text-slate-500 mb-6 text-sm">Send us an email. We typically respond within 12 hours.</p>
                        <a href="mailto:sales@socialscale.agency" className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-blue-600 transition-colors">
                            sales@socialscale.agency <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </div>

            {/* FAQs */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg">
                        <FileQuestion className="text-blue-600" size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-slate-100 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(active => active === index ? null : index)}
                                className="w-full flex items-center justify-between p-4 text-left bg-slate-50/50 hover:bg-slate-50 transition-colors"
                            >
                                <span className={`font-medium ${openIndex === index ? 'text-blue-600' : 'text-slate-700'}`}>
                                    {faq.question}
                                </span>
                                {openIndex === index ?
                                    <ChevronUp size={18} className="text-blue-600" /> :
                                    <ChevronDown size={18} className="text-slate-400" />
                                }
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="p-4 text-sm text-slate-500 border-t border-slate-100 leading-relaxed bg-white">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
