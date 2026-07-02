import React, { useState } from "react";
import { FAQS } from "../data";
import { LucideIcon } from "./LucideIcon";
import { motion, AnimatePresence } from "motion/react";

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-slate-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-xs mb-3 justify-center">
            <span className="w-6 h-[2px] bg-red-600" />
            Support center
            <span className="w-6 h-[2px] bg-red-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion Rows */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-colors"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                >
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <div className={`p-1 bg-slate-50 text-slate-600 rounded-lg transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <LucideIcon name="ChevronDown" size={16} />
                  </div>
                </button>

                {/* Content Box */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-slate-100 text-slate-600 text-xs sm:text-sm leading-relaxed text-left">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
