// app/fonts/cavas.ts
import localFont from "next/font/local";

export const cavas = localFont({
  src: "./ElmsSans-VariableFont_wght.ttf",
  variable: "--font-cavas",
  display: "swap",

  // Si vous avez plusieurs poids, vous pouvez les définir ici:
  // src: [
  //   {
  //     path: './Cavas Demo.ttf',
  //     weight: '400', // Poids de la police
  //     style: 'normal',
  //   },
  // ],
});
