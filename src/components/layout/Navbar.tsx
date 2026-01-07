import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "../ui/Button";
import { Menu, X, ArrowRight } from "lucide-react";
import { useLenis } from "@studio-freight/react-lenis";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Handle route navigation
    if (href.startsWith("/")) {
      navigate(href);
      // If navigating to home, scroll to top after navigation
      if (href === "/" || href === "#") {
        setTimeout(() => {
          lenis?.scrollTo(0);
        }, 100);
      }
      return;
    }

    // Handle hash links (for home page sections)
    if (href === "#") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          lenis?.scrollTo(0);
        }, 100);
      } else {
        lenis?.scrollTo(0);
      }
    } else if (href.startsWith("#")) {
      // If we're not on home page, navigate there first
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            lenis?.scrollTo(element as HTMLElement);
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          lenis?.scrollTo(element as HTMLElement);
        }
      }
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Pricing", href: "/pricing" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
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
      <div
        className={cn(
          "relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 border",
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-slate-200/50 shadow-sm w-full max-w-5xl"
            : "bg-transparent border-transparent w-full max-w-7xl"
        )}
      >
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="SocialScale Logo"
            className="w-8 h-8 object-contain"
          />
          <span
            style={{
              fontFamily: "sans-serif",
              fontWeight: 700,
              fontStyle: "normal",
              color: "rgb(0, 0, 0)",
              fontSize: "20px",
              lineHeight: "normal",
            }}
          >
            SocialScale
          </span>
        </a>

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
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "22px",
              }}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button
            size="sm"
            onClick={(e) => handleNavClick(e, "/login")}
            className="group/btn relative px-6 py-2.5 bg-blue-600 text-white rounded-full overflow-hidden transition-all duration-500 border border-blue-600"
          >
            <div className="relative z-10 flex items-center gap-3">
              <span className="font-archivo font-black uppercase tracking-[0.2em] text-[10px] text-white">
                Get Started
              </span>
              <div className="w-px h-3 bg-white/10 group-hover/btn:bg-white/20 transition-colors duration-500" />
              <ArrowRight
                size={14}
                className="text-white group-hover/btn:translate-x-1 transition-all duration-500"
              />
            </div>

            {/* Minimalist Blue Shutter */}
            <div className="absolute inset-0 bg-blue-700 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </Button>
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
            <Button
              className="group/btn relative w-full py-4 bg-blue-600 text-white rounded-xl overflow-hidden transition-all duration-500 border border-blue-600"
              onClick={(e) => handleNavClick(e, "/login")}
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                <span className="font-archivo font-black uppercase tracking-[0.2em] text-[10px] text-white">
                  Get Started
                </span>
                <div className="w-px h-3 bg-white/10 group-hover/btn:bg-white/20 transition-colors duration-500" />
                <ArrowRight
                  size={14}
                  className="text-white group-hover/btn:translate-x-1 transition-all duration-500"
                />
              </div>

              {/* Minimalist Blue Shutter */}
              <div className="absolute inset-0 bg-blue-700 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            </Button>
          </div>
        )}
      </div>
    </motion.nav>
  );
};
