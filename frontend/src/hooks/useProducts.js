import { useQuery } from 'react-query';
import axios from 'axios';

export const useProducts = (filters = {}) => {
  return useQuery(
    ['products', filters],
    async () => {
      const params = new URLSearchParams();
      
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      
      const response = await axios.get(`/api/products?${params.toString()}`);
      return response.data;
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

export const useProduct = (id) => {
  return useQuery(
    ['product', id],
    async () => {
      const response = await axios.get(`/api/products/${id}`);
      return response.data;
    },
    {
      enabled: !!id,
    }
  );
};
