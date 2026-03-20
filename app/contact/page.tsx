"use client";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion } from "framer-motion";
import { Globe, Award, ArrowRight, Instagram, Facebook, Twitter, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-40 overflow-hidden">
        <section className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center mb-24"
          >
            <h4 className="font-outfit text-accent uppercase tracking-[0.3em] text-sm mb-6">Connect With Us</h4>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#1f3642] mb-8 leading-tight">
               Let's Join The <br />
               <span className="text-primary italic">Inner Circle</span>
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-12" />
            <p className="text-2xl font-garamond italic text-slate-500 leading-relaxed max-w-2xl mx-auto">
               Readers who join our community receive exclusive access to Cyril's upcoming 
               <span className="text-primary underline decoration-accent decoration-2 underline-offset-8">Research Field Notes</span> 
               and unpublished Irish folklore maps.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto rounded-[5rem] bg-[#1f3642] p-12 lg:p-24 relative shadow-[0_100px_100px_-50px_rgba(31,54,66,0.3)] overflow-hidden text-white flex flex-col lg:flex-row gap-20 items-center">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/30 blur-[150px] -mr-64 -mt-64 rounded-full" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/20 blur-[120px] -ml-48 -mb-48 rounded-full" />
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative z-10"
            >
              <h2 className="text-5xl font-serif font-bold mb-12 leading-tight">Field <br /><span className="text-primary italic">Inquiries</span></h2>
              <p className="text-white/60 text-xl font-garamond italic mb-16 leading-relaxed">
                Whether you have a thought to share about the Irish soul or want to request 
                press materials, Cyril personally reviews all notes from the community.
              </p>
              
              <div className="space-y-10">
                <div className="flex gap-6 items-center group">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:-translate-y-1">
                     <Mail size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-xl mb-1">Direct Note</h5>
                    <p className="text-white/40 font-outfit uppercase tracking-widest text-[10px]">info@echoesofireland.com</p>
                  </div>
                </div>

                <div className="flex gap-6 items-center group">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent transition-all group-hover:bg-accent group-hover:text-white group-hover:-translate-y-1">
                     <Award size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-xl mb-1">Press Registry</h5>
                    <p className="text-white/40 font-outfit uppercase tracking-widest text-[10px]">press@cyrilryan.com</p>
                  </div>
                </div>

                <div className="flex gap-6 items-center group">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 transition-all group-hover:bg-white group-hover:text-[#1f3642] group-hover:-translate-y-1">
                     <Globe size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-xl mb-1">Primary Base</h5>
                    <p className="text-white/40 font-outfit uppercase tracking-widest text-[10px]">Tuam, County Galway, Ireland</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-8 mt-16 pt-12 border-t border-white/5">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                   <Link key={i} href="#" className="text-white/20 hover:text-accent transition-colors">
                     <Icon size={24} strokeWidth={1.5} />
                   </Link>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="lg:w-1/2 w-full relative z-10"
            >
              <div className="glass-card !p-12 border-white/10 backdrop-blur-3xl shadow-3xl">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center text-accent mx-auto mb-8 animate-pulse">
                      <Mail size={40} />
                    </div>
                    <h3 className="text-4xl font-serif font-bold mb-4">Note Received</h3>
                    <p className="text-white/60 font-garamond italic text-xl">We'll respond to your reflection soon.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-primary">Your Name</label>
                         <input required type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-accent transition-all font-serif" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-primary">Email Address</label>
                         <input required type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-accent transition-all font-serif" />
                      </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-primary">Subject Matter</label>
                       <input required type="text" placeholder="General Inquiry" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-accent transition-all font-serif" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-primary">Reflection</label>
                       <textarea required rows={5} placeholder="Share your notes with us..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-accent transition-all font-serif"></textarea>
                    </div>
                    <button type="submit" className="w-full btn btn-accent py-6 text-base tracking-[0.2em] shadow-3xl hover:bg-white hover:text-accent group overflow-hidden">
                       <span className="flex items-center justify-center gap-4 group-hover:-translate-y-px transition-transform">
                          Deliver Field Note <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                       </span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
