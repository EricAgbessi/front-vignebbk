// utils/dataMapper.ts
export const mapLegacyToNewProps = (legacyData: any) => {
  return {
    id: Date.now(), // ou générer un ID unique
    nom: legacyData.name,
    type: legacyData.category.includes("Vin")
      ? "vin"
      : legacyData.category.includes("Champagne")
      ? "champagne"
      : "cognac",
    cat_gorie: legacyData.category,
    region: legacyData.region,
    domaine: legacyData.producer,
    teneur_alcool: parseFloat(legacyData.alcohol),
    taille_bouteille: legacyData.volume,
    prix: legacyData.originalPrice,
    promotion: legacyData.discount,
    millesime: parseInt(legacyData.vintage) || undefined,
    description: legacyData.description,
    quantit__stock: 50, // Valeur par défaut
    style: legacyData.style,
    images: [legacyData.imageUrl],
    note_moyenne: (legacyData.rating / legacyData.maxRating) * 5,
    nombre_avis: legacyData.reviewCount,
    // Gestion des badges
    bio: legacyData.badges.includes("bio"),
    v_g_talien: legacyData.badges.includes("vegetalien"),
  };
};

export interface SlideItem {
  id: number;
  bg: string;
  title: string;
  subtitle: string;
  desc: string;
  discount: string;
  button: string;
  type: string;
  category: string;
}

export interface WineType {
  label: string;
  icon: string;
}
