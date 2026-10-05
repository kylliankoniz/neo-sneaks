import React from 'react';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  itemCountsByCategory: Record<string, number>;
  totalCount: number;
  itemCount: number;
  sortOrder: 'featured' | 'price-low' | 'price-high';
  onSortChange: (order: 'featured' | 'price-low' | 'price-high') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  itemCountsByCategory,
  totalCount,
  itemCount,
  sortOrder,
  onSortChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
      
      {/* Category Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        <span className="text-xs font-black uppercase tracking-wider text-neutral-400 mr-2 flex items-center gap-1.5 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Brand:
        </span>
        
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          const count = category === 'All' ? totalCount : itemCountsByCategory[category] || 0;

          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-black text-white shadow-md shadow-black/10 scale-100'
                  : 'bg-white text-neutral-600 hover:bg-neutral-100 hover:text-black border border-gray-200'
              }`}
            >
              <span>{category}</span>
              <span className={`text-[10px] ${isActive ? 'text-neutral-400' : 'text-neutral-400'}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Sorting Dropdown & Items Count */}
      <div className="flex items-center justify-between md:justify-end gap-3 text-xs font-bold shrink-0">
        <span className="text-neutral-500">
          Showing <strong className="text-black font-extrabold">{itemCount}</strong> items
        </span>
        
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-neutral-400 uppercase text-[10px] tracking-wider hidden sm:inline">
            Sort:
          </span>
          <select
            value={sortOrder}
            onChange={(e) => onSortChange(e.target.value as 'featured' | 'price-low' | 'price-high')}
            className="bg-transparent font-bold text-neutral-800 text-xs focus:outline-none cursor-pointer pr-1"
          >
            <option value="featured">Featured Grails</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

    </div>
  );
};
