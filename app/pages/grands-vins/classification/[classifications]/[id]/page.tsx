// app/vins/classification/[classification]/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import FiltersSidebar from "@/app/components/Filtres";
import { useQuery } from "@tanstack/react-query";
import { getFilters } from "@/app/services/filters.service";
import WineBanner from "@/app/components/WineBanner";
import FeaturedCategories from "@/app/components/FeaturedCategories";
import ProductIntroBanner from "@/app/components/ProductIntroBanner";
import WineGuidesSection from "@/app/components/WineGuidesSection";
import WineProductCard from "@/app/components/WineProductCard";
import { mapLegacyToNewProps } from "@/app/type";
import {
  useFeaturedProducts,
  useFilteredProducts,
} from "@/app/hooks/useProducts";
import { normalizeFeaturedProducts } from "@/app/utils";
import { useParams } from "next/navigation";
import { NoResults } from "@/app/components/NoResults";

// Slides différenciés pour chaque classification
const slidesGrandCru = [
  {
    id: 1,
    bg: "bg-[url('/images/grand-cru-banner.jpeg')]",
    title: "GRANDS CRUS CLASSÉS",
    subtitle: "L'apogée du terroir français",
    desc: "Sélection des vins les plus prestigieux classés Grand Cru, représentant l'excellence absolue",
    discount: "EXCELLENCE -25%",
    button: "DÉCOUVRIR LES GRANDS CRUS",
    type: "vin",
    category: "Grand Cru",
  },
];

const slidesPremierCru = [
  {
    id: 1,
    bg: "bg-[url('/images/premier-cru-banner.jpeg')]",
    title: "PREMIERS CRUS",
    subtitle: "L'équilibre parfait entre qualité et accessibilité",
    desc: "Vins d'exception classés Premier Cru, alliant finesse et caractère",
    discount: "QUALITÉ SUPÉRIEURE -20%",
    button: "EXPLORER LES PREMIERS CRUS",
    type: "vin",
    category: "Premier Cru",
  },
];

const slidesCruClasse = [
  {
    id: 1,
    bg: "bg-[url('/images/cru-classe-banner.jpeg')]",
    title: "CRUS CLASSÉS",
    subtitle: "La tradition et le prestige des grands classements",
    desc: "Vins prestigieux issus des classifications officielles des grandes appellations",
    discount: "PRESTIGE -15%",
    button: "VOIR LES CRUS CLASSÉS",
    type: "vin",
    category: "Cru Classé",
  },
];

const slidesGrandVin = [
  {
    id: 1,
    bg: "bg-[url('/images/grand-vin-banner.jpeg')]",
    title: "GRANDS VINS",
    subtitle: "Sélection de vins d'exception hors classification",
    desc: "Vins remarquables reconnus pour leur qualité exceptionnelle et leur potentiel de garde",
    discount: "SÉLECTION PRIVÉE -18%",
    button: "DÉCOUVRIR LES GRANDS VINS",
    type: "vin",
    category: "Grand Vin",
  },
];

// Filtres différenciés pour chaque classification
const filtersGrandCru = [
  { label: "GRAND CRU CLASSÉ", icon: "🏅" },
  { label: "BORDEAUX", icon: "🍷" },
  { label: "BOURGOGNE", icon: "⭐" },
  { label: "MILLÉSIMÉ", icon: "📅" },
  { label: "VIN DE GARDE", icon: "🕰️" },
  { label: "PRESTIGE", icon: "👑" },
];

const filtersPremierCru = [
  { label: "PREMIER CRU", icon: "⭐" },
  { label: "ACCESSIBLE", icon: "💰" },
  { label: "BOURGOGNE", icon: "🍇" },
  { label: "CHABLIS", icon: "🥂" },
  { label: "ÉQUILIBRÉ", icon: "⚖️" },
  { label: "QUALITÉ", icon: "👍" },
];

const filtersCruClasse = [
  { label: "CRU CLASSÉ", icon: "👑" },
  { label: "1855", icon: "📜" },
  { label: "SAINT-ÉMILION", icon: "🏰" },
  { label: "GRAVES", icon: "🌾" },
  { label: "TRADITION", icon: "📅" },
  { label: "PRESTIGE", icon: "⭐" },
];

