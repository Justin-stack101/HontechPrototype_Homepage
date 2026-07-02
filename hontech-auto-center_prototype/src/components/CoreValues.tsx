import React from "react";
import { CORE_VALUES } from "../data";
import { LucideIcon } from "./LucideIcon";
import { motion } from "motion/react";

export const CoreValues: React.FC = () => {
  return (
    <section id="values" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Moving Grid Lines (Simulated using CSS) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(220,38,38,0.15)_1px,transparent_0)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs mb-3 justify-center">
            <span className="w-6 h-[2px] bg-red-600" />
            Our Core Values
            <span className="w-6 h-[2px] bg-red-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            The Foundation of Everything We Do
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Our core values guide every single decision we make, every procedures we design, and every service we deliver to your vehicle.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CORE_VALUES.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800/80 hover:border-red-500/30 hover:bg-slate-900 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-xl flex items-center justify-center mb-5 border border-red-500/10">
                <LucideIcon name={val.iconName} size={24} />
              </div>

              <h4 className="text-white font-extrabold text-base mb-2.5">
                {val.title}
              </h4>
              
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-auto">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
