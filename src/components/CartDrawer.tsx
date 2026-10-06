import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Info, Phone } from 'lucide-react';
import { CartItem } from '../types/store';
import { STORE_DETAILS } from '../data/storeData';
import { ProductVisual } from './ProductVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onOpenCheckout: () => void;
  onBrowseShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  onBrowseShop,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const freeThreshold = STORE_DETAILS.freeDeliveryThreshold;
  const isFreeDelivery = subtotal >= freeThreshold;
  const amountNeededForFree = Math.max(0, freeThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : STORE_DETAILS.standardDeliveryFee;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-heading"
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-slate-800" />
            <h2 id="cart-drawer-heading" className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
              Shopping Cart
            </h2>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-md hover:bg-slate-200 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Goal Bar */}
        <div className="bg-amber-50/80 border-b border-amber-200/70 p-3.5 text-xs">
          <div className="flex items-center justify-between text-slate-800 font-medium mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-600" />
              {isFreeDelivery ? (
                <span className="text-emerald-700 font-semibold">
                  Free Bengaluru Delivery Unlocked!
                </span>
              ) : (
                <span>
                  Add <strong className="text-slate-950 font-mono">₹{amountNeededForFree.toLocaleString('en-IN')}</strong> more for Free Delivery
                </span>
              )}
            </span>
            <span className="font-mono text-slate-500 font-semibold">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-amber-200/60 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                isFreeDelivery ? 'bg-emerald-500' : 'bg-amber-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="font-['Outfit',sans-serif] text-base font-semibold text-slate-800">
                Your cart is empty
              </h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Add copper house wires, modular switchboards, LED battens, or circuit breakers from our catalog.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowseShop();
                }}
                className="mt-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
              >
                Browse Product Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-3 p-3 rounded-lg border border-slate-200/80 bg-slate-50/50 hover:bg-white transition-colors"
              >
                {/* Visual Thumbnail */}
                <div className="w-20 h-20 rounded bg-slate-900 overflow-hidden shrink-0 border border-slate-200">
                  <ProductVisual product={item.product} size="sm" className="h-full w-full" />
                </div>

                {/* Details & Controls */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-slate-900 line-clamp-1 leading-snug">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-0.5"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {item.product.unit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1">
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-300 rounded bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 transition-colors text-xs font-bold"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 font-mono text-xs font-semibold text-slate-800 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 transition-colors text-xs font-bold"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price calculation */}
                    <div className="text-right">
                      <span className="font-mono text-sm font-bold text-slate-900 tabular-nums block">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500 tabular-nums">
                        @ ₹{item.product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-slate-900 tabular-nums">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Bengaluru Local Delivery</span>
                <span className="font-mono tabular-nums">
                  {isFreeDelivery ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-950">
                <span>Estimated Total</span>
                <span className="font-mono text-base tabular-nums">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Demo Checkout Button */}
            <button
              onClick={onOpenCheckout}
              className="w-full py-3 px-4 rounded-md font-semibold text-sm bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white flex items-center justify-center gap-2 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>Proceed to Demo Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-1.5 text-[11px] text-slate-500 leading-tight">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Demonstration checkout. No payments collected online. Call or visit the Market Road store to finalize orders.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
