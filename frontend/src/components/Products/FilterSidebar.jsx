import React from 'react';
import { X } from 'lucide-react';

const categories = ['Men', 'Women', 'Kids', 'Accessories', 'Shoes', 'Bags'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Yellow', value: '#F59E0B' },
];

const FilterSidebar = ({ filters, onFiltersChange, onClose }) => {
  const handleCategoryChange = (category) => {
    onFiltersChange({ ...filters, category });
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    onFiltersChange({ ...filters, priceRange: newPriceRange });
  };

  const handleSizeToggle = (size) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFiltersChange({ ...filters, sizes: newSizes });
  };

  const handleColorToggle = (color) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    onFiltersChange({ ...filters, colors: newColors });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6 md:hidden">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">
          <X size={24} />
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === category.toLowerCase()}
                onChange={() => handleCategoryChange(category.toLowerCase())}
                className="mr-2 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-gray-700 dark:text-gray-300">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Price Range</h4>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Min: ${filters.priceRange[0]}</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 dark:text-gray-400">Max: ${filters.priceRange[1]}</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                filters.sizes.includes(size)
                  ? 'border-primary-500 bg-primary-500 text-white'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-500'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Color</h4>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorToggle(color.name)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                filters.colors.includes(color.name)
                  ? 'border-primary-500 scale-110'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => onFiltersChange({
          category: '',
          priceRange: [0, 1000],
          sizes: [],
          colors: [],
          sortBy: 'newest'
        })}
        className="w-full btn-secondary"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
