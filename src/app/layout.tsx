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
    "El aliado estratégico de las empresas en su transformación digital.",
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
