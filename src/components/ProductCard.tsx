import React, { useState } from 'react';
import { ShoppingBag, Check, Eye } from 'lucide-react';
import { Product } from '../types/store';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article
      onClick={() => onSelect(product)}
      className="group relative flex flex-col bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Visual Canvas (65-75% emphasis) */}
      <div className="relative w-full overflow-hidden bg-slate-900 p-3">
        <ProductVisual product={product} size="md" />

        {/* Quick View overlay hint on hover */}
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center pointer-events-none">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/95 text-slate-950 text-xs font-semibold shadow-sm backdrop-blur-xs">
            <Eye className="w-3.5 h-3.5" />
            <span>View Specifications</span>
          </span>
        </div>

        {/* Quiet Bestseller marker (Zero-pill discipline: unboxed clean text) */}
        {product.isBestSeller && (
          <div className="absolute top-2.5 left-2.5 text-[11px] font-semibold tracking-wider text-amber-300 bg-slate-950/85 px-2 py-0.5 rounded border border-amber-500/30">
            POPULAR PICK
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="flex flex-col flex-1 p-4 justify-between gap-3">
        <div>
          {/* Metadata Row: Category & Rating with typographic separator */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-slate-600">
              {product.categoryLabel}
            </span>
            <span className="flex items-center gap-1 text-[11px] tabular-nums font-medium text-slate-600">
              <span className="text-amber-500">★</span>
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400">({product.reviewCount})</span>
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-['Outfit',sans-serif] text-base font-semibold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Short specification snippet */}
          <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing and Action row */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-lg font-bold text-slate-950 tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="font-mono text-xs text-slate-400 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 block leading-tight">
              Sample price · {product.unit}
            </span>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={handleAdd}
            className={`px-3 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shrink-0 ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white active:bg-slate-950'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
