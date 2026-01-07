import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Privacy = () => {
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
                            Privacy <br />
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
                                    1. Introduction
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    SocialScale ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    2. Information We Collect
                                </h2>
                                <h3 className="font-archivo font-semibold text-[24px] leading-[28px] text-black mb-3">
                                    2.1 Personal Information
                                </h3>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    We may collect personal information that you provide to us, including:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Name and contact information (email address, phone number)</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Billing and payment information</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Social media account information</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Communication preferences</li>
                                </ul>

                                <h3 className="font-archivo font-semibold text-[24px] leading-[28px] text-black mb-3">
                                    2.2 Automatically Collected Information
                                </h3>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    We automatically collect certain information when you visit our website, including:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">IP address and browser type</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Device information and operating system</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Usage data and website interactions</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Cookies and similar tracking technologies</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    3. How We Use Your Information
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Provide, maintain, and improve our services</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Process transactions and send related information</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Send you technical notices and support messages</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Respond to your comments and questions</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Monitor and analyze trends and usage</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Detect, prevent, and address technical issues</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    4. Information Sharing and Disclosure
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">With service providers who assist us in operating our website and conducting our business</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">When required by law or to protect our rights</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">In connection with a merger, acquisition, or sale of assets</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">With your consent or at your direction</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    5. Data Security
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    6. Your Rights
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    Depending on your location, you may have certain rights regarding your personal information, including:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">The right to access your personal information</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">The right to correct inaccurate information</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">The right to delete your personal information</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">The right to object to processing of your information</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">The right to data portability</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    7. Cookies and Tracking Technologies
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    8. Children's Privacy
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    9. Changes to This Privacy Policy
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    10. Contact Us
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    If you have any questions about this Privacy Policy, please contact us at:
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

