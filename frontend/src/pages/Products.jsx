import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Products/ProductCard';
import FilterSidebar from '../components/Products/FilterSidebar';
import { useProducts } from '../hooks/useProducts';
import { Filter, Grid, List } from 'lucide-react';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    sizes: [],
    colors: [],
    sortBy: 'newest'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const { data: products, isLoading, error } = useProducts(filters);

  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
    if (search) {
      // Handle search functionality
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-red-500">Error loading products: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-600 mt-2">
            {products?.length || 0} products found
          </p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* View Toggle */}
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'text-gray-600'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'text-gray-600'}`}
            >
              <List size={20} />
            </button>
          </div>

          {/* Sort */}
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowFilters(true)}
            className="md:hidden flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2"
          >
            <Filter size={20} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
          <FilterSidebar 
            filters={filters} 
            onFiltersChange={setFilters}
            onClose={() => setShowFilters(false)}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                  <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                  <div className="bg-gray-300 h-4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-4 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-6'
            }`}>
              {products?.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}

          {!isLoading && (!products || products.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;