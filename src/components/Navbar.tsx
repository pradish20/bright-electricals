import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Phone, MapPin, Zap } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData';
import { ProductCategory } from '../types/store';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (section: string, category?: ProductCategory) => void;
  onOpenSearch: () => void;
  onOpenAdviceModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
  onOpenSearch,
  onOpenAdviceModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  const handleNavClick = (section: string, category?: ProductCategory) => {
    onNavigate(section, category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Notification / Sample Notice Bar */}
      {!bannerDismissed && (
        <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
              <span className="font-medium text-amber-300">Bengaluru Local Delivery:</span>
              <span className="text-slate-300">Free on orders above ₹{STORE_DETAILS.freeDeliveryThreshold.toLocaleString('en-IN')}</span>
              <span className="hidden md:inline text-slate-500">·</span>
              <span className="hidden md:inline text-slate-400 text-[11px]">
                Market Road Store: Mon–Sat 9am–8pm
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                [Demo Storefront]
              </span>
              <button
                onClick={() => setBannerDismissed(true)}
                className="text-slate-400 hover:text-white transition-colors p-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Top Bar strictly obeying Top Bar Contract:
          Zone 1: Brand title (single text element)
          Zone 2: 4-6 text navigation links with subtle hover underlines
          Zone 3: 1-2 primary actions (Search & Cart)
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
          >
            <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-amber-400 font-bold shadow-xs">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-['Outfit',sans-serif] text-xl font-bold tracking-tight text-slate-950 group-hover:text-slate-800 transition-colors">
              BrightWire
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-700" aria-label="Main Navigation">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors hover:text-slate-950 hover:underline underline-offset-8 decoration-amber-400 decoration-2 ${
              activeSection === 'home' ? 'text-slate-950 underline font-semibold' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('shop', 'all')}
            className={`transition-colors hover:text-slate-950 hover:underline underline-offset-8 decoration-amber-400 decoration-2 ${
              activeSection === 'shop' ? 'text-slate-950 underline font-semibold' : ''
            }`}
          >
            Catalog & Supplies
          </button>
          <button
            onClick={onOpenAdviceModal}
            className="transition-colors hover:text-slate-950 hover:underline underline-offset-8 decoration-amber-400 decoration-2 flex items-center gap-1.5"
          >
            <span>Wire & MCB Guide</span>
          </button>
          <button
            onClick={() => handleNavClick('quotes')}
            className={`transition-colors hover:text-slate-950 hover:underline underline-offset-8 decoration-amber-400 decoration-2 ${
              activeSection === 'quotes' ? 'text-slate-950 underline font-semibold' : ''
            }`}
          >
            Contractor Quotes
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors hover:text-slate-950 hover:underline underline-offset-8 decoration-amber-400 decoration-2 ${
              activeSection === 'contact' ? 'text-slate-950 underline font-semibold' : ''
            }`}
          >
            Store & Hours
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick search button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Search catalog"
            title="Search products"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Action Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-md transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500"
            aria-label={`View cart, ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span
              className={`inline-flex items-center justify-center font-mono text-xs px-1.5 py-0.2 rounded font-bold ${
                cartCount > 0 ? 'bg-slate-950 text-amber-300' : 'bg-amber-500/60 text-slate-950'
              }`}
            >
              {cartCount}
            </span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-base font-medium">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 px-3 rounded hover:bg-slate-50 text-slate-800"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', 'all')}
              className="text-left py-2 px-3 rounded hover:bg-slate-50 text-slate-800"
            >
              Product Catalog
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdviceModal();
              }}
              className="text-left py-2 px-3 rounded hover:bg-slate-50 text-slate-800"
            >
              Wire & MCB Sizing Guide
            </button>
            <button
              onClick={() => handleNavClick('quotes')}
              className="text-left py-2 px-3 rounded hover:bg-slate-50 text-slate-800"
            >
              Contractor & Bulk Quotes
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 px-3 rounded hover:bg-slate-50 text-slate-800"
            >
              Store Location & Opening Hours
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{STORE_DETAILS.address}, Bengaluru</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{STORE_DETAILS.phone}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
