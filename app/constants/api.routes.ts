// src/constants/api.routes.ts

/**
 * Endpoints du Megamenu (vos routes Hono)
 */
export const MEGAMENU_ROUTES = {
  BASE: "/megamenu",
  WINE: "/megamenu/win", // Chemin complet de la route que nous avons déboguée
  BEER: "/megamenu/beer",
  SPIRITS: "/megamenu/spirits",
};

export const FILTERS = {
  BASE: "/filters",
};

/**
 * Endpoints d'Authentification
 */
export const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  REFRESH_TOKEN: "/auth/refresh",
};

/**
 * Endpoints des Produits
 */
export const PRODUCT_ROUTES = {
  BASE: "/products",
  DETAIL: (id: number | string) => `/products/${id}`, // Exemple de route dynamique
};
