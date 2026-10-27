import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Headset, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  ChevronRight, 
  Star, 
  Check, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Product, Category, Banner } from '../../types/dashboard';

interface StorefrontPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  categories: Category[];
  banners: Banner[];
}

export const StorefrontPreviewModal: React.FC<StorefrontPreviewModalProps> = ({
  isOpen,
  onClose,
  products,
  categories,
  banners
}) => {
  const [cartCount, setCartCount] = useState(2);
  const [cartTotal, setCartTotal] = useState(82.99);
  const [activeCategory, setActiveCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const heroBanner = banners.find(b => b.position === 'hero') || banners[0];

  const handleAddToCart = (productName: string, price: number) => {
    setCartCount(prev => prev + 1);
    setCartTotal(prev => prev + price);
    setToastMessage(`Added "${productName}" to shopping cart!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const displayedProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden border border-gray-200">
        {/* Top Control Bar in Modal */}
        <div className="bg-gray-900 text-white px-4 py-2.5 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">Live Customer Storefront View</span>
            <span className="text-gray-400 hidden sm:inline">(Mirroring sellzy.reactbd.com/en)</span>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="https://sellzy.reactbd.com/en" 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-300 hover:text-white flex items-center gap-1 hover:underline text-[11px]"
            >
              <span>Visit Official Demo</span>
              <ExternalLink size={12} />
            </a>
            <button
              onClick={onClose}
              className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Storefront Content Scroller */}
        <div className="overflow-y-auto flex-1 bg-white text-[#212b36]">
          {/* 1. Header Top */}
          <div className="bg-[#078178] text-white py-2 px-4 text-xs font-normal">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Headset size={14} />
                <span className="hidden sm:inline">Need Support ? Call Us:</span>
                <span className="bg-[#ffc107] text-[#212b36] font-bold px-2 py-0.5 rounded-full text-[10px]">
                  (480) 555-0103
                </span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-white/90">
                <span className="cursor-pointer hover:text-white">English / $USD</span>
                <span className="cursor-pointer hover:text-white">Order Tracking</span>
                <span className="cursor-pointer hover:text-white">Wishlist (3)</span>
              </div>
            </div>
          </div>

          {/* 2. Middle Header */}
          <div className="border-b border-gray-200 py-3 px-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
              {/* Logo */}
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="size-8 rounded-lg bg-[#05535c] flex items-center justify-center text-white font-black text-base">
                  S
                </div>
                <span className="text-xl font-extrabold text-[#05535c] tracking-tight">Sellzy</span>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-lg hidden sm:flex items-center border-2 border-[#05535c] rounded-lg overflow-hidden">
                <select className="bg-gray-50 text-xs px-3 py-2 border-r border-gray-200 outline-none text-gray-700">
                  <option>All Categories</option>
                  {categories.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
                <input 
                  type="text" 
                  placeholder="Search products across 1,000+ brands..."
                  className="flex-1 px-3 py-2 text-xs outline-none" 
                />
                <button className="bg-[#05535c] text-white px-4 py-2 hover:bg-[#005249]">
                  <Search size={15} />
                </button>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer">
                  <User size={20} className="text-gray-600" />
                  <div className="hidden lg:block text-left text-xs">
                    <span className="block text-gray-400 text-[10px]">Account</span>
                    <span className="font-bold text-gray-800">Sign In</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 cursor-pointer relative bg-[#e8f9f0] px-3 py-1.5 rounded-lg border border-[#088178]/20">
                  <ShoppingBag size={20} className="text-[#088178]" />
                  <span className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-[#cb0233] text-white font-bold text-[10px] flex items-center justify-center">
                    {cartCount}
                  </span>
                  <div className="text-left text-xs">
                    <span className="block text-[10px] text-gray-500">Cart Total</span>
                    <span className="font-bold text-[#088178]">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Navigation Bar */}
          <div className="bg-white border-b border-gray-200 px-4 py-2 text-xs font-semibold">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 px-3 py-1.5 bg-[#05535c] text-white rounded-lg font-bold">
                  <span>Explore All Categories</span>
                  <ChevronDown size={14} />
                </button>
                <div className="flex items-center gap-5 text-gray-700">
                  <span className="text-[#05535c] font-bold cursor-pointer">Home</span>
                  <span className="hover:text-[#05535c] cursor-pointer">Shop Grid</span>
                  <span className="hover:text-[#05535c] cursor-pointer">Best Sellers</span>
                  <span className="hover:text-[#05535c] cursor-pointer">Flash Deals</span>
                  <span className="hover:text-[#05535c] cursor-pointer">About Us</span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-gray-600">
                <span className="text-gray-400">Hotline:</span>
                <span className="font-bold text-gray-900">888-777-999</span>
              </div>
            </div>
          </div>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed top-16 right-8 z-50 bg-[#05535c] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top">
              <Check size={16} className="text-emerald-300" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* 4. Hero Carousel Banner */}
          <div className="p-4 max-w-6xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden min-h-[300px] flex items-center bg-gradient-to-r from-teal-900 to-[#05535c] text-white p-8">
              <img 
                src={heroBanner?.image} 
                alt="hero" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30" 
              />
              <div className="relative z-10 max-w-md space-y-3">
                <span className="px-3 py-1 rounded-full bg-[#ffc107] text-gray-900 font-bold text-xs">
                  {heroBanner?.badge || 'Up to 50% OFF'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                  {heroBanner?.title || 'VitaLife Omega-3 Softgels Heart Support'}
                </h2>
                <p className="text-xs sm:text-sm text-teal-100">
                  {heroBanner?.subtitle || 'Laboratory tested natural herbs, diagnostics & whey supplements.'}
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button className="px-5 py-2.5 rounded-lg bg-white text-[#05535c] hover:bg-gray-100 font-bold text-xs shadow-md transition-all">
                    {heroBanner?.buttonText || 'Shop Collection'}
                  </button>
                  <span className="text-xs text-teal-200">Free 2-day delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Trust Badges */}
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200 text-xs">
              <div className="flex items-center gap-3">
                <Truck size={24} className="text-[#05535c] shrink-0" />
                <div>
                  <h5 className="font-bold text-gray-900">Free Shipping</h5>
                  <p className="text-[10px] text-gray-500">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Headset size={24} className="text-[#05535c] shrink-0" />
                <div>
                  <h5 className="font-bold text-gray-900">24/7 Support</h5>
                  <p className="text-[10px] text-gray-500">Live chat & phone</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw size={24} className="text-[#05535c] shrink-0" />
                <div>
                  <h5 className="font-bold text-gray-900">30 Days Return</h5>
                  <p className="text-[10px] text-gray-500">Money back guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={24} className="text-[#05535c] shrink-0" />
                <div>
                  <h5 className="font-bold text-gray-900">Secure Payment</h5>
                  <p className="text-[10px] text-gray-500">100% Protected</p>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Product Filter Pills & Grid */}
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Best Selling Products</h3>
                <p className="text-xs text-gray-500">Real-time products synced directly from your dashboard catalog</p>
              </div>

              {/* Department pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
                {['All', ...categories.slice(0, 4).map(c => c.name)].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                      activeCategory === cat 
                        ? 'bg-[#05535c] text-white shadow-xs' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedProducts.map((prod) => {
                const discount = Math.round(((prod.regularPrice - prod.salePrice) / prod.regularPrice) * 100);
                return (
                  <div key={prod.id} className="bg-white border border-gray-200 rounded-xl p-3 flex flex-col justify-between hover:shadow-lg transition-all group">
                    <div className="relative">
                      {discount > 0 && (
                        <span className="absolute top-2 left-2 z-10 bg-[#ff4842] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          -{discount}%
                        </span>
                      )}
                      <div className="aspect-square w-full bg-gray-50 rounded-lg p-2 flex items-center justify-center overflow-hidden">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 font-semibold uppercase">{prod.category}</span>
                        <h4 className="text-xs font-bold text-gray-900 line-clamp-2 mt-0.5 group-hover:text-[#05535c] transition-colors">
                          {prod.name}
                        </h4>
                        <div className="flex items-center gap-1 mt-1 text-amber-500 text-[11px] font-bold">
                          <Star size={11} fill="currentColor" />
                          <span>{prod.rating}</span>
                          <span className="text-gray-400 font-normal">({prod.reviewCount})</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-black text-[#05535c] block">
                            ${prod.salePrice.toFixed(2)}
                          </span>
                          {discount > 0 && (
                            <span className="text-[10px] text-gray-400 line-through">
                              ${prod.regularPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(prod.name, prod.salePrice)}
                          className="px-2.5 py-1.5 rounded-lg bg-[#05535c] hover:bg-[#005249] text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
