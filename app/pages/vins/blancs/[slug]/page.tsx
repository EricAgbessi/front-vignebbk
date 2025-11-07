// app/vins/blancs/[slug]/page.tsx

//  const {
//    data: wineData,
//    isLoading: isLoadingWine,
//    isError: isErrorWine,
//    error: wineError,
//  } = useQuery({
//    queryKey: ["wine", slug],
//    queryFn: () => getFilteredProduct({ styles: [`${slug}`] }),
//    enabled: !!slug,
//  });// app/vins/blancs/[slug]/page.tsx// app/vins/blancs/[slug]/page.tsx
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

const slides = [
  {
    id: 1,
    bg: "bg-[url('/images/vin-blanc.jpeg')]",
    title: "VINS BLANCS FRUITS & FRAÎCHEUR",
    subtitle: "L'élégance et la minéralité",
    desc: "Sélection de vins blancs secs et fruités pour l'apéritif",
    discount: "DÉCOUVREZ NOS COUPS DE CŒUR -25%",
    button: "DÉCOUVRIR LES VINS BLANCS",
    type: "vin",
    category: "Blanc Sec",
  },
  // {
  //   id: 2,
  //   bg: "bg-[url('/images/slide-vins-blancs-2.jpg')]",
  //   title: "GRANDS BLANCS DE BOURGOGNE",
  //   subtitle: "Chardonnay à son excellence",
  //   desc: "Puligny-Montrachet, Meursault, Chablis Grand Cru",
  //   discount: "GRANDS MILLÉSIMES -30%",
  //   button: "EXPLORER LA BOURGOGNE",
  //   type: "vin",
  //   category: "Bourgogne",
  // },
  // {
  //   id: 3,
  //   bg: "bg-[url('/images/slide-vins-blancs-3.jpg')]",
  //   title: "VINS BLANCS BIO & NATURE",
  //   subtitle: "Des vins authentiques et responsables",
  //   desc: "Sélection de domaines en agriculture biologique",
  //   discount: "PROMOTION VINS NATURE -20%",
  //   button: "VOIR LES VINS BIO",
  //   type: "vin",
  //   category: "Bio & Nature",
  // },
  // {
  //   id: 4,
  //   bg: "bg-[url('/images/slide-vins-blancs-4.jpg')]",
  //   title: "BLANCS DOUX & LIQUOREUX",
  //   subtitle: "Sauternes, Barsac, Monbazillac",
  //   desc: "Des vins liquoreux d'exception pour les desserts",
  //   discount: "GRANDS LIQUOREUX -15%",
  //   button: "DÉCOUVRIR LES DOUX",
  //   type: "vin",
  //   category: "Liquoreux",
  // },
  // {
  //   id: 5,
  //   bg: "bg-[url('/images/slide-vins-blancs-5.jpg')]",
  //   title: "VINS BLANCS MEDITERRANÉENS",
  //   subtitle: "Le soleil du Sud dans votre verre",
  //   desc: "Provence, Languedoc, Côtes du Rhône blancs",
  //   discount: "ESCAPADE MÉDITERRANÉE -35%",
  //   button: "VOIR LES BLANCS DU SUD",
  //   type: "vin",
  //   category: "Méditerranée",
  // },
];

const filters = [
  { label: "ROUGE", icon: "🍷" },
  { label: "BLANC", icon: "🥂" },
  { label: "ROSÉ", icon: "🍹" },
  { label: "GRANDS VINS", icon: "🏅" },
  { label: "CHAMPAGNE", icon: "🍾" },
  { label: "WHISKY AND CO", icon: "🥃" },
];

const VinsBlancsPage: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [showSidebar, setShowSidebar] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({
    // Filtre par défaut pour les vins blancs
    styles: "vin_blanc",
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

  // Utilisation du hook useFilteredProducts avec les filtres incluant le type "blanc"
  let { data: filtersProductData, isLoading: isLoadingFiltersProduct } =
    useFilteredProducts(activeFilters);
  const _filtersProductData = normalizeFeaturedProducts(
    filtersProductData?.data
  );

  const handleFilterChange = (filters: Record<string, any>) => {
    setActiveFilters((prev) => ({
      ...prev,
      ...filters,
      // On garde toujours le filtre "blanc" actif
      styles: "vin_blanc",
      types: "vin",
    }));

    if (Object.keys(filters).length === 0) {
      setActiveFilters({ styles: "vin_blanc", types: "vin" });
    }
  };

  // Récupérer les produits en vedette au chargement
  const { data: queryResult } = useFeaturedProducts(8) || {};

  // Données par défaut pour les vins blancs
  const defaultWineData = {
    category: "Vin Blanc",
    name: "Sancerre Blanc - Cuvée Prestige",
    vintage: "2022",
    producer: "Domaine Vacheron",
    volume: "0.75 L",
    region: "Loire",
    alcohol: "13% vol",
    rating: 18,
    maxRating: 20,
    reviewCount: 124,
    description:
      "Un vin blanc élégant aux arômes d'agrumes et de pierre à fusil, parfait pour l'apéritif !",
    originalPrice: 32.5,
    currentPrice: 28.9,
    discount: 11,
    imageUrl: "/images/vin-blanc-1.png",
    badges: ["bio", "primeur"],
  };

  // Conversion des données
  const productProps = mapLegacyToNewProps(defaultWineData);

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
              // Optionnel: pré-sélectionner le filtre "blanc" dans la sidebar
              //initialSelectedFilters={{ type: ["blanc"] }}
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
              {/* Bannière spécifique aux vins blancs */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-[#810b15] font-cavas dark:text-white mb-4">
                  Nos Vins Blancs
                </h1>
                <p className="text-lg font-bold  text-zinc-600 font-cavas dark:text-zinc-400">
                  Découvrez notre sélection exceptionnelle de vins blancs, des
                  plus frais aux plus complexes.
                </p>
              </div>

              <WineBanner slides={slides} filters={filters} />

              {/* Produits filtrés (vins blancs) */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-20"
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <NoResults />
                </div>
              )}

              <ProductIntroBanner
                title="Les Vins Blancs les Plus Appréciés"
                subtitle="Découvrez les vins blancs qui séduisent nos clients par leur fraîcheur et leur élégance"
                backgroundImageUrl="/images/promo-vins-blancs.jpg"
                link="/vins/blancs/meilleures-ventes"
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

export default VinsBlancsPage;
