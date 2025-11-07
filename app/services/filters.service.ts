// services/megamenu.service.ts
import api from "../api/api";
import { FILTERS } from "../constants/api.routes";

// La fonction de récupération doit juste retourner la Promesse des données
export const getFilters = async () => {
  const response = await api.get(FILTERS.BASE);
  return response.data;
};
