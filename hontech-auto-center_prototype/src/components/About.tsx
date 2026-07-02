import React from "react";
import { motion } from "motion/react";

export const About: React.FC = () => {
  const cards = [
    {
      num: "01",
      title: "Technical Expertise",
      description: "HONTECH is composed of premier certified technical experts, the majority of whom are former supervisors and technicians of top car companies in the Philippines."
    },
    {
      num: "02",
      title: "Core Objective",
      description: "To provide exceptional vehicle maintenance services through a high-tech auto center, particularly for vehicles that are no longer covered by factory warranty."
    },
    {
      num: "03",
      title: "Unwavering Commitment",
      description: "Hontech is committed to delivering premier quality, dealer-level automotive care at highly competitive, fair, and transparent prices."
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-100 rounded-full blur-3xl pointer-events-none opacity-40 -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-slate-200 rounded-full blur-3xl pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Narrative */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-xs mb-4">
              <span className="w-6 h-[2px] bg-red-600" />
              About Our Company
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight mb-6">
              Redefining Automotive Care in Metro Manila
            </h2>
            
            <div className="space-y-5 text-slate-600 text-sm md:text-base leading-relaxed">
              <p className="font-semibold text-slate-800 text-base">
                Hontech was conceptualized in 2020, established and began official operations within the same year of extraordinary challenge.
              </p>
              <p>
                HONTECH AUTO CENTER, INC. (HACI) is one of the newest and fastest-growing automotive companies based in Metro Manila. The car center is supervised by a team of certified auto professionals and experts in the field of auto repair, who bring years of experience and a wealth of knowledge from their previous roles with premium dealership companies.
              </p>
              <p>
                HACI operates on the principle that our clients are not merely customers, but valued business partners who share a common mission in achieving automotive security, vehicle safety, and longevity through high-standard, transparent, and prompt support.
              </p>
            </div>
          </div>

          {/* Column 2: Feature Cards */}
          <div className="lg:col-span-6 space-y-6">
            {cards.map((card, idx) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-5 p-6 bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-red-200 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="text-3xl font-black text-red-600 tracking-tight select-none">
                  {card.num}
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-base mb-1.5">{card.title}</h4>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
