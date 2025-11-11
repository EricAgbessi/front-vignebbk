import React, { useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { SlideItem, WineType } from "../type";

interface WineBannerProps {
  slides: SlideItem[];
  filters: WineType[];
}

const WineBanner: React.FC<WineBannerProps> = ({ slides, filters }) => {
  const [current, setCurrent] = useState(0);

  // Auto-slide toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides?.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides?.length]);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides?.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === slides?.length - 1 ? 0 : prev + 1));

  const slide = slides?.[current];

  return (
    <div className="w-full  md:h-auto bg-white dark:bg-zinc-900 mt-6 md:mt-4 ">
      {/* ======== Bannière principale ======== */}
      <div
        className={`relative w-full h-[150px] md:h-[400px] bg-white bg-cover bg-center transition-all duration-700 ${slide?.bg} bg-center bg-contain bg-no-repeat`}
      >
        {/* Overlay sombre pour le texte */}
        <div className="absolute inset-0 bg-transparent"></div>

        {/* Contenu du slide */}
        <div className="relative z-10 flex flex-col justify-center items-start h-full px-6 md:px-16 text-white">
          {/* <h2 className="text-4xl md:text-5xl font-semibold">{slide.title}</h2>
          <p className="mt-2 text-lg md:text-xl">{slide.subtitle}</p>
          <p className="text-lg md:text-xl font-medium">{slide.desc}</p> */}

          {/* <div className="flex items-center mt-5 gap-3">
            <span className="bg-white text-red-600 px-3 py-1 rounded font-bold text-lg shadow">
              {slide.discount}
            </span>
            <button className="bg-red-700 hover:bg-red-800 transition text-white px-5 py-2 rounded">
              {slide.button}
            </button>
          </div> */}
        </div>

        {/* Flèches de navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          <BiChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
        >
          <BiChevronRight size={24} />
        </button>
      </div>

      {/* ======== Barre de filtres ======== */}
      <div className="flex flex-wrap justify-center gap-3 py-1 bg-zinc-50 dark:bg-zinc-800">
        {filters?.map((filter) => (
          <button
            key={filter.label}
            className="flex items-center dark:text-white text-black gap-2 border border-zinc-300 dark:border-zinc-600 px-4 py-1 rounded-full text-sm md:text-base hover:bg-red-100 dark:hover:bg-zinc-700 transition"
          >
            <span>{filter.icon}</span>
            <span className="font-medium ">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WineBanner;
