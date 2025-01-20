import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { Providers } from "./Providers/Providers";
import CustomCursor from "@/components/Cursor/Cursor";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Bit-A Desarrollo Web",
  description:
    "Creamos sitios web innovadores que potencian tu negocio globalmente. Convertimos tu trayectoria en una voz activa en línea que cuenta acerca de lo que tienes para ofrecer y mejorar lo que existe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${manrope.className}`}>
        <body>
          <Providers>
            {children}
            <CustomCursor />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
