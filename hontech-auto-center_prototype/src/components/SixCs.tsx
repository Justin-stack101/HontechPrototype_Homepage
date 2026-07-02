import React from "react";
import { SIX_CS } from "../data";
import { LucideIcon } from "./LucideIcon";
import { motion } from "motion/react";

export const SixCs: React.FC = () => {
  return (
    <section id="why-hontech" className="py-24 bg-red-50/50 relative overflow-hidden">
      {/* Decorative background grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fee2e2_1px,transparent_1px),linear-gradient(to_bottom,#fee2e2_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-xs mb-4">
            <span className="w-6 h-[2px] bg-red-600" />
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
            The 6 C's of Hontech
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            What sets us apart from standard mechanics — our total dedication to excellence, transparency, and safety driven by six foundational pillars.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SIX_CS.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-red-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Dynamic slide up color card header */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <LucideIcon name={item.iconName} size={22} />
              </div>

              <h3 className="text-slate-950 font-extrabold text-base mb-2 group-hover:text-red-600 transition-colors duration-200">
                {item.title}
              </h3>
              
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
