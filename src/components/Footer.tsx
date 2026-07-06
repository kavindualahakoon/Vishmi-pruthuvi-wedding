"use client";

import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { content } = useContent();
  const { lang } = useLanguage();
  
  const heroContent = content?.hero?.[lang] || content?.hero?.en || content?.hero || { 
    brideName: "Bride", 
    groomName: "Groom"
  };

  return (
    <footer className="w-full bg-[#faf6f1] py-12 border-t border-[#9b7e4b]/20 relative z-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        
        {/* Monogram or Initials */}
        <div className="mb-6 font-script text-4xl text-[#9b7e4b]">
          {heroContent?.brideName?.charAt(0) || "B"} & {heroContent?.groomName?.charAt(0) || "G"}
        </div>
        
        <p className="text-[#292524] font-playfair text-lg md:text-xl italic mb-2">
          Thank you for being a part of our special day.
        </p>
        
        <div className="w-16 h-[1px] bg-[#9b7e4b]/50 my-6"></div>
        
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
          &copy; {new Date().getFullYear()} {heroContent.brideName} & {heroContent.groomName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
