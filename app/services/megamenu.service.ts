// services/megamenu.service.ts
import api from "../api/api";
import { MEGAMENU_ROUTES } from "../constants/api.routes";

// La fonction de récupération doit juste retourner la Promesse des données
export const getMegaMenu = async () => {
  const response = await api.get(MEGAMENU_ROUTES.BASE);
  return response.data;
};
