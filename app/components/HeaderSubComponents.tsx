import React from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { FaShoppingBasket, FaUser } from "react-icons/fa";
import { LuCircleHelp } from "react-icons/lu";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export const TopBanner = () => (
  <div className="bg-[#810b15] text-white text-center text-[10px] md:text-xs py-2 px-4 font-bold tracking-widest uppercase">
    <span className="opacity-90">Foire aux spiritueux + de 50 références dès 15.90€ &gt;</span>
    <button className="ml-2 underline hover:text-white/80 transition-colors">Je fonce</button>
  </div>
);

export const SearchBar = ({ className = "" }: { className?: string }) => (
  <div className={`relative flex-1 max-w-2xl ${className}`}>
    <input
      type="text"
      placeholder="Rechercher un vin, une appellation..."
      className="w-full bg-zinc-100 dark:bg-zinc-800/50 border-none rounded-full py-2.5 px-6 pl-12 text-sm outline-none focus:ring-2 focus:ring-[#810b15]/20 transition-all dark:text-white"
    />
    <BsSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
  </div>
);

export const NavAction = ({ icon: Icon, label, href = "#", className = "" }: any) => (
  <Link href={href} className={`flex flex-col items-center gap-1 group ${className}`}>
    <div className="p-2 rounded-full group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 transition-colors">
      <Icon size={20} className="text-zinc-600 dark:text-zinc-400 group-hover:text-[#810b15]" />
    </div>
    <span className="text-[10px] font-bold uppercase tracking-tighter text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
      {label}
    </span>
  </Link>
);
