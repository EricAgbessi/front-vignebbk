import React from "react";

interface FilterCheckboxProps {
  id: string;
  label: string;
  count?: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  id,
  label,
  count,
  checked,
  onChange,
}) => (
  <li className="flex items-center gap-3 group">
    <div className="relative flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer w-4 h-4 text-[#810b15] bg-white border-zinc-300 rounded focus:ring-[#810b15] focus:ring-offset-0 dark:bg-zinc-800 dark:border-zinc-700 transition-all cursor-pointer"
      />
    </div>
    <label
      htmlFor={id}
      className="flex-1 cursor-pointer text-zinc-600 dark:text-zinc-400 group-hover:text-[#810b15] dark:group-hover:text-[#810b15] transition-colors flex justify-between items-center text-xs font-medium"
    >
      <span>{label}</span>
      {count !== undefined && (
        <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md text-zinc-500 dark:text-zinc-500 font-bold">
          {count}
        </span>
      )}
    </label>
  </li>
);

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  count?: number;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  icon,
  isOpen,
  onToggle,
  children,
  count,
}) => (
  <div className="border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 pb-4">
    <button
      onClick={onToggle}
      className="flex justify-between items-center w-full py-2 group"
    >
      <div className="flex items-center gap-3 text-zinc-900 dark:text-zinc-100 font-bold font-cavas text-sm tracking-wide">
        <span className="text-[#810b15] opacity-80 group-hover:opacity-100 transition-opacity">
          {icon}
        </span>
        <span>{title}</span>
        {count !== undefined && count > 0 && (
          <span className="ml-2 w-5 h-5 flex items-center justify-center bg-[#810b15] text-white text-[10px] rounded-full">
            {count}
          </span>
        )}
      </div>
      <span className={`text-[#810b15] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] mt-3 opacity-100" : "max-h-0 opacity-0"}`}>
      <ul className="space-y-2.5 pr-2 custom-scrollbar overflow-y-auto max-h-48">
        {children}
      </ul>
    </div>
  </div>
);
