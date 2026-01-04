import React, { Suspense, lazy } from "react";
import { FaTimes, FaArrowsAlt } from "react-icons/fa";
import { FaRotate } from "react-icons/fa6";

const ThreeJSViewer = lazy(() => import("./ThreeJSViewer").then(module => ({ default: module.ThreeJSViewer })));

interface Product3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  nom: string;
  domaine?: string;
  millesime?: string | number;
  modele3D: string;
  modeleType?: "gltf" | "glb" | "obj" | "fbx";
}

const Product3DModal: React.FC<Product3DModalProps> = ({
  isOpen,
  onClose,
  nom,
  domaine,
  millesime,
  modele3D,
  modeleType = "glb",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 dark:bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-white/10">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-zinc-700">
          <div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white font-cavas tracking-tight">
              Vue 3D Interactive • {nom}
            </h3>
            <p className="text-base text-gray-500 dark:text-zinc-400 font-medium mt-1">
              {domaine && `${domaine} • `}
              {millesime && `Millésime ${millesime}`}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Instructions Desktop */}
            <div className="hidden md:flex items-center space-x-6 text-xs text-gray-500 dark:text-zinc-400 uppercase tracking-wider font-medium">
              <div className="flex items-center space-x-2">
                <FaRotate size={14} className="text-[#810b15]" />
                <span>Tourner</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaArrowsAlt size={14} className="text-[#810b15]" />
                <span>Zoomer</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-zinc-400 hover:text-[#810b15] dark:hover:text-[#810b15] transition-all p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 active:scale-95"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* 3D Viewer Container */}
        <div className="flex-1 relative bg-gray-100 dark:bg-zinc-900/50">
          <Suspense fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#810b15] mx-auto mb-4"></div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white font-cavas">
                  Chargement du modèle 3D...
                </p>
              </div>
            </div>
          }>
            <ThreeJSViewer
              modelUrl={modele3D}
              modelType={modeleType}
              onLoad={() => console.log("3D Model Loaded")}
              onError={(err) => console.error("3D Error:", err)}
            />
          </Suspense>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 border-t border-gray-200 dark:border-zinc-700">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 dark:text-zinc-400">
            <div className="flex items-center space-x-4 mb-2 md:mb-0">
              <span className="flex items-center space-x-1">
                <span className="text-lg">🖱️</span>
                <span>Navigation à la souris</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="text-lg">✨</span>
                <span>Rendu Haute Qualité</span>
              </span>
            </div>
            <div className="font-medium">
              Format: {modeleType.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product3DModal;
