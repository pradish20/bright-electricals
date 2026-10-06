import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw, Check, Sparkles, Filter } from 'lucide-react';
import { Product, ProductCategory } from '../types/store';
import { PRODUCTS_CATALOG, CATEGORIES_LIST } from '../data/storeData';
import { ProductCard } from './ProductCard';

interface ShopViewProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  initialSearchQuery?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  initialSearchQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Synchronize when initialSearchQuery changes from external triggers
  React.useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS_CATALOG];

    // 1. Category Filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // 2. Search query filter
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.categoryLabel.toLowerCase().includes(query) ||
          Object.values(p.specifications).some((v) => v.toLowerCase().includes(query))
      );
    }

    // 3. Stock filter
    if (onlyInStock) {
      list = list.filter((p) => p.inStock);
    }

    // 4. Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [selectedCategory, searchQuery, onlyInStock, sortBy]);

  const handleResetFilters = () => {
    onSelectCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setOnlyInStock(false);
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header / Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
              <span>Bengaluru Retail Inventory</span>
              <span>·</span>
              <span>14 Plausible Generic Products</span>
            </div>
            <h1 className="font-['Outfit',sans-serif] text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Electrical Catalog &amp; Supplies
            </h1>
            <p className="text-xs text-slate-500 mt-1.5 max-w-2xl leading-relaxed">
              Tested copper building wires, modular wall switches, LED battens, ceiling fans, and circuit protection for residential and contractor work. All prices are sample demonstration figures.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-500 bg-white px-3 py-1.5 rounded border border-slate-200 self-start md:self-auto shrink-0">
            Showing {filteredProducts.length} of {PRODUCTS_CATALOG.length} items
          </div>
        </div>

        {/* Category Segmented Filter Tabs (Interactive buttons allowed as per Section 1.A) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Categories ({PRODUCTS_CATALOG.length})
          </button>
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as ProductCategory)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Toolbar: Search input, Sort Dropdown, and Stock filter */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Live Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword (e.g. 2.5 sq mm, MCB, 16A)..."
              className="w-full text-xs pl-9 pr-8 py-2.5 rounded-md border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs p-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Controls: Sort and In-stock */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-medium shrink-0">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="text-xs bg-slate-50 border border-slate-200 rounded px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 font-medium text-slate-800"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* In-Stock Filter toggle */}
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none px-2 py-1.5 rounded hover:bg-slate-50 border border-transparent hover:border-slate-200">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-400"
              />
              <span>In Stock Only</span>
            </label>

            {/* Clear All Filters Button */}
            {(selectedCategory !== 'all' || searchQuery || onlyInStock || sortBy !== 'featured') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-900 font-semibold px-2 py-1.5 rounded hover:bg-amber-50 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
            <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <Filter className="w-7 h-7" />
            </div>
            <h3 className="font-['Outfit',sans-serif] text-lg font-bold text-slate-800">
              No products found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              No electrical products matched your current filters. Try resetting the category or clearing the search keyword.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded hover:bg-slate-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}

        {/* Catalog Trust / Sample Notice Banner */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <strong className="text-slate-900 block font-semibold mb-0.5">
              Wholesale / Contractor Quantity Purchases
            </strong>
            <span>
              Stock levels and retail rates shown are sample demonstration values. Contractors requiring full reels (180m/300m) or switchboard bulk cartons can request a bill-of-materials quote.
            </span>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-semibold text-amber-700 hover:underline shrink-0"
          >
            Ask for Project Quote →
          </button>
        </div>
      </div>
    </div>
  );
};
