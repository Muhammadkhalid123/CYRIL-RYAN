"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ShoppingBag, 
  X, 
  Trash2,
  Menu
} from "lucide-react";
import { useCart } from "./CartContext";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, removeFromCart, cartTotal } = useCart();
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isDarkText = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "The Story", href: "/about-book" },
    { name: "Cyril Ryan", href: "/about-author" },
    { name: "Readers", href: "/testimonials" },
    { name: "Get in Touch", href: "/contact" }
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${isScrolled ? "bg-white/95 backdrop-blur-2xl py-4 shadow-md border-b border-slate-100" : "bg-transparent py-8"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className={`text-3xl font-serif font-bold tracking-[0.1em] group transition-colors ${isDarkText ? "text-[#1f3642]" : "text-white"}`}>
            CYRIL <span className="text-primary italic transition-all group-hover:text-accent">RYAN</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((item) => (
              <Link key={item.name} href={item.href} className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all hover:-translate-y-0.5 ${isDarkText ? "text-[#1f3642]/60 hover:text-[#1f3642]" : "text-white/50 hover:text-white"}`}>
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center gap-6">
              <button onClick={() => setIsCartOpen(true)} className={`relative p-2 transition-all transform hover:scale-110 ${isDarkText ? "text-[#1f3642]/80 hover:text-[#1f3642]" : "text-white/80 hover:text-white"}`}>
                <ShoppingBag size={24} strokeWidth={1.5} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {cartItems.length}
                  </span>
                )}
              </button>
              
              <Link href="/#buy-now" className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.15em] shadow-xl transition-all active:scale-95 flex items-center gap-2 ${isDarkText ? "bg-[#1f3642] text-white hover:bg-accent" : "bg-white text-[#1f3642] hover:bg-accent hover:text-white"}`}>
                Order Direct
              </Link>
            </div>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className={`md:hidden transition-colors ${isDarkText ? "text-[#1f3642]" : "text-white"}`}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#1f3642] z-[100] flex flex-col p-12"
          >
            <div className="flex justify-between items-center mb-20">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-serif font-bold text-white tracking-[0.1em]">
                CYRIL <span className="text-primary italic">RYAN</span>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="text-white/60 hover:text-white">
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {navLinks.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-serif font-bold text-white/40 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                 href="/#buy-now" 
                 onClick={() => setIsMenuOpen(false)}
                 className="text-2xl font-outfit font-black text-accent uppercase tracking-widest mt-12"
              >
                Order Direct →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-[#1f3642]/60 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-lg bg-white z-[110] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="bg-[#1f3642] p-8 text-white flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-serif font-bold italic">Your Selection</h2>
                  <p className="text-white/40 text-xs font-outfit uppercase tracking-widest mt-2">{cartItems.length} items to cherish</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                  <X />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-8">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                    <ShoppingBag size={80} className="mb-6 stroke-1" />
                    <p className="font-serif italic text-2xl text-[#1f3642]">The collection is empty</p>
                  </div>
                ) : (
                  cartItems.map((item, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="w-24 h-32 bg-[#f4f7f9] rounded-2xl overflow-hidden relative shadow-lg group-hover:scale-105 transition-transform duration-500">
                        <img src="/book-cover.jpg" className="w-full h-full object-cover" alt="Book" />
                        <div className="absolute inset-0 bg-primary/10 border border-black/5 rounded-2xl" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-2">
                        <div>
                          <h3 className="font-serif font-bold text-xl text-[#1f3642] leading-tight mb-2 uppercase tracking-tighter">{item.name}</h3>
                          <p className="text-accent font-black text-lg">${item.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <button onClick={() => removeFromCart(item.name)} className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-red-500 transition-colors flex items-center gap-2">
                            <Trash2 size={12} /> Remove
                          </button>
                          <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-full px-4 py-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#1f3642]">Qty: {Number(item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-8 border-t border-slate-100 bg-slate-50/50">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Grand Total</span>
                    <span className="text-4xl font-serif font-bold text-[#1f3642]">${cartTotal.toFixed(2)}</span>
                  </div>
                  <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="btn btn-primary w-full py-6 text-base tracking-[0.2em] font-black uppercase shadow-[0_20px_40px_-10px_rgba(31,54,66,0.3)]">
                    Secure Checkout →
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
