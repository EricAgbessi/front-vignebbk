// services/megamenu.service.ts
import api from "../api/api";
import { PRODUCT_ROUTES } from "../constants/api.routes";

// La fonction de récupération doit juste retourner la Promesse des données
export const getFeateredProduct = async () => {
  const response = await api.get(PRODUCT_ROUTES.BASE);
  return response.data;
};

export const getFilteredProduct = (filters: any = {}) => {
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
};
