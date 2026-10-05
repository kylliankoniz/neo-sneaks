import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { Sneaker } from '../data/sneakers';
import { SneakerImage } from './SneakerImage';

interface HeroBannerProps {
  featuredSneaker: Sneaker;
  onQuickCop: (sneaker: Sneaker) => void;
  onExploreDrop: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredSneaker,
  onQuickCop,
  onExploreDrop,
}) => {
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="relative overflow-hidden rounded-3xl bg-neutral-950 text-white p-6 sm:p-10 md:p-14 shadow-2xl">
          
          {/* Subtle grid pattern & ambient lighting */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-500/40 text-blue-300 text-xs font-black uppercase px-3.5 py-1.5 rounded-full tracking-wider shadow-[0_0_15px_rgba(59,130,246,0.35)]">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                FALL / WINTER 2025 HYPER DROP
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight font-display leading-[0.95]">
                ENGINEERED <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-300">
                  FOR THE PAVEMENT.
                </span>
              </h1>
              
              <p className="text-neutral-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
                Discover the rarest grails and groundbreaking silhouettes. High-heat collaborations, certified authentic with lightning-speed checkout.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={onExploreDrop}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-wider px-7 py-3.5 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 active:scale-95 cursor-pointer"
                >
                  Explore Drop
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onQuickCop(featuredSneaker)}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white font-bold uppercase text-xs tracking-wider px-6 py-3.5 rounded-xl border border-neutral-700 hover:border-neutral-500 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  Quick Cop {featuredSneaker.name.split("'")[0]} (${featuredSneaker.price})
                </button>
              </div>
            </div>

            {/* Right Column: Hero Featured Sneaker Floating Showcase */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div
                className="relative group cursor-pointer hero-floating-sneaker transition-all duration-300 w-full max-w-md"
                onClick={() => onQuickCop(featuredSneaker)}
                title="Click to view & add to cart"
              >
                <div className="absolute inset-0 bg-blue-500/25 rounded-2xl filter blur-xl transform group-hover:scale-110 transition-all duration-500" />
                
                <div className="relative z-10 w-full h-64 sm:h-72 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden bg-neutral-900 group-hover:border-blue-500/50 transition-colors">
                  <SneakerImage
                    src={featuredSneaker.image}
                    alt={featuredSneaker.name}
                    sneakerName={featuredSneaker.name}
                    brand={featuredSneaker.brand}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Floating Tag */}
                <div className="absolute -bottom-3 -left-3 z-20 bg-white text-black px-4 py-2 rounded-xl font-black text-xs uppercase tracking-wider shadow-xl flex items-center gap-2 group-hover:scale-105 transition-transform border border-gray-100">
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                  <span>Retro Cyan Edition</span>
                </div>

                <div className="absolute -top-3 -right-3 z-20 bg-blue-600 text-white px-3 py-1.5 rounded-xl font-black text-xs tracking-wider shadow-lg">
                  ${featuredSneaker.price}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
