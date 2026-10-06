export type ProductCategory = 
  | 'all'
  | 'lighting'
  | 'cables-wires'
  | 'switches-sockets'
  | 'fans'
  | 'circuit-protection'
  | 'tools-accessories';

export interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, 'all'>;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  unit: string;
  shortDescription: string;
  fullDescription: string;
  specifications: Record<string, string>;
  keyFeatures: string[];
  visualType: 
    | 'wire-coil'
    | 'switch-socket'
    | 'led-bulb'
    | 'ceiling-fan'
    | 'mcb-breaker'
    | 'multimeter'
    | 'distribution-box'
    | 'outdoor-floodlight'
    | 'led-batten'
    | 'wire-stripper'
    | 'extension-board'
    | 'smart-switch'
    | 'exhaust-fan'
    | 'heavy-cable';
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreDetails {
  name: string;
  tagline: string;
  businessType: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  phone: string;
  phoneRaw: string;
  email: string;
  openingHours: {
    weekdays: string;
    sunday: string;
  };
  serviceArea: string;
  currencySymbol: string;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  dummyNotice: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  enquiryType: 'general' | 'quote' | 'contractor' | 'availability';
  projectLocation?: string;
  message: string;
}
