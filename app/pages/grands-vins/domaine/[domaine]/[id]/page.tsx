// app/vins/domaine/[domaine]/[id]/page.tsx
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

// Slides pour les domaines
const slidesDomaines = [
  {
    id: 1,
    bg: "bg-[url('/images/domaine-banner.jpeg')]",
    title: "DOMAINES & CHÂTEAUX",
    subtitle: "L'art du vin de propriété",
    desc: "Découvrez les vins de domaines familiaux et châteaux renommés, garants d'une tradition viticole d'excellence",
    discount: "SÉLECTION DOMAINES -15%",
    button: "EXPLORER LES DOMAINES",
    type: "vin",
    category: "Domaine",
  },
];

// Filtres spécifiques aux domaines
const filtersDomaines = [
  { label: "DOMAINE FAMILIAL", icon: "👨‍👩‍👧‍👦" },
  { label: "CHÂTEAU", icon: "🏰" },
  { label: "PROPRIÉTÉ", icon: "🏡" },
  { label: "VIGNERON", icon: "👨‍🌾" },
  { label: "TRADITION", icon: "📜" },
  { label: "TERROIR", icon: "🌱" },
];

// Domaines célèbres avec leurs spécificités
const domainesFamoux = {
  "chateau-margaux": {
    name: "Château Margaux",
    region: "Bordeaux",
    appellation: "Margaux",
    description:
      "Un des cinq Premiers Grands Crus Classés de 1855, réputé pour son élégance et sa finesse exceptionnelle.",
    caracteristiques:
      "Vin de grande garde, tannins soyeux, arômes de fruits noirs et de violette",
  },
  "domaine-romanee-conti": {
    name: "Domaine de la Romanée-Conti",
    region: "Bourgogne",
    appellation: "Romanée-Conti",
    description:
      "Le domaine le plus prestigieux de Bourgogne, produisant des vins de légende aux arômes complexes.",
    caracteristiques:
      "Nectar rare, complexité aromatique unique, potentiel de garde exceptionnel",
  },
  "chateau-lafite-rothschild": {
    name: "Château Lafite Rothschild",
    region: "Bordeaux",
    appellation: "Pauillac",
    description:
      "Premier Grand Cru Classé 1855, symbole d'excellence et d'élégance bordelaise.",
    caracteristiques:
      "Structure puissante, finesse remarquable, arômes de cèdre et de fruits mûrs",
  },
  "domaine-leflaive": {
    name: "Domaine Leflaive",
    region: "Bourgogne",
    appellation: "Puligny-Montrachet",
    description:
      "Référence absolue des grands vins blancs de Bourgogne, en biodynamie depuis 1997.",
    caracteristiques:
      "Vins blancs minéraux, tension aromatique, grande persistance en bouche",
  },
  "chateau-ausone": {
    name: "Château Ausone",
    region: "Bordeaux",
    appellation: "Saint-Émilion",
    description:
      "Premier Grand Cru Classé A, vin rare et précieux aux tanins d'une incroyable finesse.",
    caracteristiques:
      "Puissance et élégance, notes de truffe et d'épices, grande longévité",
  },
};

const VinsDomainePage: React.FC = () => {
  const params = useParams();
  const domaine = params.domaine as string;
  const id = params.id;

  const [showSidebar, setShowSidebar] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({
    // Filtre par défaut pour le domaine
    domaines: id,
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

  // Utilisation du hook useFilteredProducts avec les filtres incluant le domaine
  let { data: filtersProductData, isLoading: isLoadingFiltersProduct } =
    useFilteredProducts(activeFilters);
  const _filtersProductData = normalizeFeaturedProducts(
    filtersProductData?.data
  );

  const handleFilterChange = (filters: Record<string, any>) => {
    setActiveFilters((prev) => ({
      ...prev,
      ...filters,
      // On garde toujours le filtre de domaine actif
      domaines: id,
      types: "vin",
    }));

    if (Object.keys(filters).length === 0) {
      setActiveFilters({ domaines: id, types: "vin" });
    }
  };

  // Récupérer les produits en vedette au chargement
  const { data: queryResult } = useFeaturedProducts(8) || {};

  // Fonction pour formater le nom du domaine
  const formatDomaineName = (domaine: string) => {
    // Remplacer les tirets par des espaces et mettre en majuscules
    return domaine
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Obtenir les informations du domaine s'il est connu
  const getDomaineInfo = (domaine: string) => {
    return (
      domainesFamoux[domaine as keyof typeof domainesFamoux] || {
        name: formatDomaineName(domaine),
        region: "Région viticole",
        appellation: "Appellation",
        description: `Découvrez les vins exceptionnels du ${formatDomaineName(
          domaine
        )}, domaine réputé pour son savoir-faire traditionnel et son respect du terroir.`,
        caracteristiques: "Vins d'exception alliant tradition et innovation",
      }
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

  const domaineInfo = getDomaineInfo(domaine);
  const formattedDomaineName = domaineInfo.name;

  // Données par défaut pour le domaine
  const defaultWineData = {
    category: `${formattedDomaineName}`,
    name: `${formattedDomaineName} - Cuvée Signature`,
    vintage: "2020",
    producer: formattedDomaineName,
    volume: "0.75 L",
    region: domaineInfo.region,
    alcohol: "13.5% vol",
    rating: 17,
    maxRating: 20,
    reviewCount: 89,
    description: `Vin représentatif du savoir-faire du ${formattedDomaineName}, alliant typicité du terroir et expression variétale.`,
    originalPrice: 45.0,
    currentPrice: 38.0,
    discount: 15,
    imageUrl: "/images/vin-domaine.jpg",
    badges: ["domaine", "terroir"],
  };

  // Conversion des données
  const productProps = mapLegacyToNewProps(defaultWineData);

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
              {/* En-tête spécifique au domaine */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-[#810b15] font-cavas dark:text-white mb-4">
                  {formattedDomaineName}
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-2 max-w-3xl mx-auto">
                  {domaineInfo.region} - {domaineInfo.appellation}
                </p>
                <p className="text-md text-zinc-500 dark:text-zinc-400 mb-6 max-w-3xl mx-auto">
                  {domaineInfo.description}
                </p>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 max-w-2xl mx-auto">
                  <p className="text-amber-800 dark:text-amber-200 text-sm">
                    <strong>Caractéristiques :</strong>{" "}
                    {domaineInfo.caracteristiques}
                  </p>
                </div>
              </div>

              <WineBanner slides={slidesDomaines} filters={filtersDomaines} />

              {/* Produits filtrés (vins du domaine) */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-6 text-center">
                  Les Vins du {formattedDomaineName}
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
                      message={`Aucun vin trouvé pour le domaine ${formattedDomaineName}`}
                    />
                  </div>
                )}
              </div>

              {/* Bannière promotionnelle pour le domaine */}
              <ProductIntroBanner
                title={`Les Cuvées Signature du ${formattedDomaineName}`}
                subtitle={`Découvrez notre sélection exclusive des vins les plus représentatifs du domaine`}
                backgroundImageUrl="/images/promo-domaine-vins.jpg"
                link={`/vins/domaine/${domaine}/cavees-signature`}
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

export default VinsDomainePage;
