"use client";
// components/FeaturedCategories.tsx
import React from "react";
import CategoryCard from "./CategoryCard";

// Les données des catégories, y compris les chemins vers les images
const categories = [
  {
    title: "VINS",
    backgroundImage: "/images/vins.jpg",
    link: "/grands-vins",
    colSpan: "lg:col-span-1",
  },
  {
    title: "GRANDS VINS",
    backgroundImage: "/images/grand-vins.jpg",
    link: "/grands-vins",
    colSpan: "lg:col-span-1",
  },
  {
    title: "CHAMPAGNES ",
    backgroundImage: "/images/champagne.webp",
    link: "/champagnes-promo",
    colSpan: "lg:col-span-1",
  },
  {
    title: "SPIRITUEUX",
    backgroundImage: "/images/spiritieux.jpg",
    link: "/spiritueux-promo",
    colSpan: "lg:col-span-1",
  },
];

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900">
      <h2 className="text-3xl font-bold text-center mb-10 text-zinc-900 dark:text-white">
        Catégories en vedette
      </h2>

      {/* Grille principale flexible */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
        {/* --- Ligne 1 : 4 cartes (prend 2 colonnes chacune sur mobile/sm, 3 colonnes sur md, 1.5 sur lg) --- */}
        {categories.slice(0, 4).map((category, index) => (
          <CategoryCard
            key={index}
            {...category}
            // Utilise 3 colonnes sur les grands écrans pour les 4 premières cartes
            className="col-span-2 lg:col-span-3 xl:col-span-3"
            // Note: Vous devrez ajuster la taille exacte de l'image de fond
          />
        ))}

        {/* --- Ligne 2 & 3 : 6 cartes (prend 3 colonnes chacune sur mobile/sm, 2 sur md, 2 sur lg) --- */}
        {categories.slice(4).map((category, index) => (
          <CategoryCard
            key={index + 4}
            {...category}
            // Utilise 2 colonnes sur les grands écrans
            className="col-span-2 sm:col-span-3 md:col-span-3 lg:col-span-2"
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
