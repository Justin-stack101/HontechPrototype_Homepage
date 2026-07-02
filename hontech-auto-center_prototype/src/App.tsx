import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero, MarqueeStrip } from "./components/Hero";
import { About } from "./components/About";
import { VisionMission } from "./components/VisionMission";
import { SixCs } from "./components/SixCs";
import { CoreValues } from "./components/CoreValues";
import { Timeline } from "./components/Timeline";
import { Team } from "./components/Team";
import { Services } from "./components/Services";
import { Estimator } from "./components/Estimator";
import { Contact } from "./components/Contact";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { LucideIcon } from "./components/LucideIcon";
import { ServiceItem } from "./types";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([]);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Monitor Scroll Progress & Back-To-Top Trigger
  useEffect(() => {
    const handleScroll = () => {
      // Back to top visibility
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Scroll progress percentage
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Monitor Intersection Active Navigation Highlighting
  useEffect(() => {
    const sections = [
      "hero",
      "about",
      "vision-mission",
      "why-hontech",
      "values",
      "milestones",
      "team",
      "services",
      "estimator",
      "contact",
    ];

    const handleActiveHighlight = () => {
      let currentSection = "hero";
      const offset = 120; // safe heading buffer

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Check if top of the element is scrolled past/near the threshold
          if (rect.top <= offset) {
            currentSection = sec;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleActiveHighlight);
    return () => window.removeEventListener("scroll", handleActiveHighlight);
  }, []);

  // Interactive connection: Adding service toggles estimator state & scrolls down
  const handleAddService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        // Toggle off
        return prev.filter((s) => s.id !== service.id);
      } else {
        // Add on & scroll to estimator to review quote
        setTimeout(() => {
          const target = document.querySelector("#estimator");
          if (target) {
            const offset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 80);
        return [...prev, service];
      }
    });
  };

  // Direct checkbox/card toggle inside Estimator Component
  const handleToggleService = (service: ServiceItem) => {
    setSelectedServices((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleClearEstimate = () => {
    setSelectedServices([]);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const selectedServiceIds = selectedServices.map((s) => s.id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative antialiased selection:bg-red-600 selection:text-white">
      
      {/* Top Scroll Progress indicator bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-red-600 to-red-400 z-50 transition-all duration-100 ease-out shadow-md shadow-red-500/50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation Menu */}
      <Navbar activeSection={activeSection} />

      {/* Main Core Body */}
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Infinite Loop Ticker Ribbon */}
        <MarqueeStrip />

        {/* Story Section */}
        <About />

        {/* Vision and Mission comparisons */}
        <VisionMission />

        {/* 6 C's Grid */}
        <SixCs />

        {/* Corporate Values Panel */}
        <CoreValues />

        {/* Milestones / History Roadmap */}
        <Timeline />

        {/* Organization Team departments */}
        <Team />

        {/* Services Suite */}
        <Services
          onAddService={handleAddService}
          selectedServiceIds={selectedServiceIds}
        />

        {/* Interactive Estimator & Inquiry Log Book */}
        <Estimator
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          onClearEstimate={handleClearEstimate}
        />

        {/* FAQs accordions */}
        <FAQ />

        {/* Map & Contact detail cards */}
        <Contact />
      </main>

      {/* Footer copyright and navigation */}
      <Footer />

      {/* Back to Top floating bubble */}
      {showBackToTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-red-600 hover:bg-red-500 text-white rounded-lg shadow-lg shadow-red-600/30 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-red-600/50 cursor-pointer"
          aria-label="Back to top"
        >
          <LucideIcon name="ArrowUp" size={20} />
        </button>
      )}

    </div>
  );
}
