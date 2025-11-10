const ProductDetailPage = () => {
  return <p>ZOOM</p>;
};

// // app/vins/produit/[id]/page.tsx
// "use client";
// import React, { useState, useEffect } from "react";
// import Header from "@/app/components/Header";
// import {
//   BiCalendar,
//   BiHeart,
//   BiMapPin,
//   BiMinus,
//   BiPlus,
//   BiShield,
//   BiWine,
// } from "react-icons/bi";
// import { CiShare2 } from "react-icons/ci";
// import { SiTarget } from "react-icons/si";
// import { LuGrape } from "react-icons/lu";
// import { CgShoppingCart } from "react-icons/cg";
// import { BsTruck } from "react-icons/bs";
// import { FiRotateCcw } from "react-icons/fi";

// // Types pour la structure des données
// interface Region {
//   id: number;
//   nom: string;
//   pays: string;
// }

// interface Domaine {
//   id: number;
//   nom: string;
//   region_id: number;
//   propri_taire: string;
//   ann_e_fondation: number | null;
//   description: string | null;
// }

// interface Classification {
//   id: number;
//   nom: string;
//   niveau: string;
// }

// interface Cepage {
//   id: number;
//   nom: string;
//   type: string;
//   pourcentage: string;
//   role: string;
// }

// interface Image {
//   url: string;
//   texteAlternatif: string;
// }

// interface ProductData {
//   id: number;
//   nom: string;
//   type: string;
//   categorie: string;
//   region: Region;
//   domaine: Domaine;
//   classification: Classification;
//   style: string;
//   appellation: string;
//   teneurAlcool: string;
//   temperatureService: string;
//   tailleBouteille: string;
//   prix: number | null;
//   cote: string;
//   millesime: number | null;
//   garderJusqua: number | null;
//   allergenes: string;
//   description: string;
//   caracteristiques: string;
//   conseilsDegustation: string;
//   disponible: boolean;
//   quantiteStock: number;
//   bio: boolean;
//   vegetalien: boolean;
//   promotion: number | null;
//   cepages: Cepage[];
//   images: Image[];
//   noteMoyenne: number | null;
//   nombreAvis: number;
// }

// // Composant pour l'affichage des caractéristiques (style Vinatis)
// const ProductInfoBox = ({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactElement;
//   label: string;
//   value: string | number | null;
// }) => (
//   <div className="flex justify-between items-center py-3 border-b border-zinc-200 dark:border-zinc-700 last:border-b-0">
//     <div className="flex items-center space-x-3 text-zinc-600 dark:text-zinc-400">
//       {React.cloneElement(icon, { className: "w-5 h-5 text-[#8B0000]" })}
//       <span className="text-sm">{label}</span>
//     </div>
//     <span className="font-medium text-zinc-900 dark:text-white text-sm">
//       {value || "Non spécifié"}
//     </span>
//   </div>
// );

// // Composant pour la section dégustation (style Vinatis)
// const TastingNotesSection = ({ product }: { product: ProductData }) => {
//   const parseTastingNotes = (notes: string) => {
//     const sections = notes.split(". ").filter((section) => section.trim());
//     return {
//       robe:
//         sections.find((s) => s.toLowerCase().includes("robe")) ||
//         sections[0] ||
//         "",
//       nez:
//         sections.find((s) => s.toLowerCase().includes("nez")) ||
//         sections[1] ||
//         "",
//       bouche:
//         sections.find((s) => s.toLowerCase().includes("bouche")) ||
//         sections[2] ||
//         "",
//     };
//   };

//   const tastingNotes = parseTastingNotes(product.caracteristiques);

