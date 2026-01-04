import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export interface Product {
  id: number;
  nom: string;
  type: string;
  cat_gorie?: string;
  region: string;
  domaine?: string;
  appellation?: string;
  teneur_alcool?: number;
  taille_bouteille?: string;
  prix: number;
  promotion?: number;
  cote?: number;
  style?: string;
  millesime?: number;
  description?: string;
  caract_ristiques?: string;
  bio?: boolean;
  v_g_talien?: boolean;
  quantit__stock?: number;
  images: string[];
  note_moyenne: number;
  nombre_avis: number;
  modele3D?: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface FilteredProductsResponse {
  success: boolean;
  data: Product[];
  pagination: Pagination;
  message: string;
}

export const useFeaturedProducts = (limit: number = 12) => {
  return useQuery({
    queryKey: ["featured-products", limit],
    queryFn: async () => {
      const response = await api.get<{ data: Product[] }>(`/products/featured`, {
        params: { limit },
      });
      return response.data.data;
    },
  });
};

export const useFilteredProducts = (filters: Record<string, any> = {}) => {
  return useQuery({
    queryKey: ["filtered-products", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            if (value.length > 0) params.append(key, value.join(","));
          } else if (typeof value === "object") {
            Object.entries(value).forEach(([subKey, subValue]) => {
              if (subValue !== undefined && subValue !== null) {
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

      const response = await api.get<FilteredProductsResponse>(`/products?${params}`);
      return response.data;
    },
  });
};

export const useProductById = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await api.get<{ data: Product }>(`/products/${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
};
