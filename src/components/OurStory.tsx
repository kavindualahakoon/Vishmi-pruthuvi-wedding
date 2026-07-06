/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";

export default function OurStory() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const timelineEvents = content?.ourStory?.[lang]?.events || [];

  return (
    <section className="py-12 md:py-16 text-foreground relative h-full bg-transparent" id="story">
      {/* Subtle Lotus Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] text-primary fill-current" opacity="0.2">
          <path d="M50 10 C 30 30 10 50 50 90 C 90 50 70 30 50 10 Z" />
        </svg>
      </div>

      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-gradient-gold mb-4">Our Journey</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical Line (Left aligned) */}
          <div className="absolute left-[1.15rem] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>

          {timelineEvents.map((event: any, index: any) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex items-start mb-10 pl-14 group cursor-default"
            >
              {/* Center Dot */}
              <div className="absolute left-2.5 top-8 w-5 h-5 bg-dark-surface border-4 border-primary rounded-full shadow-[0_0_10px_rgba(201,169,110,0.5)] z-10 group-hover:scale-125 group-hover:shadow-[0_0_20px_rgba(201,169,110,0.8)] transition-all duration-500">
                 <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
              </div>

              {/* Content Card */}
              <div className="w-full">
                <div className="glass-panel p-6 md:p-8 rounded-3xl border border-primary/20 shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden bg-white/60">
                  {/* Decorative Background Element */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-110 duration-700"></div>
                  
                  {/* Giant Year Watermark */}
                  <div className="absolute -bottom-2 right-2 text-6xl font-playfair font-bold text-primary opacity-5 select-none transition-transform duration-700 group-hover:scale-105 group-hover:opacity-10">
                    {event.year}
                  </div>

                  {/* Year Badge */}
                  <div className="inline-block px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase mb-4">
                    {event.year}
                  </div>
                  
                  <h3 className="text-2xl font-playfair text-foreground mb-3 relative z-10 group-hover:text-primary transition-colors duration-300">
                    {event.title}
                  </h3>
                  
                  <div className="w-10 h-0.5 bg-primary/40 mb-4"></div>

                  <p className="text-gray-700 font-medium leading-relaxed relative z-10 text-sm md:text-base">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

