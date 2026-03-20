"use client";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Award, Globe, Quote, Instagram, Twitter, Facebook } from "lucide-react";
import Link from "next/link";

export default function AboutAuthor() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <section className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full z-0 opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative z-10 glass-card p-4 overflow-hidden rounded-[3rem] border-white/5 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.5)]">
                   <div className="aspect-[4/5] bg-[url('https://images.unsplash.com/photo-1544723795-3ca315cadc28?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center rounded-[2.5rem] grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" />
                   <div className="absolute bottom-10 left-10 p-8 glass-card border-white/20 text-white backdrop-blur-2xl">
                      <Quote className="text-accent mb-4" size={40} />
                      <p className="text-2xl font-serif font-bold italic">Top 10 Cultural Releases</p>
                      <p className="text-white/40 font-outfit uppercase tracking-widest text-xs mt-2">— Sunday Literary Review</p>
                   </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h4 className="font-outfit text-accent uppercase tracking-[0.3em] text-sm mb-6">The Storyteller</h4>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#1f3642] mb-8 leading-tight">
                Cyril <span className="text-primary italic">Ryan</span>
              </h1>
              <div className="w-24 h-1 bg-accent mb-12" />
              <p className="text-2xl font-garamond italic text-slate-500 leading-relaxed mb-10 border-l-4 border-accent pl-8 py-2">
                "To understand a land, one must first understand its traditions of departure. Ireland's soil is saturated with the stories of those who went before."
              </p>
              
              <div className="space-y-8 text-lg text-slate-600 font-garamond leading-relaxed">
                <p>
                  Cyril Ryan has dedicated his life to understanding the intersection of human 
                  memory, cultural folklore, and historical tradition. Residing near the historic 
                  town of Tuam, he is constantly surrounded by the very history and sacred burial 
                  mounds that inspire his profound works.
                </p>
                <p>
                  Focusing deeply on both the traditions of Ireland and the quietly devout practices of the Amish, 
                  Ryan's writing seeks to bridge worlds. His academic rigour is matched only by his profound 
                  empathy for the deeply human experience of loss and remembrance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-16 pt-12 border-t border-slate-100">
                <div className="space-y-4">
                  <div className="flex gap-4 items-center text-primary">
                    <Award size={24} />
                    <span className="font-serif font-bold text-xl text-[#1f3642]">Global Recognition</span>
                  </div>
                  <p className="text-sm text-slate-400 font-outfit uppercase tracking-widest">Multiple Literary Awards</p>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4 items-center text-accent">
                    <Globe size={24} />
                    <span className="font-serif font-bold text-xl text-[#1f3642]">Cultural Bridge</span>
                  </div>
                  <p className="text-sm text-slate-400 font-outfit uppercase tracking-widest">Respected in both IRL & Amish communities</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#f4f7f9] py-32 rounded-[5rem] overflow-hidden">
           <div className="container mx-auto px-6 max-w-4xl text-center">
              <h2 className="text-5xl font-serif font-bold text-[#1f3642] mb-8 leading-tight">Follow The Journey</h2>
              <p className="text-xl text-slate-500 font-garamond italic mb-12">Join Cyril as he explores the hidden landscapes of the Emerald Isle and beyond.</p>
              <div className="flex justify-center gap-12">
                 {[Instagram, Facebook, Twitter].map((Icon, i) => (
                   <Link key={i} href="#" className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-[#1f3642] hover:border-accent hover:text-accent hover:-translate-y-2 transition-all shadow-xl hover:shadow-accent/10">
                     <Icon size={32} strokeWidth={1.5} />
                   </Link>
                 ))}
              </div>
           </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
