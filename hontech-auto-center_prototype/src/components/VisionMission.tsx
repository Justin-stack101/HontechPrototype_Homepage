import React from "react";
import { LucideIcon } from "./LucideIcon";
import { motion } from "motion/react";

export const VisionMission: React.FC = () => {
  return (
    <section id="vision-mission" className="py-24 bg-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-xs mb-3 justify-center">
            <span className="w-6 h-[2px] bg-red-600" />
            Vision & Mission
            <span className="w-6 h-[2px] bg-red-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            What Drives Us Forward
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Vision (Dark) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-8 sm:p-10 rounded-2xl bg-slate-950 text-white shadow-xl overflow-hidden group border border-slate-800"
          >
            {/* Top color border accent */}
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-red-600" />
            
            <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500 mb-6 border border-red-500/10">
              <LucideIcon name="Eye" size={24} />
            </div>
            
            <h3 className="text-2xl font-extrabold tracking-tight mb-2">Our Vision</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-red-500 mb-6">
              High Standard. Competitive. Affordable.
            </p>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              Our company is committed to providing customers exceptional quality service while remaining competitively priced by continually improving our processes, investing in the latest technology, and hiring highly skilled professionals. Our goal is to establish ourselves as your absolute trusted auto center partner.
            </p>
            
            <div className="text-sm font-extrabold italic text-red-400 mt-auto flex items-center gap-2">
              <span className="text-red-500">“</span>
              At Hontech, you leave your car in good hands.
              <span className="text-red-500">”</span>
            </div>
          </motion.div>

          {/* Card 2: Mission (Light) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative p-8 sm:p-10 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-lg overflow-hidden group"
          >
            {/* Top color border accent */}
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-slate-900" />

            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-950 mb-6 border border-slate-200">
              <LucideIcon name="Target" size={24} />
            </div>

            <h3 className="text-2xl font-extrabold tracking-tight mb-2">Our Mission</h3>
            <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-6">
              Exampled Leaders in Car Care
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Hontech's mission is to establish itself as an industry leader and role model in the car care industry, driven by its vision and core values. We believe in treating our customers with respect and transparency as we strive to build long-term relationships and partnerships. We are dedicated to providing premium car care services that prioritize customer experience, while remaining committed to maintaining our standards of excellence.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
