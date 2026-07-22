import type { Metadata } from "next";
import { Geist, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre",
});

export const metadata: Metadata = {
  title: "NYAUTSA SS Trading and Projects | Residential Construction Gauteng",
  description:
    "Residential construction, foundations, brickwork, roofing, paving, boundary walls and finishing services in Gauteng and surrounding areas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${libre.variable}`}>
      <body>{children}</body>
    </html>
  );
}
