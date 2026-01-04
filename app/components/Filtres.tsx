import React, { useState } from "react";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaMoneyBillWheat } from "react-icons/fa6";
import { FiType } from "react-icons/fi";
import { GiGrapes } from "react-icons/gi";
import { LuBookType } from "react-icons/lu";
import { MdAccessTime, MdOutlineStyle } from "react-icons/md";
import { VscSymbolClass } from "react-icons/vsc";
import { FilterCheckbox, FilterSection } from "./FilterSubComponents";

interface FilterOption {
  value: string | number;
  label: string;
  count?: number;
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
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    types: true,
    regions: true,
    prix: true,
    labels: true,
  });

  const toggleSection = (name: string) => {
    setOpenSections(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const updateFilters = (newFilters: Record<string, any>) => {
    setSelectedFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleCheckbox = (category: string, value: string | number) => {
    const current = selectedFilters[category] || [];
    const updated = current.includes(value)
      ? current.filter((v: any) => v !== value)
      : [...current, value];
    
    updateFilters({ ...selectedFilters, [category]: updated });
  };

  const handleRangeChange = (category: string, min: number, max: number | null) => {
    const isSelected = selectedFilters[category]?.min === min && selectedFilters[category]?.max === max;
    const newFilters = { ...selectedFilters };
    
    if (isSelected) {
      delete newFilters[category];
    } else {
      newFilters[category] = { min, max };
    }
    updateFilters(newFilters);
  };

  const handleLabelFilter = (label: string, value: boolean) => {
    updateFilters({ ...selectedFilters, [label]: value });
  };

  const clearFilter = (category: string) => {
    const newFilters = { ...selectedFilters };
    delete newFilters[category];
    updateFilters(newFilters);
  };

  const resetAllFilters = () => updateFilters({});

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
    <aside className="w-full md:w-72 bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow-sm border border-zinc-100 dark:border-zinc-800 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black font-cavas text-zinc-900 dark:text-white tracking-tight">Filtres</h2>
        {Object.keys(selectedFilters).length > 0 && (
          <button 
            onClick={resetAllFilters}
            className="text-[10px] font-bold text-[#810b15] hover:underline uppercase tracking-widest"
          >
            Effacer tout
          </button>
        )}
      </div>

      {/* Active Filters Chips */}
      {Object.keys(selectedFilters).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(selectedFilters).map(([category, values]) => (
            <button
              key={category}
              onClick={() => clearFilter(category)}
              className="bg-[#810b15]/10 text-[#810b15] text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5 hover:bg-[#810b15] hover:text-white transition-all font-bold"
            >
              {getFilterDisplayName(category)}
              <span className="opacity-60">×</span>
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {/* Labels Section */}
        {data.labels && (
          <FilterSection title="Labels" icon={<FiType />} isOpen={openSections.labels} onToggle={() => toggleSection("labels")}>
            <FilterCheckbox id="l-bio" label="Bio" count={data.labels.bio} checked={!!selectedFilters.bio} onChange={(v) => handleLabelFilter("bio", v)} />
            <FilterCheckbox id="l-veg" label="Végétalien" count={data.labels.vegetalien} checked={!!selectedFilters.vegetalien} onChange={(v) => handleLabelFilter("vegetalien", v)} />
            <FilterCheckbox id="l-promo" label="En promotion" count={data.labels.promotion} checked={!!selectedFilters.promotion} onChange={(v) => handleLabelFilter("promotion", v)} />
            <FilterCheckbox id="l-stock" label="En stock" count={data.labels.disponible} checked={selectedFilters.disponible !== false} onChange={(v) => handleLabelFilter("disponible", v)} />
          </FilterSection>
        )}

        {/* Types Section */}
        <FilterSection title="Type" icon={<LuBookType />} isOpen={openSections.types} onToggle={() => toggleSection("types")}>
          {data.types?.map(t => (
            <FilterCheckbox key={t.value} id={`t-${t.value}`} label={t.label} count={t.count} checked={selectedFilters.types?.includes(t.value)} onChange={() => handleCheckbox("types", t.value)} />
          ))}
        </FilterSection>

        {/* Regions Section */}
        <FilterSection title="Région" icon={<AiOutlineGlobal />} isOpen={openSections.regions} onToggle={() => toggleSection("regions")}>
          {data.regions?.map(r => (
            <FilterCheckbox key={r.value} id={`r-${r.value}`} label={r.label} count={r.count} checked={selectedFilters.regions?.includes(r.value)} onChange={() => handleCheckbox("regions", r.value)} />
          ))}
        </FilterSection>

        {/* Prix Section */}
        <FilterSection title="Prix" icon={<FaMoneyBillWheat />} isOpen={openSections.prix} onToggle={() => toggleSection("prix")}>
          {data.prixRanges?.ranges.map((r, i) => (
            <FilterCheckbox key={i} id={`p-${i}`} label={r.label} count={r.count} checked={selectedFilters.prixRange?.min === r.min && selectedFilters.prixRange?.max === r.max} onChange={() => handleRangeChange("prixRange", r.min, r.max)} />
          ))}
        </FilterSection>

        {/* Other Sections (Simplified for brevity, can be expanded) */}
        {data.classifications && (
          <FilterSection title="Classification" icon={<VscSymbolClass />} isOpen={openSections.classifications} onToggle={() => toggleSection("classifications")}>
            {data.classifications.map(c => (
              <FilterCheckbox key={c.value} id={`c-${c.value}`} label={c.label} count={c.count} checked={selectedFilters.classifications?.includes(c.value)} onChange={() => handleCheckbox("classifications", c.value)} />
            ))}
          </FilterSection>
        )}

        {data.cepages && (
          <FilterSection title="Cépages" icon={<GiGrapes />} isOpen={openSections.cepages} onToggle={() => toggleSection("cepages")}>
            {data.cepages.map(c => (
              <FilterCheckbox key={c.value} id={`g-${c.value}`} label={c.label} count={c.count} checked={selectedFilters.cepages?.includes(c.value)} onChange={() => handleCheckbox("cepages", c.value)} />
            ))}
          </FilterSection>
        )}

        {data.millesimes && (
          <FilterSection title="Millésimes" icon={<MdAccessTime />} isOpen={openSections.millesimes} onToggle={() => toggleSection("millesimes")}>
            {data.millesimes.map(m => (
              <FilterCheckbox key={m.value} id={`m-${m.value}`} label={m.label.toString()} count={m.count} checked={selectedFilters.millesimes?.includes(m.value)} onChange={() => handleCheckbox("millesimes", m.value)} />
            ))}
          </FilterSection>
        )}
      </div>

      <button
        onClick={resetAllFilters}
        className="w-full bg-[#810b15] text-white font-bold py-4 rounded-2xl hover:bg-[#6a0912] transition-all active:scale-[0.98] shadow-lg shadow-[#810b15]/20 font-cavas text-sm"
      >
        Réinitialiser les filtres
      </button>
    </aside>
  );
};

export default FiltersSidebar;
