"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const usePWAInstall = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  const avoidEffet = () => {
    const checkStandalone = () => {
      return window.matchMedia("(display-mode: standalone)").matches;
    };

    // Détecter iOS
    const checkIOS = () => {
      return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    };

    // Initialisation synchrone
    const standalone = checkStandalone();
    const isIos = checkIOS();

    return { standalone, isIos };
  };

  useEffect(() => {
    // Vérifier si l'app est déjà installée de manière synchrone

    // Si déjà installé, ne pas afficher le prompt
    const { standalone, isIos } = avoidEffet();
    if (standalone) {
      return;
    }

    // Gestionnaire d'événement pour l'installation
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Afficher le prompt après un délai
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    // Vérifier si on est sur iOS et afficher les instructions
    if (isIos) {
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
    };
  }, []); // Retirer isStandalone des dépendances

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
          console.log("PWA installée avec succès");
          setIsStandalone(true);
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
      } catch (error) {
        console.error("Erreur lors de l'installation:", error);
      }
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwaPromptDismissed", "true");
  };

  return {
    deferredPrompt,
    showPrompt,
    isIOS,
    isStandalone,
    handleInstallClick,
    handleDismiss,
  };
};
