"use client";

import React, { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import FiltersSidebar from "@/app/components/Filtres";
import { useQuery } from "@tanstack/react-query";
import { getFilters } from "@/app/services/filters.service";
import WineBanner from "@/app/components/WineBanner";
import WineProductCard from "@/app/components/WineProductCard";
import { useFilteredProducts } from "@/app/hooks/useProducts";

const slides = [
  {
    id: 1,
    bg: "bg-[url('/images/vin-blanc.jpeg')]",
    title: "VINS BLANCS D'EXCEPTION",
    subtitle: "Fraîcheur, élégance et minéralité",
    desc: "Une sélection rigoureuse des plus beaux terroirs de France et d'ailleurs.",
    discount: "OFFRE SPÉCIALE -20%",
    button: "EXPLORER LA SÉLECTION",
    type: "vin",
    category: "Blanc",
  }
];

const VinsBlancsPage: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({
    styles: "vin_blanc",
    types: "vin",
  });

  const { data: filtersData } = useQuery({
    queryKey: ["filters"],
    queryFn: getFilters,
  });

  const { data: filteredResults, isLoading: isLoadingProducts } = useFilteredProducts(activeFilters);

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setActiveFilters({
      ...newFilters,
      styles: "vin_blanc",
      types: "vin",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-[#810b15] selection:text-white">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 space-y-24">
        <section className="rounded-[40px] overflow-hidden shadow-2xl">
          <WineBanner slides={slides} />
        </section>

        <div className="flex flex-col lg:flex-row gap-16">
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-32">
              {filtersData && (
                <FiltersSidebar 
                  data={filtersData} 
                  onFilterChange={handleFilterChange} 
                />
              )}
            </div>
          </aside>

          <div className="flex-1 space-y-12">
            <div className="flex items-end justify-between border-b-2 border-zinc-100 dark:border-zinc-800 pb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-black font-cavas tracking-tighter uppercase">
                  Tous nos Vins Blancs
                </h1>
                <p className="text-zinc-500 text-lg mt-2 font-medium">
                  {filteredResults?.pagination.total || 0} références d'exception sélectionnées pour vous.
                </p>
              </div>
            </div>

            {isLoadingProducts ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-[500px] bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded-3xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredResults?.data.map((product: any) => (
                  <WineProductCard key={product.id} {...product} />
                ))}
                {filteredResults?.data.length === 0 && (
                  <div className="col-span-full py-32 text-center space-y-6 bg-white dark:bg-zinc-900 rounded-[40px] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                    <span className="text-8xl">🥂</span>
                    <h3 className="text-2xl font-black font-cavas">Aucun vin blanc ne correspond à ces critères</h3>
                    <button 
                      onClick={() => setActiveFilters({ styles: "vin_blanc", types: "vin" })}
                      className="bg-[#810b15] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#6a0912] transition-all"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VinsBlancsPage;
