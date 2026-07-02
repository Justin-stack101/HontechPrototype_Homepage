import React, { useState } from "react";
import { SERVICES_DATA } from "../data";
import { LucideIcon } from "./LucideIcon";
import { motion, AnimatePresence } from "motion/react";
import { ServiceItem } from "../types";

interface ServicesProps {
  onAddService: (service: ServiceItem) => void;
  selectedServiceIds: string[];
}

export const Services: React.FC<ServicesProps> = ({ onAddService, selectedServiceIds }) => {
  const [activeTab, setActiveTab] = useState<string>("major");

  const currentCategory = SERVICES_DATA.find((cat) => cat.id === activeTab);

  const handleScrollToEstimator = () => {
    const targetElement = document.querySelector("#estimator");
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
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-xs mb-3 justify-center">
            <span className="w-6 h-[2px] bg-red-600" />
            Our Comprehensive Services
            <span className="w-6 h-[2px] bg-red-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            Dealer-Level Auto Care Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From comprehensive diagnostics and fully detailed preventive packages to paint oven-bake repairs, we have your vehicle fully covered.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-slate-100 rounded-full max-w-xl mx-auto mb-12 border border-slate-200">
          {SERVICES_DATA.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex-1 text-center py-3 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-250 cursor-pointer ${
                  isActive
                    ? "bg-white text-slate-950 shadow-md font-extrabold border border-slate-200/50"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {cat.id === "major" ? "PMS Packages" : cat.id === "basic" ? "Basic Maintenance" : "Added / Specialties"}
              </button>
            );
          })}
        </div>

        {/* Tab Panel Content */}
        <AnimatePresence mode="wait">
          {currentCategory && (
            <motion.div
              key={currentCategory.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Package Header Card */}
              <div className="p-6 sm:p-8 bg-slate-950 rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-slate-800">
                <div className="w-14 h-14 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500 border border-red-500/10">
                  <LucideIcon name={currentCategory.iconName} size={28} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold tracking-tight mb-1">
                    {currentCategory.name}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
                    {currentCategory.tagline}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-auto">
                  <button
                    onClick={handleScrollToEstimator}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    <LucideIcon name="Calculator" size={14} />
                    View Live Estimator
                  </button>
                </div>
              </div>

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentCategory.services.map((service, idx) => {
                  const isSelected = selectedServiceIds.includes(service.id);
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      className={`flex flex-col p-6 bg-slate-50 border rounded-2xl transition-all duration-300 relative group justify-between min-h-[180px] ${
                        isSelected
                          ? "border-red-500/40 bg-red-50/20 shadow-md shadow-red-500/2"
                          : "border-slate-200/80 hover:border-red-200 hover:bg-white hover:shadow-md"
                      }`}
                    >
                      <div>
                        {/* Bullet Dot / Title */}
                        <div className="flex items-start gap-2.5 mb-2">
                          <span className="w-2 h-2 rounded-full bg-red-600 mt-1.5 flex-shrink-0 animate-pulse" />
                          <h4 className="text-slate-900 font-extrabold text-sm sm:text-base group-hover:text-red-600 transition-colors">
                            {service.name}
                          </h4>
                        </div>
                        {service.description && (
                          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 pl-4">
                            {service.description}
                          </p>
                        )}
                      </div>

                      {/* Card Footer: Cost & Action */}
                      <div className="flex items-center justify-between mt-auto border-t border-slate-200/50 pt-4 pl-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                            Base Est. Price
                          </span>
                          <p className="text-slate-900 font-extrabold text-sm">
                            {service.estimatedPrice === 0 ? "Free Support" : `₱${service.estimatedPrice.toLocaleString()}`}
                          </p>
                        </div>
                        <button
                          onClick={() => onAddService(service)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xxs sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            isSelected
                              ? "bg-red-50 text-red-600 border border-red-200"
                              : "bg-white text-slate-700 border border-slate-200 hover:border-red-200 hover:text-red-600"
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <LucideIcon name="CheckCircle2" size={12} />
                              Added
                            </>
                          ) : (
                            <>
                              <LucideIcon name="Calculator" size={12} />
                              Add Estimator
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
