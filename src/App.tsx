import React, { useState, useMemo, useEffect } from 'react';
import { SNEAKERS_DATA, Sneaker, CartItem } from './data/sneakers';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterBar } from './components/FilterBar';
import { SneakerCard } from './components/SneakerCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { QuickViewModal } from './components/QuickViewModal';
import { WishlistModal } from './components/WishlistModal';
import { VaultProView } from './components/VaultProView';
import { TrustBadges } from './components/TrustBadges';
import { Footer } from './components/Footer';
import { Toast, ToastMessage } from './components/Toast';
import { PackageSearch, RotateCcw, Sparkles } from 'lucide-react';

export default function App() {
  // Cart state initialized with sample items from prototype reference
  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      { product: SNEAKERS_DATA[0], quantity: 1, size: 'US 10' },
      { product: SNEAKERS_DATA[2], quantity: 1, size: 'US 9.5' },
    ];
  });

  const [savedSneakers, setSavedSneakers] = useState<Sneaker[]>(() => [
    SNEAKERS_DATA[3],
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewSneaker, setQuickViewSneaker] = useState<Sneaker | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [activeNavTab, setActiveNavTab] = useState<string>('drops');
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'alert' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, title, description, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Categories list
  const categories = ['All', 'Nike', 'Adidas', 'New Balance', 'Collaborations'];

  // Base list depending on active navigation tab
  const tabScopedSneakers = useMemo(() => {
    if (activeNavTab === 'men') {
      return SNEAKERS_DATA.filter((s) => !s.vaultDrop && (s.gender === 'men' || s.gender === 'unisex'));
    }
    if (activeNavTab === 'women') {
      return SNEAKERS_DATA.filter((s) => !s.vaultDrop && (s.gender === 'women' || s.gender === 'unisex'));
    }
    if (activeNavTab === 'vault') {
      return SNEAKERS_DATA.filter((s) => s.vaultDrop);
    }
    // 'drops' shows all regular drops
    return SNEAKERS_DATA.filter((s) => !s.vaultDrop);
  }, [activeNavTab]);

  // Calculate item counts per category for the current tab
  const itemCountsByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of categories) {
      if (cat === 'All') continue;
      counts[cat] = tabScopedSneakers.filter((s) => s.category === cat).length;
    }
    return counts;
  }, [tabScopedSneakers]);

  // Cart totals
  const totalItemCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  // Filtered and Sorted Sneakers for the current tab
  const filteredSneakers = useMemo(() => {
    return tabScopedSneakers.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.colorway.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortOrder === 'price-low') return a.price - b.price;
      if (sortOrder === 'price-high') return b.price - a.price;
      return 0; // default 'featured'
    });
  }, [tabScopedSneakers, selectedCategory, searchQuery, sortOrder]);

  // Cart actions
  const handleAddToCart = (product: Sneaker, size: string = 'US 10') => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prevCart, { product, quantity: 1, size }];
    });

    showToast(
      `Added to Bag`,
      `${product.name} (${size}) is ready in your haul.`
    );
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId && item.size === size) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    const item = cart.find(
      (i) => i.product.id === productId && i.size === size
    );
    setCart((prevCart) =>
      prevCart.filter((i) => !(i.product.id === productId && i.size === size))
    );
    if (item) {
      showToast('Removed from Bag', item.product.name, 'info');
    }
  };

  const handleToggleSaved = (sneaker: Sneaker) => {
    setSavedSneakers((prev) => {
      const exists = prev.some((s) => s.id === sneaker.id);
      if (exists) {
        showToast('Removed from Watchlist', sneaker.name, 'info');
        return prev.filter((s) => s.id !== sneaker.id);
      } else {
        showToast('Saved to Watchlist', sneaker.name, 'success');
        return [...prev, sneaker];
      }
    });
  };

  const handleQuickCop = (sneaker: Sneaker) => {
    handleAddToCart(sneaker, 'US 10');
    setIsCartOpen(true);
  };

  const handleCheckoutOpen = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCart([]);
    showToast('Order Placed Successfully', 'Your deadstock pair is secured.', 'success');
  };

  const scrollToDrops = () => {
    const dropsElem = document.getElementById('drops');
    if (dropsElem) {
      dropsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] relative text-[#0D0D11]">
      
      {/* Sticky Header with Running Marquee & Brand Navigation */}
      <Navbar
        cartItemCount={totalItemCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeNavTab={activeNavTab}
        setActiveNavTab={(tab) => {
          setActiveNavTab(tab);
          setSelectedCategory('All');
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (tab === 'vault') {
            showToast('Vault PRO Unlocked', 'Exclusive collector allocations and unreleased grails loaded.', 'info');
          }
        }}
        savedCount={savedSneakers.length}
        onToggleSavedModal={() => setIsWishlistOpen(true)}
      />

      {/* Hero Showcase Banner (Displayed on 'drops' view) */}
      {activeNavTab === 'drops' && (
        <HeroBanner
          featuredSneaker={SNEAKERS_DATA[0]}
          onQuickCop={handleQuickCop}
          onExploreDrop={scrollToDrops}
        />
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 flex-1 w-full" id="drops">
        
        {/* Section Title Banner for Men / Women views */}
        {activeNavTab === 'men' && (
          <div className="mb-8 p-6 sm:p-8 bg-neutral-900 text-white rounded-3xl border border-neutral-800 relative overflow-hidden shadow-xl">
            <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-400 bg-blue-950/80 border border-blue-500/30 px-3 py-1 rounded-full">
                Men's Department
              </span>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-display">
                Heavyweight Silhouettes
              </h1>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Engineered for hardwood performance, techwear utility, and timeless street credibility. Sizes US 8 through US 13 available.
              </p>
            </div>
          </div>
        )}

        {activeNavTab === 'women' && (
          <div className="mb-8 p-6 sm:p-8 bg-gradient-to-r from-neutral-950 via-neutral-900 to-stone-900 text-white rounded-3xl border border-neutral-800 relative overflow-hidden shadow-xl">
            <div className="absolute right-0 top-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-pink-400 bg-pink-950/80 border border-pink-500/30 px-3 py-1 rounded-full">
                Women's Department
              </span>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-display">
                Curated Grails & Platforms
              </h1>
              <p className="text-neutral-400 text-xs sm:text-sm">
                Pastel colorways, chunky platform iterations, and streamlined low-tops tailored for effortless streetwear styling.
              </p>
            </div>
          </div>
        )}

        {/* VAULT PRO VIEW */}
        {activeNavTab === 'vault' ? (
          <VaultProView
            vaultSneakers={SNEAKERS_DATA.filter((s) => s.vaultDrop)}
            onAddToCart={handleAddToCart}
            onQuickView={(snk) => setQuickViewSneaker(snk)}
            onShowToast={showToast}
          />
        ) : (
          /* STANDARD CATALOG VIEW (Drops, Men, Women) */
          <>
            {/* Brand Filter Bar & Sorting */}
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setSearchQuery('');
              }}
              itemCountsByCategory={itemCountsByCategory}
              totalCount={tabScopedSneakers.length}
              itemCount={filteredSneakers.length}
              sortOrder={sortOrder}
              onSortChange={setSortOrder}
            />

            {/* Sneaker Grid */}
            {filteredSneakers.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 p-8 shadow-xs">
                <PackageSearch className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-neutral-800 uppercase font-display">
                  No matching kicks found
                </h3>
                <p className="text-neutral-500 text-xs mt-1 max-w-sm mx-auto">
                  We couldn't find any sneakers matching "{searchQuery}". Try clearing your search query or brand selection.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-5 bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer transition shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredSneakers.map((sneaker) => (
                  <SneakerCard
                    key={sneaker.id}
                    sneaker={sneaker}
                    onAddToCart={(snk, size) => handleAddToCart(snk, size)}
                    onQuickView={(snk) => setQuickViewSneaker(snk)}
                    isSaved={savedSneakers.some((s) => s.id === sneaker.id)}
                    onToggleSaved={handleToggleSaved}
                  />
                ))}
              </div>
            )}

            {/* Authenticity & Priority Dispatch Trust Badges */}
            <TrustBadges />
          </>
        )}

      </main>

      {/* Footer */}
      <Footer
        onCategoryClick={(cat) => {
          setActiveNavTab('drops');
          setSelectedCategory(cat);
          scrollToDrops();
        }}
      />

      {/* Shopping Cart Drawer (Sidebar) */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckout={handleCheckoutOpen}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        sneaker={quickViewSneaker}
        isOpen={!!quickViewSneaker}
        onClose={() => setQuickViewSneaker(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Fast Track Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Saved / Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        savedSneakers={savedSneakers}
        onRemoveSaved={handleToggleSaved}
        onAddToCart={handleAddToCart}
      />

      {/* Real-time Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}