//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
//         Notes de dégustation
//       </h3>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {tastingNotes.robe && (
//           <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
//             <div className="w-3 h-3 rounded-full bg-amber-500 mx-auto mb-2"></div>
//             <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">
//               Robe
//             </h4>
//             <p className="text-sm text-zinc-600 dark:text-zinc-300">
//               {tastingNotes.robe}
//             </p>
//           </div>
//         )}
//         {tastingNotes.nez && (
//           <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
//             <div className="w-3 h-3 rounded-full bg-red-400 mx-auto mb-2"></div>
//             <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">
//               Nez
//             </h4>
//             <p className="text-sm text-zinc-600 dark:text-zinc-300">
//               {tastingNotes.nez}
//             </p>
//           </div>
//         )}
//         {tastingNotes.bouche && (
//           <div className="text-center p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
//             <div className="w-3 h-3 rounded-full bg-purple-400 mx-auto mb-2"></div>
//             <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">
//               Bouche
//             </h4>
//             <p className="text-sm text-zinc-600 dark:text-zinc-300">
//               {tastingNotes.bouche}
//             </p>
//           </div>
//         )}
//       </div>
//       {product.conseilsDegustation && (
//         <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
//           <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
//             Conseil du sommelier
//           </h4>
//           <p className="text-sm text-blue-800 dark:text-blue-200">
//             {product.conseilsDegustation}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// // Composant pour la section "À propos du Domaine" (style Vinatis)
// const DomainAboutSection = ({ product }: { product: ProductData }) => (
//   <div className="space-y-4 pt-8 border-t border-zinc-200 dark:border-zinc-700">
//     <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
//       À propos du Domaine {product.domaine.nom}
//     </h3>
//     <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
//       {product.domaine.description ||
//         `Le Domaine ${product.domaine.nom}, situé en ${product.region.nom}, est réputé pour ses vins de l'appellation ${product.appellation}.`}
//     </p>

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//       {product.domaine.propri_taire && (
//         <div className="flex items-center space-x-3">
//           <div className="w-2 h-2 bg-[#8B0000] rounded-full"></div>
//           <div>
//             <p className="text-sm text-zinc-500 dark:text-zinc-400">
//               Propriétaire
//             </p>
//             <p className="font-semibold text-zinc-900 dark:text-white">
//               {product.domaine.propri_taire}
//             </p>
//           </div>
//         </div>
//       )}

//       {product.domaine.ann_e_fondation && (
//         <div className="flex items-center space-x-3">
//           <div className="w-2 h-2 bg-[#8B0000] rounded-full"></div>
//           <div>
//             <p className="text-sm text-zinc-500 dark:text-zinc-400">
//               Fondation
//             </p>
//             <p className="font-semibold text-zinc-900 dark:text-white">
//               {product.domaine.ann_e_fondation}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

