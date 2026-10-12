import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Julissa · Mi Graduación · 22 Mayo 2027",
  description:
    "Invitación a la graduación de Julissa Tranquilino Mendoza · Generación 2023-2027 · 22 de mayo de 2027 · Puebla.",
  metadataBase: new URL("https://graduacion-julissa-tranquilino-mendoza.vercel.app"),
  openGraph: {
    title: "Julissa · Mi Graduación",
    description: "22 de mayo de 2027 · Puebla, Puebla.",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Julissa · Mi Graduación" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Julissa · Mi Graduación",
    description: "22 de mayo de 2027 · Puebla, Puebla.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${greatVibes.variable} ${cormorant.variable} `}
      >
        {children}
      </body>
    </html>
  );
}
