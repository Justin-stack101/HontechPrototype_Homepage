import React, { useState, useEffect } from "react";
import { SERVICES_DATA } from "../data";
import { LucideIcon } from "./LucideIcon";
import { ServiceItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface EstimatorProps {
  selectedServices: ServiceItem[];
  onToggleService: (service: ServiceItem) => void;
  onClearEstimate: () => void;
}

interface SavedBooking {
  id: string;
  name: string;
  carModel: string;
  carType: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  services: string[];
  totalEstimate: number;
  status: "Pending Calibration" | "Confirmed" | "Complete";
  createdAt: string;
}

export const Estimator: React.FC<EstimatorProps> = ({
  selectedServices,
  onToggleService,
  onClearEstimate,
}) => {
  // Vehicle types with multiplier configuration
  const CAR_TYPES = [
    { id: "sedan", label: "Sedan / Hatchback", multiplier: 1.0 },
    { id: "suv", label: "SUV / Crossover", multiplier: 1.25 },
    { id: "pickup", label: "Pickup Truck", multiplier: 1.35 },
    { id: "mpv", label: "MPV / Van", multiplier: 1.3 },
  ];

  const [selectedCarType, setSelectedCarType] = useState<string>("sedan");
  const [carModel, setCarModel] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [bookingsHistory, setBookingsHistory] = useState<SavedBooking[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string>("");

  // Load bookings on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("hontech_bookings");
      if (stored) {
        setBookingsHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Could not load bookings history", e);
    }
  }, []);

  // Compute pricing
  const currentMultiplier = CAR_TYPES.find((t) => t.id === selectedCarType)?.multiplier || 1.0;
  const subtotal = selectedServices.reduce((sum, item) => sum + item.estimatedPrice, 0);
  const sizeAdjustment = subtotal * (currentMultiplier - 1.0);
  const totalEstimate = Math.ceil(subtotal * currentMultiplier);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      alert("Please select at least one maintenance service to book.");
      return;
    }

    const newBooking: SavedBooking = {
      id: "HACI-" + Math.floor(100000 + Math.random() * 900000),
      name: customerName || "Guest Partner",
      carModel: carModel || "Generic Vehicle",
      carType: selectedCarType,
      phone: customerPhone,
      email: customerEmail,
      date: bookingDate || new Date().toISOString().split("T")[0],
      time: bookingTime || "09:00 AM",
      services: selectedServices.map((s) => s.name),
      totalEstimate,
      status: "Pending Calibration",
      createdAt: new Date().toLocaleDateString(),
    };

    const updated = [newBooking, ...bookingsHistory];
    setBookingsHistory(updated);
    localStorage.setItem("hontech_bookings", JSON.stringify(updated));

    setLastSubmittedId(newBooking.id);
    setShowSuccessModal(true);

    // Clear form and selections
    setCarModel("");
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setBookingDate("");
    setBookingTime("");
    setMessage("");
    onClearEstimate();
  };

  const handleRemoveBooking = (id: string) => {
    const updated = bookingsHistory.filter((b) => b.id !== id);
    setBookingsHistory(updated);
    localStorage.setItem("hontech_bookings", JSON.stringify(updated));
  };

  return (
    <section id="estimator" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Glow ambient accent backgrounds */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-red-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-xs mb-3 justify-center">
            <span className="w-6 h-[2px] bg-red-600" />
            Interactive Diagnostic Dashboard
            <span className="w-6 h-[2px] bg-red-600" />
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            Custom Estimate & Booking Tool
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select your car layout, pick which preventive maintenance items you require, see real-time price totals based on official guidelines, and book instant priority scheduling.
          </p>
        </div>

        {/* Master Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Left Block: Selector Grid (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
            
            {/* Step 1: Car Configuration */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h3 className="text-slate-950 font-extrabold text-base">
                  Configure Vehicle Classification
                </h3>
              </div>
              
              {/* Type Grid Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CAR_TYPES.map((type) => {
                  const isSelected = selectedCarType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedCarType(type.id)}
                      className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "border-red-600 bg-red-50/40 text-red-600 font-extrabold shadow-sm"
                          : "border-slate-200/80 hover:border-red-200 text-slate-600"
                      }`}
                    >
                      <LucideIcon name="Car" className="mx-auto mb-2 text-slate-400 group-hover:text-red-600" size={24} />
                      <p className="text-xxs sm:text-xs tracking-tight uppercase font-bold">
                        {type.label}
                      </p>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Multiplier: {type.multiplier}x
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Service Selection Swatch */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h3 className="text-slate-950 font-extrabold text-base">
                  Toggle Required Maintenance Items
                </h3>
              </div>

              {/* Group List collapse modules */}
              <div className="space-y-4">
                {SERVICES_DATA.map((cat) => (
                  <div key={cat.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
                    <h4 className="text-slate-900 font-extrabold text-xs uppercase tracking-widest mb-3 flex items-center gap-2 text-red-600">
                      <LucideIcon name={cat.iconName} size={14} />
                      {cat.name}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cat.services.map((srv) => {
                        const isChecked = selectedServices.some((s) => s.id === srv.id);
                        return (
                          <div
                            key={srv.id}
                            onClick={() => onToggleService(srv)}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer select-none ${
                              isChecked
                                ? "border-red-500/30 bg-red-50/20 text-red-700 font-semibold"
                                : "border-slate-200/80 bg-white text-slate-700 hover:border-red-100"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="accent-red-600 pointer-events-none rounded h-4 w-4"
                            />
                            <div className="text-left">
                              <p className="text-xs sm:text-sm font-bold leading-tight">{srv.name}</p>
                              <p className="text-[10px] text-slate-400">₱{srv.estimatedPrice.toLocaleString()}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Block: Calculation Sheet & Form Form (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Estimate summary sheet */}
            <div className="bg-slate-950 text-white rounded-2xl border border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-lg font-extrabold tracking-tight mb-4 flex items-center gap-2 text-white">
                <LucideIcon name="Calculator" className="text-red-500" size={20} />
                Live Quote Calculations
              </h3>

              {/* Items listing */}
              {selectedServices.length === 0 ? (
                <div className="text-center py-8 border-y border-slate-800/80 my-4 text-slate-400">
                  <LucideIcon name="AlertCircle" className="mx-auto mb-2 text-slate-500" size={28} />
                  <p className="text-xs">No services selected yet.</p>
                  <p className="text-[10px] text-slate-500 mt-1">Select boxes on the left to tally estimation.</p>
                </div>
              ) : (
                <div className="border-y border-slate-800/80 py-4 my-4 max-h-[160px] overflow-y-auto space-y-2 pr-1">
                  {selectedServices.map((srv) => (
                    <div key={srv.id} className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">{srv.name}</span>
                      <span className="text-slate-400">₱{srv.estimatedPrice.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Summary Calculations */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Base Subtotal</span>
                  <span>₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Size Adjustment ({currentMultiplier}x)</span>
                  <span>+₱{sizeAdjustment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white font-extrabold text-base pt-3 border-t border-slate-800/80 mt-2">
                  <span>Estimated Total</span>
                  <span className="text-red-500">₱{totalEstimate.toLocaleString()}</span>
                </div>
              </div>

              <span className="text-[9px] text-slate-500 block mt-4 leading-normal italic text-left">
                *Taxes & customized heavy engine repair parts may alter values. Final physical diagnostic alignment required on service bay.
              </span>
            </div>

            {/* Quick Priority Booking Form */}
            <div className="bg-white p-6 sm:p-8 border border-slate-200 rounded-2xl shadow-sm text-left">
              <h3 className="text-slate-950 font-extrabold text-base mb-6 flex items-center gap-2">
                <LucideIcon name="Calendar" className="text-red-600" size={20} />
                Priority Booking Dispatch
              </h3>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xxs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      Name / Corporate Title
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g., Juan Dela Cruz"
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xxs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      Car Model / Engine Year
                    </label>
                    <input
                      type="text"
                      required
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      placeholder="e.g., Toyota Vios 2021"
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xxs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      Contact Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g., 09171234567"
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xxs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="e.g., juan@gmail.com"
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xxs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      Target Booking Date
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xxs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                      Arrival Hour Slot
                    </label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600/50"
                    >
                      <option value="">Select hour</option>
                      <option value="08:00 AM">08:00 AM (Early Dispatch)</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xxs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                    Describe Engine Concerns / Sound symptoms
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g., Brake squealing when slowing down, A/C not cooling properly..."
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={selectedServices.length === 0}
                  className={`w-full py-3.5 rounded-full font-bold uppercase tracking-wider text-xs transition-all shadow-md ${
                    selectedServices.length > 0
                      ? "bg-red-600 hover:bg-red-500 text-white shadow-red-600/10 hover:shadow-red-600/25 cursor-pointer hover:-translate-y-0.5"
                      : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                  }`}
                >
                  Request Appointment
                </button>
              </form>
            </div>

          </div>

        </div>

        {/* Saved Bookings / Status Tracking Hub (Only shows if there's history in localStorage) */}
        {bookingsHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm text-left"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-slate-950 font-extrabold text-base flex items-center gap-2">
                <LucideIcon name="Clock" className="text-red-600" size={20} />
                Active Inquiry Tracking Logs
              </h3>
              <span className="text-xxs px-2.5 py-1 bg-red-50 text-red-600 font-extrabold rounded-full uppercase tracking-wider">
                {bookingsHistory.length} Recorded
              </span>
            </div>

            <div className="space-y-4 overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider font-extrabold text-[10px]">
                    <th className="pb-3 text-left">Inquiry ID</th>
                    <th className="pb-3 text-left">Customer & Car</th>
                    <th className="pb-3 text-left">Date & Arrival</th>
                    <th className="pb-3 text-left">Selected PMS / Swaps</th>
                    <th className="pb-3 text-right">Est. Cost</th>
                    <th className="pb-3 text-center">Calibration State</th>
                    <th className="pb-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {bookingsHistory.map((book) => (
                    <tr key={book.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 font-extrabold text-red-600">{book.id}</td>
                      <td className="py-4">
                        <p className="font-bold text-slate-950">{book.name}</p>
                        <p className="text-slate-400 text-[11px]">{book.carModel}</p>
                      </td>
                      <td className="py-4">
                        <p className="font-medium text-slate-900">{book.date}</p>
                        <p className="text-slate-400 text-[11px]">{book.time}</p>
                      </td>
                      <td className="py-4 max-w-[200px] truncate">
                        {book.services.join(", ")}
                      </td>
                      <td className="py-4 text-right font-extrabold text-slate-950">
                        ₱{book.totalEstimate.toLocaleString()}
                      </td>
                      <td className="py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase rounded-full bg-orange-50 text-orange-600 border border-orange-100">
                          <LucideIcon name="Activity" size={10} className="animate-pulse" />
                          {book.status}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <button
                          onClick={() => handleRemoveBooking(book.id)}
                          className="text-slate-400 hover:text-red-600 px-2 py-1 transition-colors cursor-pointer"
                          title="Delete request"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 max-w-md w-full shadow-2xl relative text-center"
            >
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-100">
                <LucideIcon name="CheckCircle2" size={32} />
              </div>

              <h3 className="text-slate-950 font-black text-xl mb-2">Inquiry Confirmed!</h3>
              <p className="text-red-600 font-extrabold text-sm tracking-widest mb-4">
                TICKET: {lastSubmittedId}
              </p>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Your diagnostic estimate request has been safely dispatched to the Hontech Marikina office. A customer service technician will call/text you within 2 hours to calibrate physical slot availability.
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-3 rounded-full text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                Return to Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
