import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';
import { useLenis } from '@studio-freight/react-lenis';
import { cn } from '../../lib/utils';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lenis = useLenis();
    const navigate = useNavigate();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, href: string) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        if (href === "#") {
            lenis?.scrollTo(0);
        } else if (href.startsWith("#")) {
            const element = document.querySelector(href);
            if (element) {
                lenis?.scrollTo(element as HTMLElement);
            }
        } else {
            navigate(href);
        }
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const links = [
        { name: 'Home', href: '#' },
        { name: 'Benefits', href: '#benefits' },
        { name: 'Services', href: '#services' },
        { name: 'Testimonials', href: '#reviews' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Contact', href: '#start-growing' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 transition-all duration-300",
                isScrolled ? "pt-4" : "pt-6"
            )}
        >
            <div className={cn(
                "relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 border",
                isScrolled
                    ? "bg-white/80 backdrop-blur-md border-slate-200/50 shadow-sm w-full max-w-5xl"
                    : "bg-transparent border-transparent w-full max-w-7xl"
            )}>
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="SocialScale Logo" className="w-8 h-8 object-contain" />
                    <span style={{
                        fontFamily: 'sans-serif',
                        fontWeight: 700,
                        fontStyle: 'normal',
                        color: 'rgb(0, 0, 0)',
                        fontSize: '20px',
                        lineHeight: 'normal'
                    }}>SocialScale</span>
                </div>

                <div className="hidden md:flex items-center bg-slate-100/50 rounded-full px-1 p-1 border border-slate-200/50">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors rounded-full hover:bg-white"
                            style={{
                                fontFamily: 'Archivo, "Archivo Placeholder", sans-serif',
                                fontWeight: 400,
                                fontStyle: 'normal',
                                fontSize: '16px',
                                lineHeight: '22px'
                            }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Button size="sm" onClick={(e) => handleNavClick(e, "/login")} className="font-archivo font-medium text-[16px] leading-[22px] text-white">Get Started</Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-slate-600"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 mx-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col gap-2 md:hidden">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-4 py-3 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-xl"
                                onClick={(e) => handleNavClick(e, link.href)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <div className="h-px bg-slate-100 my-2" />
                        <Button className="w-full font-archivo font-medium text-[16px] leading-[22px] text-white" onClick={(e) => handleNavClick(e, "/login")}>Get Started</Button>
                    </div>
                )}
            </div>
        </motion.nav>
    );
};
