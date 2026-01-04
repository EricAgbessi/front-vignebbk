"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaStar, FaExpand, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Product3DModal from "./Product3DModal";
import { getProductImage } from "../utils/imageUtils";
import { useCart } from "../context/CartContext";

interface WineProductCardProps {
  id: string | number;
  nom: string;
  type: string;
  cat_gorie?: string;
  region?: string;
  domaine?: string;
  appellation?: string;
  teneur_alcool?: string;
  taille_bouteille?: string;
  prix: number;
  promotion?: number;
  style?: string;
  cote?: number;
  millesime?: string;
  description?: string;
  caract_ristiques?: string;
  bio?: boolean;
  v_g_talien?: boolean;
  quantit__stock?: number;
  images?: string[];
  note_moyenne?: number;
  nombre_avis?: number;
  modele3D?: string;
  modeleType?: string;
}

const WineProductCard: React.FC<WineProductCardProps> = ({
  id,
  nom,
  type,
  cat_gorie,
  region,
  domaine,
  appellation,
  teneur_alcool,
  taille_bouteille = "75cl",
  prix,
  promotion,
  style,
  cote,
  millesime,
  description,
  caract_ristiques,
  bio,
  v_g_talien,
  quantit__stock = 0,
  images = [],
  note_moyenne = 0,
  nombre_avis = 0,
  modele3D = "wine.glb",
  modeleType = "glb",
}) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [show3DModal, setShow3DModal] = useState(false);

  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const currentPrice = promotion ? prix * (1 - promotion / 100) : prix;

  const handleAddToCart = () => {
    addToCart({ id, nom, prix: currentPrice, images, type, style }, quantity);
  };

  const getCategoryColor = (productType: string, style?: string) => {
    switch (productType?.toLowerCase()) {
      case "vin":
        if (style === "vin_rouge") return "bg-[#810b15]";
        if (style === "vin_rose") return "bg-[#c97442]";
        return "bg-[#DCC22C]";
      case "champagne": return "bg-amber-600";
      case "cognac": return "bg-amber-800";
      default: return "bg-[#810b15]";
    }
  };

  const getCategoryText = (productType: string, category?: string) => {
    const baseType = productType?.charAt(0).toUpperCase() + productType?.slice(1);
    return category && category !== productType ? `${baseType} • ${category}` : baseType;
  };

  return (
    <>
      <div className="group w-full bg-white dark:bg-zinc-900 rounded-[24px] shadow-sm hover:shadow-2xl transition-all duration-700 border border-zinc-100 dark:border-zinc-800 overflow-hidden flex flex-col h-full">
        {/* Category Header */}
        <div className={`${getCategoryColor(type, style)} text-white text-center py-1.5 font-black text-[8px] uppercase tracking-[0.3em] font-cavas`}>
          {getCategoryText(type, cat_gorie)}
        </div>

        <div className="p-5 flex flex-col h-full gap-4">
          <div className="flex gap-5">
            {/* Image Section */}
            <div className="w-1/3 aspect-[3/4] relative rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-800/50 p-2">
              <Image
                src={(images && images.length > 0) ? images[currentImageIndex] : getProductImage(images, type, style)}
                alt={nom}
                fill
                className="object-contain p-2 group-hover:scale-110 transition-transform duration-1000 ease-out"
                sizes="(max-width: 768px) 30vw, 15vw"
              />

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                {bio && <span className="bg-green-500 text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider shadow-lg shadow-green-500/20">BIO</span>}
                {promotion && promotion > 0 && <span className="bg-red-500 text-white text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider shadow-lg shadow-red-500/20">-{promotion}%</span>}
              </div>

              {/* 3D Trigger Overlay */}
              {modele3D && (
                <button 
                  onClick={(e) => { e.preventDefault(); setShow3DModal(true); }}
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100"
                >
                  <div className="bg-white/95 p-2.5 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <FaExpand className="text-[#810b15]" size={14} />
                  </div>
                </button>
              )}
            </div>

            {/* Info Section */}
            <div className="w-2/3 flex flex-col">
              <div className="flex justify-between items-start gap-2">
                <Link href={`/pages/produit/${id}`} className="flex-1">
                  <h3 className="text-base font-black text-zinc-900 dark:text-white font-cavas line-clamp-2 leading-tight tracking-tight hover:text-[#810b15] transition-colors">{nom}</h3>
                </Link>
                <button onClick={() => setIsFavorite(!isFavorite)} className={`transition-all duration-300 hover:scale-110 ${isFavorite ? "text-[#810b15]" : "text-zinc-200 hover:text-[#810b15]"}`}>
                  <FaHeart size={18} />
                </button>
              </div>

              <div className="mt-2 space-y-1">
                {millesime && <p className="text-[10px] font-black text-[#810b15] uppercase tracking-widest">{millesime}</p>}
                {domaine && <p className="text-[10px] text-zinc-600 dark:text-zinc-400 font-bold truncate">{domaine}</p>}
                <div className="flex flex-wrap gap-1 mt-1">
                  {region && <span className="text-[8px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 font-black uppercase tracking-tighter">{region}</span>}
                  {appellation && <span className="text-[8px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 font-black uppercase tracking-tighter">{appellation}</span>}
                </div>
              </div>

              {/* Technical Details Grid */}
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-zinc-50 dark:border-zinc-800/50 pt-3">
                <div className="flex flex-col">
                  <span className="text-[8px] text-zinc-400 uppercase font-black">Alcool</span>
                  <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">{teneur_alcool || "13.5%"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] text-zinc-400 uppercase font-black">Format</span>
                  <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">{taille_bouteille}</span>
                </div>
              </div>

              {/* Food Pairing - More Info */}
              <div className="mt-3 flex gap-2">
                <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-800/50 px-1.5 py-0.5 rounded text-[8px] font-bold text-zinc-500 uppercase">
                  <span>🥩 Viande</span>
                </div>
                <div className="flex items-center gap-1 bg-zinc-50 dark:bg-zinc-800/50 px-1.5 py-0.5 rounded text-[8px] font-bold text-zinc-500 uppercase">
                  <span>🧀 Fromage</span>
                </div>
              </div>

              {nombre_avis > 0 && (
                <div className="mt-3 flex items-center gap-1.5 bg-zinc-50 dark:bg-zinc-800/50 px-2 py-1 rounded-lg w-fit">
                  <FaStar className="text-yellow-500" size={10} />
                  <span className="text-[10px] font-black">{cote ? `${cote}/20` : note_moyenne.toFixed(1)}</span>
                  <span className="text-[9px] text-zinc-400 font-bold">({nombre_avis})</span>
                </div>
              )}

              <div className="mt-auto pt-4 flex items-end justify-between">
                <div className="flex flex-col">
                  {promotion && promotion > 0 && (
                    <span className="text-[10px] text-zinc-400 line-through font-bold">{formatPrice(prix)}</span>
                  )}
                  <span className="text-xl font-black text-zinc-900 dark:text-white tracking-tighter">{formatPrice(currentPrice)}</span>
                </div>
                
                <div className="text-[9px] font-black text-green-600 dark:text-green-500 uppercase tracking-widest">
                  {quantit__stock > 0 ? "En Stock" : "Épuisé"}
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex gap-2 pt-2">
            <div className="relative w-16">
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                disabled={quantit__stock === 0}
                className="w-full h-10 pl-2 pr-6 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-[10px] font-black appearance-none focus:border-[#810b15] outline-none disabled:opacity-50 transition-all"
              >
                {[...Array(Math.min(10, quantit__stock || 1))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <IoIosArrowDown className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={12} />
            </div>
            <button
              onClick={handleAddToCart}
              disabled={quantit__stock === 0}
              className="flex-1 h-10 bg-[#810b15] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#6a0912] transition-all active:scale-95 disabled:opacity-50 font-cavas shadow-md shadow-[#810b15]/10"
            >
              {quantit__stock === 0 ? "Épuisé" : "Ajouter"}
            </button>
          </div>
        </div>
      </div>

      {show3DModal && (
        <Product3DModal
          isOpen={show3DModal}
          onClose={() => setShow3DModal(false)}
          modele3D={modele3D}
          nom={nom}
          domaine={domaine}
          millesime={millesime}
        />
      )}
    </>
  );
};

export default WineProductCard;
