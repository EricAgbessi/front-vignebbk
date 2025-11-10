// app/vins/region/[slug]/page.tsx
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
import { NormalizedProduct, normalizeFeaturedProducts } from "@/app/utils";
import { useParams } from "next/navigation";
import { NoResults } from "@/app/components/NoResults";

const slidesRouge = [
  // Pour les cépages rouges
  {
    id: 1,
    bg: "bg-[url('/images/cepage-rouge.jpeg')]",
    title: "CÉPAGES ROUGES",
    subtitle: "Puissance et complexité",
    desc: "Vins rouges mettant en valeur la structure et les tanins des cépages nobles",
    discount: "ROUGES SIGNATURES -10%",
    button: "DÉCOUVRIR LES ROUGES",
    type: "vin",
    category: "Cépage Rouge",
  },
];

const slideBlanc = [
  {
    id: 2,
    bg: "bg-[url('/images/cepage-blanc.jpeg')]",
    title: "CÉPAGES BLANCS",
    subtitle: "Fraîcheur et aromaticité",
    desc: "Vins blancs révélant la finesse et l'élégance des cépages blancs",
    discount: "BLANCS D'EXCEPTION -12%",
    button: "EXPLORER LES BLANCS",
    type: "vin",
    category: "Cépage Blanc",
  },
];

const filters = [
  { label: "ROUGE", icon: "🍷" },
  { label: "BLANC", icon: "🥂" },
  { label: "ROSÉ", icon: "🍹" },
  { label: "GRANDS VINS", icon: "🏅" },
  { label: "CHAMPAGNE", icon: "🍾" },
  { label: "WHISKY AND CO", icon: "🥃" },
];

const VinsCepagesPage: React.FC = () => {
  const params = useParams();
  const cepages = params.cepage as string;
  const id = params.id;

  const [showSidebar, setShowSidebar] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({
    // Filtre par défaut pour la région
    cepages: id,
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

  // Utilisation du hook useFilteredProducts avec les filtres incluant la région
  let { data: filtersProductData, isLoading: isLoadingFiltersProduct } =
    useFilteredProducts(activeFilters);
  const _filtersProductData: NormalizedProduct[] = normalizeFeaturedProducts(
    filtersProductData?.data
  );

  console.log(filtersProductData);

  const handleFilterChange = (filters: Record<string, any>) => {
    setActiveFilters((prev) => ({
      ...prev,
      ...filters,
      // On garde toujours le filtre de région actif
      cepages: id,
      types: "vin",
    }));

    if (Object.keys(filters).length === 0) {
      setActiveFilters({ cepages: id, types: "vin" });
    }
  };

  // Récupérer les produits en vedette au chargement
  const { data: queryResult } = useFeaturedProducts(8) || {};

  // Données par défaut pour la région
  const defaultWineData = {
    category: `Vin de ${cepages}`,
    name: `${cepages} - Cuvée Régionale`,
    vintage: "2022",
    producer: `Domaine de ${cepages}`,
    volume: "0.75 L",
    region: cepages,
    alcohol: "13% vol",
    rating: 16,
    maxRating: 20,
    reviewCount: 76,
    description: `Découvrez les vins exceptionnels de la région ${cepages}, sélectionnés pour leur typicité et leur qualité.`,
    originalPrice: 28.0,
    currentPrice: 24.9,
    discount: 11,
    imageUrl: "/images/vin-cepages.jpg",
    badges: ["region", "primeur"],
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
              //initialSelectedFilters={{ regions: [slug] }}
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
              {/* En-tête spécifique à la région */}
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-[#810b15] font-cavas dark:text-white mb-4">
                  {cepages.charAt(0).toUpperCase() + cepages.slice(1)} :
                  Élégance et Fraîcheur
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-3xl mx-auto">
                  {`Explorez la finesse du ${cepages} à travers nos blancs
                  d'exception. Un cépage qui exprime toute sa minéralité et son
                  aromaticité.`}
                </p>
              </div>

              <WineBanner
                slides={
                  filtersProductData?.data?.data?.[0]?.cepages?.[0].type ===
                  "rouge"
                    ? slidesRouge
                    : slideBlanc
                }
                //slides={slideBlanc}
                filters={filters}
              />

              {/* Produits filtrés (vins de la région) */}
              <div className="mt-12">
                <div className="mb-8 text-center">
                  <h1 className="text-3xl font-bold text-[#810b15] font-cavas dark:text-white mb-4">
                    Vins de {cepages.charAt(0).toUpperCase() + cepages.slice(1)}
                  </h1>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 max-w-3xl mx-auto">
                    Explorez notre collection de vins élaborés à partir du
                    cépage {cepages}, mettant en valeur son expression unique et
                    ses caractéristiques distinctives.
                  </p>
                </div>

                <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-6 text-center">
                  Nos Vins au{" "}
                  {cepages.charAt(0).toUpperCase() + cepages.slice(1)}
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
                      message={`Aucun vin trouvé pour le cepages ${cepages}`}
                      // suggestion="Essayez de modifier vos filtres ou explorez d'autres régions"
                    />
                  </div>
                )}
              </div>

              {filtersProductData?.data?.data?.[0]?.cepages?.[0].type ===
              "rouge" ? (
                <ProductIntroBanner
                  title={`${
                    cepages.charAt(0).toUpperCase() + cepages.slice(1)
                  } : Nos Grands Crus`}
                  subtitle={`Découvrez la puissance et l'élégance des vins issus du cépage ${cepages}`}
                  backgroundImageUrl="/images/promo-cepage-rouge.jpg"
                  link={`/vins/cepage/${cepages}/grands-crus`}
                />
              ) : (
                <ProductIntroBanner
                  title={`${
                    cepages.charAt(0).toUpperCase() + cepages.slice(1)
                  } : Fraîcheur et Complexité`}
                  subtitle={`Explorez la finesse et l'aromanticité des vins blancs au ${cepages}`}
                  backgroundImageUrl="/images/promo-cepage-blanc.jpg"
                  link={`/vins/cepage/${cepages}/vins-blancs`}
                />
              )}

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

export default VinsCepagesPage;
