import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Terms = () => {
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
                            Terms of <br />
                            <span className="text-blue-600 italic">Service.</span>
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
                                    1. Agreement to Terms
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    By accessing or using SocialScale's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    2. Use License
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    Permission is granted to temporarily access the materials on SocialScale's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Modify or copy the materials</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Use the materials for any commercial purpose or for any public display</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Attempt to reverse engineer any software contained on the website</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Remove any copyright or other proprietary notations from the materials</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    3. Services Description
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    SocialScale provides AI-powered social media growth services, including but not limited to follower growth, engagement optimization, and profile management across various social media platforms. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    4. User Accounts
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    To access certain features of our services, you may be required to create an account. You are responsible for:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Maintaining the confidentiality of your account credentials</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">All activities that occur under your account</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Providing accurate and complete information</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Notifying us immediately of any unauthorized use</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    5. Payment Terms
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    Our services are provided on a subscription basis. By subscribing, you agree to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Pay all fees associated with your selected plan</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Automatic renewal of your subscription unless cancelled</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">No refunds for partial subscription periods unless required by law</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Price changes with 30 days' notice</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    6. Prohibited Uses
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    You agree not to use our services to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Violate any applicable laws or regulations</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Infringe upon the rights of others</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Transmit any harmful or malicious code</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Engage in spam or unsolicited communications</li>
                                    <li className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D]">Impersonate any person or entity</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    7. Intellectual Property
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    All content, features, and functionality of our services, including but not limited to text, graphics, logos, and software, are the exclusive property of SocialScale and are protected by international copyright, trademark, and other intellectual property laws.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    8. Disclaimer
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    The materials on SocialScale's website are provided on an 'as is' basis. SocialScale makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    9. Limitations of Liability
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    In no event shall SocialScale or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SocialScale's website, even if SocialScale or a SocialScale authorized representative has been notified orally or in writing of the possibility of such damage.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    10. Indemnification
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    You agree to indemnify, defend, and hold harmless SocialScale, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    11. Termination
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    12. Changes to Terms
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-archivo font-semibold text-[32px] leading-[38px] text-black mb-4">
                                    13. Contact Information
                                </h2>
                                <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-4">
                                    If you have any questions about these Terms of Service, please contact us at:
                                </p>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <p className="font-archivo font-normal text-[16px] leading-[26px] text-[#6D6D6D] mb-2">
                                        <strong className="text-black">Email:</strong> legal@socialscale.agency
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

