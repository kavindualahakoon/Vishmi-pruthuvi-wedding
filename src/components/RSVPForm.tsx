"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useLanguage } from "@/context/LanguageContext";

export default function RSVPForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guestCount: 1,
    foodPreference: "Non-Vegetarian",
    specialNotes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // Assuming server runs on 5000 and client on 3000
      await axios.post("/api/rsvp", formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        guestCount: 1,
        foodPreference: "Non-Vegetarian",
        specialNotes: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <section className="py-16 md:py-24 bg-dark-bg text-foreground relative" id="rsvp">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        <div className="flex flex-col lg:flex-row bg-white/40 glass-panel rounded-3xl overflow-hidden shadow-2xl border border-primary/20">
          
          {/* Left Side: Decorative Column */}
          <div className="lg:w-5/12 bg-dark-surface p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden border-b lg:border-b-0 lg:border-r border-primary/10">
            {/* Elegant Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-foreground mb-6 leading-tight">
                {t("rsvp.title")}
              </h2>
              <div className="w-16 h-0.5 bg-primary/50 mb-8"></div>
              <p className="text-gray-700 font-medium leading-relaxed text-lg mb-12">
                {t("rsvp.subtitle")}
              </p>
              
              <div className="space-y-4 p-6 border border-primary/20 rounded-2xl bg-white/30 backdrop-blur-sm">
                <p className="text-xs tracking-[0.2em] uppercase text-primary font-bold">
                  Important Note
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Please let us know of your attendance at your earliest convenience so we can finalize our preparations for this magical day.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form Column */}
          <div className="lg:w-7/12 p-8 lg:p-16 bg-white/50 relative">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {status === "success" ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-3xl font-playfair text-primary mb-4">Thank You!</h3>
                  <p className="text-gray-700 text-lg mb-8">Your RSVP has been beautifully received. A confirmation email has been sent.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 bg-primary text-white hover:bg-dark-surface hover:text-primary border border-primary transition-all duration-300 uppercase tracking-widest text-xs font-semibold rounded-full shadow-lg hover:shadow-xl"
                  >
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2 relative group">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold absolute -top-2 left-3 bg-[#fbf9f6] px-1 z-10 transition-colors group-focus-within:text-primary">{t("rsvp.fullName")}</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-300 focus:border-primary rounded-xl px-4 py-3.5 text-gray-900 outline-none transition-all focus:ring-4 focus:ring-primary/10 shadow-sm"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2 relative group">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold absolute -top-2 left-3 bg-[#fbf9f6] px-1 z-10 transition-colors group-focus-within:text-primary">{t("rsvp.email")}</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-300 focus:border-primary rounded-xl px-4 py-3.5 text-gray-900 outline-none transition-all focus:ring-4 focus:ring-primary/10 shadow-sm"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2 relative group">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold absolute -top-2 left-3 bg-[#fbf9f6] px-1 z-10 transition-colors group-focus-within:text-primary">{t("rsvp.phone")}</label>
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-300 focus:border-primary rounded-xl px-4 py-3.5 text-gray-900 outline-none transition-all focus:ring-4 focus:ring-primary/10 shadow-sm"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="space-y-2 relative group">
                      <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold absolute -top-2 left-3 bg-[#fbf9f6] px-1 z-10 transition-colors group-focus-within:text-primary">{t("rsvp.guests")}</label>
                      <select 
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        className="w-full bg-white/50 border border-gray-300 focus:border-primary rounded-xl px-4 py-3.5 text-gray-900 outline-none transition-all focus:ring-4 focus:ring-primary/10 shadow-sm appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                      {/* Custom dropdown arrow */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 relative group">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold absolute -top-2 left-3 bg-[#fbf9f6] px-1 z-10 transition-colors group-focus-within:text-primary">{t("rsvp.foodPreference")}</label>
                    <select 
                      name="foodPreference"
                      value={formData.foodPreference}
                      onChange={handleChange}
                      className="w-full bg-white/50 border border-gray-300 focus:border-primary rounded-xl px-4 py-3.5 text-gray-900 outline-none transition-all focus:ring-4 focus:ring-primary/10 shadow-sm appearance-none cursor-pointer"
                    >
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Halal">Halal</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </div>
                  </div>

                  <div className="space-y-2 relative group">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold absolute -top-2 left-3 bg-[#fbf9f6] px-1 z-10 transition-colors group-focus-within:text-primary">{t("rsvp.specialNotes")}</label>
                    <textarea 
                      name="specialNotes"
                      value={formData.specialNotes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-transparent border border-gray-300 focus:border-primary rounded-xl px-4 py-4 text-gray-900 outline-none transition-all focus:ring-4 focus:ring-primary/10 shadow-sm resize-none"
                      placeholder="Any dietary restrictions, song requests, or lovely notes for the couple?"
                    ></textarea>
                  </div>

                  {status === "error" && (
                    <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-500 text-sm flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                      {t("rsvp.error")}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-4 bg-primary text-white font-bold hover:bg-dark-surface hover:text-primary border border-primary hover:scale-[1.01] transition-all duration-300 uppercase tracking-widest disabled:opacity-50 disabled:hover:scale-100 rounded-xl shadow-lg hover:shadow-xl flex justify-center items-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        {t("rsvp.submitting")}
                      </>
                    ) : (
                      t("rsvp.submit")
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

