import React from 'react';
import { Product } from '../types/store';
import { PRODUCTS_CATALOG, STORE_BENEFITS } from '../data/storeData';
import { ProductCard } from './ProductCard';
import { ArrowRight, ShieldCheck, Truck, Headphones, Layers } from 'lucide-react';

interface FeaturedProductsProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewAllClick: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  onSelectProduct,
  onAddToCart,
  onViewAllClick,
}) => {
  const featured = PRODUCTS_CATALOG.filter((p) => p.isFeatured || p.isBestSeller).slice(0, 6);

  const getBenefitIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Headphones className="w-5 h-5 text-amber-500" />;
      case 1:
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 2:
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 3:
        return <Layers className="w-5 h-5 text-purple-500" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-16 py-14">
      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-600 block mb-1">
              Popular Stock
            </span>
            <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Featured Counter Bestsellers
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Top requested FRLS wires, modular switches, and circuit protection items in Bengaluru.
            </p>
          </div>
          <button
            onClick={onViewAllClick}
            className="text-xs font-semibold text-slate-900 hover:text-amber-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View Full 14-Item Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid: 3-col on desktop, 2-col on tablet, 1-col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Service Benefits Section */}
      <section className="bg-slate-900 text-white py-14 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-10">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-400 block mb-1">
              Why Bengaluru Electricians Choose BrightWire
            </span>
            <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-bold text-white">
              Dependable Service on Every Project
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STORE_BENEFITS.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                  {getBenefitIcon(idx)}
                </div>
                <h3 className="font-['Outfit',sans-serif] text-base font-bold text-white">
                  {benefit.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
