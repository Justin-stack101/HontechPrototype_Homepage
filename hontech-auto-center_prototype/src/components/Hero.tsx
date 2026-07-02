import React, { useEffect, useRef, useState } from "react";
import { LucideIcon } from "./LucideIcon";
import { motion } from "motion/react";

export const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [stats, setStats] = useState({ years: 0, experts: 0, area: 0 });

  // Stats count-up simulation on mount
  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();
    const targetYears = 5;
    const targetExperts = 16;
    const targetArea = 1200;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setStats({
        years: Math.floor(easeProgress * targetYears),
        experts: Math.floor(easeProgress * targetExperts),
        area: Math.floor(easeProgress * targetArea),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setStats({ years: targetYears, experts: targetExperts, area: targetArea });
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // Particle Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeDir: number;
    }[] = [];
    const PARTICLE_COUNT = 40;

    const resizeCanvas = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Populate particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.05,
        fadeDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    let animationFrameId: number;

    const animateParticles = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeDir * 0.002;

        if (p.opacity <= 0.02 || p.opacity >= 0.35) {
          p.fadeDir *= -1;
        }

        // Boundary wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      particles.forEach((p) => {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          p.speedX += dx * 0.003;
          p.speedY += dy * 0.003;
          // Dampen maximum speed
          const speedLimit = 1.5;
          p.speedX = Math.max(-speedLimit, Math.min(speedLimit, p.speedX));
          p.speedY = Math.max(-speedLimit, Math.min(speedLimit, p.speedY));
        }
      });
    };

    canvas.parentElement?.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center bg-slate-950 overflow-hidden pt-16"
    >
      {/* Background Parallax Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1920&q=80"
          alt="Hontech Auto Center Workshop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/90 to-slate-950/70" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-1 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_0)] bg-[size:32px_32px] pointer-events-none" />

      {/* Interactive Particle System */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 right-1/10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-pulse duration-5000" />
      <div className="absolute bottom-1/10 left-1/10 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Geometric Outlines (Mocking Glow Rings) */}
      <div className="absolute border border-red-600/10 rounded-full w-48 h-48 top-12 right-24 pointer-events-none animate-spin duration-30000" />
      <div className="absolute border border-slate-700/10 rounded-full w-72 h-72 bottom-12 left-12 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
              Company Profile & Portal 2026
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight uppercase italic mb-6"
            >
              Your Trusted <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
                Auto Center
              </span>{" "}
              Partner
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-300 text-base md:text-lg max-w-xl font-normal leading-relaxed mb-8"
            >
              HONTECH AUTO CENTER, INC. is one of the newest and fastest-growing automotive companies in Metro Manila — delivering high-standard quality services that are competitive, reliable, yet highly affordable.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12"
            >
              <a
                href="#services"
                onClick={(e) => handleScrollTo(e, "#services")}
                className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-xl shadow-red-600/25 transition-all hover:-translate-y-0.5"
              >
                <LucideIcon name="Wrench" size={16} />
                Explore Services
              </a>
              <a
                href="#about"
                onClick={(e) => handleScrollTo(e, "#about")}
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all"
              >
                <LucideIcon name="PlayCircle" size={16} />
                Learn More
              </a>
            </motion.div>

            {/* Counters Panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 sm:gap-12 w-full border-t border-slate-800/60 pt-8"
            >
              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {stats.years}
                  <span className="text-red-500">+</span>
                </h3>
                <p className="text-slate-400 text-xxs sm:text-xs font-semibold uppercase tracking-wider mt-1">
                  Years of Service
                </p>
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {stats.experts}
                  <span className="text-red-500">+</span>
                </h3>
                <p className="text-slate-400 text-xxs sm:text-xs font-semibold uppercase tracking-wider mt-1">
                  Expert Personnel
                </p>
              </div>
              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {stats.area}
                  <span className="text-red-500">㎡</span>
                </h3>
                <p className="text-slate-400 text-xxs sm:text-xs font-semibold uppercase tracking-wider mt-1">
                  Service Area
                </p>
              </div>
            </motion.div>

          </div>

          {/* Hero Image Card Column */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 p-2 shadow-2xl shadow-slate-950/80 group"
            >
              <img
                src="https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&w=800&q=80"
                alt="Professional Diagnostic Tune"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] object-cover rounded-xl group-hover:scale-102 transition-transform duration-700"
              />
              
              {/* Bottom Card Glass Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-950/80 backdrop-blur-md border border-white/10 p-5 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex flex-shrink-0 items-center justify-center text-white shadow-md shadow-red-600/30">
                  <LucideIcon name="ShieldCheck" size={24} />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold tracking-tight">CASA-Like Quality Standards</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-normal">
                    Certified specialists bringing elite experience from top car manufacturers in the Philippines.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Continuous Infinite Scrolling Marquee Strip
export const MarqueeStrip: React.FC = () => {
  const items = [
    "CASA-Like Quality",
    "Certified Experts",
    "Affordable Pricing",
    "Trusted Since 2020",
    "Metro Manila",
    "Quality Over Profit",
    "16+ Expert Personnel",
    "Full PMS Packages",
  ];

  return (
    <div className="bg-slate-950 border-y border-red-950 py-4 overflow-hidden relative select-none">
      <div className="flex w-max gap-8 animate-marquee">
        {/* Render twice for seamless infinite scroll */}
        {Array(4)
          .fill(null)
          .flatMap(() => items)
          .map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-slate-300 text-xs font-bold uppercase tracking-widest px-4">
              <span className="w-2 h-2 rounded-full bg-red-600 shadow-md shadow-red-600/50 flex-shrink-0 animate-pulse" />
              <span>{item}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
