"use client";
// components/CategoryCard.tsx
import React from "react";

interface CategoryCardProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  bgColor: string; // Ex: 'bg-purple-900' ou 'bg-gray-800'
  backgroundImage: string; // URL ou chemin vers l'image
  isOverlay?: boolean; // Vrai si le contenu est superposé à une image
  className?: string; // Classes Tailwind supplémentaires pour la carte
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  subtitle,
  buttonText = "DÉCOUVRIR",
  backgroundImage,
  isOverlay = true,
  className = "",
  link,
}) => {
  // Styles pour la superposition de texte (si isOverlay est vrai)
  const overlayClasses = isOverlay
    ? "absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 md:p-6 text-white"
    : "relative flex flex-col justify-end p-4 md:p-6";

  return (
    <a
      href={link}
      className={`relative h-48 md:h-56 overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-[1.02] ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={overlayClasses}>
        <h3
          className={`text-xl md:text-2xl font-bold ${
            isOverlay ? "text-white" : "text-zinc-900 dark:text-white"
          }`}
        >
          {title}
        </h3>
        {subtitle && <p className="text-sm mt-1 opacity-80">{subtitle}</p>}
        <button className="mt-3 w-max px-4 py-2 bg-white text-zinc-900 text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-gray-200 transition-colors duration-200">
          {buttonText}
        </button>
      </div>
    </a>
  );
};

export default CategoryCard;
