import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const CancellationAndRefund = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#0037FF]">
                                <path d="M12 0C13.5 7.5 16.5 10.5 24 12C16.5 13.5 13.5 16.5 12 24C10.5 16.5 7.5 13.5 0 12C7.5 10.5 10.5 7.5 12 0Z" />
                            </svg>
                            <span className="font-archivo font-normal text-[14px] leading-[17px] text-black uppercase">Refund Protocol // v1.0</span>
                        </div>
                        <h1 className="font-archivo font-black text-[56px] md:text-[80px] leading-[0.9] text-black mb-6 uppercase tracking-tighter">
                            Cancellation & <br />
                            <span className="text-blue-600 italic">Refund Policy.</span>
                        </h1>
                        <div className="flex items-center gap-4 text-slate-400 font-mono text-[10px] uppercase tracking-widest">
                            <span>Status: ACTIVE</span>
                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                            <span>Last updated: March 15, 2024</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="prose prose-slate max-w-none"
                    >
                        <div className="space-y-8">
                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    1. Cancellation Policy
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    You may cancel your SocialScale subscription at any time. Cancellation will take effect at the end of your current billing period. You will continue to have access to our services until the end of the paid period.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    2. Refund Eligibility
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    Refunds are available within 30 days of your initial purchase or subscription renewal. To be eligible for a refund, your account must not have violated our Terms of Service, and you must not have received more than 10% of the promised services.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    3. Refund Process
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    To request a refund, please contact our support team at refunds@socialscale.agency with your account details and reason for the refund request. We will review your request within 5-7 business days and process eligible refunds within 10-14 business days.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    4. Non-Refundable Items
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    The following are not eligible for refunds:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Services that have been fully delivered</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Accounts that have violated our terms</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Partial month subscriptions</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Custom or enterprise plans after 14 days</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    5. Subscription Cancellation
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    For recurring subscriptions, cancellation will prevent future charges but will not affect the current billing period. You can cancel through your account dashboard or by contacting support.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    6. Refund Methods
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    Approved refunds will be processed using the original payment method. Processing times vary by payment provider but typically take 3-5 business days to appear in your account.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    7. Exceptions and Special Cases
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    In cases of service unavailability due to technical issues on our end, or if we fail to deliver promised results within the agreed timeframe, we may offer full or partial refunds at our discretion. All exceptions are reviewed on a case-by-case basis.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    8. Contact Information
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    For cancellation or refund requests, please contact us at:
                                </p>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-2">
                                        <strong className="text-black">Email:</strong> refunds@socialscale.agency
                                    </p>
                                    <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-2">
                                        <strong className="text-black">Support Hours:</strong> Monday - Friday, 9 AM - 6 PM EST
                                    </p>
                                    <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">
                                        <strong className="text-black">Website:</strong> www.socialscale.agency
                                    </p>
                                </div>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};