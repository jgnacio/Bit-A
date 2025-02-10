import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { Providers } from "../Providers/Providers";
import Dashboard from "./Core/DashboardSkeleton";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Helpdesk Dashboard",
  description: "Centro de administracion de tickets y soporte tecnico.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es" className={`${manrope.className} dark`}>
        <body>
          <Providers>
            <Dashboard>{children}</Dashboard>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
