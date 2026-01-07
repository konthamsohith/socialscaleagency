
import { Facebook, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const XIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 4l11.733 16h6.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
);
import { useLenis } from '@studio-freight/react-lenis';

export const Footer = () => {
    const lenis = useLenis();

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (href === "#") {
            lenis?.scrollTo(0);
        } else if (href.startsWith("#")) {
            const element = document.querySelector(href);
            if (element) {
                lenis?.scrollTo(element as HTMLElement);
            }
        }
    };

    return (
        <footer className="bg-white text-slate-600 py-20 px-6 border-t border-slate-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-5 gap-12 mb-16">

                    {/* Brand & Newsletter */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-electric-purple rounded-lg flex items-center justify-center">
                                <img src="/logo1.png" alt="SocialScale Logo" className="w-5 h-5 object-contain brightness-0 invert" />
                            </div>
                            <span style={{
                                fontFamily: 'sans-serif',
                                fontWeight: 700,
                                fontStyle: 'normal',
                                color: 'rgb(0, 0, 0)',
                                fontSize: '20px',
                                lineHeight: 'normal'
                            }}>SocialScale</span>
                        </div>
                        <p className="font-archivo font-normal text-[14px] leading-[20px] text-[#6D6D6D] mb-6">
                            Transform your social media presence into a powerful growth engine with our AI-driven strategies.
                        </p>
                        <form className="flex flex-col gap-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Stay in the loop</label>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 font-archivo font-normal text-[14px] leading-[20px] text-[#6D6D6D] focus:outline-none focus:border-electric-purple transition-colors w-full placeholder:text-[#6D6D6D]/60"
                                />
                                <button type="button" onClick={(e) => e.preventDefault()} className="bg-electric-purple text-white p-2 rounded-lg hover:bg-electric-purple/90 transition-colors cursor-default">
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Columns */}
                    <div>
                        <h4 className="font-archivo font-semibold text-black mb-6 uppercase text-xs tracking-widest">Product</h4>
                        <ul className="space-y-4 font-archivo font-medium text-[14px] leading-[20px] text-[#6D6D6D]">
                            <li><a href="#benefits" onClick={(e) => handleLinkClick(e, "#benefits")} className="hover:text-black transition-colors">Benefits</a></li>
                            <li><Link to="/services" className="hover:text-black transition-colors">Services</Link></li>
                            <li><a href="#reviews" onClick={(e) => handleLinkClick(e, "#reviews")} className="hover:text-black transition-colors">Testimonials</a></li>
                            <li><Link to="/pricing" className="hover:text-black transition-colors">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-archivo font-semibold text-black mb-6 uppercase text-xs tracking-widest">Company</h4>
                        <ul className="space-y-4 font-archivo font-medium text-[14px] leading-[20px] text-[#6D6D6D]">
                            <li><Link to="/about" className="hover:text-black transition-colors">About Us</Link></li>
                            <li><a href="#" onClick={(e) => e.preventDefault()} className="hover:text-black transition-colors">Careers</a></li>
                            <li><Link to="/blog" className="hover:text-black transition-colors">Blog</Link></li>
                            <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-archivo font-semibold text-black mb-6 uppercase text-xs tracking-widest">Legal</h4>
                        <ul className="space-y-4 font-archivo font-medium text-[14px] leading-[20px] text-[#6D6D6D]">
                            <li><Link to="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
                            <li><Link to="/cookie-policy" className="hover:text-black transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-archivo font-normal text-[12px] leading-[16px] text-[#6D6D6D]">
                        &copy; {new Date().getFullYear()} SocialScale. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-electric-purple transition-colors"><XIcon size={20} /></a>
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-electric-purple transition-colors"><Instagram size={20} /></a>
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-electric-purple transition-colors"><Linkedin size={20} /></a>
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-slate-400 hover:text-electric-purple transition-colors"><Facebook size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
