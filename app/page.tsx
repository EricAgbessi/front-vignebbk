"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import FiltersSidebar from "./components/Filtres";
import { useQuery } from "@tanstack/react-query";
import { getFilters } from "./services/filters.service";
import WineBanner from "./components/WineBanner";
import FeaturedCategories from "./components/FeaturedCategories";
import ProductIntroBanner from "./components/ProductIntroBanner";
import WineGuidesSection from "./components/WineGuidesSection";
import WineProductCard from "./components/WineProductCard";
import { mapLegacyToNewProps } from "./type";
import { useFeaturedProducts, useFilteredProducts } from "./hooks/useProducts";
import { normalizeFeaturedProducts } from "./utils";

const slides = [
  {
    id: 1,
    bg: "bg-[url('/images/slide-1.jpeg')]",
    title: "GRANDS CRUS BORDEAUX",
    subtitle: "L'excellence des grands millésimes",
    desc: "Sélection de crus classés à prix attractifs",
    discount: "ÉCONOMISEZ JUSQU'À -40%",
    button: "ACCÉDER AUX GRANDS CRUS",
    type: "vin",
    category: "Grand Cru",
  },
  {
    id: 2,
    bg: "bg-[url('/images/slide-1.jpeg')]",
    title: "MAISONS DE CHAMPAGNE",
    subtitle: "L'excellence des grandes maisons",
    desc: "Des grandes marques à des prix inédits",
    discount: "PROMOTION EXCLUSIVE -35%",
    button: "DÉCOUVRIR LES MAISONS",
    type: "champagne",
    category: "Grandes Maisons",
  },
  {
    id: 3,
    bg: "bg-[url('/images/slide-1.jpeg')]",
    title: "COGNACS RARES",
    subtitle: "Des bouteilles d'exception et limitées",
    desc: "Collection de cognacs anciens et rares",
    discount: "PRIX EXCEPTIONNELS -15%",
    button: "VOIR LA COLLECTION",
    type: "cognac",
    category: "Raretés",
  },
  // tu peux ajouter d'autres slides ici si tu veux un vrai carrousel
];

const filters = [
  { label: "ROUGE", icon: "🍷" },
  { label: "BLANC", icon: "🥂" },
  { label: "ROSÉ", icon: "🍹" },
  { label: "GRANDS VINS", icon: "🏅" },
  { label: "CHAMPAGNE", icon: "🍾" },
  { label: "WHISKY AND CO", icon: "🥃" },
];

const App: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const {
    data: filtersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["filters"],
    queryFn: getFilters,
  });

  let { data: filtersProductData, isLoading: isLoadingFiltersProduct } =
    useFilteredProducts(activeFilters);
  const _filtersProductData = normalizeFeaturedProducts(
    filtersProductData?.data
  );

  useEffect(() => {
    if (
      _filtersProductData &&
      _filtersProductData.length > 0 &&
      Object.keys(activeFilters).length !== 0
    ) {
      const targetAnchor = "#_filtersProductData";
      if (typeof window !== "undefined") {
        const targetElement = document.getElementById("_filtersProductData");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }

    console.log("_filtersProductData", _filtersProductData);
  }, [_filtersProductData, activeFilters]);

  const handleFilterChange = (filters: Record<string, any>) => {
    setActiveFilters((prev) => ({ ...prev, ...filters }));
    if (Object.keys(filters).length === 0) {
      setActiveFilters({});
    }
  };

  // Récupérer les produits en vedette au chargement

  const { data: queryResult } = useFeaturedProducts(8) || {};
  let _featuredProducts = normalizeFeaturedProducts(queryResult?.data);

  // useEffect(() => {
  //   _featuredProducts = normalizeFeaturedProducts(queryResult?.data);
  //   console.log(_featuredProducts,queryResult?.data);
  // }, [queryResult]);

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
  const wineData = {
    category: "Vin de France",
    name: "Villa des Anges - Réserve",
    vintage: "2022",
    producer: "Jeff Carrel",
    volume: "0.75 L",
    region: "Vin de France",
    alcohol: "14% vol",
    rating: 17,
    maxRating: 20,
    reviewCount: 57,
    description:
      "Un cuvée emblématique de la sélection qui ravira le palais des amateurs de vins structurés avec du caractère !",
    originalPrice: 9.5,
    currentPrice: 6.5,
    discount: 31,
    imageUrl: "/images/prod-1.png",
    badges: ["taster", "challenge-e"],
  };

  // Conversion des données
  const productProps = mapLegacyToNewProps(wineData);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* ===== Header global ===== */}
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>

      {/* ===== Layout principal ===== */}
      <div className="flex pt-20">
        {" "}
        {/* Compensation pour le header fixe */}
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
              className="text-sm px-4 py-2 rounded-lg bg-[#810b15] text-white hover:bg-purple-700 transition-colors"
            >
              ✕ Fermer
            </button>
          </div>
          <div className="p-6 mt-20">
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
        <main className="flex-1 min-h-[calc(100vh-4rem)] mt-20">
          {/* SUPPRESSION du bouton filtre non-FAB ici :
          
          <div className="md:hidden p-4 border-b border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
            ... (Ancien bouton)
          </div>
          
          */}

          {/* Contenu avec marges latérales */}
          <div className="p-1 md:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Contenu de votre liste de produits... */}
            <section className="bg-white dark:bg-black  md:dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-none  md:dark:border-zinc-700 mb-6">
              <WineBanner slides={slides} filters={filters} />

              <ProductIntroBanner
                title="Les Favoris de nos Clients"
                subtitle="Trouvez votre bonheur parmi nos meilleures ventes Vins & Champagnes"
                backgroundImageUrl="/images/promo-vins.jpg"
                link="/meilleures-ventes"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mt-36 md:mt-20">
                {_featuredProducts.length > 0
                  ? _featuredProducts.map((product, index) => (
                      <WineProductCard
                        key={index}
                        {...mapLegacyToNewProps(product)}
                      />
                    ))
                  : // Produits par défaut (en vedette)
                    [...Array(4)].map((_, i) => (
                      <WineProductCard key={i} {...productProps} />
                    ))}
              </div>

              <FeaturedCategories />

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

              <WineGuidesSection />
            </section>

            {/* Sections supplémentaires... */}
            {/* <section className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
              <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-white">
                Autre section
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Contenu supplémentaire avec les mêmes marges...
              </p>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg"
                  >
                    <h3 className="font-medium text-zinc-800 dark:text-white">
                      Élément #{i + 1}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Description de l'élément...
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
              <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-white">
                Section de test de scroll
              </h2>
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="p-6 border border-zinc-200 dark:border-zinc-700 rounded-lg"
                  >
                    <h3 className="font-medium text-lg text-zinc-800 dark:text-white mb-2">
                      Contenu de test #{i + 1}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Cette section permet de tester le comportement du scroll.
                    </p>
                  </div>
                ))}
              </div>
            </section> */}
          </div>
        </main>
      </div>

      {/* ===== Floating Action Button (FAB) pour les filtres mobiles ===== */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="
          fixed bottom-6 right-6 z-50 
          md:hidden 
          px-6 py-4  text-white 
          rounded-full shadow-lg 
          font-medium text-lg 
          bg-[#810b15]
          dark:bg-black
          hover:bg-[810b15] transition-all duration-300 
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
      {/* =============================================================== */}
    </div>
  );
};

export default App;
