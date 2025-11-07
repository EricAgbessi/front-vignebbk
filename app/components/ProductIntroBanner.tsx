// components/ProductIntroBanner.tsx
import React from "react";

interface ProductIntroBannerProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  backgroundImageUrl: string; // Chemin vers l'image de fond
  link: string; // URL où le bouton redirige (ex: '/best-sellers')
}

const ProductIntroBanner: React.FC<ProductIntroBannerProps> = ({
  title,
  subtitle,
  buttonText = "Voir tout",
  backgroundImageUrl,
  link,
}) => {
  return (
    <div className="w-full max-w-full mx-auto px-4 sm:px-6 h-[100px] lg:px-8 py-8 md:py-12">
      <div
        className="relative h-48 md:h-[100px] rounded-t-3xl overflow-hidden shadow-2xl"
        style={{
          // Image de fond
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Calque de superposition sombre pour la lisibilité du texte */}
        <div className="absolute h-[100px] inset-0 bg-black bg-opacity-60 flex items-center justify-between p-6 md:p-10">
          {/* Bloc de Texte (Titre et Sous-titre) */}
          <div className="text-white max-w-md">
            <p className="text-lg md:text-lg font-extrabold mb-2 leading-tight">
              {/* Le cœur est codé directement pour le style de l'image */}
              {title}{" "}
            </p>
            <p className="text-sm md:text-md opacity-90">{subtitle}</p>
          </div>

          {/* Bouton Voir Tout */}
          <a href={link} className="flex-shrink-0">
            <button className="bg-white text-zinc-900 px-6 py-3 font-semibold text-sm uppercase rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-200">
              {buttonText}
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductIntroBanner;
