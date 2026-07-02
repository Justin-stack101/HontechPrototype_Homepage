import React, { useState, useEffect } from "react";
import { LucideIcon } from "./LucideIcon";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#vision-mission", label: "Vision & Mission" },
    { href: "#why-hontech", label: "Why Hontech" },
    { href: "#values", label: "Values" },
    { href: "#milestones", label: "Milestones" },
    { href: "#team", label: "Our Team" },
    { href: "#services", label: "Services" },
    { href: "#estimator", label: "Estimator & Booking" },
    { href: "#contact", label: "Contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800/40 shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, "#hero")}
              className="flex items-center gap-2 group focus:outline-none"
            >
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-md shadow-red-600/20 group-hover:bg-red-500 transition-colors">
                <LucideIcon name="Wrench" className="text-white" size={20} />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight italic uppercase">
                Hon<span className="text-red-600">Tech</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-xs font-semibold tracking-wider uppercase px-3 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? "text-white bg-red-600/10 border border-red-600/20"
                        : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a
                href="#estimator"
                onClick={(e) => handleLinkClick(e, "#estimator")}
                className="bg-red-600 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-[2px] transition-all duration-200"
              >
                Instant Estimate
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white focus:outline-none p-2 rounded-md hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <LucideIcon name="ChevronUp" size={24} />
                ) : (
                  <LucideIcon name="ChevronDown" size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-6 px-4 lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`text-sm font-semibold tracking-wide uppercase px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "text-white bg-red-600"
                        : "text-slate-300 hover:text-white hover:bg-slate-900"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="mt-4 pt-4 border-t border-slate-900">
                <a
                  href="#estimator"
                  onClick={(e) => handleLinkClick(e, "#estimator")}
                  className="block w-full bg-red-600 hover:bg-red-500 text-white text-center font-bold uppercase tracking-wider py-3 rounded-full shadow-lg"
                >
                  Book Instant Estimate
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
