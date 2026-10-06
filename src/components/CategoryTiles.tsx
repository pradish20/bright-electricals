import React from 'react';
import { CATEGORIES_LIST } from '../data/storeData';
import { ProductCategory } from '../types/store';
import { Lightbulb, Cable, ToggleRight, Fan, ShieldAlert, Wrench, ArrowUpRight } from 'lucide-react';

interface CategoryTilesProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoryTiles: React.FC<CategoryTilesProps> = ({ onSelectCategory }) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'lighting':
        return <Lightbulb className="w-5 h-5 text-amber-500" />;
      case 'cables-wires':
        return <Cable className="w-5 h-5 text-blue-500" />;
      case 'switches-sockets':
        return <ToggleRight className="w-5 h-5 text-emerald-500" />;
      case 'fans':
        return <Fan className="w-5 h-5 text-purple-500" />;
      case 'circuit-protection':
        return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'tools-accessories':
        return <Wrench className="w-5 h-5 text-cyan-500" />;
      default:
        return <Lightbulb className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-500 block mb-1">
              Electrical Catalog
            </span>
            <h2 className="font-['Outfit',sans-serif] text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Browse Supplies by Category
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold text-slate-700 hover:text-slate-950 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Categories Grid (6 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as ProductCategory)}
              className="text-left group relative p-5 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200/80 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getCategoryIcon(cat.id)}
                  </div>
                  <span className="text-xs font-mono text-slate-400 group-hover:text-slate-700 transition-colors">
                    {cat.itemCount}
                  </span>
                </div>

                <h3 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  {cat.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-slate-950">
                <span>Explore supplies</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-950 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
