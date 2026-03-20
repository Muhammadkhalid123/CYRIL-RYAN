"use client";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Star, Quote, Heart } from "lucide-react";
import Link from "next/link";

export default function Testimonials() {
  const reviews = [
    {
      text: "An absorbing juxtaposition between Irish lore and Amish modesty. It left me contemplating the rituals in my own life.",
      author: "Sarah Jenkins",
      role: "Historian",
      avatar: "SJ"
    },
    {
      text: "Cyril Ryan doesn't just outline facts; he breathes life into historical memory. Truly a remarkable exploration of human nature.",
      author: "David O'Connor",
      role: "Ireland",
      avatar: "DO"
    },
    {
      text: "The chapter on the Amish parallels blew me away. Incredibly compassionate and historically rich. A must read.",
      author: "Elizabeth T.",
      role: "USA",
      avatar: "ET"
    },
    {
      text: "There are few books that can balance academic rigor with such profound empathy. Ryan has achieved a masterpiece of cultural study.",
      author: "Michael B.",
      role: "UK",
      avatar: "MB"
    },
    {
      text: "Reading the descriptions of the wake and the cry of the banshee sent shivers down my spine. A beautiful preservation of traditions lost to time.",
      author: "Karen W.",
      role: "Genealogist",
      avatar: "KW"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-20 overflow-hidden">
        <section className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-24"
          >
            <h4 className="font-outfit text-accent uppercase tracking-[0.3em] text-sm mb-6">Shared Echoes</h4>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#1f3642] mb-8 leading-tight">
               What Our <br />
               <span className="text-primary italic">Readers Feel</span>
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-12" />
            <p className="text-2xl font-garamond italic text-slate-500 leading-relaxed">
              Our community is deeply moved by the exploration of tradition and memory. 
              Read how the journey has resonated with voices around the world.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {reviews.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-[3rem] bg-[#f4f7f9] border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-accent/10 transition-all duration-700 relative overflow-hidden h-fit"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full blur-2xl group-hover:bg-accent/5 transition-colors" />
                <Quote className="text-primary/20 mb-8 transform -scale-x-100 group-hover:text-accent/30 transition-colors" size={64} />
                
                <p className="text-xl font-garamond italic leading-relaxed text-[#1f3642] mb-10 group-hover:text-primary transition-colors">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-6 pt-10 border-t border-slate-200">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center font-serif font-bold text-primary group-hover:border-accent group-hover:text-accent transition-all">
                    {review.avatar}
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-[#1f3642] leading-none mb-1">{review.author}</h5>
                    <p className="font-outfit text-[10px] uppercase tracking-widest text-slate-400 group-hover:text-accent/60 transition-colors">{review.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mt-6">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} size={12} fill="currentColor" className="text-yellow-500 opacity-20 group-hover:opacity-100 transition-opacity" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.section 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="mt-32 bg-[#1f3642] rounded-[4rem] p-12 md:p-24 text-white text-center relative overflow-hidden"
          >
             <div className="relative z-10 max-w-3xl mx-auto">
                <Heart className="text-accent mb-8 mx-auto" size={48} fill="currentColor" />
                <h2 className="text-5xl font-serif font-bold mb-8">Share Your Reflection</h2>
                <p className="text-xl text-white/70 font-garamond italic leading-relaxed mb-12">
                  Have you walked these paths with us? We would love to hear your thoughts. 
                  Your reflection becomes an echo in our growing community.
                </p>
                <Link href="/contact" className="btn btn-accent px-12 text-lg">
                  Submit Your Review →
                </Link>
             </div>
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] -mr-64 -mt-64 rounded-full" />
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 blur-[120px] -ml-48 -mb-48 rounded-full" />
          </motion.section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
