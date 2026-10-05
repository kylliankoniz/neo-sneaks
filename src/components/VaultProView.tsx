import React, { useState } from 'react';
import { Shield, Sparkles, Flame, Clock, Lock, CheckCircle2, Award, Zap, ArrowRight } from 'lucide-react';
import { Sneaker } from '../data/sneakers';
import { SneakerImage } from './SneakerImage';

interface VaultProViewProps {
  vaultSneakers: Sneaker[];
  onAddToCart: (sneaker: Sneaker, size: string) => void;
  onQuickView: (sneaker: Sneaker) => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'alert') => void;
}

export const VaultProView: React.FC<VaultProViewProps> = ({
  vaultSneakers,
  onAddToCart,
  onQuickView,
  onShowToast,
}) => {
  const [enteredRaffles, setEnteredRaffles] = useState<Record<string, boolean>>({});

  const handleEnterRaffle = (sneaker: Sneaker) => {
    setEnteredRaffles((prev) => ({ ...prev, [sneaker.id]: true }));
    onShowToast(
      'Raffle Entry Confirmed!',
      `You are registered in the draw for ${sneaker.name}. Winners notified via email.`,
      'success'
    );
  };

  return (
    <div className="space-y-12 animate-fadeIn pb-10">
      
      {/* Vault Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-black text-white p-8 sm:p-12 border border-neutral-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-neutral-800/90 border border-blue-500/40 text-blue-400 text-xs font-black uppercase px-3.5 py-1.5 rounded-full tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>VAULT PRO ALLOCATION // TIER 1 BLACK PASS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-display">
            The Grail Vault
          </h1>

          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
            Reserved exclusively for collectors and verified authenticators. Access unreleased deadstock allocations, historical archive samples, and private member draws with 100% cryptographic authenticity guarantee.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl">
              <CheckCircle2 className="w-4 h-4" /> 0-Bot Anti-Sybil Defense Active
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-300 bg-neutral-900 border border-neutral-700 px-3.5 py-1.5 rounded-xl">
              <Award className="w-4 h-4 text-blue-400" /> RFID Verified Deadstock
            </div>
          </div>
        </div>
      </div>

      {/* Vault Grails Grid */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-black uppercase font-display text-neutral-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Live Allocation Drops & Raffles
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Strictly limited allocation. Limit 1 entry per collector ID.
            </p>
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
            {vaultSneakers.length} Grails Live
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vaultSneakers.map((sneaker) => {
            const hasEntered = enteredRaffles[sneaker.id];

            return (
              <div
                key={sneaker.id}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-street hover:shadow-2xl transition-all duration-300 flex flex-col group relative"
              >
                {/* Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-black/95 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider flex items-center gap-1.5 shadow-md border border-neutral-700">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    VAULT GRAIL
                  </span>
                </div>

                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded-md tracking-wider flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {sneaker.raffleEndsIn || 'Ending Soon'}
                  </span>
                </div>

                {/* Image */}
                <div
                  className="relative w-full h-64 bg-neutral-100 overflow-hidden cursor-pointer"
                  onClick={() => onQuickView(sneaker)}
                >
                  <SneakerImage
                    src={sneaker.image}
                    alt={sneaker.name}
                    sneakerName={sneaker.name}
                    brand={sneaker.brand}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center">
                    <span className="bg-black/80 px-2.5 py-1 rounded-lg backdrop-blur-md">
                      Only {sneaker.allocationLeft || 1} Pair Left
                    </span>
                    <span className="underline hover:text-blue-400">View Specs</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-[11px] font-black uppercase text-blue-600 mb-1">
                      <span>{sneaker.brand}</span>
                      <span className="text-neutral-400 font-semibold">{sneaker.category}</span>
                    </div>

                    <h3 className="text-base font-black font-display uppercase tracking-tight text-neutral-900 group-hover:text-blue-600 transition-colors">
                      {sneaker.name}
                    </h3>

                    <p className="text-xs text-neutral-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {sneaker.description}
                    </p>
                  </div>

                  {/* Pricing & Raffle Actions */}
                  <div className="pt-3 border-t border-gray-100 space-y-3">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                          Vault Market Value
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black font-display text-neutral-900">
                            ${sneaker.price}
                          </span>
                          {sneaker.originalPrice && (
                            <span className="text-xs text-neutral-400 line-through">
                              ${sneaker.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        Physical Tagged
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleEnterRaffle(sneaker)}
                        disabled={hasEntered}
                        className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 ${
                          hasEntered
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default'
                            : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300'
                        }`}
                      >
                        {hasEntered ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Entered</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-3.5 h-3.5 text-blue-600" />
                            <span>Free Draw</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onAddToCart(sneaker, sneaker.sizes[0] || 'US 10')}
                        className="py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition cursor-pointer shadow-md shadow-blue-600/20 flex items-center justify-center gap-1"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Instant Buy</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Vault Authenticity Protocol Panel */}
      <div className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 border border-neutral-800">
        <h3 className="text-sm font-black uppercase font-display tracking-wider text-blue-400 mb-2 flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-400" />
          The 4-Point Vault Deadstock Verification Protocol
        </h3>
        <p className="text-xs text-neutral-400 mb-6">
          Every Vault pair is subjected to forensic inspection in our humidity-controlled secure facility before being sealed in tamper-proof cryptographic casings.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-neutral-800/80 rounded-2xl border border-neutral-700">
            <span className="font-black text-white block mb-1">01. Spectrometry Analysis</span>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Material composition and polymer densities matched against OEM molecular profiles.
            </p>
          </div>
          <div className="p-4 bg-neutral-800/80 rounded-2xl border border-neutral-700">
            <span className="font-black text-white block mb-1">02. Blacklight Stitch Inspection</span>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              UV luminescence scan verifying factory thread weight, guide lines, and dye baths.
            </p>
          </div>
          <div className="p-4 bg-neutral-800/80 rounded-2xl border border-neutral-700">
            <span className="font-black text-white block mb-1">03. Micro-Weight Tolerance</span>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Precision gram measurements conforming to authentic production run variance.
            </p>
          </div>
          <div className="p-4 bg-neutral-800/80 rounded-2xl border border-neutral-700">
            <span className="font-black text-white block mb-1">04. NFC RFID Laser Seal</span>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Physical immutable chip embedded on the left sneaker lace hole with unique serial.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
