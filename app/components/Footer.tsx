"use client";

import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-50 py-20 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:row justify-between items-center gap-12">
          <Link href="/" className="text-2xl font-serif font-bold text-[#1f3642]">
            CYRIL <span className="text-primary italic">RYAN</span>
          </Link>
          
          <div className="flex gap-12">
            {[
              { name: "The Story", href: "/about-book" },
              { name: "Cyril Ryan", href: "/about-author" },
              { name: "Reader Experiences", href: "/testimonials" },
              { name: "Inquiries", href: "/contact" }
            ].map(link => (
              <Link key={link.name} href={link.href} className="font-outfit text-[10px] uppercase tracking-widest text-slate-400 hover:text-accent">
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex gap-12">
            {["Legal", "Privacy", "Shipping", "Refunds"].map(link => (
              <Link key={link} href="#" className="font-outfit text-[10px] uppercase tracking-widest text-slate-400 hover:text-accent">
                {link}
              </Link>
            ))}
          </div>

          <div className="flex gap-6">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <Link key={i} href="#" className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:border-accent hover:text-accent transition-all">
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-slate-300 text-[10px] uppercase tracking-[0.3em]">
            © 2024 ECHOES OF IRELAND: TRADITION, DEATH, AND THE LIVING LANDSCAPE · ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