const filtersGrandVin = [
  { label: "GRAND VIN", icon: "🍷" },
  { label: "EXCEPTION", icon: "🌟" },
  { label: "VIN DE GARDE", icon: "🕰️" },
  { label: "LIMITÉ", icon: "🔒" },
  { label: "SÉLECTION", icon: "🎯" },
  { label: "PRESTIGE", icon: "⭐" },
];

// Textes descriptifs différenciés
const descriptions = {
  "grand-cru": {
    title: "Grands Crus Classés",
    subtitle: "L'excellence absolue du terroir français",
    description:
      "Découvrez notre sélection de Grands Crus Classés, représentant le sommet de la hiérarchie viticole française. Ces vins d'exception allient puissance, complexité et grand potentiel de garde.",
    productTitle: "Nos Grands Crus Classés",
  },
  "petite-crue": {
    title: "Petite Crus",
    subtitle: "L'équilibre parfait entre prestige et accessibilité",
    description:
      "Explorez nos Petite Crus, des vins d'exception qui offrent le meilleur rapport qualité-prix dans la hiérarchie des crus, sans compromis sur la qualité et le caractère.",
    productTitle: "Nos Petite Crus",
  },
  "grand-cru-classe": {
    title: "Crus Classés",
    subtitle: "La tradition des grands classements",
    description:
      "Découvrez les Crus Classés, issus des classifications historiques comme celle de 1855. Ces vins prestigieux incarnent la tradition et l'excellence des grandes appellations.",
    productTitle: "Nos Crus Classés",
  },
  "grand-vin": {
    title: "Grands Vins",
    subtitle: "L'excellence au-delà des classifications",
    description:
      "Explorez notre sélection de Grands Vins, des cuvées d'exception reconnues pour leur qualité remarquable, même sans appartenir aux classifications officielles.",
    productTitle: "Nos Grands Vins",
  },
};

