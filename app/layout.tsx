import type { Metadata } from "next";
import "./globals.css";

export const SITE = "https://www.pizzaequipmentmart.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Pizza Equipment Mart | The Marketplace Built for the Pizza Industry",
  description: "Conveyor ovens, fast bake ovens, refrigeration, supplies and scratch and dent deals from the brands that make them.",
  openGraph: {
    type: "website",
    siteName: "Pizza Equipment Mart",
    images: [{ url: "/images/hero-kitchen.jpg", width: 1536, height: 1024, alt: "A stainless pizza kitchen with ovens, a make line and a pepperoni pizza" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