// const ProductDetailPage = ({ params }: { params: { id: string } }) => {
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [product, setProduct] = useState<ProductData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Données mockées basées sur l'API fournie
//   const mockProductData: ProductData = {
//     id: 1,
//     nom: "Côtes Du Rhones (Vieilles Vignes)",
//     type: "vin",
//     categorie: "Rouge",
//     region: {
//       id: 2,
//       nom: "Rhône",
//       pays: "France",
//       description: null,
//       climat: null,
//       superficie: null,
//       created_at: "2025-11-05T12:42:47.000Z",
//       updated_at: "2025-11-05T12:42:47.000Z",
//     },
//     domaine: {
//       id: 9,
//       nom: "Domaine Vignobles Brunier",
//       region_id: 2,
//       propri_taire: "Famille Brunier",
//       ann_e_fondation: 1990,
//       description:
//         "Domaine rhodanien réputé pour ses Côtes-du-Rhône de terroir. La famille Brunier perpétue depuis plusieurs générations une tradition viticole d'excellence dans la vallée du Rhône.",
//       adresse: "84370 Bédoin",
//       site_web: "www.vignobles-brunier.com",
//       created_at: "2025-11-08T21:43:10.000Z",
//       updated_at: "2025-11-08T21:43:10.000Z",
//     },
//     classification: {
//       id: 3,
//       nom: "Petite crue",
//       niveau: "Petite_crue",
//       region_id: null,
//       description: null,
//       ann_e_creation: null,
//     },
//     style: "vin_rouge",
//     appellation: "Côtes-du-Rhône",
//     teneurAlcool: "13.5",
//     temperatureService: "16-18°C",
//     tailleBouteille: "75cl",
//     prix: 15.9,
//     cote: "3.4",
//     millesime: 2022,
//     garderJusqua: 2028,
//     allergenes: "Sulfites",
//     description:
//       "Vin d'assemblage maîtrisé exprimant la typicité de son terroir. Équilibre parfait entre fruit et structure.",
//     caracteristiques:
//       "Robe rubis profond. Nez intense de fruits rouges mûrs et d'épices douces. Bouche ronde et généreuse avec une belle persistance.",
//     conseilsDegustation:
//       "Servir entre 16 et 18°C. Idéal avec des plats en sauce, des volailles rôties ou des fromages à pâte persillée.",
//     disponible: true,
//     quantiteStock: 50,
//     bio: false,
//     vegetalien: false,
//     promotion: 10,
//     cepages: [
//       {
//         id: 2,
//         nom: "Grenache",
//         type: "rouge",
//         pourcentage: "60",
//         role: "principal",
//       },
//       {
//         id: 6,
//         nom: "Syrah",
//         type: "rouge",
//         pourcentage: "30",
//         role: "secondaire",
//       },
//       {
//         id: 3,
//         nom: "Cinsault",
//         type: "rouge",
//         pourcentage: "10",
//         role: "assemblage",
//       },
//     ],
//     images: [
//       {
//         url: "/images/vin-rhone-1.jpg",
//         texteAlternatif: "Bouteille Côtes du Rhône Vieilles Vignes",
//       },
//       {
//         url: "/images/vin-rhone-2.jpg",
//         texteAlternatif: "Étiquette détaillée du vin",
//       },
//       {
//         url: "/images/vin-rhone-3.jpg",
//         texteAlternatif: "Verre de dégustation",
//       },
//     ],
//     noteMoyenne: 4.2,
//     nombreAvis: 24,
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         setTimeout(() => {
//           setProduct(mockProductData);
//           setLoading(false);
//         }, 500);
//       } catch (err) {
//         setError("Erreur lors du chargement du produit");
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [params.id]);

//   const hasPromotion = product?.promotion && product.promotion > 0;
//   const prixPromo =
//     hasPromotion && product?.prix
//       ? product.prix * (1 - product.promotion / 100)
//       : product?.prix || 0;

//   const incrementQuantity = () => setQuantity((prev) => prev + 1);
//   const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

//   const handleAddToCart = () => {
//     if (!product) return;
//     console.log(`Ajout ${quantity} x ${product.nom} au panier`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-zinc-900">
//         <Header />
//         <div className="container mx-auto px-4 pt-24 pb-16">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-lg text-zinc-600 dark:text-zinc-400">
//               Chargement du produit...
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-zinc-900">
//         <Header />
//         <div className="container mx-auto px-4 pt-24 pb-16">
//           <div className="flex items-center justify-center h-64">
//             <div className="text-lg text-red-600 dark:text-red-400">
//               {error || "Produit non trouvé"}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white dark:bg-zinc-900">
//       <Header />

//       {/* Fil d'Ariane amélioré */}
//       <div className="container mx-auto px-4 pt-24 pb-4">
//         <nav className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center space-x-2">
//           <span className="hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer">
//             Accueil
//           </span>
//           <span>/</span>
//           <span className="hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer">
//             Vins
//           </span>
//           <span>/</span>
//           <span className="hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer">
//             Vins Rouges
//           </span>
//           <span>/</span>
//           <span className="hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer">
//             Rhône
//           </span>
//           <span>/</span>
//           <span className="text-zinc-800 dark:text-zinc-200 font-medium">
//             {product.nom}
//           </span>
//         </nav>
//       </div>

//       <div className="container mx-auto px-4 pb-16">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
//           {/* Colonne 1: Images et caractéristiques */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Image principale avec badge promotion */}
//             <div className="relative aspect-[3/4] bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden">
//               {product.images.length > 0 ? (
//                 <>
//                   <img
//                     src={product.images[selectedImage].url}
//                     alt={product.images[selectedImage].texteAlternatif}
//                     className="w-full h-full object-cover"
//                   />
//                   {hasPromotion && (
//                     <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                       -{product.promotion}%
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center text-zinc-400">
//                   <BiWine className="w-16 h-16" />
//                 </div>
//               )}
//             </div>

//             {/* Gallery d'images */}
//             {product.images.length > 1 && (
//               <div className="flex space-x-3 overflow-x-auto pb-2">
//                 {product.images.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
//                       selectedImage === index
//                         ? "border-[#8B0000] shadow-md"
//                         : "border-transparent hover:border-zinc-300"
//                     }`}
//                   >
//                     <img
//                       src={image.url}
//                       alt=""
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* Caractéristiques techniques */}
//             <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
//               <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
//                 Caractéristiques
//               </h3>
//               <div className="space-y-1">
//                 <ProductInfoBox
//                   icon={<BiMapPin />}
//                   label="Appellation"
//                   value={product.appellation}
//                 />
//                 <ProductInfoBox
//                   icon={<LuGrape />}
//                   label="Cépage"
//                   value={product.cepages.map((c) => c.nom).join(", ")}
//                 />
//                 <ProductInfoBox
//                   icon={<BiCalendar />}
//                   label="Millésime"
//                   value={product.millesime}
//                 />
//                 <ProductInfoBox
//                   icon={<BiWine />}
//                   label="Alcool"
//                   value={`${product.teneurAlcool}% vol`}
//                 />
//                 <ProductInfoBox
//                   icon={<BiCalendar />}
//                   label="Garde"
//                   value={
//                     product.garderJusqua
//                       ? `Jusqu'en ${product.garderJusqua}`
//                       : "À boire maintenant"
//                   }
//                 />
//                 <ProductInfoBox
//                   icon={<BiShield />}
//                   label="Température"
//                   value={product.temperatureService}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Colonne 2: Informations et Achat */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* En-tête produit style Vinatis */}
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <span className="text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
//                     {product.region.nom} • {product.appellation}
//                   </span>
//                   {product.bio && (
//                     <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-xs font-medium">
//                       BIO
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => setIsFavorite(!isFavorite)}
//                     className={`p-2 rounded-full transition-colors ${
//                       isFavorite
//                         ? "text-red-500 bg-red-50 dark:bg-red-900/20"
//                         : "text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
//                     }`}
//                   >
//                     <BiHeart
//                       className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
//                     />
//                   </button>
//                   <button className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
//                     <CiShare2 className="w-5 h-5" />
//                   </button>
//                 </div>
//               </div>

