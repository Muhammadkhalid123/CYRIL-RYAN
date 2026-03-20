"use client";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { 
  ShoppingBag, 
  ArrowRight, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  CheckCircle2, 
  Star,
  Quote,
  Instagram,
  Facebook,
  Twitter,
  BookOpen,
  Feather,
  Globe,
  Award
} from "lucide-react";
import { useCart } from "./components/CartContext";
import ProductCard from "./components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const { cartItems, removeFromCart, addToCart, cartTotal } = useCart();

  return (
    <div className="font-sans">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1f3642]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f3642] via-[#1f3642]/80 to-transparent z-10" />
          <img
            src="/sebastian-unrau-sp-p7uuT0tw-unsplash.jpg"
            alt="Irish Forest Landscape"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 pt-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent font-outfit text-xs font-bold uppercase tracking-[0.2em] mb-8">
                Official New Release
              </span>

              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-[1.1] tracking-tight gradient-text">
                ECHOES OF IRELAND <br />
                <span className="text-primary-dark italic tracking-normal text-3xl md:text-4xl text-primary font-garamond block mt-4">TRADITION, DEATH, AND THE LIVING LANDSCAPE</span>
              </h1>

              <div className="relative mb-12 transform -translate-x-2">
                <p className="text-2xl font-garamond italic text-white/90 leading-relaxed border-l-4 border-accent pl-8 py-4 bg-white/5 backdrop-blur-sm rounded-r-2xl">
                  "A profound journey through the soul of <span className="text-accent underline decoration-accent/30 underline-offset-8">Hibernia</span>,
                  where tradition meets the infinite."
                </p>
              </div>

              <div className="flex flex-wrap gap-8 items-center mb-16">
                <Link href="#buy-now" className="btn btn-accent text-lg px-12 group">
                  Add to Collection <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
                <a
                  href="https://a.co/d/0aAOJ43w"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-amazon text-lg px-12 group hover:scale-[1.02]"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-5 mr-3" alt="Amazon" />
                  Order on Amazon
                </a>
              </div>

              <div className="flex gap-16">
                {[
                  { icon: <BookOpen size={20} className="text-accent" />, label: "Pages", value: "79" },
                  { icon: <Globe size={20} className="text-primary" />, label: "Regions", value: "Counties" },
                  { icon: <Star size={20} className="text-yellow-500" />, label: "Rating", value: "4.8/5" }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {stat.icon}
                      <span className="text-white/40 font-outfit uppercase text-[10px] tracking-widest">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-serif font-bold text-white leading-none">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative perspective-1000 hidden lg:block"
            >
              <div className="relative animate-float shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden scale-110 border-8 border-white/10 backdrop-blur-2xl">
                <img src="/book-cover.jpg" alt="ECHOES OF IRELAND: TRADITION, DEATH, AND THE LIVING LANDSCAPE" className="w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1f3642]/40 to-transparent pointer-events-none" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/20 blur-3xl rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-accent rounded-full" />
          </div>
        </div>
      </section>

      {/* Publishers Marquee */}
      <section className="bg-[#f4f7f9] py-16 border-y border-slate-200 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex gap-24 items-center px-12">
              <div className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-all cursor-pointer">
                <span className="font-serif font-black text-2xl text-[#1f3642] tracking-tighter">BARNES & NOBLE</span>
              </div>
              <div className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-all cursor-pointer">
                <span className="font-outfit font-black text-2xl text-[#1f3642] tracking-widest italic decoration-primary underline underline-offset-4">Indigo</span>
              </div>
              <div className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-all cursor-pointer">
                <div className="w-8 h-8 bg-[#1f3642] rounded-full flex items-center justify-center text-white font-bold text-xs italic">DP</div>
                <span className="font-serif font-bold text-xl text-[#1f3642]">BookDP</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Book Formats Section */}
      <section id="buy-now" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <h4 className="section-subtitle">Exclusive Editions</h4>
            <h2 className="section-title">Select Your Journey</h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <ProductCard
              title="ECHOES OF IRELAND - Paperback"
              price={13.55}
              features={["Fine-grain Matte Finish", "Premium Forest Paper", "Heritage Illustrations", "Full Bibliography"]}
              isPopular={false}
            />
            <ProductCard
              title="ECHOES OF IRELAND - Hardcover"
              price={20.33}
              features={["Linen-bound Spine", "Dust Jacket Gold-foil", "Signed Edition", "Stitched Internal Binding"]}
              isPopular={true}
            />
            <ProductCard
              title="ECHOES OF IRELAND - eBook"
              price={5.41}
              features={["Instant Digital Delivery", "Cross-Platform Access", "Interactive Maps", "High-Res Photography"]}
              isPopular={false}
            />
          </div>

          <div className="mt-24 text-center">
            <p className="font-outfit text-slate-400 uppercase tracking-[0.3em] text-[10px] mb-8">Also curated on</p>
            <a
              href="https://a.co/d/0aAOJ43w"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-10 px-12 py-6 bg-[#f4f7f9] rounded-3xl group hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-slate-100"
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="h-10 w-px bg-slate-200" />
              <span className="text-slate-400 font-bold group-hover:text-[#FF9900] transition-colors flex items-center gap-2">
                Order via Amazon <ArrowRight size={18} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* The Story / Author Section (Combined & Stylized) */}
      <section id="about-book" className="py-32 bg-[#1f3642] text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div>
                <h4 className="font-outfit text-primary uppercase tracking-[0.3em] text-sm mb-6">The Storyteller</h4>
                <h2 className="text-6xl font-serif font-bold mb-8">Cyril Ryan</h2>
                <p className="text-xl font-garamond italic text-white/70 leading-relaxed mb-10 border-l-2 border-primary pl-8">
                  "To understand a land, one must first understand its traditions of departure. Ireland's soil is saturated with the stories of those who went before."
                </p>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 leading-relaxed text-lg text-white/60 font-garamond italic">
                  "Working with local historians across Galway and Kerry, Cyril Ryan has captured the disappearing myths of the Emerald Isle. This collection is more than a book—it is a preservation of the Irish soul."
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {[
                  { icon: <Feather size={32} />, title: "Authentic Research", desc: "First-hand accounts from village elders." },
                  { icon: <Globe size={32} />, title: "Cultural Roots", desc: "Tracing traditions back to pre-famine era." }
                ].map((box, i) => (
                  <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
                    <div className="text-primary mb-4">{box.icon}</div>
                    <h4 className="font-bold font-serif text-lg mb-2">{box.title}</h4>
                    <p className="text-sm text-white/40 leading-relaxed">{box.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full z-0 opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative z-10 glass-card p-4 overflow-hidden rounded-[3rem] border-white/5 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.5)] transform lg:scale-110">
                <div className="aspect-[4/5] bg-[url('/book-cover.jpg')] bg-cover bg-center rounded-[2.5rem] grayscale-[0.2] hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute bottom-10 left-10 p-8 glass-card border-white/20">
                  <Quote className="text-accent mb-4" size={40} />
                  <p className="text-2xl font-serif font-bold italic">Top 10 Cultural Releases</p>
                  <p className="text-white/40 font-outfit uppercase tracking-widest text-xs mt-2">— Sunday Literary Review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Contact Section */}
      <section id="contact" className="py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto rounded-[4rem] bg-[#1f3642] p-12 lg:p-24 relative shadow-[0_100px_100px_-50px_rgba(31,54,66,0.5)] overflow-hidden text-white flex flex-col lg:flex-row gap-20 items-center">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] -mr-64 -mt-64 rounded-full" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 blur-[120px] -ml-48 -mb-48 rounded-full" />

            <div className="lg:w-1/2 relative z-10">
              <h4 className="section-subtitle !text-left !mb-6 !text-primary">Contact Cyril</h4>
              <h2 className="text-5xl font-serif font-bold mb-8 leading-tight">Join the Inner Circle</h2>
              <p className="text-white/60 text-lg font-garamond italic mb-12">
                Readers who join the mailing list receive exclusive access to Cyril's upcoming <span className="text-white underline decoration-accent decoration-2 underline-offset-8">Research Field Notes</span> and unpublished Irish folklore maps.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-primary"><Globe size={20} /></div>
                  <div>
                    <h5 className="font-bold text-sm">Direct Contact</h5>
                    <p className="text-white/40 text-xs">cyril@echoesofireland.com</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent"><Award size={20} /></div>
                  <div>
                    <h5 className="font-bold text-sm">Press & Media</h5>
                    <p className="text-white/40 text-xs">press@cyrilryan.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full relative z-10">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input type="text" placeholder="First Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-all" />
                  <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-all" />
                </div>
                <input type="text" placeholder="Subject" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-all" />
                <textarea rows={4} placeholder="Your Message" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-accent transition-all"></textarea>
                <button className="w-full btn btn-accent py-5">
                  Send Field Note <ArrowRight className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
