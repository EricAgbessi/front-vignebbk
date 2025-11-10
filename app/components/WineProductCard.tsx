// components/WineProductCard.tsx
import React, { useState, useRef, useEffect, Suspense } from "react";
import {
  FaArrowsAlt,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaHeart,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import { FaRotate } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { SimpleModelViewer, ThreeJSViewer } from "./ThreeJSViewer";
import Image from "next/image";

// Composant principal WineProductCard
interface WineProductCardProps {
  id?: number;
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
  images?: string[];
  note_moyenne?: number;
  nombre_avis?: number;
  modele3D?: string;
  modeleType?: "gltf" | "glb" | "obj" | "fbx";
}

const WineProductCard: React.FC<WineProductCardProps> = ({
  id,
  nom,
  type,
  cat_gorie,
  region,
  domaine,
  appellation,
  teneur_alcool,
  taille_bouteille = "75cl",
  prix,
  promotion,
  style,
  cote,
  millesime,
  description,
  caract_ristiques,
  bio,
  v_g_talien,
  quantit__stock = 0,
  images = [],
  note_moyenne = 0,
  nombre_avis = 0,
  modele3D = "wine.glb",
  modeleType = "gltf",
}) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [show3DModel, setShow3DModel] = useState(false);
  const [is3DLoading, setIs3DLoading] = useState(false);
  const [threeJSError, setThreeJSError] = useState(false);

  // Fonction pour formater le prix
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
    }).format(price);
  };

  // Calcul du prix après promotion
  const currentPrice = promotion ? prix * (1 - promotion / 100) : prix;

  // Gestion du carrousel d'images
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      images.length > 0 ? (prev + 1) % images.length : 0
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      images.length > 0 ? (prev - 1 + images.length) % images.length : 0
    );
  };

  // Gestion de l'affichage 3D
  const handle3DView = () => {
    if (!modele3D) return;

    setIs3DLoading(true);
    setThreeJSError(false);
    setShow3DModel(true);
  };

  const handle3DLoad = () => {
    setIs3DLoading(false);
  };

  const handle3DError = (error: Error) => {
    console.error("3D Error:", error);
    setIs3DLoading(false);
    setThreeJSError(true);
  };

  const close3DModel = () => {
    setShow3DModel(false);
    setIs3DLoading(false);
    setThreeJSError(false);
  };

  // Couleur de catégorie selon le type
  const getCategoryColor = (productType: string, style?: string) => {
    switch (productType?.toLowerCase()) {
      case "vin":
        if (style === "vin_rouge") return "bg-[#810b15]";
        else if (style === "vin_rose") return "bg-[#c97442]";
        else return "bg-[#DCC22C]";
      case "champagne":
        return "bg-amber-600";
      case "cognac":
        return "bg-amber-800";
      default:
        return "bg-[#810b15]";
    }
  };

  // Texte de catégorie formaté
  const getCategoryText = (productType: string, category?: string) => {
    const baseType =
      productType?.charAt(0).toUpperCase() + productType?.slice(1);
    if (category && category !== productType) {
      return `${baseType} • ${category}`;
    }
    return baseType;
  };

  return (
    <>
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-xl shadow-lg overflow-hidden transform hover:shadow-xl transition-all duration-300 border border-zinc-200 dark:border-zinc-800 hover:scale-[1.01]">
        {/* --- En-tête de Catégorie --- */}
        <div
          className={`${getCategoryColor(
            type,
            style
          )} text-white text-center py-2 font-bold text-sm font-cavas`}
        >
          {getCategoryText(type, cat_gorie)}
        </div>

        <div className="p-4">
          <div className="flex flex-row space-x-4">
            {/* --- COLONNE GAUCHE : PHOTO --- */}
            <div className="w-2/5 flex-shrink-0">
              <div className="relative">
                {/* Boutons Carrousel */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 rounded-full text-white z-10 hover:bg-opacity-70 transition-colors"
                    >
                      <FaChevronLeft size={12} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 rounded-full text-white z-10 hover:bg-opacity-70 transition-colors"
                    >
                      <FaChevronRight size={12} />
                    </button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-1 left-1 flex flex-wrap gap-1 z-10">
                  {bio && (
                    <div className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                      BIO
                    </div>
                  )}
                  {v_g_talien && (
                    <div className="bg-purple-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                      VÉGÉ
                    </div>
                  )}
                  {promotion && promotion > 0 && (
                    <div className="bg-red-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                      -{promotion}%
                    </div>
                  )}
                  {modele3D && (
                    <div className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium flex items-center">
                      <FaExpand size={8} className="mr-1" />
                      3D
                    </div>
                  )}
                </div>

                {/* Note moyenne */}
                {(note_moyenne > 0 || cote) && (
                  <div className="absolute top-1 right-1 bg-yellow-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold flex items-center">
                    <FaStar size={8} className="mr-0.5" />
                    {cote ? `${cote}/20` : `${note_moyenne.toFixed(1)}`}
                  </div>
                )}

                {/* Image du Produit */}
                <div
                  className={`w-full h-full bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer group relative ${
                    modele3D
                      ? "hover:shadow-lg transition-all duration-300"
                      : ""
                  }`}
                  onClick={handle3DView}
                >
                  {images.length > 0 ? (
                    <>
                      <img
                        src={images[currentImageIndex]}
                        alt={nom}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Overlay 3D */}
                      {modele3D && (
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                          <div className="bg-white bg-opacity-90 rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                            <FaExpand className="text-[#810b15]" size={18} />
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <span className="text-zinc-400 dark:text-zinc-500 text-xs">
                      Image non disponible
                    </span>
                  )}
                </div>

                {/* Indicateurs de carrousel */}
                {images.length > 1 && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-white scale-125"
                            : "bg-white bg-opacity-50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* --- COLONNE DROITE : INFORMATIONS --- */}
            <div className="w-3/5 flex flex-col">
              {/* En-tête avec nom et favori */}
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-base font-bold text-zinc-900 dark:text-white leading-tight font-cavas pr-6">
                  {nom}
                </h2>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex-shrink-0 transition-colors ${
                    isFavorite
                      ? "text-[#810b15]"
                      : "text-gray-400 hover:text-[#810b15]"
                  }`}
                >
                  <FaHeart size={16} />
                </button>
              </div>

              {/* Millésime et Domaine */}
              {millesime && (
                <p className="text-xs font-semibold text-[#810b15] dark:text-[#810b15] mb-1">
                  Millésime {millesime}
                </p>
              )}

              {domaine && (
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">
                  {domaine}
                </p>
              )}

              {/* Appellation et Région */}
              {appellation ? (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                  {appellation}, {region}
                </p>
              ) : (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                  {region}
                </p>
              )}

              {/* Notation et avis */}
              {nombre_avis > 0 && (
                <div className="flex items-center space-x-2 mb-2 bg-zinc-50 dark:bg-zinc-800 p-1.5 rounded-md">
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-yellow-500" size={12} />
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">
                      {cote ? `${cote}/20` : `${note_moyenne.toFixed(1)}/5`}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-600 dark:text-zinc-400">
                    ({nombre_avis} avis)
                  </span>
                </div>
              )}

              {/* Description Courte */}
              {(description || caract_ristiques) && (
                <p className="text-xs text-zinc-700 dark:text-zinc-300 mb-2 line-clamp-2 leading-relaxed">
                  {description || caract_ristiques}
                </p>
              )}

              {/* Infos techniques */}
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 space-y-0.5 mb-3">
                {teneur_alcool && (
                  <div>
                    <strong>Alcool:</strong> {teneur_alcool}% vol
                  </div>
                )}
                <div>
                  <strong>Format:</strong> {taille_bouteille}
                </div>
                {quantit__stock > 0 ? (
                  <div className="text-green-600 font-medium">
                    <strong>Stock:</strong> {quantit__stock} disponibles
                  </div>
                ) : (
                  <div className="text-red-600 font-medium">
                    Rupture de stock
                  </div>
                )}
              </div>

              {/* --- Section Prix & Actions --- */}
              <div className="mt-auto pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  {/* Bloc Prix */}
                  <div className="flex flex-col">
                    {promotion && promotion > 0 && (
                      <div className="flex items-center space-x-1 mb-0.5">
                        <span className="bg-[#810b15] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          -{promotion}%
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 line-through">
                          {formatPrice(prix)}
                        </span>
                      </div>
                    )}
                    <span className="text-lg font-extrabold text-zinc-900 dark:text-white">
                      {formatPrice(currentPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bloc Quantité & Ajouter */}
          <div className="flex justify-between w-full space-x-1.5">
            {/* Sélecteur de Quantité */}
            <div className="relative">
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                disabled={quantit__stock === 0}
                className="appearance-none block w-12 h-8 px-1 py-1 border border-zinc-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white pr-4 text-xs text-center font-medium focus:outline-none focus:ring-1 focus:ring-[#810b15] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {[...Array(Math.min(6, quantit__stock || 1))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <IoIosArrowDown
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-zinc-500 dark:text-zinc-400 pointer-events-none"
                size={10}
              />
            </div>

            {/* Bouton Ajouter */}
            <button
              disabled={quantit__stock === 0}
              className="bg-[#810b15] text-white px-3 py-1 rounded-md font-semibold hover:bg-[#6a0912] transition-colors h-8 disabled:opacity-50 disabled:cursor-not-allowed font-cavas text-xs min-w-[80px]"
            >
              {quantit__stock === 0 ? "Rupture" : "Ajouter"}
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL 3D AVEC THREE.JS --- */}
      {show3DModel && modele3D && (
        <div className="fixed inset-0 bg-black/80 dark:bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white dark:bg-zinc-900 rounded-xl overflow-hidden flex flex-col shadow-2xl">
            {/* En-tête */}
            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Vue 3D Interactive - {nom}
                </h3>
                <p className="text-sm text-gray-600 dark:text-zinc-400">
                  {domaine && `${domaine} - `}
                  {millesime && `Millésime ${millesime}`}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {/* Instructions */}
                <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600 dark:text-zinc-300">
                  <div className="flex items-center space-x-1">
                    <FaRotate
                      size={12}
                      className="text-gray-500 dark:text-zinc-400"
                    />
                    <span>Tourner</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaArrowsAlt
                      size={12}
                      className="text-gray-500 dark:text-zinc-400"
                    />
                    <span>Zoomer</span>
                  </div>
                </div>
                <button
                  onClick={close3DModel}
                  className="text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>

            {/* Conteneur 3D */}
            <div className="flex-1 relative min-h-[500px] bg-gray-100 dark:bg-zinc-900">
              {is3DLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#810b15] mx-auto mb-4"></div>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      Chargement du modèle 3D...
                    </p>
                    <p className="text-sm text-gray-600 dark:text-zinc-400 mt-2">
                      Veuillez patienter
                    </p>
                  </div>
                </div>
              )}

              {threeJSError ? (
                <SimpleModelViewer modelUrl={modele3D} />
              ) : (
                <ThreeJSViewer
                  modelUrl={"/3D/wine.glb"}
                  modelType={"glb"}
                  onLoad={handle3DLoad}
                  onError={handle3DError}
                />
              )}
            </div>

            {/* Footer avec informations */}
            <div className="p-3 bg-gray-50 dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700">
              <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                <div className="flex items-center space-x-4 mb-2 md:mb-0 text-gray-600 dark:text-zinc-400">
                  <span className="flex items-center space-x-1">
                    <span>🎮</span>
                    <span>Navigation souris</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>✨</span>
                    <span>Qualité HD</span>
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-zinc-500">
                  Modèle 3D chargé depuis {modeleType.toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WineProductCard;
