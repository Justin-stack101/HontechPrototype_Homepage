import React from "react";
import { DEPARTMENTS } from "../data";
import { LucideIcon } from "./LucideIcon";
import { motion } from "motion/react";

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-xs mb-4">
            <span className="w-6 h-[2px] bg-red-600" />
            Our Corporate Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
            A Strong Network of Certified Professionals
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Organized across five specialized departments to ensure zero gaps in your diagnostic journey, parts procurement, and long-term customer care.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Team Photo Showcase */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white p-2 shadow-xl group"
            >
              <img
                src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80"
                alt="Hontech Auto Center Team in action"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] object-cover rounded-xl group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* Column 2: Department Breakdowns */}
          <div className="lg:col-span-7 space-y-4">
            {DEPARTMENTS.map((dept, idx) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group flex gap-5 p-5 bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-red-200 hover:translate-x-1 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <LucideIcon name={dept.iconName} size={18} />
                </div>
                <div>
                  <h4 className="text-slate-950 font-extrabold text-sm sm:text-base mb-1 group-hover:text-red-600 transition-colors">
                    {dept.name}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {dept.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