//               <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-white leading-tight">
//                 {product.nom}
//               </h1>

//               {/* Rating et domaine */}
//               <div className="flex items-center space-x-6">
//                 {product.noteMoyenne && (
//                   <>
//                     <div className="flex items-center space-x-2">
//                       <div className="flex">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <SiTarget
//                             key={star}
//                             className={`w-4 h-4 ${
//                               star <= Math.round(product.noteMoyenne!)
//                                 ? "text-yellow-400 fill-current"
//                                 : "text-zinc-300"
//                             }`}
//                           />
//                         ))}
//                       </div>
//                       <span className="text-sm text-zinc-600 dark:text-zinc-400">
//                         {product.noteMoyenne}/5 ({product.nombreAvis} avis)
//                       </span>
//                     </div>
//                     <span className="text-zinc-400">•</span>
//                   </>
//                 )}
//                 <span className="text-sm text-zinc-600 dark:text-zinc-400">
//                   Domaine{" "}
//                   <strong className="text-[#8B0000]">
//                     {product.domaine.nom}
//                   </strong>
//                 </span>
//               </div>
//             </div>

//             {/* Section Prix et Achat style Vinatis */}
//             <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-700">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Colonne Prix */}
//                 <div className="md:col-span-1 space-y-3">
//                   {hasPromotion ? (
//                     <div className="space-y-2">
//                       <span className="inline-block bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded text-xs font-semibold">
//                         PROMOTION {product.promotion}%
//                       </span>
//                       <div className="flex items-baseline space-x-3">
//                         <span className="text-3xl font-bold text-[#8B0000]">
//                           {prixPromo.toFixed(2)}€
//                         </span>
//                         <span className="text-lg text-zinc-400 line-through">
//                           {product.prix!.toFixed(2)}€
//                         </span>
//                       </div>
//                     </div>
//                   ) : (
//                     <span className="text-3xl font-bold text-[#8B0000]">
//                       {product.prix
//                         ? `${product.prix.toFixed(2)}€`
//                         : "Prix non disponible"}
//                     </span>
//                   )}
//                   <p className="text-xs text-zinc-500 dark:text-zinc-400">
//                     Prix TTC / bouteille de {product.tailleBouteille}
//                   </p>
//                 </div>

