import React, { useState } from 'react';
import { X, Zap, ShieldAlert, ArrowRight, CheckCircle } from 'lucide-react';
import { ProductCategory } from '../types/store';

interface WireSizingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilterShop: (category: ProductCategory, search: string) => void;
}

interface ApplicationGuide {
  id: string;
  loadName: string;
  wattage: string;
  wireGauge: string;
  wireType: string;
  mcbRating: string;
  safetyNote: string;
  catalogCategory: ProductCategory;
  catalogQuery: string;
}

const GUIDE_ITEMS: ApplicationGuide[] = [
  {
    id: 'lights-fans',
    loadName: 'LED Lighting & Ceiling Fans',
    wattage: 'Up to 800W aggregate loop',
    wireGauge: '1.0 sq mm or 1.5 sq mm',
    wireType: 'FRLS Copper Single Core',
    mcbRating: '6A or 10A Type-C SP MCB',
    safetyNote: 'Separate lighting circuits from high-draw power sockets to prevent flickering during appliance startup.',
    catalogCategory: 'cables-wires',
    catalogQuery: '1.5 sq mm',
  },
  {
    id: 'general-sockets',
    loadName: 'Standard 6A Sockets (TV, PC, Fridge)',
    wattage: 'Up to 1500W aggregate load',
    wireGauge: '1.5 sq mm Copper',
    wireType: 'FRLS Copper (Flame Retardant)',
    mcbRating: '10A or 16A SP MCB',
    safetyNote: 'Maximum 8–10 outlets per circuit run in accordance with Indian electrical code recommendations.',
    catalogCategory: 'cables-wires',
    catalogQuery: '1.5 sq mm',
  },
  {
    id: 'heavy-appliances',
    loadName: '16A Power Outlets (Microwave, Washing Machine)',
    wattage: '1500W to 2500W',
    wireGauge: '2.5 sq mm Copper',
    wireType: 'FRLS Low Smoke Copper',
    mcbRating: '16A or 20A Type-C MCB',
    safetyNote: 'Mandatory individual earth line (green 1.5 sq mm) connected to main earthing terminal.',
    catalogCategory: 'cables-wires',
    catalogQuery: '2.5 sq mm',
  },
  {
    id: 'air-conditioner',
    loadName: '1.5 Ton Inverter Air Conditioner',
    wattage: 'Approx. 1800W–2200W',
    wireGauge: '2.5 sq mm or 4.0 sq mm',
    wireType: 'FRLS Multi-strand Copper',
    mcbRating: '20A or 25A C-Curve MCB',
    safetyNote: 'High motor startup inrush current requires C-Curve tripping characteristic to prevent nuisance tripping.',
    catalogCategory: 'circuit-protection',
    catalogQuery: '32A',
  },
  {
    id: 'water-geyser',
    loadName: 'Instant Water Geyser (3kW / 25A)',
    wattage: '3000W continuous resistive load',
    wireGauge: '4.0 sq mm Copper',
    wireType: 'FRLS Heavy Duty Copper',
    mcbRating: '25A or 32A Double Pole MCB',
    safetyNote: 'Dedicated radial run directly from distribution board without intervening junction joints.',
    catalogCategory: 'circuit-protection',
    catalogQuery: '32A',
  },
  {
    id: 'submersible-pump',
    loadName: 'Submersible Borewell Pump (1.5 HP to 2 HP)',
    wattage: '1100W–1500W inductive motor',
    wireGauge: '2.5 sq mm 3-Core Flat Cable',
    wireType: 'Submersible Waterproof Grade',
    mcbRating: '16A Motor Starter MCB',
    safetyNote: 'Ensure waterproof vulcanized heat-shrink joints below static water level.',
    catalogCategory: 'cables-wires',
    catalogQuery: 'Submersible',
  },
];

export const WireSizingGuideModal: React.FC<WireSizingGuideModalProps> = ({
  isOpen,
  onClose,
  onFilterShop,
}) => {
  const [selectedGuide, setSelectedGuide] = useState<ApplicationGuide>(GUIDE_ITEMS[0]);

  if (!isOpen) return null;

  const handleSelectAndGo = (guide: ApplicationGuide) => {
    onFilterShop(guide.catalogCategory, guide.catalogQuery);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wire-sizing-title"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-amber-400">
              <Zap className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <h2 id="wire-sizing-title" className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900">
                Wire Gauge &amp; Circuit Breaker Sizing Guide
              </h2>
              <p className="text-xs text-slate-500">
                Quick technical recommendations for residential &amp; light commercial wiring
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
            aria-label="Close guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left: Load Selector */}
          <div className="md:col-span-5 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Select Electrical Application
            </label>
            <div className="space-y-1.5">
              {GUIDE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedGuide(item)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-center justify-between ${
                    selectedGuide.id === item.id
                      ? 'border-amber-500 bg-amber-50/70 text-slate-950 font-semibold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="truncate pr-2">{item.loadName}</span>
                  <span className="font-mono text-[11px] text-slate-500 shrink-0">
                    {item.wireGauge.split(' ')[0]} sq mm
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Recommendations follow standard Indian IS:694 guidelines. Complex commercial multi-phase panels should always be verified by a licensed wireman.
              </span>
            </div>
          </div>

          {/* Right: Detailed Specification & Product Recommendation */}
          <div className="md:col-span-7 bg-slate-50 rounded-lg p-5 border border-slate-200 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-['Outfit',sans-serif] text-base font-bold text-slate-900">
                  {selectedGuide.loadName}
                </h3>
                <span className="font-mono text-xs text-slate-600 font-medium">
                  {selectedGuide.wattage}
                </span>
              </div>

              {/* Technical Spec Matrix */}
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="bg-white p-3 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Recommended Wire</span>
                  <span className="font-mono font-bold text-sm text-slate-900 block mt-0.5">
                    {selectedGuide.wireGauge}
                  </span>
                  <span className="text-[11px] text-slate-600">{selectedGuide.wireType}</span>
                </div>

                <div className="bg-white p-3 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Recommended MCB</span>
                  <span className="font-mono font-bold text-sm text-amber-700 block mt-0.5">
                    {selectedGuide.mcbRating}
                  </span>
                  <span className="text-[11px] text-slate-600">Distribution Board mount</span>
                </div>
              </div>

              {/* Safety & Installation Practice */}
              <div className="mt-4 bg-white p-3.5 rounded border border-slate-200 text-xs">
                <span className="font-semibold text-slate-800 block mb-1">
                  Good Wiring Practice
                </span>
                <p className="text-slate-600 leading-relaxed">
                  {selectedGuide.safetyNote}
                </p>
              </div>
            </div>

            {/* Direct Catalog Match Button */}
            <div className="pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => handleSelectAndGo(selectedGuide)}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-colors"
              >
                <span>Find Compatible Products in Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
