"use client";

import { useCart } from "./CartContext";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

export default function ProductCard({ title, price, features, isPopular }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      whileHover={{ y: -12 }}
      className={`relative group flex flex-col h-full bg-white rounded-[2.5rem] p-10 transition-all duration-500 border border-slate-100 shadow-[0_15px_45px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(31,54,66,0.1)] ${isPopular ? "border-[#5f889e]/30 scale-105 z-10" : ""}`}
    >
      {isPopular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D78A51] text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-[#D78A51]/30">
          Collector's Pick
        </div>
      )}
      
      <div className="flex-grow">
        <h3 className="text-3xl font-serif font-bold text-[#1f3642] mb-3 leading-tight tracking-tight uppercase group-hover:text-[#5f889e] transition-colors">
          {title.split(" - ")[1]} 
        </h3>
        <p className="text-sm font-outfit uppercase tracking-widest text-slate-400 mb-8">Edition</p>
        
        <div className="mb-10 flex items-baseline gap-2">
          <span className="text-5xl font-serif font-black text-[#1f3642]">${price}</span>
          <span className="text-slate-300 font-outfit text-xs uppercase tracking-widest">USD</span>
        </div>
        
        <div className="space-y-5 mb-12">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-4 group/item">
              <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-green-500 group-hover/item:bg-green-500 group-hover/item:text-white transition-all transform group-hover/item:scale-110">
                <CheckCircle2 size={12} strokeWidth={3} />
              </div>
              <span className="text-sm font-garamond italic text-slate-500 group-hover/item:text-[#1f3642] transition-colors">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={() => addToCart(title, price)}
        className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 overflow-hidden group/btn ${isPopular ? "bg-[#1f3642] text-white hover:bg-black" : "bg-[#f4f7f9] text-[#1f3642] hover:bg-[#1f3642] hover:text-white"}`}
      >
        <ShoppingBag size={14} className="group-hover/btn:-translate-y-10 transition-transform duration-500" />
        <span className="relative group-hover/btn:-translate-y-px transition-transform duration-300">Reserve Now</span>
        <ArrowRight size={14} className="absolute translate-y-10 group-hover/btn:translate-y-0 transition-all duration-500 text-accent" />
      </button>
    </motion.div>
  );
}
