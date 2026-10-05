import React from 'react';
import { Zap, Search, X, Heart, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeNavTab: string;
  setActiveNavTab: (tab: string) => void;
  savedCount: number;
  onToggleSavedModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  cartSubtotal,
  onOpenCart,
  searchQuery,
  onSearchChange,
  activeNavTab,
  setActiveNavTab,
  savedCount,
  onToggleSavedModal,
}) => {
  return (
    <>
      {/* Running Marquee Announcement Bar */}
      <div className="bg-black text-white text-[11px] font-bold tracking-widest uppercase py-2.5 overflow-hidden border-b border-neutral-800 select-none relative marquee-container cursor-default">
        <div className="marquee-track flex whitespace-nowrap">
          <div className="flex items-center shrink-0">
            <span className="flex items-center gap-2 px-5 text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              FREE EXPEDITED EXPRESS SHIPPING ON ORDERS OVER $150
            </span>
            <span className="text-neutral-600">•</span>
            <span className="px-5 text-neutral-200">
              AUTHENTICITY GUARANTEED — VERIFIED BY EXPERTS
            </span>
            <span className="text-neutral-600">•</span>
            <span className="px-5 text-blue-400 font-extrabold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              NEW DROP FRIDAYS AT 10:00 AM EST
            </span>
            <span className="text-neutral-600">•</span>
            <span className="px-5 text-emerald-400 font-bold">
              WORLDWIDE COURIER DISPATCH
            </span>
            <span className="text-neutral-600">•</span>
            <span className="px-5 text-neutral-200">
              100% DEADSTOCK AUTHENTIC
            </span>
            <span className="text-neutral-600">•</span>
          </div>
          <div className="flex items-center shrink-0">
            <span className="flex items-center gap-2 px-5 text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              FREE EXPEDITED EXPRESS SHIPPING ON ORDERS OVER $150
            </span>
            <span className="text-neutral-600">•</span>
            <span className="px-5 text-neutral-200">
              AUTHENTICITY GUARANTEED — VERIFIED BY EXPERTS
            </span>
            <span className="text-neutral-600">•</span>
            <span className="px-5 text-blue-400 font-extrabold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              NEW DROP FRIDAYS AT 10:00 AM EST
            </span>
            <span className="text-neutral-600">•</span>
            <span className="px-5 text-emerald-400 font-bold">
              WORLDWIDE COURIER DISPATCH
            </span>
            <span className="text-neutral-600">•</span>
            <span className="px-5 text-neutral-200">
              100% DEADSTOCK AUTHENTIC
            </span>
            <span className="text-neutral-600">•</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-8 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white transform -rotate-3 group-hover:rotate-0 transition-transform shadow-md">
                <Zap className="w-5 h-5 text-blue-500 fill-blue-500" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tighter font-display text-black uppercase">
                  NEO<span className="text-blue-600">-SNEAKS</span>
                </span>
                <span className="block text-[9px] font-bold tracking-[0.25em] text-neutral-400 uppercase -mt-1">
                  HYPERWEAR // 2025
                </span>
              </div>
            </a>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-wider text-neutral-700 bg-neutral-100/80 p-1.5 rounded-2xl border border-gray-200/80">
              <button
                type="button"
                onClick={() => setActiveNavTab('drops')}
                className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none ${
                  activeNavTab === 'drops'
                    ? 'bg-black text-white shadow-md'
                    : 'text-neutral-600 hover:text-black hover:bg-white/60'
                }`}
                aria-current={activeNavTab === 'drops' ? 'page' : undefined}
              >
                <span>Latest Drops</span>
                <span className={`w-1.5 h-1.5 rounded-full ${activeNavTab === 'drops' ? 'bg-blue-400 animate-pulse' : 'bg-blue-600'}`} />
              </button>

              <button
                type="button"
                onClick={() => setActiveNavTab('men')}
                className={`px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer select-none ${
                  activeNavTab === 'men'
                    ? 'bg-black text-white shadow-md'
                    : 'text-neutral-600 hover:text-black hover:bg-white/60'
                }`}
                aria-current={activeNavTab === 'men' ? 'page' : undefined}
              >
                Men
              </button>

              <button
                type="button"
                onClick={() => setActiveNavTab('women')}
                className={`px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer select-none ${
                  activeNavTab === 'women'
                    ? 'bg-black text-white shadow-md'
                    : 'text-neutral-600 hover:text-black hover:bg-white/60'
                }`}
                aria-current={activeNavTab === 'women' ? 'page' : undefined}
              >
                Women
              </button>

              <button
                type="button"
                onClick={() => setActiveNavTab('vault')}
                className={`px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none ${
                  activeNavTab === 'vault'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-neutral-700 hover:text-black hover:bg-white/60'
                }`}
                aria-current={activeNavTab === 'vault' ? 'page' : undefined}
              >
                <span>Vault</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-black tracking-normal ${
                  activeNavTab === 'vault'
                    ? 'bg-white text-blue-600'
                    : 'bg-black text-white'
                }`}>
                  PRO
                </span>
              </button>
            </nav>
          </div>

          {/* Search, Saved Kicks, & Cart CTA */}
          <div className="flex items-center gap-3">
            
            {/* Desktop Search input */}
            <div className="relative hidden md:block w-64 lg:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search kicks, brands..."
                className="w-full pl-9 pr-8 py-2 bg-neutral-100 hover:bg-neutral-100/80 border border-transparent rounded-full text-xs font-semibold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-blue-600 focus:bg-white transition"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-black p-0.5"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onToggleSavedModal}
              className="p-2.5 rounded-full hover:bg-neutral-100 text-neutral-700 transition relative"
              title="Saved Grails"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${savedCount > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 bg-black hover:bg-neutral-800 text-white px-4 py-2.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm group shrink-0"
              aria-label="Open Shopping Cart"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-blue-600 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white badge-glow">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-black uppercase tracking-wider hidden sm:inline-block">
                Cart
              </span>
              <span className="text-neutral-400 text-xs hidden sm:inline">|</span>
              <span className="text-xs font-black text-blue-400 hidden sm:inline">
                ${cartSubtotal}
              </span>
            </button>

          </div>

        </div>

        {/* Mobile Search Bar & Tab Navigation Row */}
        <div className="md:hidden px-4 pb-3 space-y-2.5">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search kicks, brands..."
              className="w-full pl-9 pr-8 py-2 bg-neutral-100 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2.5 text-neutral-400 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveNavTab('drops')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                activeNavTab === 'drops'
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              Latest Drops
            </button>
            <button
              onClick={() => setActiveNavTab('men')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                activeNavTab === 'men'
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              Men
            </button>
            <button
              onClick={() => setActiveNavTab('women')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                activeNavTab === 'women'
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-neutral-600'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => setActiveNavTab('vault')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap transition cursor-pointer flex items-center gap-1 ${
                activeNavTab === 'vault'
                  ? 'bg-blue-600 text-white'
                  : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              <span>Vault</span>
              <span className="text-[9px] bg-black text-white px-1 rounded font-bold">
                PRO
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
