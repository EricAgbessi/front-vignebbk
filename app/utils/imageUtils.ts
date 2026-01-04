export const getProductImage = (images: string[] | undefined, type: string, style?: string): string => {
  if (images && images.length > 0) {
    return images[0];
  }

  const fallbacks: Record<string, string> = {
    vin_blanc: "/images/vin_blanc_demo.png",
    vin_rose: "/images/vin_rose_demo.png",
    vin_rouge: "/images/vin_rouge_demo.png",
    cognac: "/images/cognac_demo.png",
    champagne: "/images/champagne.webp",
  };

  if (type === "cognac") return fallbacks.cognac;
  if (type === "champagne") return fallbacks.champagne;
  
  if (style && fallbacks[style]) {
    return fallbacks[style];
  }

  // Fallback par défaut basé sur le style ou type
  if (style?.includes("blanc")) return fallbacks.vin_blanc;
  if (style?.includes("rose") || style?.includes("rosé")) return fallbacks.vin_rose;
  if (style?.includes("rouge")) return fallbacks.vin_rouge;

  return "/images/vin_rouge_demo.png"; // Fallback ultime
};
