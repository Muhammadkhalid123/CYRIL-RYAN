"use client";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { BookOpen, Feather, Globe } from "lucide-react";
import Link from "next/link";

export default function AboutBook() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <section className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h1 className="text-6xl md:text-7xl font-serif font-bold text-[#1f3642] mb-8 leading-tight">
              The Soul of the <br />
              <span className="text-primary italic">Eternal Landscape</span>
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-12" />
            <p className="text-2xl font-garamond italic text-slate-500 leading-relaxed">
              "Echoes of Ireland" is a profound journey through the traditions of departure, 
              cultural memory, and the sacred soil of Hibernia.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-serif font-bold text-[#1f3642]">A Universal Passage</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-garamond">
                Death is a universal passage, yet the ways we honour it vary greatly across cultures. 
                This book offers a compelling exploration of funeral traditions, symbolism, and rituals 
                that bridge the worlds of the living and the dead, with a particular focus on Irish and Amish customs.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed font-garamond">
                Drawing from folklore, personal memory, and cultural history, it reveals how death has long 
                been accompanied by signs, symbols, and ceremonies meant to guide the soul and comfort the living.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 pt-8">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-accent mb-4"><Feather size={24} /></div>
                  <h4 className="font-bold mb-2">Irish Wakes</h4>
                  <p className="text-sm text-slate-500"> communal grieving through all-night vigils and ancient superstitions.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-primary mb-4"><Globe size={24} /></div>
                  <h4 className="font-bold mb-2">Amish Parallels</h4>
                  <p className="text-sm text-slate-500">Quiet dignity and profound communal respect for the cycle of life.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                <img src="/sebastian-unrau-sp-p7uuT0tw-unsplash.jpg" alt="Irish Landscape" className="w-full h-[600px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f3642]/80 to-transparent flex items-end p-12">
                   <p className="text-white text-3xl font-serif italic">"To understand a land, one must first understand its traditions of departure."</p>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/10 blur-[100px] rounded-full -z-10" />
            </motion.div>
          </div>

          <section className="bg-[#1f3642] rounded-[4rem] p-12 md:p-24 text-white text-center relative overflow-hidden">
             <div className="relative z-10 max-w-3xl mx-auto">
               <h2 className="text-5xl font-serif font-bold mb-8">A Shared Truth</h2>
               <p className="text-xl text-white/70 font-garamond italic leading-relaxed mb-12">
                 "Both traditions, though rooted in different worlds, echo a shared truth: death is not an end, 
                 but a continuation of belonging to family, community, and the eternal."
               </p>
               <Link href="/#buy-now" className="btn btn-accent px-12 text-lg">
                 Reserve Your Copy Today
               </Link>
             </div>
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -mr-48 -mt-48" />
             <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 blur-[100px] rounded-full -ml-40 -mb-40" />
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
