import React, { useState } from 'react';
import { X, Plus, ShieldCheck, Check, Truck, RotateCcw } from 'lucide-react';
import { Sneaker } from '../data/sneakers';
import { SneakerImage } from './SneakerImage';

interface QuickViewModalProps {
  sneaker: Sneaker | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (sneaker: Sneaker, size: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  sneaker,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('US 10');
  const [justAdded, setJustAdded] = useState(false);

  if (!isOpen || !sneaker) return null;

  const handleAdd = () => {
    onAddToCart(sneaker, selectedSize);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-gray-100 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-black transition cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Sneaker Preview Image */}
          <div className="relative rounded-2xl overflow-hidden bg-neutral-100 h-72 sm:h-96 border border-gray-200">
            <SneakerImage
              src={sneaker.image}
              alt={sneaker.name}
              sneakerName={sneaker.name}
              brand={sneaker.brand}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider">
              {sneaker.tag}
            </div>
          </div>

          {/* Details & Size Selection */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-blue-600">
                <span>{sneaker.brand}</span>
                <span className="text-neutral-400 font-semibold">{sneaker.category}</span>
              </div>

              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-neutral-900 mt-1">
                {sneaker.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-2xl font-black font-display text-black">
                  ${sneaker.price}
                </span>
                {sneaker.originalPrice && (
                  <span className="text-sm text-neutral-400 line-through font-semibold">
                    ${sneaker.originalPrice}
                  </span>
                )}
                <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded ml-2">
                  Verified In Stock
                </span>
              </div>

              <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                {sneaker.description}
              </p>

              {/* Size Selector */}
              <div className="mt-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-neutral-800">
                    Select Size
                  </span>
                  <span className="text-[11px] text-blue-600 font-bold hover:underline cursor-pointer">
                    Size Guide
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {sneaker.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-1 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-black bg-black text-white shadow-md'
                          : 'border-gray-200 bg-neutral-50 text-neutral-800 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tech Specs */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Colorway</span>
                  <span className="font-semibold text-neutral-800">{sneaker.colorway}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">SKU</span>
                  <span className="font-mono text-neutral-800">{sneaker.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Materials</span>
                  <span className="font-semibold text-neutral-800 text-right truncate max-w-[200px]">{sneaker.materials}</span>
                </div>
              </div>
            </div>

            {/* Buy CTA */}
            <div className="pt-4 border-t border-gray-100">
              <button
                onClick={handleAdd}
                className={`w-full py-3.5 rounded-xl font-black uppercase text-xs tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                  justAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Bag ({selectedSize})
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" /> Add to Bag • ${sneaker.price}
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-400 mt-2.5">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Authenticity Guaranteed
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-blue-600" /> Fast Courier
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3 h-3 text-neutral-500" /> 14-Day Returns
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
