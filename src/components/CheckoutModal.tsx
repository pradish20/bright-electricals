import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, Phone, MapPin, ArrowRight, Copy, Check } from 'lucide-react';
import { CartItem } from '../types/store';
import { STORE_DETAILS } from '../data/storeData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderPlaced: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderPlaced,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    area: '',
    pincode: '560001',
    deliveryMethod: 'local-delivery',
    paymentMethod: 'pay-on-delivery',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= STORE_DETAILS.freeDeliveryThreshold;
  const deliveryFee = formData.deliveryMethod === 'store-pickup' ? 0 : isFreeDelivery ? 0 : STORE_DETAILS.standardDeliveryFee;
  const grandTotal = subtotal + deliveryFee;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (formData.deliveryMethod === 'local-delivery') {
      if (!formData.address.trim()) errs.address = 'Street address is required';
      if (!formData.area.trim()) errs.area = 'Bengaluru locality/area is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const generatedId = `BW-BLR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedId);
    setIsSubmitted(true);
    onOrderPlaced();
  };

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 id="checkout-modal-title" className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
              {isSubmitted ? 'Demo Order Confirmation' : 'Complete Demo Checkout'}
            </h2>
            <p className="text-xs text-slate-500">
              {isSubmitted ? 'Sample order logged locally' : 'No real payment collected · Store contact flow'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Important Demo Notice Banner */}
          <div className="bg-amber-50 border border-amber-300 rounded-lg p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold block text-amber-950 mb-0.5">
                Demonstration Mode Active
              </strong>
              <span>
                This is a simulation for BrightWire Electricals. No bank details or online transactions take place. Real orders are confirmed over the phone or in person at our Market Road shop.
              </span>
            </div>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Delivery vs In-Store Pick up toggle */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Fulfillment Method
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <label
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.deliveryMethod === 'local-delivery'
                        ? 'border-amber-500 bg-amber-50/50 text-slate-950 font-semibold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="local-delivery"
                      checked={formData.deliveryMethod === 'local-delivery'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'local-delivery' })}
                      className="text-amber-500 focus:ring-amber-400"
                    />
                    <div>
                      <div>Bengaluru Local Delivery</div>
                      <div className="text-[11px] font-normal text-slate-500">
                        {isFreeDelivery ? 'Free delivery threshold reached' : `₹${STORE_DETAILS.standardDeliveryFee} delivery fee`}
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.deliveryMethod === 'store-pickup'
                        ? 'border-amber-500 bg-amber-50/50 text-slate-950 font-semibold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="store-pickup"
                      checked={formData.deliveryMethod === 'store-pickup'}
                      onChange={() => setFormData({ ...formData, deliveryMethod: 'store-pickup' })}
                      className="text-amber-500 focus:ring-amber-400"
                    />
                    <div>
                      <div>Market Road Store Pickup</div>
                      <div className="text-[11px] font-normal text-slate-500">Free · Ready within 2 hrs</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className={`w-full text-xs p-2.5 rounded border ${
                      errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                    } focus:outline-none focus:ring-1 focus:ring-amber-500`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className={`w-full text-xs p-2.5 rounded border ${
                      errors.phone ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                    } focus:outline-none focus:ring-1 focus:ring-amber-500`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Delivery Address if Local Delivery */}
              {formData.deliveryMethod === 'local-delivery' && (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Site / Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Flat/House No., Street Name, Landmark"
                      className={`w-full text-xs p-2.5 rounded border ${
                        errors.address ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                      } focus:outline-none focus:ring-1 focus:ring-amber-500`}
                    />
                    {errors.address && <p className="text-[11px] text-red-600 mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Bengaluru Locality / Area <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        placeholder="e.g. Indiranagar, Jayanagar"
                        className={`w-full text-xs p-2.5 rounded border ${
                          errors.area ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                        } focus:outline-none focus:ring-1 focus:ring-amber-500`}
                      />
                      {errors.area && <p className="text-[11px] text-red-600 mt-1">{errors.area}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Bengaluru Pincode
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        placeholder="560001"
                        className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order summary table */}
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/60 text-xs space-y-2">
                <div className="font-semibold text-slate-800 pb-1 border-b border-slate-200 flex justify-between">
                  <span>Order Items ({items.length})</span>
                  <span>Sample Amount</span>
                </div>
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-slate-600">
                    <span className="truncate pr-2">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-mono tabular-nums shrink-0">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-900 font-bold">
                  <span>Grand Total (Indicative)</span>
                  <span className="font-mono text-sm tabular-nums">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-md font-semibold text-sm bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Confirm Demo Order &amp; Request Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-slate-900">
                  Demo Order Successfully Logged!
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. In an actual deployment, our store coordinator reviews stock and phones you to schedule dispatch.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-sm mx-auto flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">Sample Reference ID</span>
                  <span className="font-mono text-base font-bold text-slate-900">{orderNumber}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyOrder}
                  className="flex items-center gap-1 text-xs px-2.5 py-1.5 border border-slate-300 rounded bg-white hover:bg-slate-100 text-slate-700 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Real Store Contact Card */}
              <div className="bg-slate-900 text-slate-100 rounded-lg p-4 text-left text-xs space-y-2.5">
                <div className="flex items-center gap-2 font-semibold text-amber-400">
                  <Phone className="w-4 h-4" />
                  <span>Call Store Directly to Finalize Orders</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Call our Bengaluru counter at <strong className="text-white">{STORE_DETAILS.phone}</strong> (Mon–Sat 9:00 AM–8:00 PM) to confirm product availability, arrange GST contractor billing, or pick up your items.
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-slate-400 text-[11px]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{STORE_DETAILS.address}, Bengaluru, Karnataka {STORE_DETAILS.pincode}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-md transition-colors"
              >
                Close &amp; Return to Store
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
