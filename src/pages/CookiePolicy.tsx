import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const CookiePolicy = () => {
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
                            <span className="font-archivo font-normal text-[14px] leading-[17px] text-black uppercase">Legal Registry // v1.0</span>
                        </div>
                        <h1 className="font-archivo font-black text-[56px] md:text-[80px] leading-[0.9] text-black mb-6 uppercase tracking-tighter">
                            Cookie <br />
                            <span className="text-blue-600 italic">Policy.</span>
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
                                    1. What Are Cookies
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    2. How We Use Cookies
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    We use cookies for several reasons:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">To provide essential functionality (Strictly Necessary Cookies)</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">To understand how you use our website (Performance Cookies)</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">To remember your preferences and settings (Functionality Cookies)</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">To show you relevant advertisements (Targeting Cookies)</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    3. Types of Cookies We Use
                                </h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-archivo font-semibold text-[24px] leading-[28px] text-black mb-3">
                                            3.1 Necessary Cookies
                                        </h3>
                                        <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">
                                            These cookies are essential for you to browse the website and use its features. Without these cookies, services like secure login cannot be provided.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-archivo font-semibold text-[24px] leading-[28px] text-black mb-3">
                                            3.2 Analytical/Performance Cookies
                                        </h3>
                                        <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">
                                            These cookies allow us to recognize and count the number of visitors and see how visitors move around our website when they are using it. This helps us improve the way our website works.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-archivo font-semibold text-[24px] leading-[28px] text-black mb-3">
                                            3.3 Targeting Cookies
                                        </h3>
                                        <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">
                                            These cookies record your visit to our website, the pages you have visited, and the links you have followed. We use this information to make our website and the advertising displayed on it more relevant to your interests.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    4. Managing Cookies
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    Most web browsers allow you to control cookies through their settings. You can:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">See what cookies you've got and delete them on an individual basis</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Block third-party cookies</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Block cookies from particular sites</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Block all cookies from being set</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Delete all cookies when you close your browser</li>
                                </ul>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mt-4 italic">
                                    Note: If you choose to block cookies, you may find that certain features of our website do not work correctly.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    5. Changes to Our Cookie Policy
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    We may update this Cookie Policy from time to time. We encourage you to periodically review this page for the latest information on our cookie practices.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    6. Contact Us
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    If you have any questions about our Cookie Policy, please contact us at:
                                </p>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-2">
                                        <strong className="text-black">Email:</strong> privacy@socialscale.agency
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

