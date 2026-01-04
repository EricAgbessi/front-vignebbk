"use client";

import React from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { getProductImage } from "@/app/utils/imageUtils";

const CartPage = () => {
  const { items, totalPrice, totalItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
      <Header />

      <main className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/" className="p-3 rounded-full bg-white dark:bg-zinc-900 shadow-sm hover:scale-110 transition-all">
            <FaArrowLeft size={16} />
          </Link>
          <h1 className="text-4xl font-black font-cavas tracking-tighter uppercase">Mon Panier</h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-[40px] p-20 text-center shadow-xl border border-zinc-100 dark:border-zinc-800">
            <div className="text-8xl mb-8">🛒</div>
            <h2 className="text-2xl font-black font-cavas mb-4">Votre panier est vide</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">Découvrez notre sélection de vins d'exception et commencez votre collection.</p>
            <Link href="/" className="inline-block bg-[#810b15] text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#6a0912] transition-all shadow-xl shadow-[#810b15]/20">
              Explorer la boutique
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-100 dark:border-zinc-800 flex gap-6 group">
                  <div className="w-32 h-32 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex-shrink-0 overflow-hidden relative border border-zinc-100 dark:border-zinc-700">
                    <Image src={getProductImage([item.image || ""], item.type, item.style)} alt={item.nom} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-black text-lg font-cavas tracking-tight">{item.nom}</h3>
                        <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">{item.type} • {item.style?.replace(/_/g, ' ')}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-zinc-300 hover:text-red-500 transition-colors p-2">
                        <FaTrash size={18} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-xl p-1.5">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:text-[#810b15] transition-colors">
                          <FaMinus size={12} />
                        </button>
                        <span className="w-12 text-center font-black">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:text-[#810b15] transition-colors">
                          <FaPlus size={12} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-black tracking-tighter">{formatPrice(item.prix * item.quantity)}</p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase">{formatPrice(item.prix)} / unité</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button onClick={clearCart} className="text-zinc-400 hover:text-red-500 text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-2 ml-auto">
                <FaTrash size={12} />
                Vider le panier
              </button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-zinc-900 rounded-[40px] p-8 shadow-xl border border-zinc-100 dark:border-zinc-800 sticky top-32">
                <h2 className="text-xl font-black font-cavas uppercase tracking-widest mb-8">Récapitulatif</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-zinc-500 font-medium">
                    <span>Sous-total ({totalItems} articles)</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-500 font-medium">
                    <span>Livraison</span>
                    <span className="text-green-600 font-black uppercase text-xs">Gratuite</span>
                  </div>
                  <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-4" />
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-black font-cavas uppercase tracking-widest">Total</span>
                    <span className="text-3xl font-black tracking-tighter text-[#810b15]">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <button className="w-full bg-[#810b15] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#6a0912] transition-all active:scale-95 shadow-2xl shadow-[#810b15]/20 font-cavas mb-4">
                  Passer la commande
                </button>
                
                <p className="text-[10px] text-zinc-400 text-center font-bold uppercase tracking-widest">
                  Paiement 100% sécurisé via SSL
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
