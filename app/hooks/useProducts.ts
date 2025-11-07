// hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useFeaturedProducts = (limit?: number) => {
  return useQuery({
    queryKey: ["featured-products", limit],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (limit) params.append("limit", limit.toString());

      const response = await api.get(`/products?${params}`);
      return response;
    },
  });
};

export const useFilteredProducts = (filters: any = {}) => {
  return useQuery({
    queryKey: ["filtered-products", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            params.append(key, value.join(","));
          } else if (typeof value === "object") {
            Object.entries(value).forEach(([subKey, subValue]) => {
              if (subValue !== undefined) {
                params.append(
                  `${key}${subKey.charAt(0).toUpperCase() + subKey.slice(1)}`,
                  subValue.toString()
                );
              }
            });
          } else {
            params.append(key, value.toString());
          }
        }
      });

      const response = api.get(`/products?${params}`);
      return response;
    },
  });
};
