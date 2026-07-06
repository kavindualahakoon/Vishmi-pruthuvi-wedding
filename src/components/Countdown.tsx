"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";

export default function Countdown() {
  const { t, lang } = useLanguage();
  const { content } = useContent();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Get target date from content based on current language
    const targetStr = content?.hero?.[lang]?.countdownTarget;
    if (!targetStr) return; // Do not run countdown if no date is set

    const targetDate = new Date(targetStr).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [content, lang]);

  if (!isMounted || !content?.hero?.[lang]?.countdownTarget) return null; // Prevent hydration mismatch or empty countdown

  return (
    <section className="w-full py-16 md:py-24 bg-dark-bg text-foreground relative z-20 border-y border-primary/20">
      <div className="max-w-4xl mx-auto px-4 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 text-center"
        >
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div 
              key={unit} 
              className="flex flex-col items-center justify-center min-w-[90px] md:min-w-[140px] py-8 px-4 md:px-8 border border-[#9b7e4b]/30 rounded-t-full rounded-b-3xl bg-gradient-to-b from-transparent to-[#f5ebe0]/30 shadow-sm"
            >
              <span className="text-4xl md:text-6xl font-playfair font-light text-foreground">
                {value.toString().padStart(2, "0")}
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] mt-4 font-semibold text-primary">
                {t(`countdown.${unit}`)}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
