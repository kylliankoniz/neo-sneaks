import React, { useEffect } from 'react';
import {
  ShoppingBag,
  X,
  Trash2,
  Minus,
  Plus,
  Lock,
  CheckCircle,
  Shield,
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { CartItem } from '../data/sneakers';
import { SneakerImage } from './SneakerImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveFromCart: (productId: string, size: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const estimatedTax = subtotal * 0.08;
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 15;
  const orderTotal = subtotal + estimatedTax + shipping;
  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[460px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping Cart Drawer"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black font-display uppercase tracking-tight text-black">
                Your Bag
              </h2>
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-black transition cursor-pointer"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="bg-neutral-50 px-5 py-3 border-b border-gray-100 shrink-0">
          <div className="flex justify-between text-xs font-bold mb-1.5">
            <span className="text-neutral-700">
              {subtotal >= freeShippingThreshold ? (
                <span className="text-emerald-600 flex items-center gap-1 font-extrabold">
                  <CheckCircle className="w-3.5 h-3.5" /> FREE Express Shipping Unlocked!
                </span>
              ) : (
                <span>
                  Add <strong className="text-black font-black">${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more for Free Shipping
                </span>
              )}
            </span>
            <span className="text-neutral-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-gray-100">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mb-4">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-black uppercase font-display text-neutral-800">
                Your bag is empty
              </h3>
              <p className="text-neutral-500 text-xs mt-1.5 max-w-xs leading-relaxed">
                Your collection needs heat. Explore our curated drop list and add sneakers to your haul.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-black hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl transition shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Start Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="pt-4 first:pt-0 flex gap-4 group"
              >
                {/* Item Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-100 rounded-xl overflow-hidden shrink-0 border border-gray-100 relative">
                  <SneakerImage
                    src={item.product.image}
                    alt={item.product.name}
                    sneakerName={item.product.name}
                    brand={item.product.brand}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <div className="truncate">
                        <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">
                          {item.product.brand}
                        </span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-neutral-900 leading-snug truncate">
                          {item.product.name}
                        </h4>
                      </div>

                      {/* Remove Item Button */}
                      <button
                        onClick={() => onRemoveFromCart(item.product.id, item.size)}
                        className="text-neutral-400 hover:text-red-500 p-1 transition cursor-pointer shrink-0"
                        title="Remove kick"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                        Size: {item.size}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                        <PackageCheck className="w-3.5 h-3.5" /> Deadstock
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-3 pt-1">
                    {/* Quantity Controls [ - ] 1 [ + ] */}
                    <div className="flex items-center border border-gray-200 rounded-lg bg-neutral-50 p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded text-neutral-600 hover:bg-white hover:text-black transition cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-black text-neutral-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded text-neutral-600 hover:bg-white hover:text-black transition cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Line Total */}
                    <div className="text-right">
                      <span className="text-sm font-black text-black tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="block text-[10px] text-neutral-400">
                          (${item.product.price} each)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sticky Drawer Footer with Subtotal & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-200 bg-neutral-50/90 backdrop-blur-xs space-y-3 shrink-0">
            {/* Cost Calculations */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span className="font-bold text-neutral-900 tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Estimated Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-bold uppercase text-[11px]">
                      FREE
                    </span>
                  ) : (
                    <span className="tabular-nums">${shipping.toFixed(2)}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Estimated Taxes (8%)</span>
                <span className="font-bold text-neutral-900 tabular-nums">
                  ${estimatedTax.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-black pt-2 border-t border-gray-200">
                <span>Total</span>
                <span className="text-base text-blue-600 tabular-nums">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Primary Sticky Checkout Button */}
            <button
              onClick={onCheckout}
              className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white py-4 rounded-xl font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2.5 transition-all duration-200 shadow-xl shadow-blue-600/30 group cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Proceed to Checkout</span>
              <span className="bg-blue-700/60 px-2 py-0.5 rounded text-[11px] font-black group-hover:translate-x-1 transition-transform tabular-nums">
                ${orderTotal.toFixed(2)}
              </span>
            </button>

            <p className="text-[10px] text-center text-neutral-400 flex items-center justify-center gap-1.5 pt-1">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              Encrypted 256-bit SSL Checkout with Apple Pay & Klarna
            </p>
          </div>
        )}
      </aside>
    </>
  );
};
