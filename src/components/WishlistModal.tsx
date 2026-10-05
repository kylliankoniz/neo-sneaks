import React from 'react';
import { X, Heart, Plus, Trash2 } from 'lucide-react';
import { Sneaker } from '../data/sneakers';
import { SneakerImage } from './SneakerImage';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedSneakers: Sneaker[];
  onRemoveSaved: (sneaker: Sneaker) => void;
  onAddToCart: (sneaker: Sneaker, size: string) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  savedSneakers,
  onRemoveSaved,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-gray-100 relative p-6 sm:p-7">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-red-500" />
            </div>
            <div>
              <h3 className="text-base font-black uppercase font-display text-black">
                Saved Grails
              </h3>
              <p className="text-[11px] font-semibold text-neutral-400">
                {savedSneakers.length} {savedSneakers.length === 1 ? 'pair' : 'pairs'} watchlisted
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="mt-4 divide-y divide-gray-100 max-h-[50vh] overflow-y-auto">
          {savedSneakers.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-neutral-700">No saved kicks yet</p>
              <p className="text-xs text-neutral-400 mt-1">
                Tap the heart on any sneaker card to keep track of upcoming grails.
              </p>
            </div>
          ) : (
            savedSneakers.map((sneaker) => (
              <div key={sneaker.id} className="py-3.5 flex items-center gap-3.5">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-gray-100">
                  <SneakerImage
                    src={sneaker.image}
                    alt={sneaker.name}
                    sneakerName={sneaker.name}
                    brand={sneaker.brand}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-black uppercase text-blue-600 block">
                    {sneaker.brand}
                  </span>
                  <h4 className="text-xs font-bold text-neutral-900 truncate">
                    {sneaker.name}
                  </h4>
                  <span className="text-xs font-black text-black">
                    ${sneaker.price}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onAddToCart(sneaker, 'US 10');
                      onRemoveSaved(sneaker);
                    }}
                    className="p-2 bg-black hover:bg-blue-600 text-white rounded-xl transition cursor-pointer"
                    title="Move to cart"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveSaved(sneaker)}
                    className="p-2 text-neutral-400 hover:text-red-500 rounded-xl hover:bg-neutral-100 transition cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
