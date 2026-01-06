import { useState } from 'react';
import { MessageSquare, HelpCircle, Send, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

export const Support = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
        {
            question: "How do I refill my order?",
            answer: "If your order has a refill guarantee, you can request a refill from the 'My Orders' page by clicking the 'Refill' button next to the order."
        },
        {
            question: "Why is my order pending?",
            answer: "Orders are usually processed instantly, but sometimes high server load can cause delays. If it's been over 24 hours, please create a ticket."
        },
        {
            question: "Can I cancel an order?",
            answer: "Once an order has been sent to the server, it cannot be cancelled. Please double-check your link before placing an order."
        }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold font-archivo text-slate-900 mb-2">Support Center</h2>
            <p className="text-slate-500 mb-8">We're here to help. Check our FAQs or send us a message.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Ticket Form */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-electric-purple/10 text-electric-purple rounded-xl">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Create a Ticket</h3>
                                <p className="text-sm text-slate-500">Submit a new support request.</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Subject</label>
                                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-electric-purple transition-all appearance-none cursor-pointer">
                                        <option>Order Issue</option>
                                        <option>Payment / Funds</option>
                                        <option>Service Question</option>
                                        <option>Bug Report</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Order ID (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 12345"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-electric-purple transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Message</label>
                                <textarea
                                    className="w-full h-48 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:border-electric-purple transition-all resize-none placeholder:text-slate-400"
                                    placeholder="Describe your issue in detail..."
                                />
                            </div>

                            <div className="pt-2 flex justify-end">
                                <Button size="lg" className="flex items-center gap-2">
                                    Submit Ticket <Send size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Active Tickets List (Placeholder) */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <FileText size={20} className="text-slate-400" /> Current Tickets
                        </h3>

                        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <p className="text-slate-500 font-medium">No active tickets found</p>
                            <p className="text-xs text-slate-400 mt-1">Your support history will appear here.</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: FAQs */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                                <HelpCircle size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">FAQ</h3>
                                <p className="text-sm text-slate-500">Quick answers.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border border-slate-100 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors text-left"
                                    >
                                        <span className="font-bold text-slate-700 text-sm">{faq.question}</span>
                                        {openFaq === index ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="p-4 pt-0 text-sm text-slate-500 leading-relaxed bg-slate-50/50">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />

                        <h3 className="text-lg font-bold mb-2 relative z-10">Still need help?</h3>
                        <p className="text-slate-300 text-sm mb-6 relative z-10">
                            Our team is available 24/7 to assist you with any issues.
                        </p>

                        <Button variant="ghost" className="w-full bg-white/10 hover:bg-white/20 text-white border-0">
                            Contact via Telegram
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
