import React from "react";
import { FaWineGlass, FaFilter, FaRedo } from "react-icons/fa";

interface NoResultsProps {
  // Optionnel : un message spécifique si la recherche est très précise
  message?: string;
  // Fonction appelée lorsque l'utilisateur clique pour effacer les filtres
}

export const NoResults: React.FC<NoResultsProps> = ({ message }) => {
  return (
    <div
      className="
      flex flex-col items-center justify-center 
      py-16 px-4 md:px-8 
      bg-gray-50 dark:bg-zinc-800 
      rounded-xl shadow-lg 
      text-center 
      max-w-xl mx-auto
    "
    >
      {/* Icône principale (pour l'ambiance Vin) */}
      <FaWineGlass
        className="
        text-6xl text-red-700 dark:text-red-500 
        mb-6 
        opacity-80
      "
      />

      <h2
        className="
        text-2xl font-bold 
        text-zinc-800 dark:text-gray-100 
        w-full
        mb-2
      "
      >
        {message ? message : "Dommage, aucune trouvaille !"}
      </h2>

      {/* Bonus : Suggestion alternative */}
      <a
        href="/contact"
        className="
        mt-4 
        text-red-700 dark:text-red-500 
        text-sm 
        hover:underline
      "
      >
        {`Besoin d'aide ? Contactez nous !`}
      </a>
    </div>
  );
};
