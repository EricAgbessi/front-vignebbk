// components/WineGuidesSection.tsx
import React from "react";
import { FaStar } from "react-icons/fa";

// --- Données pour les articles sur les vins et spiritueux ---
const guidesData: GuideItemProps[] = [
  {
    title: "Les grands crus bordelais",
    text: "Découvrez l'excellence des vins de Bordeaux, des premiers grands crus classés aux pépites méconnues. Apprenez à reconnaître les appellations prestigieuses et leurs caractéristiques uniques.",
    link: "#",
    orientation: "vertical", // Court → vertical
  },
  {
    title: "Guide des accords mets & vins",
    text: "Maîtrisez l'art de l'accord parfait entre vos plats et vos vins. Fromages, viandes, poissons, desserts : trouvez le compagnon idéal pour chaque moment de dégustation. Nos sommeliers vous dévoilent leurs secrets pour des associations réussies qui sublimeront vos repas.",
    link: "#",
    orientation: "horizontal", // Long → horizontal
  },
  {
    title: "Champagne : brut vs extra-brut",
    text: "Comprenez les différences entre les différents types de champagne. Du brut à l'extra-brut en passant par le sec, apprenez à choisir selon vos préférences et l'occasion.",
    link: "#",
    orientation: "vertical",
  },
  {
    title: "Les cépages français expliqués",
    text: "Le Merlot, le Cabernet Sauvignon, le Chardonnay, le Syrah... Chaque cépage raconte une histoire et exprime un terroir. Ce guide complet vous aide à comprendre leurs caractéristiques, leurs arômes typiques et les régions où ils s'épanouissent le mieux. De la Bourgogne à la Vallée du Rhône, devenez expert en reconnaissance des cépages.",
    link: "#",
    orientation: "horizontal",
  },
  {
    title: "Cognac : VS, VSOP, XO",
    text: "Apprenez à décrypter les classifications des cognacs. Quelle différence entre un VS et un XO ? Comment choisir selon l'âge et le profil aromatique ?",
    link: "#",
    orientation: "vertical",
  },
  {
    title: "La dégustation du vin en 5 étapes",
    text: "La robe, le nez, la bouche... Maîtrisez les bases de la dégustation comme un professionnel. Ce guide pas à pas vous apprendra à observer la couleur, analyser les arômes, apprécier la texture en bouche et reconnaître la longueur en finale. Des exercices pratiques vous aideront à développer votre palais et votre vocabulaire de dégustateur.",
    link: "#",
    orientation: "horizontal",
  },
  {
    title: "Vins bio et naturels",
    text: "Explorez l'univers des vins respectueux de l'environnement. Qu'est-ce qui différencie un vin bio d'un vin naturel ? Quelles garanties et quels labels ?",
    link: "#",
    orientation: "vertical",
  },
  {
    title: "Les millésimes exceptionnels",
    text: "2015, 2016, 2018... Retour sur les grandes années du vin français. Ce guide détaillé analyse les conditions climatiques qui ont marqué chaque millésime, leur potentiel de garde et les appellations qui ont le plus brillé. Apprenez à repérer les bouteilles qui prendront de la valeur et celles qui sont à boire maintenant.",
    link: "#",
    orientation: "horizontal",
  },
  {
    title: "Service du vin : températures idéales",
    text: "Ne commettez plus l'erreur de servir un vin rouge trop chaud ou un blanc trop froid. Découvrez les températures parfaites pour chaque type de vin.",
    link: "#",
    orientation: "vertical",
  },
  {
    title: "Les vins du Nouveau Monde",
    text: "Voyagez à travers les vins d'Amérique, d'Australie et d'Afrique du Sud. Ce tour d'horizon complet vous présente les régions émergentes, leurs cépages emblématiques et leurs styles uniques. Découvrez comment les vins californiens, chiliens ou sud-africains rivalisent avec les grands crus européens et quelles sont les pépites à ne pas manquer.",
    link: "#",
    orientation: "horizontal",
  },
  {
    title: "Conservation du vin",
    text: "Apprenez les bonnes pratiques pour conserver vos bouteilles dans les conditions optimales. Cave, cellier ou armoire à vin ?",
    link: "#",
    orientation: "vertical",
  },
  {
    title: "Les appellations bourguignonnes",
    text: "De Chablis à Beaujolais, plongez au cœur de la complexité des terroirs bourguignons. Ce guide exhaustif décrypte le système des climats, des premiers crus aux grands crus, et vous aide à naviguer parmi les hundreds d'appellations. Comprenez pourquoi un Pommard diffère d'un Volnay et comment identifier les valeurs sûres de cette région mythique.",
    link: "#",
    orientation: "horizontal",
  },
];

// --- Composant réutilisable pour chaque bloc de guide ---
interface GuideItemProps {
  title: string;
  text: string;
  link: string;
  orientation: "vertical" | "horizontal";
}

const GuideItem: React.FC<GuideItemProps> = ({
  title,
  text,
  link,
  orientation,
}) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={`
        p-6 border border-gray-200 dark:border-zinc-700 rounded-lg
        bg-white dark:bg-zinc-800 hover:shadow-md transition-all duration-300
        ${isHorizontal ? "col-span-1 md:col-span-2" : "col-span-1"}
      `}
    >
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 font-cavas">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
        {text}
      </p>
      {/* <a
        href={link}
        className="inline-flex items-center text-sm font-semibold text-[#810b15] dark:text-[#810b15] hover:underline transition-colors"
      >
        Lire l'article complet ›
      </a> */}
    </div>
  );
};

// --- Composant principal ---
const WineGuidesSection: React.FC = () => {
  return (
    <section className="py-16 bg-zinc-50 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête principal */}
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-[#810b15] dark:text-[#810b15] flex items-center justify-center font-cavas">
            <FaStar className="mr-2" />
            VIGNEBBK • LE MAG
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mt-4 font-cavas">
            Guide du Connaisseur
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl mx-auto">
            Tout ce que vous devez savoir sur les vins, champagnes et spiritueux
          </p>
        </div>

        {/* --- Grille adaptive avec articles verticaux et horizontaux --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guidesData.map((guide, index) => (
            <GuideItem key={index} {...guide} />
          ))}
        </div>

        {/* Note informative */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Tous nos articles sont rédigés par nos experts sommeliers
          </p>
        </div>
      </div>
    </section>
  );
};

export default WineGuidesSection;
