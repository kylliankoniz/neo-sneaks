import React from 'react';
import { Zap } from 'lucide-react';

interface FooterProps {
  onCategoryClick: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onCategoryClick }) => {
  return (
    <footer className="bg-black text-white mt-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-8 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xl font-black font-display tracking-tight uppercase">
                NEO<span className="text-blue-500">-SNEAKS</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              High-Traction Streetwear E-Commerce Platform. Dedicated to genuine deadstock silhouettes, verified grails, and instant fulfillment.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs font-bold uppercase tracking-wider text-neutral-400">
            <button
              onClick={() => onCategoryClick('Nike')}
              className="hover:text-white transition cursor-pointer"
            >
              Nike
            </button>
            <button
              onClick={() => onCategoryClick('Adidas')}
              className="hover:text-white transition cursor-pointer"
            >
              Adidas
            </button>
            <button
              onClick={() => onCategoryClick('New Balance')}
              className="hover:text-white transition cursor-pointer"
            >
              New Balance
            </button>
            <button
              onClick={() => onCategoryClick('Collaborations')}
              className="hover:text-white transition cursor-pointer"
            >
              Collaborations
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-5">
            <a href="#privacy" className="hover:text-neutral-300 transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-neutral-300 transition">Terms of Service</a>
            <a href="#authenticity" className="hover:text-neutral-300 transition">Authenticity Protocol</a>
            <a href="#status" className="hover:text-neutral-300 transition">Drop System Status</a>
          </div>
          <p>© {new Date().getFullYear()} Neo-Sneaks Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
