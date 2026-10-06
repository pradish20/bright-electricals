import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryTiles } from './components/CategoryTiles';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ShopView } from './components/ShopView';
import { ContractorSection } from './components/ContractorSection';
import { AboutAndContact } from './components/AboutAndContact';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { WireSizingGuideModal } from './components/WireSizingGuideModal';
import { Product, CartItem, ProductCategory } from './types/store';
import { PRODUCTS_CATALOG } from './data/storeData';

export default function App() {
  // Navigation State
  const [activeSection, setActiveSection] = useState<'home' | 'shop' | 'quotes' | 'contact'>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');

  // Cart State with Session Storage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = sessionStorage.getItem('brightwire_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save cart to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('brightwire_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore sessionStorage errors
    }
  }, [cartItems]);

  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdviceOpen, setIsAdviceOpen] = useState(false);
  const [prefilledContactProduct, setPrefilledContactProduct] = useState('');

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleOrderPlaced = () => {
    setCartItems([]);
  };

  // Navigation router
  const handleNavigate = (section: string, category?: ProductCategory) => {
    if (category) {
      setSelectedCategory(category);
    }
    if (section === 'shop') {
      setActiveSection('shop');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'quotes') {
      setActiveSection('quotes');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'contact') {
      setActiveSection('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromHome = (category: ProductCategory) => {
    setSelectedCategory(category);
    setActiveSearchQuery('');
    setActiveSection('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterShopFromGuide = (category: ProductCategory, search: string) => {
    setSelectedCategory(category);
    setActiveSearchQuery(search);
    setActiveSection('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAboutProduct = (productName: string) => {
    setSelectedProduct(null);
    setPrefilledContactProduct(productName);
    setActiveSection('contact');
    setTimeout(() => {
      const contactEl = document.getElementById('contact-section');
      contactEl?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdviceModal={() => setIsAdviceOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {activeSection === 'home' && (
          <>
            <Hero
              onShopClick={() => handleNavigate('shop', 'all')}
              onAdviceClick={() => setIsAdviceOpen(true)}
            />
            <CategoryTiles onSelectCategory={handleSelectCategoryFromHome} />
            <FeaturedProducts
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
              onViewAllClick={() => handleNavigate('shop', 'all')}
            />
            <ContractorSection
              onRequestQuote={() => {
                setActiveSection('quotes');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <AboutAndContact />
          </>
        )}

        {activeSection === 'shop' && (
          <ShopView
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setActiveSearchQuery('');
            }}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            initialSearchQuery={activeSearchQuery}
          />
        )}

        {activeSection === 'quotes' && (
          <>
            <ContractorSection
              onRequestQuote={() => {
                const el = document.getElementById('contact-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <AboutAndContact initialEnquiryType="quote" />
          </>
        )}

        {activeSection === 'contact' && (
          <AboutAndContact
            initialEnquiryType="general"
            prefilledProductName={prefilledContactProduct}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdviceModal={() => setIsAdviceOpen(true)}
      />

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onAskAboutProduct={handleAskAboutProduct}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onBrowseShop={() => {
          handleNavigate('shop', 'all');
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderPlaced={handleOrderPlaced}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={handleAddToCart}
      />

      <WireSizingGuideModal
        isOpen={isAdviceOpen}
        onClose={() => setIsAdviceOpen(false)}
        onFilterShop={handleFilterShopFromGuide}
      />
    </div>
  );
}
