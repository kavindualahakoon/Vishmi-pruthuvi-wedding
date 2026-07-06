/* eslint-disable */
"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Events() {
  const { content } = useContent();
  const { lang } = useLanguage();
  const events = content?.weddingEvents?.[lang] || [];

  return (
    <section className="py-16 md:py-24 bg-dark-bg text-foreground relative" id="events">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-gradient-gold mb-4">Wedding Events</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-gray-700 font-medium max-w-2xl mx-auto">
            We are so excited to celebrate with you. Here are the details of our special events.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {events.map((event: any, index: any) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-panel rounded-2xl border border-primary/20 overflow-hidden flex flex-col hover:border-primary/50 transition-colors duration-300"
            >
              {/* Event Header */}
              <div className="bg-primary/5 p-8 border-b border-primary/10 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                <h3 className="text-3xl font-playfair text-primary relative z-10">{event.title}</h3>
              </div>
              
              {/* Event Details */}
              <div className="p-8 flex-grow flex flex-col">
                <div className="space-y-6 flex-grow">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm uppercase tracking-widest text-gray-600 mb-1">Date</h4>
                      <p className="text-lg text-gray-800 font-medium">{event.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm uppercase tracking-widest text-gray-600 mb-1">Time</h4>
                      <p className="text-lg text-gray-800 font-medium">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="text-sm uppercase tracking-widest text-gray-600 mb-1">Location</h4>
                      <p className="text-lg text-gray-800 font-medium">{event.location}</p>
                    </div>
                  </div>
                </div>

                {/* Event Timeline */}
                {event.timeline && event.timeline.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-primary/10">
                    <h4 className="text-center font-playfair text-xl text-primary mb-6">Event Timeline</h4>
                    <div className="relative border-l border-[#9b7e4b]/30 ml-3 md:ml-4 space-y-6">
                      {event.timeline.map((item: any, i: number) => (
                        <div key={i} className="relative pl-6">
                          <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#9b7e4b]"></div>
                          <p className="text-sm font-semibold text-[#9b7e4b]">{item.time}</p>
                          <p className="text-[#292524]">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-8 border-t border-primary/10">
                  <p className="text-gray-700 font-medium italic mb-8">
                    &quot;{event.description}&quot;
                  </p>
                  
                  <a 
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto block w-full text-center py-3 border border-primary text-primary hover:bg-dark-surface hover:text-primary hover:border-primary transition-all duration-300 uppercase tracking-widest text-xs font-semibold rounded-full"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

