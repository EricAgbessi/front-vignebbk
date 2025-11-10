import React from "react";

const ProductZoom = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-white dark:bg-zinc-900 min-h-screen p-6">
      {/* --- Image du produit --- */}
      <div className="flex-1 flex justify-center items-start">
        <img
          src="/images/slide-1.jpeg"
          alt="Bourgogne Chardonnay 2023"
          className="max-w-md w-full h-auto rounded-lg shadow-md"
        />
      </div>

      {/* --- Détails produit --- */}
      <div className="flex-[1.5] space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bourgogne Chardonnay 2023 – Carillon des Moines
        </h1>

        <p className="text-sm text-gray-500">
          Blanc • Bourgogne • Bourgogne AOC • 12.5% vol
        </p>

        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-lg font-semibold">
            ★ 16.4/20
          </span>
          <span className="text-gray-500 text-sm">(71 avis clients)</span>
          <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
            TOP 15 FRANCE
          </span>
        </div>

        <p className="text-sm text-gray-800 dark:text-gray-300">
          Médaille d’argent Concours Prix-Plaisir – Bettane & Desseauve 2025
        </p>

        <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400 rounded">
          <p className="font-semibold text-gray-700">
            La cuvée idéale pour découvrir l’incontournable cépage bourguignon !
          </p>
          <p className="text-sm text-gray-600">
            Le meilleur rapport qualité-prix !
          </p>
        </div>

        <p className="text-gray-700 dark:text-gray-300">
          Ce Chardonnay exprime toute sa typicité dans cette cuvée ! Gourmand,
          arômes de fruits blancs, fraîcheur et minéralité… un régal pour les
          amateurs.
        </p>
      </div>

      {/* --- Bloc panier --- */}
      <aside className="flex-1 bg-gray-50 dark:bg-zinc-800 p-6 rounded-lg shadow-lg space-y-4 max-w-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold">11,90€</span>
          </div>
          <div className="text-sm text-gray-500">
            <span className="block line-through">9,90€</span>
            <span className="text-green-600 font-semibold">-16%</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            defaultValue={1}
            className="w-16 border rounded-md text-center"
          />
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md">
            Ajouter au panier
          </button>
        </div>

        <div className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
          <p>🚚 Livraison 24h offerte dès 12 bouteilles achetées</p>
          <p>🍇 Sélection dégustée & approuvée</p>
          <p>📦 Emballage anti-casse</p>
        </div>
      </aside>
    </div>
  );
};

export default ProductZoom;
