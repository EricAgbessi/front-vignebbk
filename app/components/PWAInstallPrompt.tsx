"use client";

import React from "react";
import { BsDownload, BsX, BsLaptop, BsShare } from "react-icons/bs";
import { usePWAInstall } from "../hooks/usePWAInstall";
import { CgSmartphone } from "react-icons/cg";

const PWAInstallPrompt: React.FC = () => {
  const { showPrompt, isIOS, isStandalone, handleInstallClick, handleDismiss } =
    usePWAInstall();

  if (isStandalone || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:max-w-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl shadow-2xl z-50 animate-fadeInUp">
      <div className="p-4">
        {/* En-tête */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#810b15] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                Installer VIGNEBBK
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Application rapide et hors ligne
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Fermer"
          >
            <BsX size={24} />
          </button>
        </div>

        {/* Instructions d'installation */}
        {isIOS ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {` Pour installer l'application :`}
            </p>
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
              <BsShare className="flex-shrink-0" />
              <span>
                Appuyez sur <strong>Partager</strong>
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300">
              <BsDownload className="flex-shrink-0" />
              <span>
                Sélectionnez{" "}
                <strong>&quot;Sur l&apos;écran d&apos;accueil&quot;</strong>
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Installez VIGNEBBK pour une expérience optimale :
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                <CgSmartphone />
                <span>Rapide</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
                <BsLaptop />
                <span>Hors ligne</span>
              </div>
            </div>
            <button
              onClick={handleInstallClick}
              className="w-full bg-[#810b15] hover:bg-[#6a0912] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <BsDownload />
              <span>Installer l&apos;application</span>
            </button>
          </div>
        )}

        {/* Note pour iOS */}
        {isIOS && (
          <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-xs text-yellow-800 dark:text-yellow-200">
              📱 Disponible uniquement sur Safari
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