//                 {/* Colonne Quantité et Actions */}
//                 <div className="md:col-span-2 space-y-4">
//                   <div className="flex items-center space-x-4">
//                     <span className="text-base font-semibold text-zinc-900 dark:text-white">
//                       Quantité :
//                     </span>
//                     <div className="flex items-center space-x-3 bg-white dark:bg-zinc-700 rounded-full border border-zinc-300 dark:border-zinc-600">
//                       <button
//                         onClick={decrementQuantity}
//                         className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50"
//                         disabled={quantity === 1}
//                       >
//                         <BiMinus className="w-4 h-4" />
//                       </button>
//                       <span className="w-8 text-center font-semibold text-base">
//                         {quantity}
//                       </span>
//                       <button
//                         onClick={incrementQuantity}
//                         className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-colors"
//                       >
//                         <BiPlus className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <button
//                       onClick={handleAddToCart}
//                       disabled={!product.disponible || !product.prix}
//                       className="flex-1 bg-[#8B0000] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#700000] transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <CgShoppingCart className="w-5 h-5" />
//                       <span>
//                         {!product.prix
//                           ? "Prix non disponible"
//                           : !product.disponible
//                           ? "Non disponible"
//                           : `Ajouter au panier`}
//                       </span>
//                     </button>

//                     {product.prix && product.disponible && (
//                       <button className="px-6 py-3 border-2 border-[#8B0000] text-[#8B0000] rounded-lg font-semibold hover:bg-[#8B0000] hover:text-white transition-colors whitespace-nowrap">
//                         Acheter maintenant
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Garanties style Vinatis */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-zinc-200 dark:border-zinc-700">
//               <div className="flex items-center space-x-3 text-sm text-zinc-700 dark:text-zinc-300">
//                 <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//                   <BsTruck className="w-5 h-5 text-green-600 dark:text-green-400" />
//                 </div>
//                 <div>
//                   <p className="font-semibold">Livraison rapide</p>
//                   <p className="text-zinc-500 dark:text-zinc-400">Sous 48h</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3 text-sm text-zinc-700 dark:text-zinc-300">
//                 <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
//                   <BiShield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
//                 </div>
//                 <div>
//                   <p className="font-semibold">Paiement sécurisé</p>
//                   <p className="text-zinc-500 dark:text-zinc-400">SSL crypté</p>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-3 text-sm text-zinc-700 dark:text-zinc-300">
//                 <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
//                   <FiRotateCcw className="w-5 h-5 text-amber-600 dark:text-amber-400" />
//                 </div>
//                 <div>
//                   <p className="font-semibold">Retour facile</p>
//                   <p className="text-zinc-500 dark:text-zinc-400">30 jours</p>
//                 </div>
//               </div>
//             </div>

//             {/* Contenu détaillé */}
//             <div className="space-y-8 py-6">
//               {/* Description */}
//               <div className="space-y-4">
//                 <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
//                   Description
//                 </h2>
//                 <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
//                   {product.description}
//                 </p>
//               </div>

//               {/* Notes de dégustation */}
//               <TastingNotesSection product={product} />

//               {/* À propos du domaine */}
//               <DomainAboutSection product={product} />

//               {/* Section Avis */}
//               <div className="pt-8 border-t border-zinc-200 dark:border-zinc-700">
//                 <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">
//                   Avis clients ({product.nombreAvis})
//                 </h3>
//                 {product.noteMoyenne ? (
//                   <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
//                     <div className="flex items-center space-x-4 mb-4">
//                       <div className="flex items-center space-x-1">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <SiTarget
//                             key={star}
//                             className={`w-5 h-5 ${
//                               star <= Math.round(product.noteMoyenne!)
//                                 ? "text-yellow-400 fill-current"
//                                 : "text-zinc-300"
//                             }`}
//                           />
//                         ))}
//                       </div>
//                       <span className="text-2xl font-bold text-zinc-900 dark:text-white">
//                         {product.noteMoyenne}/5
//                       </span>
//                     </div>
//                     <p className="text-zinc-600 dark:text-zinc-400">
//                       {product.nombreAvis > 0
//                         ? "Nos clients apprécient particulièrement l'équilibre et la structure de ce vin rhodanien."
//                         : "Soyez le premier à laisser un avis sur ce vin !"}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="text-center py-8">
//                     <p className="text-zinc-600 dark:text-zinc-400">
//                       Aucun avis pour le moment.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default ProductDetailPage;
