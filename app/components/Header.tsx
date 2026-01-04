"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMegaMenu } from "../services/megamenu.service";
import { FiMenu } from "react-icons/fi";
import { FaShoppingBasket, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { LuCircleHelp } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { BsX } from "react-icons/bs";
import { TopBanner, SearchBar, NavAction } from "./HeaderSubComponents";
import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { getProductImage } from "../utils/imageUtils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const { items, totalItems, totalPrice, removeFromCart, updateQuantity } = useCart();

  const { data: megaMenus = {} } = useQuery({
    queryKey: ["wine-megamenu"],
    queryFn: getMegaMenu,
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
      <TopBanner />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Main Bar */}
        <div className="flex items-center justify-between py-4 gap-8">
          {/* Logo */}
          <Link href="/" className="flex flex-col group">
            <span className="text-2xl md:text-3xl font-black text-[#810b15] font-cavas tracking-tighter group-hover:scale-105 transition-transform inline-block">VIGNEBBK</span>
            <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-[0.2em] hidden md:block">Vins • Champagnes • Cognac</span>
          </Link>

          {/* Search Bar - Desktop */}
          <SearchBar className="hidden lg:flex" />

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-6">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-[10px] text-zinc-400 uppercase font-bold">Livraison</span>
              <span className="text-xs font-bold">🇧🇯 BENIN</span>
            </div>
            
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-4">
              <NavAction icon={LuCircleHelp} label="Aide" className="hidden sm:flex" />
              
              <div className="relative">
                <button 
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="p-2 rounded-full group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 transition-colors relative">
                    <FaShoppingBasket size={20} className="text-zinc-600 dark:text-zinc-400 group-hover:text-[#810b15]" />
                    {totalItems > 0 && (
                      <span className="absolute top-0 right-0 bg-[#810b15] text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-black animate-in zoom-in">
                        {totalItems}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-tighter text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    Panier
                  </span>
                </button>

                {/* Cart Dropdown */}
                {isCartOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsCartOpen(false)} />
                    <div className="absolute top-full right-0 mt-4 w-96 bg-white dark:bg-zinc-900 rounded-[32px] shadow-2xl border border-zinc-100 dark:border-zinc-800 z-50 overflow-hidden animate-in slide-in-from-top-4 duration-300">
                      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                        <h3 className="font-black font-cavas text-lg uppercase tracking-widest">Mon Panier</h3>
                        <span className="text-xs font-bold text-zinc-400">{totalItems} articles</span>
                      </div>

                      <div className="max-h-[400px] overflow-y-auto p-6 space-y-6">
                        {items.length === 0 ? (
                          <div className="text-center py-12 space-y-4">
                            <div className="text-5xl">🛒</div>
                            <p className="text-zinc-500 font-medium">Votre panier est vide</p>
                            <button onClick={() => setIsCartOpen(false)} className="text-[#810b15] font-black text-xs uppercase tracking-widest hover:underline">Continuer mes achats</button>
                          </div>
                        ) : (
                          items.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                              <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex-shrink-0 overflow-hidden relative border border-zinc-100 dark:border-zinc-700">
                                <Image src={getProductImage([item.image || ""], item.type, item.style)} alt={item.nom} fill className="object-contain p-2" />
                              </div>
                              <div className="flex-1 min-w-0 space-y-1">
                                <h4 className="font-black text-sm truncate pr-6">{item.nom}</h4>
                                <p className="text-[#810b15] font-black text-sm">{formatPrice(item.prix)}</p>
                                <div className="flex items-center gap-3 mt-2">
                                  <div className="flex items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-[#810b15]"><FaMinus size={10} /></button>
                                    <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-[#810b15]"><FaPlus size={10} /></button>
                                  </div>
                                  <button onClick={() => removeFromCart(item.id)} className="text-zinc-300 hover:text-red-500 transition-colors"><FaTrash size={12} /></button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {items.length > 0 && (
                        <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800 space-y-4">
                          <div className="flex justify-between items-end">
                            <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Total</span>
                            <span className="text-2xl font-black tracking-tighter">{formatPrice(totalPrice)}</span>
                          </div>
                          <Link 
                            href="/pages/panier"
                            onClick={() => setIsCartOpen(false)}
                            className="w-full bg-[#810b15] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#6a0912] transition-all active:scale-95 shadow-xl shadow-[#810b15]/20 font-cavas flex items-center justify-center"
                          >
                            Voir le panier
                          </Link>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-zinc-900 dark:text-white"
              >
                {isMenuOpen ? <BsX size={28} /> : <div className="space-y-1.5"><div className="w-6 h-0.5 bg-current"></div><div className="w-6 h-0.5 bg-current"></div></div>}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Desktop */}
        <nav className="hidden lg:flex items-center gap-8 py-2">
          {Object.keys(megaMenus).map((key) => (
            <div 
              key={key}
              onMouseEnter={() => setActiveMegaMenu(key)}
              onMouseLeave={() => setActiveMegaMenu(null)}
              className="relative"
            >
              <button className="py-2 text-xs font-black uppercase tracking-widest hover:text-[#810b15] transition-colors flex items-center gap-1">
                {key.replace(/_/g, ' ')}
                <IoIosArrowDown size={10} />
              </button>
              
              {activeMegaMenu === key && (
                <div className="absolute top-full left-0 w-[600px] bg-white dark:bg-zinc-900 shadow-2xl rounded-3xl border border-zinc-100 dark:border-zinc-800 p-8 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Par Style</h4>
                      <ul className="space-y-3">
                        {key === "vins" && (
                          <>
                            <li><Link href="/pages/vins/rouges" className="text-sm font-bold hover:text-[#810b15] transition-colors">Vins Rouges</Link></li>
                            <li><Link href="/pages/vins/blancs" className="text-sm font-bold hover:text-[#810b15] transition-colors">Vins Blancs</Link></li>
                            <li><Link href="/pages/vins/roses" className="text-sm font-bold hover:text-[#810b15] transition-colors">Vins Rosés</Link></li>
                          </>
                        )}
                        {key === "champagnes" && (
                          <>
                            <li><Link href="/pages/champagnes" className="text-sm font-bold hover:text-[#810b15] transition-colors">Tous les Champagnes</Link></li>
                            <li><Link href="/pages/champagnes/brut" className="text-sm font-bold hover:text-[#810b15] transition-colors">Brut</Link></li>
                          </>
                        )}
                        {key === "spiritueux" && (
                          <>
                            <li><Link href="/pages/spiritueux" className="text-sm font-bold hover:text-[#810b15] transition-colors">Tous les Spiritueux</Link></li>
                            <li><Link href="/pages/spiritueux/cognac" className="text-sm font-bold hover:text-[#810b15] transition-colors">Cognac</Link></li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                      <span className="text-3xl mb-2">🍷</span>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#810b15]">Sélection du mois</p>
                      <p className="text-[10px] text-zinc-500 mt-1">Découvrez nos pépites sélectionnées par nos experts.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
