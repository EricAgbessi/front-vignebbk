import axios from "axios";
import { API_BASE_URL } from "../config/api.config";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Récupérer le token depuis le stockage (Cookies, localStorage, etc.)
    const token = localStorage.getItem("authToken");

    if (token) {
      // Si un token existe, l'ajouter à l'en-tête Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Exemple : Gérer le code 401 (Non autorisé/Token expiré)
    if (error.response && error.response.status === 401) {
      console.error("Token expiré ou non valide. Déconnexion...");
      // Logique pour déconnecter l'utilisateur ou rediriger vers la page de connexion
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
