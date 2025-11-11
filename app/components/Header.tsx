"use client";

import React, { useEffect, useState } from "react";
import { BsSearch, BsChevronDown, BsChevronUp, BsX } from "react-icons/bs";
import { FaShoppingBasket } from "react-icons/fa";
import { LuCircleHelp, LuHandshake } from "react-icons/lu";
import { ThemeToggle } from "./ThemeToggle";
import { useQuery } from "@tanstack/react-query";
import { getMegaMenu } from "../services/megamenu.service";
import Link from "next/link";
import PWAInstallPrompt from "./PWAInstallPrompt";
import { usePWA } from "../hooks/usePWA";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);
  usePWA();

  // Fonction pour formater les labels
  interface MegaMenuItem {
    label: string;
    count?: number;
    url: string;
  }

  interface MegaMenuCategory {
    name: string;
    items: MegaMenuItem[];
  }

  const formatLabel = (label: string): string => {
    return label
      .replace("vin_", "")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["wine-megamenu"],
    queryFn: getMegaMenu,
  });

  if (isLoading) {
    return <div>Chargement du menu...</div>;
  }

  if (isError) {
    return <div>Erreur: {error.message}</div>;
  }

  // Utilise directement les données de l'API sans valeurs par défaut
  const megaMenus = data || {};

  // // Fermer le menu mobile quand on change de taille d'écran
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 768) {
  //       setMenuOpen(false);
  //       setMobileActiveMenu(null);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const toggleMobileMenu = (menuItem: string) => {
    if (mobileActiveMenu === menuItem) {
      setMobileActiveMenu(null);
    } else {
      setMobileActiveMenu(menuItem);
    }
  };

  const closeAllMobileMenus = () => {
    setMenuOpen(false);
    setMobileActiveMenu(null);
  };

  return (
    <header className="font-sans w-full h-35 relative bg-white dark:bg-black">
      {/* Bandeau supérieur */}
      <div className="bg-[#810b15] text-white text-center text-sm py-2 dark:bg-[#9a0f1c]">
        <span className="font-medium">
          FOIRE AUX SPIRITUEUX + de 50 références dès 15.90€ &gt;
        </span>
        <a href="#" className="underline ml-1 font-semibold">
          JE FONCE
        </a>
      </div>

      {/* Barre principale */}
      <div className="border-b dark:border-gray-700">
        <div className="max-w-full mx-auto px-4 flex items-center justify-between py-3">
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            className="flex flex-col md:flex-row md:items-center md:space-x-2"
          >
            <span className="text-lg md:text-4xl font-bold text-[#810b15] font-cavas dark:text-[#b31522]">
              VIGNEBBK
            </span>
            <span className="text-xs font-cavas text-gray-600 dark:text-gray-400 hidden md:block">
              VINS • CHAMPAGNES • COGNAC
            </span>
          </Link>

          {/* Barre de recherche */}
          <div className="flex-1 mx-4 hidden md:flex font-cavas">
            <input
              type="text"
              placeholder="Rechercher un vin, une appellation..."
              className="w-full border font-cavas rounded-l-full py-2 px-4 text-md outline-none border-[#999999] placeholder-[#999999] dark:placeholder-gray-400 text-[#000000] bg-[#F5F5F5] dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            <button
              style={{ borderColor: "#999999", borderWidth: "1px" }}
              className="bg-gray-100 border-l border-r-[#999999] rounded-r-full px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <BsSearch />
            </button>
          </div>

          {/* Actions droites */}
          <div className="flex items-center space-x-4 text-sm font-cavas">
            <div className="hidden md:flex flex-col justify-center items-center">
              <span className="text-dark dark:text-white">Livraison au</span>
              <span className="font-medium text-dark dark:text-white">
                🇧🇯 Benin
              </span>
            </div>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <a
              href="#"
              className="hover:underline hidden md:flex flex-col justify-center items-center dark:text-white"
            >
              <LuCircleHelp
                size={28}
                className="text-gray-400 dark:text-gray-400"
              />
              <span>Aide</span>
            </a>
            <a
              href="#"
              className="hover:underline font-medium text-[#810b15] dark:text-[#e63946]"
            >
              Se connecter
            </a>
            <button className="border-2 border-[#810b15] text-[#810b15] flex items-center rounded-full px-4 py-1 font-medium dark:border-[#e63946] dark:text-[#e63946]">
              <FaShoppingBasket /> <span className="ml-1">Panier</span>
            </button>
          </div>

          {/* Menu mobile */}
          <button
            className="md:hidden text-2xl ml-2 dark:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <BsX size={28} /> : "☰"}
          </button>
        </div>

        {/* Barre de recherche mobile */}
        <div className="px-4 pb-2 md:hidden flex flex-row">
          <div className="block md:hidden mr-2">
            <ThemeToggle />
          </div>
          <input
            type="text"
            placeholder="Rechercher un vin, une appellation..."
            className="w-[80%] border rounded-full py-2 px-4 text-sm outline-none bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>

        {/* Liens principaux avec mega menus - DESKTOP */}
        <nav className="hidden md:block bg-white font-cavas font-bold text-dark border-b border-black dark:bg-gray-800 dark:border-gray-700">
          <div className="relative">
            <ul className="flex flex-wrap justify-center space-x-6 text-sm font-bold text-dark dark:text-white">
              {Object.keys(megaMenus).map((menuItem) => (
                <li
                  className="relative group"
                  key={menuItem}
                  onMouseEnter={() => setActiveMegaMenu(menuItem)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <button className="hover:text-[#810b15] mr-9 ml-9 text-black  dark:hover:text-[#e63946] transition-colors duration-200 py-2">
                    {menuItem}
                  </button>

                  {activeMegaMenu === menuItem && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[90vw] max-w-6xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 rounded-lg z-50 animate-fadeIn">
                      <div className="">
                        <h3
                          style={{
                            width: "40%",
                            backgroundColor: "black",
                          }}
                          className="text-xl p-2 font-bold text-[#ffffff] dark:text-[#ffffff]"
                        >
                          {megaMenus[menuItem].title}
                        </h3>
                        <div
                          className={`p-2 grid grid-cols-1 md:grid-cols-2 megaMenus[menuItem].title === "Nos Vins" ${
                            megaMenus[menuItem].title === "Nos Vins"
                              ? "lg:grid-cols-4"
                              : "lg:grid-cols-3"
                          }  gap-6`}
                        >
                          {megaMenus[menuItem].categories.map(
                            (category: MegaMenuCategory, index: number) => (
                              <div key={index}>
                                <h4 className="font-bold text-[#810b15] dark:text-white mb-3 text-lg border-b border-[#810b15] border-spacing-4 dark:border-gray-700 pb-2">
                                  {category.name}
                                </h4>
                                <ul className="">
                                  {category.items.map(
                                    (item: MegaMenuItem, itemIndex: number) => {
                                      const label = formatLabel(item.label);
                                      const count = item.count || 0;
                                      const url = `/pages${item.url}` || "#";

                                      return (
                                        <li
                                          key={itemIndex}
                                          className="border-b"
                                        >
                                          <a
                                            href={url}
                                            className="text-gray-600 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#e63946] transition-colors duration-200 block pb-1 flex justify-between items-center"
                                          >
                                            <span>{label}</span>
                                            {count > 0 && (
                                              <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2  rounded-full">
                                                {count}
                                              </span>
                                            )}
                                          </a>
                                        </li>
                                      );
                                    }
                                  )}
                                </ul>
                              </div>
                            )
                          )}
                          {megaMenus[menuItem].title === "Nos Vins" && (
                            <div
                              className="h-full w-auto"
                              style={{
                                backgroundImage:
                                  "url(/images/mega-menu-vin.png)",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "contain",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Menu mobile déroulant avec MEGA MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-inner animate-slideDown dark:bg-gray-800 dark:border-gray-700 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
            <h3 className="font-bold text-lg text-[#810b15] dark:text-[#e63946]">
              Navigation
            </h3>
            <button
              onClick={closeAllMobileMenus}
              className="text-gray-500 dark:text-gray-400"
            >
              <BsX size={24} />
            </button>
          </div>

          <ul className="flex flex-col text-sm font-medium">
            {Object.keys(megaMenus).map((menuItem, i) => (
              <li key={i} className="border-b dark:border-gray-700">
                <button
                  onClick={() => toggleMobileMenu(menuItem)}
                  className="w-full flex justify-between items-center text-black p-4 text-left hover:text-[#810b15] dark:text-white dark:hover:text-[#e63946] font-bold"
                >
                  <span>{menuItem}</span>
                  {mobileActiveMenu === menuItem ? (
                    <BsChevronUp className="text-gray-400" />
                  ) : (
                    <BsChevronDown className="text-gray-400" />
                  )}
                </button>

                {/* Mega Menu Mobile */}
                {mobileActiveMenu === menuItem && (
                  <div className="bg-gray-50 dark:bg-gray-900 animate-slideDown">
                    <div className="p-4 border-t dark:border-gray-700">
                      <h4 className="font-bold  dark:text-[#e63946] text-black  text-lg mb-3 pb-2 border-b border-[#810b15] dark:border-gray-600">
                        {megaMenus[menuItem].title}
                      </h4>

                      <div className="space-y-6">
                        {megaMenus[menuItem].categories.map(
                          (category: MegaMenuCategory, index: number) => (
                            <div key={index}>
                              <h5 className="font-semibold text-black  dark:text-gray-200 mb-2 text-md">
                                {category.name}
                              </h5>
                              <ul className="space-y-2">
                                {category.items.map(
                                  (item: MegaMenuItem, itemIndex: number) => {
                                    const label = formatLabel(item.label);
                                    const count = item.count || 0;
                                    const url = `/pages${item.url}` || "#";

                                    return (
                                      <li key={itemIndex}>
                                        <a
                                          href={url}
                                          onClick={closeAllMobileMenus}
                                          className="text-gray-600 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#e63946] transition-colors duration-200 block py-1 flex justify-between items-center"
                                        >
                                          <span className="flex-1">
                                            {label}
                                          </span>
                                          {count > 0 && (
                                            <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full min-w-[2rem] text-center">
                                              {count}
                                            </span>
                                          )}
                                        </a>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            </div>
                          )
                        )}
                      </div>

                      {/* Image pour la section "Nos Vins" en mobile */}
                      {megaMenus[menuItem].title === "Nos Vins" && (
                        <div className="mt-4 pt-4 border-t dark:border-gray-700">
                          <div
                            className="h-32 w-full rounded-lg"
                            style={{
                              backgroundImage: "url(/images/mega-menu-vin.png)",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}

            {/* Liens supplémentaires pour mobile */}
            <li className="border-b dark:border-gray-700">
              <a
                href="#"
                onClick={closeAllMobileMenus}
                className="w-full flex items-center p-4 hover:text-[#810b15] dark:text-white dark:hover:text-[#e63946]"
              >
                <LuCircleHelp size={20} className="mr-3 text-gray-400" />
                <span>Aide</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={closeAllMobileMenus}
                className="w-full flex items-center p-4 hover:text-[#810b15] dark:text-white dark:hover:text-[#e63946] font-medium"
              >
                <LuHandshake size={20} className="mr-3 text-gray-400" />
                <span>Devenir partenaire</span>
              </a>
            </li>
            <PWAInstallPrompt />
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
