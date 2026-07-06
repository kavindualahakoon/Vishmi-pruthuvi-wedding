/* eslint-disable */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";

export default function PreShootVideo() {
  const { content } = useContent();
  const { lang, t } = useLanguage();
  const preShootContent = content?.preShoot?.[lang] || content?.preShoot?.en || content?.preShoot || {
    title: "",
    description: "",
    videoUrl: ""
  };

  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      // Explicitly play the video to ensure autoplay works even if dynamically mounted
      videoRef.current.play().catch(e => console.warn("Autoplay blocked by browser:", e));
    }
  }, [preShootContent.videoUrl]);

  return (
    <section className="py-12 md:py-16 text-foreground relative h-full flex flex-col justify-center" id="preshoot">
      <div className="max-w-5xl mx-auto px-4 relative z-10 flex flex-col items-center">
        
        {/* Top: Text & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-gradient-gold mb-6">{preShootContent.title}</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-700 font-medium leading-relaxed mb-8 text-lg max-w-3xl mx-auto">
            {preShootContent.description}
          </p>
          
          {/* Skip Button */}
          <div className="flex justify-center mb-8">
            <button 
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border border-primary text-primary bg-transparent hover:bg-primary/5 hover:text-primary transition-all duration-300 uppercase tracking-widest text-xs flex items-center gap-2 rounded-full font-bold hover:scale-105"
            >
              Skip Video
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/></svg>
            </button>
          </div>
        </motion.div>

        {/* Bottom: Cinematic Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-sm md:max-w-md mx-auto"
        >
          {/* Glowing Ambient Light Behind Video */}
          <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-[3rem] transform scale-90"></div>
          
          <div className="glass-panel p-2 md:p-3 rounded-3xl shadow-2xl relative overflow-hidden aspect-[9/16] bg-white/50 border border-primary/20 backdrop-blur-md">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              {preShootContent.videoUrl ? (
                <video
                  ref={videoRef}
                  key={preShootContent.videoUrl}
                  src={preShootContent.videoUrl}
                  autoPlay
                  loop
                  muted
                  controls
                  playsInline
                  poster="/images/hero-bg.png"
                  className="absolute inset-0 w-full h-full object-contain md:object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-white/50 gap-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
                  <span className="text-lg tracking-widest uppercase font-semibold">Video coming soon</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Traditional Elements Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
    </section>
  );
}

