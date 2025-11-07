// Définition de l'interface pour le format idéal du composant (très utile pour la sécurité de type)
interface NormalizedProduct {
  category: string;
  name: string;
  vintage: string;
  producer: string;
  volume: string;
  region: string;
  alcohol: string;
  rating: number;
  maxRating: number;
  reviewCount: number;
  description: string;
  originalPrice: number;
  currentPrice: number;
  style: string;
  type: string;
  discount: number;
  imageUrl: string;
  badges: string[];
}

// Interface pour le format d'un produit reçu de l'API
interface ApiProduct {
  id: number;
  nom: string;
  type: string;
  region: string;
  teneur_alcool: string;
  taille_bouteille: string;
  prix: string | null;
  promotion: string | number | null;
  cote: string | number | null;
  millesime: string | number | null;
  description: string | null;
  images: string[];
  note_moyenne: number;
  nombre_avis: number;
  cepages: { nom: string; type: string }[];
  classification: string;
  style: string;
  // ... autres champs
}

// Interface pour la structure complète de la réponse API
interface ApiResponse {
  success: boolean;
  data: ApiProduct[];
  pagination: any;
  message: string;
}

/**
 * Transforme un produit de l'API en un format idéal pour le composant,
 * en ajoutant des données fictives/par défaut si nécessaire.
 * @param product Le produit tel que reçu de l'API.
 * @returns Le produit normalisé.
 */
const normalizeProduct = (product: ApiProduct): NormalizedProduct => {
  // --- Conversion des Prix ---
  // L'API semble renvoyer des prix en chaîne de caractères ou null.
  // On doit les nettoyer et les convertir en nombres.

  const rawPrice = product.prix
    ? parseFloat(
        String(product.prix)
          .replace(/[^0-9.,]/g, "")
          .replace(",", ".")
      )
    : null;

  // Utiliser le prix de base si le prix est null (ou une valeur par défaut)
  const basePrice = rawPrice ?? 15.0;

  // Calcul du prix actuel (si promotion existe, sinon prix de base)
  const rawPromo = product.promotion
    ? parseFloat(String(product.promotion))
    : 0;
  const discountRate = rawPromo > 0 ? rawPromo : 0; // Utiliser la promo réelle si dispo

  // Si le discount est manquant, on peut en définir un fictif pour l'exemple
  const discountValue =
    discountRate > 0 ? discountRate : product.id % 2 === 0 ? 31 : 0; // Fictif: 31% pour les IDs pairs

  const currentPrice = basePrice * (1 - discountValue / 100);

  // --- Données Fictives / Par Défaut ---
  const FAKE_DESCRIPTION =
    "Vin typique de sa région, sélectionné par nos experts pour son excellent rapport qualité-prix.";
  const FAKE_PRODUCER = "Domaine Inconnu";
  const FAKE_MAX_RATING = 20;

  // --- Mapping et application des valeurs par défaut ---
  return {
    category:
      product.type === "vin" ? "Vin de France" : product.type.toUpperCase(), // Fictif: Si vin, utiliser 'Vin de France'
    name: product.nom,
    vintage: String(
      product.millesime ?? new Date().getFullYear() - (product.id % 5)
    ), // Fictif: Année actuelle - (0 à 4 ans)
    producer: FAKE_PRODUCER,
    volume: product.taille_bouteille.replace("cl", " L").toUpperCase(), // 75cl -> 0.75 L
    region: product.region,
    alcohol: `${product.teneur_alcool}% vol`,

    // Notation : Convertir la cote en float ou utiliser une note par défaut
    rating: parseFloat(String(product.cote ?? 15.5)), // Fictif: 15.5/20 si manquant
    maxRating: FAKE_MAX_RATING,
    reviewCount:
      product.nombre_avis > 0 ? product.nombre_avis : (product.id % 10) + 5, // Fictif: entre 5 et 14 avis

    description: product.description || FAKE_DESCRIPTION,
    style: product?.style || "vin_rouge",
    type: product?.type || "vin",
    originalPrice: basePrice,
    currentPrice: parseFloat(currentPrice.toFixed(2)),
    discount: discountValue,

    // Image : Utiliser la première image ou un fallback
    imageUrl:
      product.images.length > 0
        ? product.images[0]
        : "/images/placeholder-vin.png",

    // Badges : Fictif, basé sur la cote ou la promo
    badges:
      product.cote && parseFloat(String(product.cote)) >= 16
        ? ["star-selection", "taster"]
        : discountValue > 0
        ? ["promo-alert"]
        : [],
  };
};

/**
 * Fonction principale pour normaliser la réponse complète de l'API.
 * @param apiResponse La réponse JSON complète de l'API.
 * @returns Le tableau de produits normalisés.
 */
export const normalizeFeaturedProducts = (
  apiResponse: ApiResponse | null | undefined
): NormalizedProduct[] => {
  if (!apiResponse || !apiResponse.data) {
    return [];
  }

  return apiResponse.data.map(normalizeProduct);
};
