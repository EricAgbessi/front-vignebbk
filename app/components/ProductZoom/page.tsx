// app/vins/produit/[id]/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import {
  BiCalendar,
  BiHeart,
  BiMapPin,
  BiMinus,
  BiPlus,
  BiShield,
  BiWine,
  BiStar,
} from "react-icons/bi";
import { CiShare2 } from "react-icons/ci";
import { SiTarget } from "react-icons/si";
import { LuGrape } from "react-icons/lu";
import { CgShoppingCart } from "react-icons/cg";
import { BsTruck, BsFire, BsStarFill } from "react-icons/bs";
import { FiRotateCcw, FiChevronRight } from "react-icons/fi";
import { TbBottle } from "react-icons/tb";

// Types pour la structure des données
interface Region {
  id: number;
  nom: string;
  pays: string;
}

interface Domaine {
  id: number;
  nom: string;
  propri_taire?: string;
  ann_e_fondation?: number | null;
  description?: string | null;
}

interface Classification {
  id: number;
  nom: string;
  niveau: string;
}

interface Cepage {
  id: number;
  nom: string;
  type: string;
  produit_cepages: {
    pourcentage?: string;
    ordre_m_lange: number;
    role_m_lange: string;
  };
}

interface ProduitImage {
  id: number;
  url: string;
  texte_alternatif: string;
  ordre_affichage: number;
}

interface AvisClient {
  id: number;
  note: number;
  commentaire: string;
  cr___le: string;
  utilisateurs: {
    nom: string;
    pr_nom: string;
  };
}

interface ProductData {
  id: number;
  nom: string;
  description: string;
  caracteristiques: string;
  conseils_degustation: string;
  appellation: string;
  teneur_alcool: string;
  temperature_service: string;
  taille_bouteille: string;
  prix: number;
  promotion: number | null;
  millesime: number | null;
  garde_jusqua: number | null;
  allergenes: string;
  disponible: boolean;
  quantite_stock: number;
  bio: boolean;
  vegetalien: boolean;
  note_moyenne: number | null;
  nombre_avis: number;
  nombre_favoris: number;
  regions: Region;
  domaines: Domaine;
  classifications: Classification;
  produit_cepages: Array<{
    cepages: Cepage;
    pourcentage: string;
    ordre_m_lange: number;
  }>;
  produit_images: ProduitImage[];
  avis_clients: AvisClient[];
}

