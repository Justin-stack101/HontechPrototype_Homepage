import React from "react";
import { LucideIcon } from "./LucideIcon";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
    <footer className="bg-slate-950 text-white border-t border-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top brand grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900 items-start">
          
          <div className="md:col-span-6 text-left">
            <a
              href="#hero"
              onClick={(e) => handleScrollTo(e, "#hero")}
              className="flex items-center gap-2 mb-4 group"
            >
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-extrabold shadow-md shadow-red-600/20">
                <LucideIcon name="Wrench" size={16} />
              </div>
              <span className="text-xl font-extrabold italic uppercase tracking-tight">
                Hon<span className="text-red-600">Tech</span>
              </span>
            </a>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Supervised by ex-casa certified auto repair professionals and diagnostics engineers in Marikina City. Delivering dealer-level diagnostics at transparent, fair rates.
            </p>
          </div>

          <div className="md:col-span-3 text-left">
            <h4 className="text-slate-200 font-extrabold text-xs uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs font-semibold">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleScrollTo(e, "#about")}
                  className="hover:text-red-500 transition-colors"
                >
                  About Corporate
                </a>
              </li>
              <li>
                <a
                  href="#why-hontech"
                  onClick={(e) => handleScrollTo(e, "#why-hontech")}
                  className="hover:text-red-500 transition-colors"
                >
                  The 6 C's Pillars
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, "#services")}
                  className="hover:text-red-500 transition-colors"
                >
                  PMS Packages
                </a>
              </li>
              <li>
                <a
                  href="#estimator"
                  onClick={(e) => handleScrollTo(e, "#estimator")}
                  className="hover:text-red-500 transition-colors"
                >
                  Cost Calculator
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 text-left">
            <h4 className="text-slate-200 font-extrabold text-xs uppercase tracking-wider mb-4">
              Our Policies
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs font-semibold">
              <li className="hover:text-slate-300">Parts Warranty Guarantees</li>
              <li className="hover:text-slate-300">Repeat-Jobs Zero-Fee Clause</li>
              <li className="hover:text-slate-300">Certificate of Logs Records</li>
              <li className="hover:text-slate-300">Privacy Policy Terms</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-center sm:text-left text-slate-500 text-xs font-semibold space-y-4 sm:space-y-0">
          <p>
            © {currentYear} Hontech Auto Center Inc. All rights reserved. | Company Profile Portal
          </p>
          <div className="flex gap-4">
            <a href="#about" onClick={(e) => handleScrollTo(e, "#about")} className="hover:text-white transition-colors">
              Privacy
            </a>
            <span className="text-slate-800">|</span>
            <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="hover:text-white transition-colors">
              Marikina Branch Map
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
