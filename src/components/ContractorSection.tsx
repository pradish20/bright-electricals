import React, { useState } from 'react';
import { CONTRACTOR_TESTIMONIALS, FREQUENT_QUESTIONS, STORE_DETAILS } from '../data/storeData';
import { FileSpreadsheet, ChevronDown, ChevronUp, Quote, CheckCircle, ArrowRight } from 'lucide-react';

interface ContractorSectionProps {
  onRequestQuote: () => void;
}

export const ContractorSection: React.FC<ContractorSectionProps> = ({ onRequestQuote }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="contractor-quotes" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Contractor Callout Hero Banner */}
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-white border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Contractor Trade Desk</span>
            </div>

            <h2 className="font-['Outfit',sans-serif] text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Supplying Bengaluru Electricians &amp; Interior Fit-out Teams
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              We specialize in fulfilling full electrical schedules for residential apartments, independent homes, and commercial offices. Bring your Bill of Materials (BOM) to our Market Road counter for transparent volume pricing.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 text-xs font-medium">
              <button
                onClick={onRequestQuote}
                className="px-6 py-3 rounded-md font-semibold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Submit Bill of Materials (BOM)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-slate-400 text-center sm:text-left">
                Counter Phone: <strong className="text-slate-200 font-mono">{STORE_DETAILS.phone}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Attributable Testimonials (Frontend Design Guideline Section 1.H) */}
        <div>
          <div className="max-w-xl mb-8">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-500 block mb-1">
              Field Feedback
            </span>
            <h3 className="font-['Outfit',sans-serif] text-2xl font-bold text-slate-900">
              Trusted on Bengaluru Job Sites
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTRACTOR_TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-xl p-6 border border-slate-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <Quote className="w-6 h-6 text-amber-500/70" />
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/80">
                  <div className="font-['Outfit',sans-serif] text-xs font-bold text-slate-900">
                    {t.author}
                  </div>
                  <div className="text-[11px] text-slate-600">{t.role}</div>
                  <div className="text-[11px] text-slate-400">{t.area}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div>
          <div className="max-w-xl mb-8">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-500 block mb-1">
              Common Technical Questions
            </span>
            <h3 className="font-['Outfit',sans-serif] text-2xl font-bold text-slate-900">
              Store &amp; Material Guidelines
            </h3>
          </div>

          <div className="max-w-3xl space-y-3">
            {FREQUENT_QUESTIONS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-lg border border-slate-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-['Outfit',sans-serif] text-sm font-semibold text-slate-900 hover:text-amber-800 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