// Composant Rating avec étoiles
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <BsStarFill
          key={star}
          className={`w-4 h-4 ${
            star <= Math.floor(rating)
              ? "text-yellow-400"
              : star - 0.5 <= rating
              ? "text-yellow-300"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium text-gray-700">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

// Composant Caractéristique
const CharacteristicItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="flex-shrink-0 mr-3 text-red-600">{icon}</div>
    <div className="flex-grow">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  </div>
);

// Composant Avis
const ReviewItem = ({ review }: { review: AvisClient }) => (
  <div className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
    <div className="flex justify-between items-start mb-2">
      <div>
        <p className="font-medium text-gray-900">
          {review.utilisateurs.pr_nom} {review.utilisateurs.nom}
        </p>
        <p className="text-sm text-gray-500">
          {new Date(review.cr___le).toLocaleDateString("fr-FR")}
        </p>
      </div>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <BsStarFill
            key={star}
            className={`w-3 h-3 ${
              star <= review.note ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
    <p className="text-gray-700 text-sm">{review.commentaire}</p>
  </div>
);

// Composant accord mets
const FoodPairing = ({ accord }: { accord: any }) => (
  <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-sm font-medium">
    <span>{accord.accords_mets.nom}</span>
  </div>
);

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "avis" | "details">(
    "description"
  );

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/produits/${params.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erreur lors du chargement");
        }

        setProduct(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    // Logique d'ajout au panier
    console.log(`Ajout ${quantity} x ${product.nom} au panier`);
  };

  const handleBuyNow = () => {
    if (!product) return;
    // Logique d'achat immédiat
    handleAddToCart();
    // Redirection vers panier
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 pt-32">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="h-96 bg-gray-200 rounded-xl"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-24 bg-gray-200 rounded"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 pt-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-12">
              <div className="text-red-600 text-xl font-semibold mb-4">
                {error || "Produit non trouvé"}
              </div>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Retour aux vins
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const hasPromotion = product.promotion && product.promotion > 0;
  const prixPromo = hasPromotion
    ? product.prix * (1 - product.promotion / 100)
    : product.prix;

  const formatCepages = () => {
    return product.produit_cepages
      .map((pc) => `${pc.cepages.nom} (${pc.pourcentage}%)`)
      .join(", ");
  };

  const parseCharacteristics = () => {
    const sections = product.caracteristiques.split(". ").filter(Boolean);
    const result: Record<string, string> = {};
    
    sections.forEach((section) => {
      if (section.toLowerCase().includes("robe")) result.robe = section;
      else if (section.toLowerCase().includes("nez")) result.nez = section;
      else if (section.toLowerCase().includes("bouche")) result.bouche = section;
      else if (section.toLowerCase().includes("palais")) result.palais = section;
    });
    
    return result;
  };

  const characteristics = parseCharacteristics();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-red-600 transition-colors">Accueil</a>
            <FiChevronRight className="mx-2" />
            <a href="/vins" className="hover:text-red-600 transition-colors">Vins</a>
            <FiChevronRight className="mx-2" />
            <a href={`/vins/${product.regions.nom.toLowerCase()}`} className="hover:text-red-600 transition-colors">
              {product.regions.nom}
            </a>
            <FiChevronRight className="mx-2" />
            <span className="text-gray-900 font-medium">{product.nom}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Product Main Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Images */}
              <div className="space-y-6">
                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-inner">
                  {product.produit_images.length > 0 ? (
                    <img
                      src={product.produit_images[selectedImage]?.url}
                      alt={product.produit_images[selectedImage]?.texte_alternatif || product.nom}
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <TbBottle className="w-24 h-24 mb-4" />
                      <span className="text-lg">Image non disponible</span>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {hasPromotion && (
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        -{product.promotion}%
                      </div>
                    )}
                    {product.bio && (
                      <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        BIO
                      </div>
                    )}
                  </div>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-all ${
                      isFavorite
                        ? "bg-red-50 text-red-600"
                        : "bg-white/80 text-gray-600 hover:text-red-600"
                    }`}
                  >
                    <BiHeart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Thumbnail Gallery */}
                {product.produit_images.length > 1 && (
                  <div className="flex space-x-3 overflow-x-auto pb-2">
                    {product.produit_images.map((image, index) => (
                      <button
                        key={image.id}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? "border-red-600 shadow-md"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image.url}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {product.note_moyenne?.toFixed(1) || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">Note moyenne</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {product.nombre_avis}
                    </div>
                    <div className="text-sm text-gray-500">Avis clients</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Product Info */}
              <div className="space-y-6">
                {/* Title and Region */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <BiMapPin className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-medium text-gray-600">
                        {product.regions.nom}, {product.regions.pays}
                      </span>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <CiShare2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    {product.nom}
                  </h1>
                  
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="text-lg font-medium text-gray-700">
                      {product.appellation}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-lg font-medium text-gray-700">
                      {product.domaine.nom}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                {product.note_moyenne && (
                  <div className="flex items-center space-x-3">
                    <RatingStars rating={product.note_moyenne} />
                    <span className="text-sm text-gray-500">
                      ({product.nombre_avis} avis)
                    </span>
                  </div>
                )}

                {/* Price Section */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      {hasPromotion ? (
                        <>
                          <div className="flex items-baseline space-x-3">
                            <span className="text-4xl font-bold text-red-600">
                              {prixPromo.toFixed(2)}€
                            </span>
                            <span className="text-xl text-gray-400 line-through">
                              {product.prix.toFixed(2)}€
                            </span>
                          </div>
                          <div className="mt-1 inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-semibold">
                            Économisez {((product.prix - prixPromo).toFixed(2))}€
                          </div>
                        </>
                      ) : (
                        <span className="text-4xl font-bold text-gray-900">
                          {product.prix.toFixed(2)}€
                        </span>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        TTC / {product.taille_bouteille}
                      </p>
                    </div>
                    
                    {product.quantite_stock > 0 && product.quantite_stock < 10 && (
                      <div className="flex items-center text-amber-600">
                        <BsFire className="w-5 h-5 mr-1" />
                        <span className="font-medium">Il ne reste que {product.quantite_stock} bouteilles</span>
                      </div>
                    )}
                  </div>

                  {/* Quantity and Add to Cart */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium text-gray-700">Quantité :</span>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 py-2 hover:bg-gray-100 disabled:opacity-50"
                          disabled={quantity === 1}
                        >
                          <BiMinus className="w-4 h-4" />
                        </button>
                        <span className="px-6 py-2 font-medium min-w-[3rem] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-4 py-2 hover:bg-gray-100"
                        >
                          <BiPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleAddToCart}
                        disabled={!product.disponible || product.quantite_stock === 0}
                        className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        <CgShoppingCart className="w-5 h-5" />
                        <span>
                          {!product.disponible || product.quantite_stock === 0
                            ? "Non disponible"
                            : `Ajouter au panier (${quantity})`}
                        </span>
                      </button>
                      
                      <button
                        onClick={handleBuyNow}
                        disabled={!product.disponible || product.quantite_stock === 0}
                        className="px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Acheter maintenant
                      </button>
                    </div>
                    
                    {product.quantite_stock > 0 && (
                      <p className="text-sm text-green-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {product.quantite_stock} bouteilles disponibles
                      </p>
                    )}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <BsTruck className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Livraison rapide</p>
                      <p className="text-xs text-gray-500">Sous 48h</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <BiShield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Paiement sécurisé</p>
                      <p className="text-xs text-gray-500">100% SSL</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <FiRotateCcw className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Retour facile</p>
                      <p className="text-xs text-gray-500">30 jours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tabs Navigation */}
            <div className="border-b">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === "description"
                      ? "border-red-600 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Description & Caractéristiques
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === "details"
                      ? "border-red-600 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Détails Techniques
                </button>
                <button
                  onClick={() => setActiveTab("avis")}
                  className={`px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === "avis"
                      ? "border-red-600 text-red-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Avis Clients ({product.nombre_avis})
                </button>
              </nav>
            </div>

            {/* Tabs Content */}
            <div className="p-6 lg:p-8">
              {activeTab === "description" && (
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Présentation du vin
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {product.description}
                    </p>
                  </div>

                  {/* Characteristics Grid */}
                  {Object.keys(characteristics).length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Caractéristiques de dégustation
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {characteristics.robe && (
                          <div className="bg-red-50 p-6 rounded-xl">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                              <span className="text-red-600 font-bold">R</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Robe</h3>
                            <p className="text-gray-700">{characteristics.robe}</p>
                          </div>
                        )}
                        {characteristics.nez && (
                          <div className="bg-amber-50 p-6 rounded-xl">
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                              <span className="text-amber-600 font-bold">N</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Nez</h3>
                            <p className="text-gray-700">{characteristics.nez}</p>
                          </div>
                        )}
                        {characteristics.bouche && (
                          <div className="bg-emerald-50 p-6 rounded-xl">
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                              <span className="text-emerald-600 font-bold">B</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Bouche</h3>
                            <p className="text-gray-700">{characteristics.bouche}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Service & Pairing */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Service & Accords mets-vins
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <BiWine className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-semibold text-gray-900">Température de service</h3>
                            <p className="text-gray-700">{product.temperature_service}</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <BiCalendar className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="font-semibold text-gray-900">Conseils de dégustation</h3>
                            <p className="text-gray-700">{product.conseils_degustation}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Accords recommandés</h3>
                        <div className="flex flex-wrap gap-2">
                          {/* Placeholder pour les accords */}
                          <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                            Viandes rouges
                          </span>
                          <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                            Fromages affinés
                          </span>
                          <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">
                            Charcuteries
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Domaine Info */}
                  <div className="pt-6 border-t">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      À propos du Domaine {product.domaine.nom}
                    </h2>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <p className="text-gray-700">
                        {product.domaine.description || 
                          `Le Domaine ${product.domaine.nom}, situé en ${product.regions.nom}, 
                          est réputé pour ses vins de l'appellation ${product.appellation}.`}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {product.domaine.propri_taire && (
                          <div>
                            <p className="text-sm text-gray-500">Propriétaire</p>
                            <p className="font-medium text-gray-900">{product.domaine.propri_taire}</p>
                          </div>
                        )}
                        {product.domaine.ann_e_fondation && (
                          <div>
                            <p className="text-sm text-gray-500">Année de fondation</p>
                            <p className="font-medium text-gray-900">{product.domaine.ann_e_fondation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "details" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <CharacteristicItem
                    icon={<BiMapPin className="w-5 h-5" />}
                    label="Appellation"
                    value={product.appellation}
                  />
                  <CharacteristicItem
                    icon={<LuGrape className="w-5 h-5" />}
                    label="Cépages"
                    value={formatCepages()}
                  />
                  <CharacteristicItem
                    icon={<BiCalendar className="w-5 h-5" />}
                    label="Millésime"
                    value={product.millesime || "Non spécifié"}
                  />
                  <CharacteristicItem
                    icon={<BiWine className="w-5 h-5" />}
                    label="Degré d'alcool"
                    value={`${product.teneur_alcool}% vol`}
                  />
                  <CharacteristicItem
                    icon={<TbBottle className="w-5 h-5" />}
                    label="Format"
                    value={product.taille_bouteille}
                  />
                  <CharacteristicItem
                    icon={<BiCalendar className="w-5 h-5" />}
                    label="Potentiel de garde"
                    value={product.garde_jusqua ? `Jusqu'en ${product.garde_jusqua}` : "À boire maintenant"}
                  />
                  <CharacteristicItem
                    icon={<BiShield className="w-5 h-5" />}
                    label="Classification"
                    value={product.classifications.nom}
                  />
                  <CharacteristicItem
                    icon={<BiShield className="w-5 h-5" />}
                    label="Allergènes"
                    value={product.allergenes}
                  />
                  {product.bio && (
                    <CharacteristicItem
                      icon={<span className="text-green-600">🌿</span>}
                      label="Agriculture"
                      value="Biologique"
                    />
                  )}
                </div>
              )}

              {activeTab === "avis" && (
                <div>
                  {product.avis_clients.length > 0 ? (
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <div className="text-3xl font-bold text-gray-900">
                              {product.note_moyenne?.toFixed(1)}
                            </div>
                            <RatingStars rating={product.note_moyenne || 0} />
                            <p className="text-sm text-gray-500 mt-1">
                              Basé sur {product.nombre_avis} avis
                            </p>
                          </div>
                          <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
                            Laisser un avis
                          </button>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {product.avis_clients.map((review) => (
                          <ReviewItem key={review.id} review={review} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-gray-400 text-5xl mb-4">💬</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Aucun avis pour le moment
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Soyez le premier à partager votre expérience avec ce vin.
                      </p>
                      <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
                        Écrire un avis
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;