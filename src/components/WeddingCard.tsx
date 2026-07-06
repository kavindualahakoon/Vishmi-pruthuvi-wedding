/* eslint-disable */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";
import { Image as ImageIcon } from "lucide-react";

export default function WeddingCard() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const weddingCardContent = content?.weddingCard || {
    imageUrl: ""
  };

  return (
    <section className="py-16 md:py-24 bg-dark-surface text-foreground relative" id="wedding-card">
      <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-gradient-gold mb-4">Wedding Card</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-700 font-medium max-w-2xl mx-auto">
            You are cordially invited to celebrate our special day with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-lg mx-auto w-full"
        >
          <div className="glass-panel p-3 md:p-5 rounded-2xl shadow-2xl relative overflow-hidden bg-white/50 border border-primary/20">
            {/* Aspect Ratio container for Portrait image */}
            <div className="relative w-full aspect-[3/4] md:aspect-[3/4] rounded-xl overflow-hidden border border-primary/20 bg-dark-surface flex items-center justify-center">
              {weddingCardContent.imageUrl ? (
                <img
                  key={weddingCardContent.imageUrl}
                  src={weddingCardContent.imageUrl}
                  alt="Wedding Card"
                  className="absolute inset-0 w-full h-full object-cover shadow-inner"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-500 gap-4">
                  <ImageIcon className="w-12 h-12 opacity-50" />
                  <span className="text-sm font-medium">Wedding Card coming soon</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

      </div>
      
      {/* Decorative Traditional Elements Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
    </section>
  );
}

