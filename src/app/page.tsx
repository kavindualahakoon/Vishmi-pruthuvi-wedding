"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import WeddingCard from "@/components/WeddingCard";
import OurStory from "@/components/OurStory";
import PreShootVideo from "@/components/PreShootVideo";
import Events from "@/components/Events";
import Gallery from "@/components/Gallery";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";
import Envelope from "@/components/Envelope";
import Sparkles from "@/components/Sparkles";
import { useContent } from "@/context/ContentContext";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const { content } = useContent();

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <>
      <Envelope onComplete={() => setIsLoading(false)} />
      <Sparkles isActive={!isLoading} />
      
      <main className={`flex min-h-[100dvh] w-full overflow-x-hidden flex-col items-center justify-between transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {content?.visibility?.hero !== false && <Hero />}
        {content?.visibility?.countdown !== false && <Countdown />}
        {content?.visibility?.weddingCard !== false && <WeddingCard />}
        {content?.visibility?.preShootVideo !== false && <PreShootVideo />}
        {content?.visibility?.ourStory !== false && <OurStory />}
        {content?.visibility?.events !== false && <Events />}
        {content?.visibility?.gallery !== false && <Gallery />}
        {content?.visibility?.rsvpForm !== false && <RSVPForm />}
        <Footer />
      </main>
    </>
  );
}
