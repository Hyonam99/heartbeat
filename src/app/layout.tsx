import "./layers.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import {
  Anton,
  Geist,
  Geist_Mono as GeistMono,
  Instrument_Serif as InstrumentSerif,
} from "next/font/google";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import Providers from "@/components/layout/Providers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = GeistMono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = InstrumentSerif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });

const fontVars = [geistSans, geistMono, instrumentSerif, anton]
  .map((font) => font.variable)
  .join(" ");

export const metadata: Metadata = {
  title: "Heartbeat",
  description: "Church media attendance and duty roster",
  appleWebApp: { capable: true, title: "Heartbeat", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0d" },
  ],
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" suppressHydrationWarning className={`${fontVars} h-full antialiased`}>
    <body className="min-h-full font-sans">
      <InitColorSchemeScript attribute="class" defaultMode="system" />
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
