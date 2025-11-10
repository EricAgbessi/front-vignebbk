"use client";
import React, { useState } from "react";

const tabs = [
  { id: "details", label: "Informations détaillées" },
  { id: "notes", label: "Notes de dégustations" },
  { id: "avis", label: "Avis clients" },
  { id: "accords", label: "Service / Accords mets & vins" },
];

export default function ProductTabs() {
  const [active, setActive] = useState("details");

  return (
    <div className="w-full mt-10">
      {/* Onglets */}
      <div className="flex flex-wrap border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 text-sm font-medium ${
              active === tab.id
                ? "border-b-2 border-pink-600 text-pink-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div className="mt-6">
        {active === "details" && (
          <p className="text-gray-700 dark:text-gray-300">
            Détails du Bourgogne Chardonnay 2023...
          </p>
        )}
        {active === "notes" && <p>Notes de dégustation à venir.</p>}
        {active === "avis" && <p>71 avis clients disponibles.</p>}
        {active === "accords" && (
          <p>À servir avec un poisson ou une viande blanche.</p>
        )}
      </div>
    </div>
  );
}
