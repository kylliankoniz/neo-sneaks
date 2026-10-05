import React, { useState } from 'react';

interface SneakerImageProps {
  src: string;
  alt: string;
  className?: string;
  sneakerName?: string;
  brand?: string;
}

export const SneakerImage: React.FC<SneakerImageProps> = ({
  src,
  alt,
  className = '',
  sneakerName = 'Grail Sneaker',
  brand = 'NEO-SNEAKS',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        className={`w-full h-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:12px_12px] opacity-20" />
        
        {/* Stylized Sneaker SVG Silhouette */}
        <svg
          viewBox="0 0 100 60"
          className="w-3/4 h-auto max-h-32 text-blue-500/80 drop-shadow-[0_10px_20px_rgba(59,130,246,0.3)] transition-transform duration-300"
          fill="currentColor"
        >
          <path d="M12 44 C 18 44, 25 43, 34 43 C 44 43, 52 44, 65 44 C 76 44, 88 42, 92 37 C 94 34, 93 30, 89 27 C 84 23, 76 20, 68 20 C 63 20, 59 16, 52 12 C 47 9, 41 8, 35 10 C 31 11, 28 15, 27 21 C 24 23, 21 26, 17 30 C 13 34, 11 39, 12 44 Z" opacity="0.9" />
          <path d="M10 46 C 25 46, 75 46, 92 41 C 93 42, 93 44, 91 46 C 82 51, 60 52, 38 52 C 22 52, 12 50, 10 46 Z" fill="#3B82F6" />
          <circle cx="36" cy="22" r="2" fill="#FFFFFF" />
          <circle cx="43" cy="24" r="2" fill="#FFFFFF" />
          <circle cx="50" cy="26" r="2" fill="#FFFFFF" />
        </svg>

        <div className="relative z-10 mt-2 text-center">
          <span className="text-[10px] font-black tracking-widest uppercase text-blue-400 block font-display">
            {brand}
          </span>
          <span className="text-xs font-bold text-neutral-300 truncate max-w-[180px] block">
            {sneakerName}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden bg-neutral-100 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
            Loading...
          </span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover object-center transition-all duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
