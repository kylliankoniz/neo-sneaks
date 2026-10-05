import React from 'react';
import { ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-gray-200">
      <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-black">
            100% Verified Authentic
          </h4>
          <p className="text-xs text-neutral-500 mt-0.5">
            Every pair is physically inspected by veteran authenticators.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <Truck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-black">
            Instant Priority Dispatch
          </h4>
          <p className="text-xs text-neutral-500 mt-0.5">
            Pre-verified deadstock shipped within 24 hours.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
          <RefreshCw className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xs font-black uppercase tracking-wider text-black">
            Hassle-Free 14-Day Returns
          </h4>
          <p className="text-xs text-neutral-500 mt-0.5">
            Unworn condition guaranteed with verified tag intact.
          </p>
        </div>
      </div>
    </div>
  );
};
