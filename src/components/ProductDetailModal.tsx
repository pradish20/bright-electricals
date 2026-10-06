import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Truck, HelpCircle, Phone } from 'lucide-react';
import { Product } from '../types/store';
import { STORE_DETAILS } from '../data/storeData';
import { ProductVisual } from './ProductVisual';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onAskAboutProduct: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onAskAboutProduct,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 1800);
  };

  const handleIncrement = () => setQuantity((prev) => Math.min(prev + 1, 50));
  const handleDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Catalog</span>
            <span>/</span>
            <span className="font-medium text-slate-700">{product.categoryLabel}</span>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-[200px]">{product.id}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Visual and Fast Specs */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-900 shadow-inner">
              <ProductVisual product={product} size="detail" />
            </div>

            {/* In-store Trust notes */}
            <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200/80 text-xs text-slate-600 space-y-2">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Standard Specification:</strong> Tested against relevant Indian safety &amp; performance benchmarks.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Local Bengaluru Delivery:</strong> Dispatched from Market Road counter. Free over ₹{STORE_DETAILS.freeDeliveryThreshold.toLocaleString('en-IN')}.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onAskAboutProduct(product.name)}
              className="text-xs text-slate-600 hover:text-slate-950 flex items-center justify-center gap-1.5 py-2 px-3 border border-slate-300 rounded hover:bg-slate-100 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Need technical advice on this item? Ask our store</span>
            </button>
          </div>

          {/* Right Column: Contiguous Purchase Module & Specifications */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Product Title & Category */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>{product.categoryLabel}</span>
                <span>·</span>
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <span className="text-amber-500">★</span>
                  <span>{product.rating.toFixed(1)}</span>
                  <span>({product.reviewCount} customer reviews)</span>
                </span>
              </div>

              <h2
                id="product-detail-title"
                className="font-['Outfit',sans-serif] text-2xl font-bold text-slate-900 leading-snug"
              >
                {product.name}
              </h2>

              {/* Price Callout */}
              <div className="mt-3 py-3 px-4 bg-amber-50/60 rounded-lg border border-amber-200/60 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-extrabold text-slate-950 tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="font-mono text-base text-slate-400 line-through tabular-nums">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-600">
                    Per {product.unit} · Indicative sample retail price incl. GST
                  </span>
                </div>
                <div className="text-right text-xs">
                  <span className="text-emerald-700 font-semibold block">Available in Store</span>
                  <span className="text-slate-500">{product.stockCount} units on shelf</span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Key Features Bullet List */}
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Key Technical Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {product.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications Table */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Detailed Technical Specifications
                </h4>
                <div className="border border-slate-200 rounded-md overflow-hidden text-xs">
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <div
                      key={key}
                      className={`grid grid-cols-2 p-2.5 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'
                      } border-b border-slate-100 last:border-b-0`}
                    >
                      <span className="text-slate-500 font-medium">{key}</span>
                      <span className="text-slate-900 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contiguous Purchase Action Row */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-300 rounded-md overflow-hidden h-11 bg-white shrink-0 self-start sm:self-auto">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors font-bold text-base"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-mono text-sm font-bold text-slate-900 tabular-nums min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors font-bold text-base"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add To Cart Primary CTA */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 h-11 px-5 rounded-md font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shadow-sm ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added {quantity} to Shopping Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>
                        Add to Cart · ₹{(product.price * quantity).toLocaleString('en-IN')}
                      </span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                Sample storefront preview · To complete a purchase, phone or visit our Market Road counter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
