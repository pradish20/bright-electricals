import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { Product } from '../types/store';
import { PRODUCTS_CATALOG } from '../data/storeData';
import { ProductVisual } from './ProductVisual';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? PRODUCTS_CATALOG.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.shortDescription.toLowerCase().includes(trimmed) ||
          p.categoryLabel.toLowerCase().includes(trimmed) ||
          Object.values(p.specifications).some((val) => val.toLowerCase().includes(trimmed))
      )
    : PRODUCTS_CATALOG.slice(0, 5); // Show popular if empty

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="search-modal-title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cables, switches, LED battens, MCBs, multimeters..."
            className="w-full text-sm bg-transparent border-0 focus:outline-none text-slate-900 placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-700 p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills / Category Links */}
        {!query && (
          <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
            <span className="font-semibold text-slate-700 shrink-0">Popular:</span>
            {['1.5 sq mm Wire', '16A Switch', 'Downlight 12W', 'C-Curve MCB', 'Ceiling Fan', 'Multimeter'].map(
              (term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors whitespace-nowrap"
                >
                  {term}
                </button>
              )
            )}
          </div>
        )}

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 p-2">
          {results.length === 0 ? (
            <div className="text-center py-10 px-4 space-y-2">
              <p className="text-sm font-semibold text-slate-800">
                No electrical products matching "{query}"
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching by gauge (e.g. "2.5"), brand rating (e.g. "16A", "10kA"), or product type (e.g. "wire", "switch", "MCB").
              </p>
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                {/* Visual Thumbnail */}
                <div className="w-14 h-14 rounded bg-slate-900 overflow-hidden shrink-0 border border-slate-200">
                  <ProductVisual product={product} size="sm" className="w-full h-full" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>{product.categoryLabel}</span>
                    <span>·</span>
                    <span>{product.unit}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {product.shortDescription}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="text-right shrink-0">
                  <div className="font-mono text-xs font-bold text-slate-900 tabular-nums">
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product, 1);
                    }}
                    className="mt-1 px-2.5 py-1 text-[11px] font-semibold bg-slate-100 group-hover:bg-amber-400 group-hover:text-slate-950 rounded transition-colors flex items-center gap-1"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Found {results.length} products</span>
          <span className="text-slate-400">Press Esc to close</span>
        </div>
      </div>
    </div>
  );
};
