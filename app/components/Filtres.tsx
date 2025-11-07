// components/Filtres.tsx
import React, { useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaMoneyBillWheat } from "react-icons/fa6";
import { FiType } from "react-icons/fi";
import { GiGrapes } from "react-icons/gi";
import { LuBookType } from "react-icons/lu";
import { MdAccessTime, MdOutlineStyle } from "react-icons/md";
import { VscSymbolClass } from "react-icons/vsc";

interface FilterOption {
  value: string | number;
  label: string;
  count?: number;
  champagneTypes?: FilterOption[];
}

interface FilterData {
  types: FilterOption[];
  regions: FilterOption[];
  classifications: FilterOption[];
  cepages: FilterOption[];
  styles: FilterOption[];
  millesimes: FilterOption[];
  prixRanges: {
    ranges: { min: number; max: number | null; label: string; count: number }[];
  };
  labels?: {
    bio: number;
    vegetalien: number;
    promotion: number;
    disponible: number;
  };
  cognacCategories?: FilterOption[];
  champagneTypes?: FilterOption[];
  accordsCategories?: FilterOption[];
}

interface Props {
  data: FilterData;
  onFilterChange?: (filters: Record<string, any>) => void;
}

const FiltersSidebar: React.FC<Props> = ({ data, onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>(
    {}
  );

  // Toutes les sections dépliées par défaut
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    types: true,
    regions: true,
    prix: true,
    classifications: true,
    millesimes: true,
    cepages: true,
    styles: true,
    labels: true,
    champagneTypes: true,
    cognacCategories: true,
    accords: true,
  });

  // Fonction pour ouvrir/fermer une section
  const toggleSection = (name: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleCheckbox = (category: string, value: string | number) => {
    const current = selectedFilters[category] || [];
    const updated = current.includes(value)
      ? current.filter((v: any) => v !== value)
      : [...current, value];

    const newFilters = { ...selectedFilters, [category]: updated };
    setSelectedFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleRangeChange = (
    category: string,
    min: number,
    max: number | null
  ) => {
    const newFilters = {
      ...selectedFilters,
      [category]: { min, max },
    };
    setSelectedFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleLabelFilter = (label: string, value: boolean) => {
    const newFilters = {
      ...selectedFilters,
      [label]: value,
    };
    setSelectedFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilter = (category: string) => {
    const newFilters = { ...selectedFilters };
    delete newFilters[category];
    setSelectedFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const resetAllFilters = () => {
    setSelectedFilters({});
    onFilterChange?.({});
  };

  // Fonction pour obtenir le nom d'affichage du filtre
  const getFilterDisplayName = (category: string): string => {
    const names: Record<string, string> = {
      types: "Type",
      regions: "Région",
      classifications: "Classification",
      cepages: "Cépage",
      styles: "Style",
      millesimes: "Millésime",
      prixRange: "Prix",
      bio: "Bio",
      vegetalien: "Végétalien",
      promotion: "Promotion",
      disponible: "Disponible",
      champagneTypes: "Type Champagne",
      cognacCategories: "Catégorie Cognac",
      accords: "Accord mets-vins",
    };
    return names[category] || category;
  };

  return (
    <aside className="w-full md:w-72 bg-white  dark:bg-black rounded-lg p-4 space-y-4 text-sm">
      {/* Titre avec compteur de filtres actifs */}
      <div className="flex p-2 flex-row items-center bg-[#810b15] text-center text-white justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
        <h2 className="text-lg font-bold font-cavas dark:text-white">
          Filtres
        </h2>
        {Object.keys(selectedFilters).length > 0 && (
          <span className="bg-black text-white text-xs px-2 py-1 rounded-full font-medium">
            {Object.keys(selectedFilters).length} actif(s)
          </span>
        )}
      </div>
      {/* Filtres actifs */}
      {Object.keys(selectedFilters).length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-800">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 text-xs">
            Filtres appliqués:
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(selectedFilters).map(([category, values]) => (
              <button
                key={category}
                onClick={() => clearFilter(category)}
                className="bg-[#810b15] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#6a0912] transition-colors font-medium"
              >
                {getFilterDisplayName(category)}
                <span className="text-white opacity-80">×</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Section Labels (Bio, Végétalien, etc.) */}
      {data.labels && (
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <button
            onClick={() => toggleSection("labels")}
            className="flex justify-between items-center w-full text-lg font-bold text-gray-900 dark:text-white hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors font-cavas"
          >
            <p className="flex flex-row items-center">
              <FiType className="mr-4" /> Labels
            </p>
            <span className="text-[#810b15] text-lg">
              {openSections.labels ? "−" : "+"}
            </span>
          </button>
          {openSections.labels && (
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="label-bio"
                  checked={selectedFilters.bio || false}
                  onChange={(e) => handleLabelFilter("bio", e.target.checked)}
                  className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                />
                <label
                  htmlFor="label-bio"
                  className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                >
                  <span className="font-medium">Bio</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {data.labels?.bio || 0}
                  </span>
                </label>
              </li>
              <li className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="label-vegetalien"
                  checked={selectedFilters.vegetalien || false}
                  onChange={(e) =>
                    handleLabelFilter("vegetalien", e.target.checked)
                  }
                  className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                />
                <label
                  htmlFor="label-vegetalien"
                  className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                >
                  <span className="font-medium">Végétalien</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {data.labels?.vegetalien || 0}
                  </span>
                </label>
              </li>
              <li className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="label-promotion"
                  checked={selectedFilters.promotion || false}
                  onChange={(e) =>
                    handleLabelFilter("promotion", e.target.checked)
                  }
                  className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                />
                <label
                  htmlFor="label-promotion"
                  className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                >
                  <span className="font-medium">En promotion</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {data.labels?.promotion || 0}
                  </span>
                </label>
              </li>
              <li className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="label-disponible"
                  checked={selectedFilters.disponible !== false}
                  onChange={(e) => handleLabelFilter("disponible", true)}
                  className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                />
                <label
                  htmlFor="label-disponible"
                  className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                >
                  <span className="font-medium">En stock</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {data.labels?.disponible || 0}
                  </span>
                </label>
              </li>
            </ul>
          )}
        </div>
      )}
      {/* Section Types */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <button
          onClick={() => toggleSection("types")}
          className="flex justify-between items-center w-full text-lg font-bold text-gray-900 dark:text-white hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors font-cavas"
        >
          <p className="flex flex-row items-center">
            <LuBookType className="mr-4" /> Type
          </p>
          <span className="text-[#810b15] text-lg">
            {openSections.types ? "−" : "+"}
          </span>
        </button>
        {openSections.types && (
          <ul className="mt-3 space-y-2">
            {data.types?.map((t) => (
              <li key={t.value} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`type-${t.value}`}
                  checked={selectedFilters.types?.includes(t.value) || false}
                  onChange={() => handleCheckbox("types", t.value)}
                  className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                />
                <label
                  htmlFor={`type-${t.value}`}
                  className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                >
                  <span className="font-medium">{t.label}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {t.count}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Section Région */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <button
          onClick={() => toggleSection("regions")}
          className="flex text-lg justify-between items-center w-full font-bold text-gray-900 dark:text-white hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors font-cavas"
        >
          <p className="flex flex-row items-center">
            <AiOutlineGlobal className="mr-4" /> Région
          </p>
          <span className="text-[#810b15] text-lg">
            {openSections.regions ? "−" : "+"}
          </span>
        </button>
        {openSections.regions && (
          <ul className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {data.regions?.map((r) => (
              <li key={r.value} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`region-${r.value}`}
                  checked={selectedFilters.regions?.includes(r.value) || false}
                  onChange={() => handleCheckbox("regions", r.value)}
                  className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                />
                <label
                  htmlFor={`region-${r.value}`}
                  className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                >
                  <span className="font-medium">{r.label}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {r.count}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Section Prix */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <button
          onClick={() => toggleSection("prix")}
          className="flex justify-between text-lg items-center w-full font-bold text-gray-900 dark:text-white hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors font-cavas"
        >
          <p className="flex flex-row items-center">
            <FaMoneyBillWheat className="mr-4" /> Prix
          </p>
          <span className="text-[#810b15] text-lg">
            {openSections.prix ? "−" : "+"}
          </span>
        </button>
        {openSections.prix && (
          <ul className="mt-3 space-y-2">
            {data.prixRanges?.ranges.map((r, i) => (
              <li key={i} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`prix-${i}`}
                  checked={
                    selectedFilters.prixRange?.min === r.min &&
                    selectedFilters.prixRange?.max === r.max
                  }
                  onChange={() => handleRangeChange("prixRange", r.min, r.max)}
                  className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                />
                <label
                  htmlFor={`prix-${i}`}
                  className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                >
                  <span className="font-medium">{r.label}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {r.count}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Sections restantes (Classification, Millésimes, Cépages, Styles) */}
      {/* Ajoutez ces sections après la section Prix et avant le bouton
      Réinitialiser */}
      {/* Section Classification */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <button
          onClick={() => toggleSection("classifications")}
          className="flex justify-between items-center w-full text-lg font-bold text-gray-900 dark:text-white hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors font-cavas"
        >
          <p className="flex flex-row items-center">
            <VscSymbolClass className="mr-4" /> Classification
          </p>
          <span className="text-[#810b15] text-lg">
            {openSections.classifications ? "−" : "+"}
          </span>
        </button>
        {openSections.classifications && (
          <ul className="mt-3 space-y-2">
            {data.classifications?.map((c) => (
              <li key={c.value} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`classification-${c.value}`}
                  checked={
                    selectedFilters.classifications?.includes(c.value) || false
                  }
                  onChange={() => handleCheckbox("classifications", c.value)}
                  className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                />
                <label
                  htmlFor={`classification-${c.value}`}
                  className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                >
                  <span className="font-medium">{c.label}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {c.count}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Section Millésimes */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <button
          onClick={() => toggleSection("millesimes")}
          className="flex justify-between items-center w-full text-lg font-bold text-gray-900 dark:text-white hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors font-cavas"
        >
          <p className="flex flex-row items-center">
            <MdAccessTime className="mr-4" /> Millésimes
          </p>
          <span className="text-[#810b15] text-lg">
            {openSections.millesimes ? "−" : "+"}
          </span>
        </button>
        {openSections.millesimes && (
          <ul className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {data.millesimes?.map((m) => (
              <li key={m.value} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`millesime-${m.value}`}
                  checked={
                    selectedFilters.millesimes?.includes(m.value) || false
                  }
                  onChange={() => handleCheckbox("millesimes", m.value)}
                  className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                />
                <label
                  htmlFor={`millesime-${m.value}`}
                  className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                >
                  <span className="font-medium">{m.label}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {m.count}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Section Cépages */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <button
          onClick={() => toggleSection("cepages")}
          className="flex justify-between items-center w-full text-lg font-bold text-gray-900 dark:text-white hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors font-cavas"
        >
          <p className="flex flex-row items-center">
            <GiGrapes className="mr-4" /> Cépages
          </p>
          <span className="text-[#810b15] text-lg">
            {openSections.cepages ? "−" : "+"}
          </span>
        </button>
        {openSections.cepages && (
          <ul className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {data.cepages?.map((c) => (
              <li key={c.value} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`cepage-${c.value}`}
                  checked={selectedFilters.cepages?.includes(c.value) || false}
                  onChange={() => handleCheckbox("cepages", c.value)}
                  className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                />
                <label
                  htmlFor={`cepage-${c.value}`}
                  className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                >
                  <span className="font-medium">{c.label}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {c.count}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Section Styles */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
        <button
          onClick={() => toggleSection("styles")}
          className="flex justify-between items-center w-full text-lg font-bold text-gray-900 dark:text-white hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors font-cavas"
        >
          <p className="flex flex-row items-center">
            <MdOutlineStyle className="mr-4" /> Styles
          </p>
          <span className="text-[#810b15] text-lg">
            {openSections.styles ? "−" : "+"}
          </span>
        </button>
        {openSections.styles && (
          <ul className="mt-3 space-y-2 max-h-48 overflow-y-auto">
            {data.styles?.map((s) => (
              <li key={s.value} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`style-${s.value}`}
                  checked={selectedFilters.styles?.includes(s.value) || false}
                  onChange={() => handleCheckbox("styles", s.value)}
                  className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                />
                <label
                  htmlFor={`style-${s.value}`}
                  className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                >
                  <span className="font-medium">{s.label}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {s.count}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Sections supplémentaires pour Champagne */}
      {data.champagneTypes && data.champagneTypes.length > 0 && (
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <button
            onClick={() => toggleSection("champagneTypes")}
            className="flex justify-between items-center w-full text-lg font-bold text-gray-900 dark:text-white hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors font-cavas"
          >
            <p className="flex flex-row items-center">
              <MdOutlineStyle className="mr-4" /> Types de Champagne
            </p>
            <span className="text-[#810b15] text-lg">
              {openSections.champagneTypes ? "−" : "+"}
            </span>
          </button>
          {openSections.champagneTypes && (
            <ul className="mt-3 space-y-2">
              {data.champagneTypes.map((ct) => (
                <li key={ct.value} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`champagneType-${ct.value}`}
                    checked={
                      selectedFilters.champagneTypes?.includes(ct.value) ||
                      false
                    }
                    onChange={() => handleCheckbox("champagneTypes", ct.value)}
                    className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                  />
                  <label
                    htmlFor={`champagneType-${ct.value}`}
                    className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                  >
                    <span className="font-medium">{ct.label}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {ct.count}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* Sections supplémentaires pour Cognac */}
      {data.cognacCategories && data.cognacCategories.length > 0 && (
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <button
            onClick={() => toggleSection("cognacCategories")}
            className="flex justify-between items-center w-full text-lg font-bold text-gray-900 dark:text-white hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors font-cavas"
          >
            <p className="flex flex-row items-center">
              <VscSymbolClass className="mr-4" /> Catégories Cognac
            </p>
            <span className="text-[#810b15] text-lg">
              {openSections.cognacCategories ? "−" : "+"}
            </span>
          </button>
          {openSections.cognacCategories && (
            <ul className="mt-3 space-y-2">
              {data.cognacCategories.map((cc) => (
                <li key={cc.value} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`cognacCategory-${cc.value}`}
                    checked={
                      selectedFilters.cognacCategories?.includes(cc.value) ||
                      false
                    }
                    onChange={() =>
                      handleCheckbox("cognacCategories", cc.value)
                    }
                    className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                  />
                  <label
                    htmlFor={`cognacCategory-${cc.value}`}
                    className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                  >
                    <span className="font-medium">{cc.label}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {cc.count}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* Section Accords mets-vins */}
      {data.accordsCategories && data.accordsCategories.length > 0 && (
        <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
          <button
            onClick={() => toggleSection("accords")}
            className="flex justify-between items-center w-full text-lg font-bold text-gray-900 dark:text-white hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors font-cavas"
          >
            <p className="flex flex-row items-center">
              <GiGrapes className="mr-4" /> Accords mets-vins
            </p>
            <span className="text-[#810b15] text-lg">
              {openSections.accords ? "−" : "+"}
            </span>
          </button>
          {openSections.accords && (
            <ul className="mt-3 space-y-2">
              {data.accordsCategories.map((a) => (
                <li key={a.value} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={`accord-${a.value}`}
                    checked={
                      selectedFilters.accords?.includes(a.value) || false
                    }
                    onChange={() => handleCheckbox("accords", a.value)}
                    className="w-4 h-4 text-[#810b15] bg-white border-gray-300 rounded focus:ring-[#810b15] focus:ring-2 dark:bg-gray-900 dark:border-gray-700"
                  />
                  <label
                    htmlFor={`accord-${a.value}`}
                    className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-[#810b15] dark:hover:text-[#810b15] transition-colors flex justify-between items-center"
                  >
                    <span className="font-medium">{a.label}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {a.count}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* Bouton Réinitialiser */}
      <button
        onClick={resetAllFilters}
        className="w-full bg-[#810b15] text-white font-bold py-3 rounded-lg hover:bg-[#6a0912] transition-colors font-cavas"
      >
        Réinitialiser les filtres
      </button>
    </aside>
  );
};

export default FiltersSidebar;
