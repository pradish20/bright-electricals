import React from 'react';
import { ArrowRight, ShieldCheck, Truck, Wrench, Phone, Sparkles } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData';

interface HeroProps {
  onShopClick: () => void;
  onAdviceClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onAdviceClick }) => {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden border-b border-slate-800">
      {/* Background Subtle Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#475569" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Ambient Electric Accent Glow */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Subtle editorial kicker (Zero-pill discipline: unboxed clean text) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <span>Bengaluru Retail Electricals</span>
              <span className="text-slate-600">·</span>
              <span>24 Market Road</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-['Outfit',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Reliable power.{' '}
              <span className="text-amber-400 block sm:inline">Expert advice.</span>
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Supplying Bengaluru homeowners, licensed wiremen, and electrical contractors with ISI-grade copper cables, modular switchboards, energy-efficient lighting, and 10kA circuit protection.
            </p>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onShopClick}
                className="px-6 py-3.5 rounded-md font-semibold text-sm bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 transition-colors flex items-center justify-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-400"
              >
                <span>Shop Catalog &amp; Supplies</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onAdviceClick}
                className="px-6 py-3.5 rounded-md font-semibold text-sm bg-slate-900 hover:bg-slate-800 text-slate-100 border border-slate-700 hover:border-slate-600 transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <span>Wire &amp; Breaker Sizing Guide</span>
              </button>
            </div>

            {/* Three Real Counter Trust Markers */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 font-semibold block">ISI Certified Standard</span>
                  <span>Pure electrolytic copper &amp; FRLS flame retardancy</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 font-semibold block">Free Delivery ₹2,000+</span>
                  <span>Direct to your home or site across Bengaluru</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Wrench className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 font-semibold block">Contractor BOM Sourcing</span>
                  <span>Schedule discounts for electricians &amp; builders</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Card: Interactive Counter Showcase / Store Info */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-semibold text-amber-400 tracking-wider uppercase block">
                    Retail Counter Status
                  </span>
                  <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-white">
                    Market Road Store
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Counter Open</span>
                </div>
              </div>

              {/* Operating Schedule Details */}
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Trading Hours:</span>
                  <span className="font-mono text-slate-200 text-right">Mon–Sat 9:00 AM–8:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Sunday Hours:</span>
                  <span className="font-mono text-slate-200">10:00 AM–2:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Dispatch Hub:</span>
                  <span className="text-slate-200">Central Bengaluru (560001)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Direct Inquiries:</span>
                  <a
                    href={`tel:${STORE_DETAILS.phoneRaw}`}
                    className="font-mono text-amber-300 hover:underline font-semibold"
                  >
                    {STORE_DETAILS.phone}
                  </a>
                </div>
              </div>

              {/* Interactive Sizing Highlight Box */}
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-white">
                  <span>Renovating or Building?</span>
                  <span className="text-amber-400 text-[11px]">Free Counter Sizing</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Avoid undersized cables or tripping breakers. Use our online sizing guide or bring your site plan to the counter.
                </p>
                <button
                  type="button"
                  onClick={onAdviceClick}
                  className="w-full py-2.5 px-3 rounded bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Launch Wire &amp; Breaker Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
