"use client";

import React, { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useProductById } from "@/app/hooks/useProducts";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaHeart, FaStar, FaExpand, FaShoppingCart, FaTruck, FaShieldAlt, FaUndo } from "react-icons/fa";
import Product3DModal from "@/app/components/Product3DModal";
import { getProductImage } from "@/app/utils/imageUtils";
import { useCart } from "@/app/context/CartContext";

const ProductDetailPage = () => {
  const params = useParams();
  const idOrSlug = params.id as string;
  const { addToCart } = useCart();
  
  const { data: product, isLoading } = useProductById(idOrSlug);
  
  const [quantity, setQuantity] = useState(1);
  const [show3DModal, setShow3DModal] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#810b15] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const p = product || {
    id: "demo",
    nom: idOrSlug.replace(/-/g, ' ').toUpperCase(),
    type: "vin",
    style: "vin_rouge",
    prix: 45000,
    domaine: "Domaine de l'Excellence",
    region: "Bordeaux",
    appellation: "Saint-Émilion Grand Cru",
    millesime: "2018",
    teneur_alcool: "14.5%",
    taille_bouteille: "75cl",
    description: "Un vin d'une profondeur exceptionnelle, aux notes de fruits noirs mûrs, de sous-bois et d'épices douces. Les tanins sont soyeux et la finale d'une persistance remarquable.",
    caract_ristiques: "Robe rubis profond. Nez complexe. Bouche équilibrée.",
    images: [],
    note_moyenne: 4.8,
    nombre_avis: 24,
    quantit__stock: 12,
    modele3D: "wine.glb"
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(p, quantity);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            <div className="aspect-[4/5] relative bg-white dark:bg-zinc-900 rounded-[40px] overflow-hidden border border-zinc-100 dark:border-zinc-800 group shadow-xl">
              <Image
                src={getProductImage(p.images, p.type, p.style)}
                alt={p.nom}
                fill
                className="object-contain p-12 group-hover:scale-105 transition-transform duration-1000"
                priority
              />
              {p.modele3D && (
                <button 
                  onClick={() => setShow3DModal(true)}
                  className="absolute bottom-8 right-8 bg-white dark:bg-zinc-800 p-5 rounded-full shadow-2xl hover:scale-110 transition-all text-[#810b15] border border-zinc-100 dark:border-zinc-700"
                >
                  <FaExpand size={24} />
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 cursor-pointer hover:border-[#810b15] transition-all" />
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="bg-[#810b15]/10 text-[#810b15] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {p.type} • {p.region}
                </span>
                {p.millesime && (
                  <span className="text-[#810b15] font-black text-sm tracking-widest">{p.millesime}</span>
                )}
              </div>
              <h1 className="text-5xl md:text-6xl font-black font-cavas tracking-tighter leading-none">{p.nom}</h1>
              <p className="text-xl text-zinc-500 font-medium">{p.domaine}</p>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={16} className={i < Math.floor(p.note_moyenne) ? "fill-current" : "opacity-30"} />
                  ))}
                </div>
                <span className="font-black text-lg">{p.note_moyenne}</span>
                <span className="text-zinc-400 font-bold">({p.nombre_avis} avis)</span>
              </div>
              <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div className="text-green-600 dark:text-green-500 font-black uppercase tracking-widest text-sm">
                {p.quantit__stock > 0 ? "En Stock" : "Épuisé"}
              </div>
            </div>

            <div className="mt-12">
              <span className="text-5xl font-black tracking-tighter">{formatPrice(p.prix)}</span>
              <p className="text-zinc-400 text-sm mt-2">TVA incluse. Livraison calculée au panier.</p>
            </div>

            {/* Purchase Actions */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center bg-white dark:bg-zinc-900 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 p-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-2xl font-black hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-all"
                >-</button>
                <span className="w-12 text-center font-black text-xl">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-2xl font-black hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-all"
                >+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#810b15] text-white rounded-2xl px-8 py-5 font-black uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-[#6a0912] transition-all active:scale-95 shadow-2xl shadow-[#810b15]/20 font-cavas"
              >
                <FaShoppingCart size={20} />
                Ajouter au panier
              </button>
              <button className="w-16 h-16 flex items-center justify-center rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 hover:border-[#810b15] hover:text-[#810b15] transition-all">
                <FaHeart size={24} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 grid grid-cols-3 gap-6 py-8 border-y border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-col items-center text-center gap-3">
                <FaTruck className="text-zinc-400" size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Livraison 48h</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <FaShieldAlt className="text-zinc-400" size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Paiement Sûr</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <FaUndo className="text-zinc-400" size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Retour 14J</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-12">
              <div className="flex gap-8 border-b border-zinc-100 dark:border-zinc-800">
                {["description", "caractéristiques", "avis"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? "text-[#810b15]" : "text-zinc-400 hover:text-zinc-600"}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#810b15] rounded-full" />
                    )}
                  </button>
                ))}
              </div>
              <div className="py-8">
                {activeTab === "description" && (
                  <p className="text-lg text-zinc-500 leading-relaxed font-medium">{p.description}</p>
                )}
                {activeTab === "caractéristiques" && (
                  <div className="grid grid-cols-2 gap-8">
                    {[
                      { label: "Appellation", value: p.appellation },
                      { label: "Région", value: p.region },
                      { label: "Cépage", value: "Chardonnay, Pinot Noir" },
                      { label: "Alcool", value: p.teneur_alcool },
                      { label: "Format", value: p.taille_bouteille },
                      { label: "Température", value: "16-18°C" },
                    ].map((item, i) => (
                      <div key={i} className="space-y-1">
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{item.label}</span>
                        <p className="font-bold">{item.value || "Non spécifié"}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {show3DModal && (
        <Product3DModal
          isOpen={show3DModal}
          onClose={() => setShow3DModal(false)}
          modele3D={p.modele3D}
          nom={p.nom}
          domaine={p.domaine}
          millesime={p.millesime}
        />
      )}
    </div>
  );
};

export default ProductDetailPage;
