import React from 'react';
import { Zap, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { STORE_DETAILS, CATEGORIES_LIST } from '../data/storeData';
import { ProductCategory } from '../types/store';

interface FooterProps {
  onNavigate: (section: string, category?: ProductCategory) => void;
  onOpenAdviceModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdviceModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand Lockup & Story */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
                <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
              </div>
              <span className="font-['Outfit',sans-serif] text-xl font-bold tracking-tight text-white">
                {STORE_DETAILS.name}
              </span>
            </div>

            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Retail supplier of electrical house wires, modular switchboards, LED luminaires, and safety circuit breakers. Serving electrical contractors, wiremen, and homeowners across Bengaluru.
            </p>

            <div className="pt-2 text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Genuine ISI compliant products</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Local delivery threshold: Free for orders ₹{STORE_DETAILS.freeDeliveryThreshold.toLocaleString('en-IN')}+
              </div>
            </div>
          </div>

          {/* Col 3: Categories Links */}
          <div className="space-y-3">
            <h4 className="font-['Outfit',sans-serif] text-sm font-semibold text-white uppercase tracking-wider">
              Product Categories
            </h4>
            <ul className="space-y-2">
              {CATEGORIES_LIST.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate('shop', cat.id as ProductCategory)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Tools */}
          <div className="space-y-3">
            <h4 className="font-['Outfit',sans-serif] text-sm font-semibold text-white uppercase tracking-wider">
              Customer Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('shop', 'all')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Full Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdviceModal}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Wire &amp; MCB Sizing Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quotes')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Contractor BOM Quotes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Store Location &amp; Hours
                </button>
              </li>
            </ul>

            <div className="pt-3">
              <span className="text-[11px] text-slate-500 block mb-1.5 font-medium">
                Example Social Links:
              </span>
              <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                <span className="hover:text-amber-400 cursor-pointer">WhatsApp (Demo)</span>
                <span>·</span>
                <span className="hover:text-amber-400 cursor-pointer">Instagram (Example)</span>
                <span>·</span>
                <span className="hover:text-amber-400 cursor-pointer">Facebook (Example)</span>
              </div>
            </div>
          </div>

          {/* Col 5: Bengaluru Store Information */}
          <div className="space-y-3">
            <h4 className="font-['Outfit',sans-serif] text-sm font-semibold text-white uppercase tracking-wider">
              Counter Hours &amp; Desk
            </h4>
            <div className="space-y-2.5 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-[11px]">
                  {STORE_DETAILS.address}, {STORE_DETAILS.city}, {STORE_DETAILS.state} {STORE_DETAILS.pincode}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-[11px] font-mono">{STORE_DETAILS.phone}</span>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="text-[11px] font-mono">{STORE_DETAILS.email}</span>
              </div>

              <div className="flex items-start gap-2 pt-1 border-t border-slate-900">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div className="text-[11px] font-mono">
                  <div>Mon–Sat: 9am–8pm</div>
                  <div>Sun: 10am–2pm</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mandatory Discreet Sample Business Details Note */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {STORE_DETAILS.name}. All rights reserved.
          </p>

          <p className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded text-amber-300/80 text-center">
            {STORE_DETAILS.dummyNotice}
          </p>
        </div>
      </div>
    </footer>
  );
};
