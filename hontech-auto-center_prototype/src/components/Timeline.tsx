import React from "react";
import { MILESTONES } from "../data";
import { motion } from "motion/react";

export const Timeline: React.FC = () => {
  return (
    <section id="milestones" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-xs mb-4">
            <span className="w-6 h-[2px] bg-red-600" />
            Company Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">
            Our Growth Journey
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We are dedicated to continuous development, workshop expansion, and high-performance calibration. Constantly expanding our toolsets and updating our technicians' knowledge base.
          </p>
        </div>

        {/* Timeline Flow */}
        <div className="relative mt-12">
          {/* Vertical path line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-[1px]" />

          <div className="space-y-12 relative">
            {MILESTONES.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`flex flex-col md:flex-row items-stretch ${
                    isEven ? "md:flex-row-reverse" : ""
                  } relative`}
                >
                  {/* Outer circle hub node */}
                  <div className="absolute left-4 md:left-1/2 top-6 w-5 h-5 rounded-full bg-red-600 border-4 border-white shadow-md -translate-x-1/2 z-10" />

                  {/* Spacer helper for desktop alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Box */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8"
                  >
                    <div className="p-8 bg-slate-50 border border-slate-200/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      {/* Big year overlay badge */}
                      <span className="inline-block text-4xl font-black text-red-600 tracking-tighter mb-4">
                        {item.year}
                      </span>
                      
                      <h4 className="text-slate-950 font-extrabold text-lg mb-2">
                        {item.title}
                      </h4>
                      
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Stat pills */}
                      {item.stats && (
                        <div className="flex flex-wrap gap-3">
                          {item.stats.map((st) => (
                            <div
                              key={st.label}
                              className="px-4 py-2.5 bg-red-50 border border-red-100 rounded-xl text-left"
                            >
                              <strong className="block text-red-600 text-lg font-extrabold tracking-tight">
                                {st.value}
                              </strong>
                              <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                                {st.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
