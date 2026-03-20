"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../components/CartContext";
import {
  ChevronRight, ShoppingBag, Lock, Truck, CreditCard, CheckCircle, ArrowLeft, Shield, AlertCircle
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements, CardElement, useStripe, useElements
} from "@stripe/react-stripe-js";

// Init Stripe with the Public Key from .env.local
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

type Step = "contact" | "shipping" | "payment" | "confirmed";

/* ────── PAYMENT FORM COMPONENT ────── */
function StripePaymentForm({ total, contact, shipping, billing, sameAsBilling, onValueChange, payment, onSuccess }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      // 1. Create PaymentIntent on the server
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, metadata: { email: contact.email } }),
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);

      // 2. Confirm Payment on the client
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: payment.cardName,
            email: contact.email,
            phone: contact.phone,
            address: {
              line1: sameAsBilling ? shipping.address1 : billing.address1,
              city: sameAsBilling ? shipping.city : billing.city,
              postal_code: sameAsBilling ? shipping.zip : billing.zip,
              country: "IE", 
            }
          },
        },
      });

      if (result.error) {
        setError(result.error.message || "Payment failed");
      } else if (result.paymentIntent?.status === "succeeded") {
        onSuccess(result.paymentIntent.id);
      }
    } catch (err: any) {
      setError(err.message || "Connection Error");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 bg-white border border-slate-100 rounded-2xl px-6 py-5 shadow-sm">
        <Shield size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-bold text-[#1f3642]">Bank-level Security</p>
          <p className="text-slate-400">All transactions are encrypted and processed securely via Stripe.</p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Name on Card</label>
          <input 
            type="text" 
            placeholder="John Doe"
            value={payment.cardName}
            onChange={(e) => onValueChange("cardName", e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border border-slate-200 text-[#1f3642] font-bold focus:outline-none focus:border-accent transition-all"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Card Details</label>
          <div className="p-4 border border-slate-200 rounded-2xl bg-white focus-within:border-accent transition-all">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#1f3642',
                    '::placeholder': { color: '#cbd5e1' },
                    fontFamily: 'Inter, sans-serif',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="flex gap-2 items-center p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm animate-shake">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!stripe || processing || !payment.cardName}
        className="mt-8 w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-white text-base transition-all bg-gradient-to-r from-[#D78A51] via-[#e2a47a] to-[#D78A51] bg-[length:200%_auto] hover:bg-right shadow-2xl hover:shadow-accent/40 hover:-translate-y-1 disabled:opacity-50 disabled:grayscale disabled:translate-y-0"
      >
        {processing ? "Processing Order..." : `Confirm & Pay · $${total.toFixed(2)}`}
      </button>
    </div>
  );
}


/* ────── MAIN CHECKOUT PAGE ────── */
export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart();
  const [step, setStep] = useState<Step>("contact");
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const SHIPPING = 7.00;
  const TAX = 1.54;
  const eBookOnly = cartItems.every((i) => i.name.includes("eBook"));
  const orderTotal = cartTotal + (eBookOnly ? 0 : SHIPPING) + TAX;

  const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [shipping, setShipping] = useState({ address1: "", address2: "", city: "", state: "", zip: "", country: "Ireland", phone: "", email: "" });
  const [billing, setBilling] = useState({ address1: "", address2: "", city: "", state: "", zip: "", country: "Ireland", phone: "", email: "" });
  const [payment, setPayment] = useState({ cardName: "" });

  const steps: { id: Step; label: string; icon: any }[] = [
    { id: "contact", label: "Contact", icon: Shield },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "payment", label: "Payment", icon: CreditCard },
  ];

  const currentStep = steps.findIndex(s => s.id === step);

  if (step === "confirmed") {
    return (
      <div className="min-h-screen bg-[#f4f7f9] flex flex-col pt-32 px-6">
        <div className="max-w-xl w-full mx-auto bg-white rounded-[4rem] shadow-2xl shadow-primary-dark/10 p-16 text-center">
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10">
            <CheckCircle size={48} className="text-green-500 animate-pulse" />
          </div>
          <h1 className="text-4xl font-serif font-bold text-[#1f3642] mb-4">Order Received!</h1>
          <p className="text-slate-500 text-lg mb-8 leading-relaxed font-garamond italic">
             Thank you, {contact.firstName}. Your copy of <span className="text-[#1f3642] font-bold">Echoes of Ireland</span> is now in processing.
          </p>
          <div className="bg-slate-50 rounded-3xl p-8 text-left space-y-4 mb-10 border border-slate-100">
             <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
               <span>Transaction ID</span>
               <span className="text-slate-900">{orderDetails?.substring(0, 15)}...</span>
             </div>
             <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
               <span>Ship To</span>
               <span className="text-slate-900">{shipping.city}, {shipping.country}</span>
             </div>
             <div className="flex justify-between border-t border-slate-200 pt-4">
               <span className="font-serif font-bold text-[#1f3642]">Total Paid</span>
               <span className="text-[#D78A51] font-black text-xl">${orderTotal.toFixed(2)}</span>
             </div>
          </div>
          <Link href="/" className="btn btn-primary w-full py-5 block text-center uppercase tracking-widest">Back Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans pb-32">
      {/* Top Bar */}
      <div className="bg-[#1f3642] py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold text-white tracking-[0.2em] uppercase">
            Cyril <span className="text-primary italic">Ryan</span>
          </Link>
          <div className="flex items-center gap-3 text-white/40 text-xs font-black uppercase tracking-widest">
            <Lock size={14} /> Encrypted Checkout
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100 px-6 py-5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
            <li><Link href="/" className="text-slate-300 hover:text-accent">Home</Link></li>
            {steps.map((s, i) => (
              <li key={s.id} className="flex items-center gap-2">
                <ChevronRight size={10} className="text-slate-200" />
                <span className={s.id === step ? "text-[#1f3642]" : i < currentStep ? "text-primary cursor-pointer" : "text-slate-200"} onClick={() => i < currentStep && setStep(s.id)}>
                   {s.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_400px] gap-20 items-start">
          
          {/* LEFT: FORM STEPS */}
          <div className="space-y-12">
            
            {/* Step 1: Contact */}
            <Section title="1. Identity" icon={Shield} active={step === "contact"} done={currentStep > 0} onEdit={() => setStep("contact")}>
              <div className="grid md:grid-cols-2 gap-6">
                <Field 
                  label="First Name" 
                  value={contact.firstName} 
                  onChange={(v: string) => setContact({...contact, firstName: v})} 
                  placeholder="Cyril" 
                />

                <Field 
                  label="Last Name" 
                  value={contact.lastName} 
                  onChange={(v: string) => setContact({...contact, lastName: v})} 
                  placeholder="Ryan" 
                />

                <Field 
                  label="Email" 
                  className="md:col-span-2" 
                  value={contact.email} 
                  onChange={(v: string) => setContact({...contact, email: v})} 
                  placeholder="author@domain.com" 
                />

                <Field 
                  label="Direct Phone" 
                  className="md:col-span-2" 
                  value={contact.phone} 
                  onChange={(v: string) => setContact({...contact, phone: v})} 
                  placeholder="+353 ..." 
                  />
              </div>
              <button disabled={!contact.firstName || !contact.email} onClick={() => setStep("shipping")} className="btn btn-primary w-full mt-10 uppercase tracking-widest">Continue →</button>
            </Section>

            {/* Step 2: Shipping */}
            <Section title="2. Delivery" icon={Truck} active={step === "shipping"} done={currentStep > 1} onEdit={() => setStep("shipping")}>
              {eBookOnly ? (
                <p className="p-6 bg-[#f4f7f9] rounded-2xl italic font-garamond text-slate-500">Instant delivery to your email after checkout.</p>
              ) : (
                <div className="space-y-6">
                 <Field 
                  label="Address Line 1" 
                  value={shipping.address1} 
                  onChange={(v: string) => setShipping({...shipping, address1: v})} 
                />

                <Field 
                  label="Address Line 2" 
                  value={shipping.address2} 
                  onChange={(v: string) => setShipping({...shipping, address2: v})} 
                />
                  <div className="grid grid-cols-2 gap-6">
                    <Field 
                      label="City" 
                      value={shipping.city} 
                      onChange={(v: string) => setShipping({...shipping, city: v})} 
                    />  

                    <Field 
                      label="State / County" 
                      value={shipping.state} 
                      onChange={(v: string) => setShipping({...shipping, state: v})} 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <Field 
                      label="Postal / ZIP" 
                      value={shipping.zip} 
                      onChange={(v: string) => setShipping({...shipping, zip: v})} 
                    />
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Country</label>
                      <select onChange={(e) => setShipping({...shipping, country: e.target.value})} className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:border-primary font-bold">
                        <option>Ireland</option><option>UK</option><option>USA</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              <button disabled={!eBookOnly && !shipping.city} onClick={() => setStep("payment")} className="btn btn-primary w-full mt-10 uppercase tracking-widest">Proceed to Payment →</button>
            </Section>

            {/* Step 3: Payment */}
            <Section title="3. Payment" icon={CreditCard} active={step === "payment"} done={currentStep > 2}>
               <Elements stripe={stripePromise}>
                  <StripePaymentForm 
                    total={orderTotal}
                    contact={contact}
                    shipping={shipping}
                    billing={billing}
                    sameAsBilling={sameAsBilling}
                    payment={payment}
                    onValueChange={(k: string, v: string) => setPayment({...payment, [k]: v})}
                    onSuccess={(id: string) => {
                      setOrderDetails(id);
                      setStep("confirmed");
                    }}
                  />
               </Elements>
            </Section>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="lg:sticky lg:top-32 space-y-10">
             <div className="bg-[#1f3642] rounded-[3rem] p-10 text-white shadow-2xl">
                <h3 className="text-2xl font-serif font-bold italic mb-8">Selected Collection</h3>
                <div className="space-y-6 mb-10 overflow-hidden">
                   {cartItems.map((item, i) => (
                     <div key={i} className="flex items-center gap-4">
                        <div className="w-12 h-16 bg-white/10 rounded-lg overflow-hidden border border-white/5">
                           <img src="/book-cover.jpg" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-grow">
                           <p className="text-[10px] font-black uppercase tracking-widest text-primary truncate max-w-[150px]">{item.name}</p>
                           <p className="text-sm font-bold">${item.price}</p>
                        </div>
                     </div>
                   ))}
                </div>
                
                <div className="space-y-4 pt-10 border-t border-white/10">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-40">
                     <span>Subtotal</span>
                     <span>${cartTotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-40">
                     <span>Flat Shipping</span>
                     <span>${SHIPPING.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-40">
                     <span>Tax</span>
                     <span>${TAX.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between pt-6 mt-4 border-t border-white/10">
                      <span className="font-serif font-bold text-xl italic uppercase">Total</span>
                      <span className="text-3xl font-black text-accent font-serif">${orderTotal.toFixed(2)}</span>
                   </div>
                </div>
             </div>
             
             <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100 italic font-garamond text-slate-400 text-sm">
                <Lock className="text-[#1f3642] flex-shrink-0" size={18} />
                Checkout is 100% secure. We accept all major credit cards.
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, active, done, children, onEdit }: any) {
  return (
    <div className={`transition-all duration-700 bg-white rounded-[3rem] shadow-2xl shadow-primary-dark/5 overflow-hidden border-2 ${active ? 'border-primary shadow-primary/10' : 'border-transparent opacity-80'}`}>
       <div className={`p-10 flex items-center justify-between ${active ? 'bg-primary/5' : ''}`}>
          <div className="flex items-center gap-6">
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${done ? 'bg-green-500 text-white' : active ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-100 text-slate-300'}`}>
                {done ? <CheckCircle size={24} /> : <Icon size={24} />}
             </div>
             <h2 className={`text-2xl font-serif font-bold ${active ? 'text-[#1f3642]' : 'text-slate-300'}`}>{title}</h2>
          </div>
          {done && <button onClick={onEdit} className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-accent">Change</button>}
       </div>
       {active && <div className="p-10 pt-0 text-slate-600 animate-fade-in">{children}</div>}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, className = "", type = "text" }: any) {
  return (
    <div className={className}>
      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-primary font-bold text-[#1f3642] placeholder-slate-200 transition-all font-outfit" />
    </div>
  );
}
