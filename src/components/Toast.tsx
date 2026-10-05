import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'alert';
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce sm:animate-none">
      <div className="bg-black/95 text-white p-4 rounded-2xl shadow-2xl flex items-start gap-3 border border-neutral-700 backdrop-blur-md">
        <div className="shrink-0 mt-0.5">
          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-blue-400" />
          )}
          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-sky-400" />
          )}
          {toast.type === 'alert' && (
            <AlertCircle className="w-5 h-5 text-amber-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-black uppercase tracking-wider text-white">
            {toast.title}
          </p>
          {toast.description && (
            <p className="text-[11px] text-neutral-300 mt-0.5 leading-snug">
              {toast.description}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-white p-0.5 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
