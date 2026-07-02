import React, { useState } from "react";
import { LucideIcon } from "./LucideIcon";
import { motion, AnimatePresence } from "motion/react";

export const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const contactCards = [
    {
      title: "Phone Support",
      info: "8 564 4550 / 7 121 9124",
      icon: "Phone",
      href: "tel:0285644550",
    },
    {
      title: "Email Dispatch",
      info: "hontechautocenter@gmail.com",
      icon: "Mail",
      href: "mailto:hontechautocenter@gmail.com",
    },
    {
      title: "Workshop Location",
      info: "70 Bayan-bayanan Ave. corner SW Narra St., Marikina Heights, Marikina City",
      icon: "MapPin",
      href: "https://maps.google.com/?q=70+Bayan-bayanan+Ave+Marikina",
    },
    {
      title: "Social Media Channels",
      info: "@hontechautocenterinc",
      icon: "Instagram",
      href: "https://instagram.com",
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setName("");
    setEmail("");
    setMsg("");
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Mesh lines and glowing dots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-xs mb-4">
            <span className="w-6 h-[2px] bg-red-600" />
            Connect With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Let's Get Your Car Back on the Road
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Visit us at our spacious Marikina Heights facility, or connect instantly with our dispatch supervisors through any of the active lines below.
          </p>
        </div>

        {/* Form and Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Col 1: Contact Cards & Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactCards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-4 p-5 bg-slate-900/40 rounded-xl border border-slate-800/80 hover:border-red-500/30 hover:bg-slate-900 transition-all duration-300 text-left group"
                >
                  <div className="w-10 h-10 bg-red-600/10 text-red-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                    <LucideIcon name={card.icon} size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      {card.title}
                    </span>
                    <p className="text-white text-xs sm:text-sm font-bold mt-1 group-hover:text-red-400 transition-colors">
                      {card.info}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Messages */}
            <div className="p-6 bg-slate-900/20 border border-slate-800 rounded-2xl text-left">
              <h3 className="text-white font-extrabold text-base mb-4">
                Send a Direct Message
              </h3>
              
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600/40 text-white"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your Email"
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600/40 text-white"
                  />
                </div>
                <textarea
                  rows={3}
                  required
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="How can we help? (e.g., body repairs, fleet contract pricing...)"
                  className="w-full text-xs px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600/40 text-white"
                />
                
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-lg transition-colors cursor-pointer"
                  >
                    Send Message
                  </button>
                  
                  <AnimatePresence>
                    {success && (
                      <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs font-bold text-red-500 uppercase tracking-wider"
                      >
                        ✓ Sent successfully!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>

          {/* Col 2: High Resolution Map (5 cols) */}
          <div className="lg:col-span-5 h-[320px] lg:h-[420px] rounded-2xl overflow-hidden border border-slate-800 relative group shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.1989423180425!2d121.11183187595304!3d14.644654976044738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b91950ec46ff%3A0x89ee9e0231cfb562!2sBayon-Bayanan%20Ave%2C%20Marikina%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.6) brightness(0.85) contrast(1.15)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hontech Auto Center Map Pin Location"
              className="group-hover:filter-none transition-all duration-700 h-full w-full"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
