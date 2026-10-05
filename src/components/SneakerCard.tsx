import React, { useState } from 'react';
import { Plus, Check, Heart, Eye } from 'lucide-react';
import { Sneaker } from '../data/sneakers';
import { SneakerImage } from './SneakerImage';

interface SneakerCardProps {
  sneaker: Sneaker;
  onAddToCart: (sneaker: Sneaker, size: string) => void;
  onQuickView: (sneaker: Sneaker) => void;
  isSaved?: boolean;
  onToggleSaved?: (sneaker: Sneaker) => void;
}

export const SneakerCard: React.FC<SneakerCardProps> = ({
  sneaker,
  onAddToCart,
  onQuickView,
  isSaved = false,
  onToggleSaved,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(sneaker.sizes[2] || 'US 10');
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isHot =
    sneaker.tag === 'HOT DROP' ||
    sneaker.tag === 'TRENDING' ||
    sneaker.tag === 'RESTOCK' ||
    sneaker.tag === 'HIGH DEMAND';

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(sneaker, selectedSize);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1200);
  };

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-street hover:shadow-2xl transition-all duration-300 flex flex-col group relative cursor-pointer"
      onClick={() => onQuickView(sneaker)}
    >
      {/* Top Badges & Saved Button */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
        <span
          className={`backdrop-blur-sm text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider flex items-center gap-1.5 ${
            isHot
              ? 'bg-black/90 ring-1 ring-blue-500/50 shadow-md'
              : 'bg-black/90'
          }`}
        >
          {isHot && (
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          )}
          {sneaker.tag}
        </span>
      </div>

      {/* Wishlist Heart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleSaved?.(sneaker);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-xs text-neutral-600 hover:text-red-500 hover:bg-white shadow-sm transition-all active:scale-90"
        title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        aria-label="Save sneaker"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isSaved ? 'text-red-500 fill-red-500' : ''
          }`}
        />
      </button>

      {/* Image Container with Zoom effect */}
      <div className="relative w-full h-60 bg-neutral-100 overflow-hidden">
        <SneakerImage
          src={sneaker.image}
          alt={sneaker.name}
          sneakerName={sneaker.name}
          brand={sneaker.brand}
          className="w-full h-full object-cover object-center group-hover:scale-110 group-hover:-rotate-1 transition-all duration-500 ease-out"
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Quick View hint */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
          <span className="bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>

        {/* Quick Size Selector Pills on Hover */}
        <div className="absolute bottom-2 inset-x-2 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-10">
          {sneaker.sizes.slice(0, 5).map((size) => (
            <button
              key={size}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize(size);
              }}
              className={`text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md transition-all cursor-pointer ${
                selectedSize === size
                  ? 'bg-blue-600 text-white shadow-sm ring-1 ring-white/50'
                  : 'bg-white/90 text-black hover:bg-white'
              }`}
            >
              {size.replace('US ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand name */}
          <div className="flex justify-between items-center mb-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 font-sans">
              {sneaker.brand}
            </span>
            <span className="text-[11px] font-semibold text-neutral-400">
              {sneaker.category}
            </span>
          </div>

          {/* Shoe name */}
          <h3 className="text-base font-extrabold text-neutral-900 font-display uppercase tracking-tight group-hover:text-blue-600 transition-colors line-clamp-1">
            {sneaker.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-2 mt-1.5 font-normal leading-relaxed">
            {sneaker.description}
          </p>
        </div>

        {/* Price Tag & Add to Cart Button */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-neutral-400 block uppercase tracking-wider">
              Price
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-neutral-900 font-display">
                ${sneaker.price}
              </span>
              {sneaker.originalPrice && (
                <span className="text-xs text-neutral-400 line-through font-semibold">
                  ${sneaker.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Prominent "Add to Cart" button with smooth transition */}
          <button
            onClick={handleAdd}
            className={`flex-1 px-4 py-2.5 rounded-xl font-black uppercase text-xs tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-md active:scale-95 cursor-pointer ${
              isAddedRecently
                ? 'bg-emerald-600 text-white'
                : 'bg-black hover:bg-blue-600 text-white hover:shadow-pop'
            }`}
            aria-label={`Add ${sneaker.name} to cart`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-4 h-4 text-white animate-bounce" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-300" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