const GrandsVinsPage: React.FC = () => {
  const params = useParams();
  const classification = params.classifications as string;
  const id = params.id;

  const [showSidebar, setShowSidebar] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({
    // Filtre par défaut pour la classification
    classifications: id,
    types: "vin",
  });

  const {
    data: filtersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["filters"],
    queryFn: getFilters,
  });

  // Utilisation du hook useFilteredProducts avec les filtres incluant la classification
  let { data: filtersProductData, isLoading: isLoadingFiltersProduct } =
    useFilteredProducts(activeFilters);
  const _filtersProductData = normalizeFeaturedProducts(
    filtersProductData?.data
  );

  const handleFilterChange = (filters: Record<string, any>) => {
    setActiveFilters((prev) => ({
      ...prev,
      ...filters,
      // On garde toujours le filtre de classification actif
      classifications: id,
      types: "vin",
    }));

    if (Object.keys(filters).length === 0) {
      setActiveFilters({ classifications: id, types: "vin" });
    }
  };

  // Récupérer les produits en vedette au chargement
  const { data: queryResult } = useFeaturedProducts(8) || {};

  // Fonction pour formater le nom de la classification
  const formatClassificationName = (classification: string) => {
    const names: { [key: string]: string } = {
      "grand-cru": "Grand Cru",
      "petite-crue": "Petite Cru",
      "grand-cru-classe": "Cru Classé",
      "grand-vin": "Grand Vin",
    };
    return (
      names[classification] ||
      classification?.charAt(0).toUpperCase() + classification?.slice(1)
    );
  };

  // Fonction pour obtenir les slides selon la classification
  const getSlidesByClassification = (classification: string) => {
    const slidesMap: { [key: string]: any[] } = {
      "grand-cru": slidesGrandCru,
      "petite-crue": slidesPremierCru,
      "grand-cru-classe": slidesCruClasse,
      "grand-vin": slidesGrandVin,
    };

    return slidesMap[classification] || slidesGrandVin;
  };

  // Fonction pour obtenir les filtres selon la classification
  const getFiltersByClassification = (classification: string) => {
    const filtersMap: { [key: string]: any[] } = {
      "grand-cru": filtersGrandCru,
      "petite-crue": filtersPremierCru,
      "grand-cru-classe": filtersCruClasse,
      "grand-vin": filtersGrandVin,
    };

    return filtersMap[classification] || filtersGrandVin;
  };

  // Fonction pour obtenir les descriptions selon la classification
  const getDescriptionByClassification = (classification: string) => {
    return (
      descriptions[classification as keyof typeof descriptions] ||
      descriptions["grand-vin"]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-lg text-zinc-600 dark:text-zinc-400">
          Chargement en cours...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="text-lg text-red-600 dark:text-red-400">
          Erreur: {error.message}
        </div>
      </div>
    );
  }

  const formattedClassification = formatClassificationName(classification);
  const slides = getSlidesByClassification(classification);
  const filters = getFiltersByClassification(classification);
  const desc = getDescriptionByClassification(classification);

  // Données par défaut pour la classification
  const defaultWineData = {
    category: formattedClassification,
    name: `${formattedClassification} - Cuvée d'Exception`,
    vintage: "2018",
    producer: `Château Prestige`,
    volume: "0.75 L",
    region: "Bordeaux",
    alcohol: "14% vol",
    rating: 18,
    maxRating: 20,
    reviewCount: 124,
    description: `Un vin d'exception classé ${formattedClassification}, alliant puissance, élégance et grand potentiel de garde.`,
    originalPrice: 150.0,
    currentPrice: 135.0,
    discount: 10,
    imageUrl: "/images/grand-vin-prestige.jpg",
    badges: [classification, "vin de garde"],
  };

  // Conversion des données
  // const productProps = mapLegacyToNewProps(defaultWineData);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* ===== Header global ===== */}
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>

      {/* ===== Layout principal ===== */}
      <div className="flex pt-20">
        {/* === SIDEBAR (filtres) === */}
        <aside
          className={`
            fixed md:sticky top-16 left-0 md:left-[10%] z-40
            h-[calc(100vh-4rem)] w-80 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700
            transform transition-transform duration-300 ease-in-out
            overflow-y-auto
            ${
              showSidebar
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }
          `}
        >
          <div className="md:hidden flex justify-end p-4 border-b border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => setShowSidebar(false)}
              className="text-sm px-4 py-2 rounded-lg bg-[#810b15] text-white hover:bg-[#6a0912] transition-colors"
            >
              ✕ Fermer
            </button>
          </div>
          <div className="p-6 mt-16">
            <FiltersSidebar
              data={filtersData}
              onFilterChange={handleFilterChange}
            />
          </div>
        </aside>

        {/* === OVERLAY pour mobile === */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* === CONTENU PRINCIPAL === */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] mt-16">
          <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
            <section className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700 mb-6">
              {/* En-tête spécifique à la classification */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-[#810b15] font-cavas dark:text-white mb-4">
                  {desc.title}
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2 max-w-3xl mx-auto">
                  {desc.subtitle}
                </p>
                <p className="text-md text-zinc-500 dark:text-zinc-400 mb-6 max-w-3xl mx-auto">
                  {desc.description}
                </p>
              </div>

              <WineBanner slides={slides} filters={filters} />

              {/* Produits filtrés (vins de la classification) */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-6 text-center">
                  {desc.productTitle}
                </h2>

                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
                  id="_filtersProductData"
                >
                  {_filtersProductData.length > 0 &&
                  Object.keys(activeFilters).length !== 0
                    ? _filtersProductData.map((product, index) => (
                        <WineProductCard
                          key={index}
                          {...mapLegacyToNewProps(product)}
                        />
                      ))
                    : ""}
                </div>

                {_filtersProductData.length === 0 && (
                  <div className="flex justify-center w-full py-12">
                    <NoResults
                      message={`Aucun vin trouvé pour la classification ${formattedClassification}`}
                    />
                  </div>
                )}
              </div>

              {/* Bannière promotionnelle pour les grands vins */}
              <ProductIntroBanner
                title={`Les ${formattedClassification} les Plus Prestigieux`}
                subtitle={`Découvrez notre sélection exclusive des vins ${formattedClassification?.toLowerCase()} d'exception`}
                backgroundImageUrl="/images/promo-grands-vins.jpg"
                link={`/vins/classification/${classification}/prestige`}
              />

              <FeaturedCategories />

              <WineGuidesSection />
            </section>
          </div>
        </main>
      </div>

      {/* ===== Floating Action Button (FAB) pour les filtres mobiles ===== */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="
          fixed bottom-6 right-6 z-50 
          md:hidden 
          px-6 py-4 text-white 
          rounded-full shadow-lg 
          font-medium text-lg 
          bg-[#810b15]
          dark:bg-black
          hover:bg-[#6a0912] transition-all duration-300 
          flex items-center gap-3
        "
        aria-label="Afficher les filtres"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
          />
        </svg>
        Filtres
      </button>
    </div>
  );
};

export default GrandsVinsPage;
