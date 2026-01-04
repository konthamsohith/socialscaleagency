
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';

export const Contact = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="pt-32 pb-20 px-6">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Contact Us</h1>
                        <p className="text-slate-600 text-lg">
                            Ready to start growing? Get in touch with our team.
                        </p>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-electric-purple/20 focus:border-electric-purple transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-electric-purple/20 focus:border-electric-purple transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-electric-purple/20 focus:border-electric-purple transition-all bg-white">
                                    <option>General Inquiry</option>
                                    <option>Sales Question</option>
                                    <option>Support Request</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                <textarea
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-electric-purple/20 focus:border-electric-purple transition-all resize-none"
                                    placeholder="How can we help you grow?"
                                />
                            </div>
                            <Button className="w-full font-archivo font-bold text-[20px] leading-[28px]" size="lg">Get Started Now</Button>
                        </form>
                    </div>

                    <div className="mt-12 text-center text-slate-500">
                        <p className="mb-2">Email: <a href="mailto:sales@socialscale.agency" className="text-electric-purple hover:underline">sales@socialscale.agency</a></p>
                        <p>Web: www.socialscale.agency</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
