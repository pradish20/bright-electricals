import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, FileText, ExternalLink } from 'lucide-react';
import { STORE_DETAILS } from '../data/storeData';
import { ContactFormData } from '../types/store';

interface AboutAndContactProps {
  initialEnquiryType?: 'general' | 'quote' | 'contractor' | 'availability';
  prefilledProductName?: string;
}

export const AboutAndContact: React.FC<AboutAndContactProps> = ({
  initialEnquiryType = 'general',
  prefilledProductName = '',
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    enquiryType: initialEnquiryType,
    projectLocation: '',
    message: prefilledProductName
      ? `Hello, I would like to inquire about specifications and bulk pricing for: ${prefilledProductName}.`
      : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<ContactFormData | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter an email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide details about your enquiry or material requirements';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLastSubmission({ ...formData });
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      enquiryType: 'general',
      projectLocation: '',
      message: '',
    });
  };

  return (
    <section id="contact-section" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
            <span>Market Road Counter &amp; Project Support</span>
          </div>
          <h2 className="font-['Outfit',sans-serif] text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            About BrightWire &amp; Contact Us
          </h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            A fictional retail storefront serving homeowners, electricians, and interior contractors across Bengaluru with dependable wiring, modular fixtures, and electrical switchgear.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Store Details, Opening Hours & Location Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Store Information Card */}
            <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs space-y-5">
              <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Store Location &amp; Hours
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">
                      Physical Store Address
                    </strong>
                    <p className="leading-relaxed">
                      {STORE_DETAILS.address}<br />
                      {STORE_DETAILS.city}, {STORE_DETAILS.state} {STORE_DETAILS.pincode}, {STORE_DETAILS.country}
                    </p>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Service coverage: {STORE_DETAILS.serviceArea}
                    </span>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">
                      Trading Hours
                    </strong>
                    <p className="leading-relaxed font-mono tabular-nums">
                      {STORE_DETAILS.openingHours.weekdays}<br />
                      {STORE_DETAILS.openingHours.sunday}
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">
                      Counter Phone
                    </strong>
                    <a
                      href={`tel:${STORE_DETAILS.phoneRaw}`}
                      className="text-amber-700 hover:underline font-mono font-medium"
                    >
                      {STORE_DETAILS.phone}
                    </a>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Direct line for stock verification &amp; order inquiries
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold mb-0.5">
                      Email Inquiries
                    </strong>
                    <a
                      href={`mailto:${STORE_DETAILS.email}`}
                      className="text-amber-700 hover:underline"
                    >
                      {STORE_DETAILS.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Discreet Demo Notice */}
              <div className="pt-4 border-t border-slate-100">
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-md p-3 text-[11px] text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Discreet notice:</strong> {STORE_DETAILS.dummyNotice}
                  </span>
                </div>
              </div>
            </div>

            {/* Contractor Note */}
            <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Electrical Contractors &amp; Builders</span>
              </div>
              <h4 className="font-['Outfit',sans-serif] text-base font-bold text-white">
                Have a Bill of Materials (BOM)?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Send your conduit, cable reel, and switch schedule requirements via the form. We provide itemized quotes with contractor discounts for ongoing site projects.
              </p>
            </div>
          </div>

          {/* Right Column: Contact & Quote Form */}
          <div className="lg:col-span-7 bg-white rounded-xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-slate-900">
                    Send an Enquiry or Request a Quote
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your details below. Form submissions are validated and logged locally in this demo.
                  </p>
                </div>

                {/* Enquiry Type Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Enquiry Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {[
                      { id: 'general', label: 'General Advice' },
                      { id: 'quote', label: 'BOM Quote' },
                      { id: 'contractor', label: 'Contractor Rate' },
                      { id: 'availability', label: 'Stock Check' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, enquiryType: t.id as ContactFormData['enquiryType'] })
                        }
                        className={`py-2 px-2.5 rounded border text-center transition-colors truncate ${
                          formData.enquiryType === t.id
                            ? 'border-slate-900 bg-slate-900 text-white font-semibold'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className={`w-full text-xs p-2.5 rounded border ${
                        errors.fullName ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                      } focus:outline-none focus:ring-1 focus:ring-amber-500`}
                    />
                    {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@example.com"
                      className={`w-full text-xs p-2.5 rounded border ${
                        errors.email ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                      } focus:outline-none focus:ring-1 focus:ring-amber-500`}
                    />
                    {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone & Project Location (Optional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Bengaluru Area / Site Location <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.projectLocation}
                      onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                      placeholder="e.g. Koramangala, Indiranagar"
                      className="w-full text-xs p-2.5 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Message / BOM schedule */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message or Material Requirements <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="List required wire coils (gauge & length), switch counts, downlight wattages, or ask an engineering question..."
                    className={`w-full text-xs p-2.5 rounded border ${
                      errors.message ? 'border-red-500 bg-red-50/40' : 'border-slate-300'
                    } focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed`}
                  />
                  {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-xs rounded-md flex items-center justify-center gap-2 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Enquiry (Demo Simulation)</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-500">
                  Demo handling: The form executes front-end validation and demonstrates successful enquiry processing without sending external emails.
                </p>
              </form>
            ) : (
              <div className="py-6 space-y-5 text-center sm:text-left">
                <div className="flex items-center gap-3 text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                  <div>
                    <h3 className="font-['Outfit',sans-serif] text-xl font-bold text-slate-900">
                      Enquiry Received (Local Simulation)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Your submission has been captured in local demo state.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-slate-600 border-b border-slate-200 pb-2">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Name:</span>
                      <span className="font-semibold text-slate-900">{lastSubmission?.fullName}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block">Email:</span>
                      <span className="font-semibold text-slate-900">{lastSubmission?.email}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Enquiry Type:</span>
                    <span className="capitalize font-semibold text-slate-800">
                      {lastSubmission?.enquiryType}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Message Details:</span>
                    <p className="text-slate-700 italic bg-white p-2.5 rounded border border-slate-200 mt-1">
                      "{lastSubmission?.message}"
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                  <span className="font-semibold block mb-0.5">Ready to speak with our Bengaluru team?</span>
                  <span>
                    Call <strong>{STORE_DETAILS.phone}</strong> or visit our counter at {STORE_DETAILS.address}, Bengaluru.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
