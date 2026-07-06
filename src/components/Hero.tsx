/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { content } = useContent();
  const { lang, t } = useLanguage();
  
  // Use localized content if available, fallback to default English structure
  const heroContent = content?.hero?.[lang] || content?.hero?.en || content?.hero || { 
    brideName: "", 
    groomName: "", 
    weddingDate: "", 
    countdownTarget: "" 
  };

  useEffect(() => {
    // Set initial volume lower for background music
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
    
    // Auto-play when mounted (which is after envelope is clicked and user has interacted)
    const playTimer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => console.log("Audio autoplay prevented by browser:", err));
      }
    }, 1500); // Small delay to sync with envelope transition
    
    return () => clearTimeout(playTimer);
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Play failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-dark-bg flex items-center justify-center">
      {/* Background Audio */}
      <audio ref={audioRef} loop src={heroContent.audioUrl || "/audio/wedding-music.mp3"} preload="auto" />
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={heroContent.bgUrl ? { backgroundImage: `url(${heroContent.bgUrl})` } : {}}
      >
        {/* Light overlay with blur for readability against the image */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      </div>

      {/* 3D Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas>
          <ambientLight intensity={0.5} />
          <Sparkles count={200} scale={15} size={2} speed={0.2} color="#db9b71" />
        </Canvas>
      </div>

      {/* Top Right Controls */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
        <LanguageSwitcher />
        <button 
          onClick={toggleAudio}
          className="p-3 rounded-full glass-panel text-primary hover:text-gold-300 transition-colors"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        >
          <h2 className="text-sm uppercase tracking-[0.3em] text-primary mb-4 drop-shadow-sm font-semibold">
            Together with their families
          </h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="flex flex-col items-center gap-2 my-4 w-full"
        >
          <h1 className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-script text-[#292524] py-2 px-2 leading-none text-center break-words w-full drop-shadow-md">
            {heroContent.brideName}
          </h1>
          <span className="text-4xl sm:text-5xl md:text-6xl text-[#9b7e4b] font-playfair my-2 drop-shadow-sm">&</span>
          <h1 className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-script text-[#292524] py-2 px-2 leading-none text-center break-words w-full drop-shadow-md">
            {heroContent.groomName}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <p className="text-xl md:text-2xl text-light-bg tracking-widest font-semibold mt-4 drop-shadow-sm">
            {heroContent.weddingDate}
          </p>
          <p className="text-sm md:text-base text-gray-800 mt-2 font-semibold drop-shadow-sm">
            Colombo, Sri Lanka
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(212, 175, 55, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
          className="mt-12 px-8 py-4 border border-primary text-primary bg-transparent hover:bg-dark-surface hover:text-primary transition-all duration-300 tracking-widest uppercase text-sm font-semibold rounded-full"
        >
          Save the Date
        </motion.button>
      </div>

      {/* Decorative Traditional Elements Overlay (CSS based) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
    </section>
  );
}

