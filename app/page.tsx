"use client";
import React, { useState } from "react";
import Header from "./components/Header";
import FiltersSidebar from "./components/Filtres";
import { useQuery } from "@tanstack/react-query";
import { getFilters } from "./services/filters.service";
import WineBanner from "./components/WineBanner";
import FeaturedCategories from "./components/FeaturedCategories";
import ProductIntroBanner from "./components/ProductIntroBanner";
import WineGuidesSection from "./components/WineGuidesSection";
import WineProductCard from "./components/WineProductCard";
import { useFeaturedProducts, useFilteredProducts } from "./hooks/useProducts";

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
];

const categories = [
  { label: "ROUGE", icon: "🍷" },
  { label: "BLANC", icon: "🥂" },
  { label: "ROSÉ", icon: "🍹" },
  { label: "GRANDS VINS", icon: "🏅" },
  { label: "CHAMPAGNE", icon: "🍾" },
  { label: "WHISKY AND CO", icon: "🥃" },
];

import Footer from "./components/Footer";

const App: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

  const { data: filtersData } = useQuery({
    queryKey: ["filters"],
    queryFn: getFilters,
  });

  const { data: featuredProducts, isLoading: isLoadingFeatured } = useFeaturedProducts(12);
  const { data: filteredResults, isLoading: isLoadingFiltered } = useFilteredProducts(activeFilters);

  const isFiltering = Object.keys(activeFilters).length > 0;
  const displayProducts = isFiltering ? filteredResults?.data : featuredProducts;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-[#810b15] selection:text-white">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 space-y-24">
        {/* Hero Section */}
        <section className="rounded-[40px] overflow-hidden shadow-2xl">
          <WineBanner slides={slides} />
        </section>

        {/* Trust Badges */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-y border-zinc-200 dark:border-zinc-800">
          {[
            { icon: "🚚", title: "Livraison Express", desc: "Chez vous en 24/48h" },
            { icon: "🛡️", title: "Paiement Sécurisé", desc: "Transactions 100% cryptées" },
            { icon: "🍷", title: "Expertise Sommelier", desc: "Sélection rigoureuse" },
            { icon: "🤝", title: "Service Client", desc: "À votre écoute 6j/7" },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-4 px-6">
              <span className="text-4xl">{badge.icon}</span>
              <div>
                <h4 className="font-black font-cavas text-sm uppercase tracking-wider">{badge.title}</h4>
                <p className="text-xs text-zinc-500">{badge.desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Categories Quick Access */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <button 
              key={i}
              className="group bg-white dark:bg-zinc-900 p-8 rounded-[32px] border border-zinc-100 dark:border-zinc-800 hover:border-[#810b15] transition-all duration-500 flex flex-col items-center gap-4 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <span className="text-4xl group-hover:scale-125 transition-transform duration-500">{cat.icon}</span>
              <span className="text-xs font-black uppercase tracking-[0.2em] font-cavas">{cat.label}</span>
            </button>
          ))}
        </section>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-32">
              {filtersData && (
                <FiltersSidebar 
                  data={filtersData} 
                  onFilterChange={setActiveFilters} 
                />
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 space-y-12">
            <div className="flex items-end justify-between border-b-2 border-zinc-100 dark:border-zinc-800 pb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black font-cavas tracking-tighter">
                  {isFiltering ? "Résultats de recherche" : "Sélection du moment"}
                </h2>
                <p className="text-zinc-500 text-lg mt-2 font-medium">
                  {isFiltering 
                    ? `${filteredResults?.pagination.total || 0} pépites dénichées pour vous` 
                    : "L'excellence de notre cave, livrée chez vous."}
                </p>
              </div>
            </div>

            {(isLoadingFeatured || isLoadingFiltered) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-[500px] bg-zinc-100 dark:bg-zinc-900 animate-pulse rounded-3xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {displayProducts?.map((product: any) => (
                  <WineProductCard key={product.id} {...product} />
                ))}
                {displayProducts?.length === 0 && (
                  <div className="col-span-full py-32 text-center space-y-6 bg-white dark:bg-zinc-900 rounded-[40px] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
                    <span className="text-8xl">🍷</span>
                    <h3 className="text-2xl font-black font-cavas">Aucun produit ne correspond à vos critères</h3>
                    <p className="text-zinc-500 max-w-md mx-auto">Essayez de modifier vos filtres ou explorez nos autres catégories pour trouver votre bonheur.</p>
                    <button 
                      onClick={() => setActiveFilters({})}
                      className="bg-[#810b15] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#6a0912] transition-all active:scale-95 shadow-lg shadow-[#810b15]/20"
                    >
                      Réinitialiser tous les filtres
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Promotional Section */}
        <section className="bg-zinc-900 rounded-[48px] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-8">
            <h2 className="text-5xl md:text-6xl font-black text-white font-cavas leading-none tracking-tighter">Rejoignez le club des passionnés</h2>
            <p className="text-zinc-400 text-xl leading-relaxed">Recevez nos offres exclusives, des invitations à des dégustations privées et les conseils personnalisés de nos sommeliers experts.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="email" placeholder="votre@email.com" className="flex-1 bg-white/10 border-none rounded-2xl px-8 py-5 text-white text-lg outline-none focus:ring-2 focus:ring-[#810b15] transition-all" />
              <button className="bg-[#810b15] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#6a0912] transition-all active:scale-95 font-cavas">S'inscrire</button>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#810b15]/30 to-transparent hidden lg:block" />
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#810b15]/20 blur-[120px] rounded-full" />
        </section>

        <WineGuidesSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
