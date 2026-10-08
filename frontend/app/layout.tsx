import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CartDrawer from "../components/layout/CartDrawer";

export const metadata: Metadata = {
  title: "PawPetStore — Everything They Need. Everything You Love.",
  description:
    "India's premier certified pet marketplace and veterinary pet-care platform. Explore dogs, cats, birds, and small pets, premium nutrition, toys, and clinic appointments.",
  icons: {
    icon: "/brand/logo.svg",
    shortcut: "/brand/logo.svg",
    apple: "/brand/logo.svg",
  },
  openGraph: {
    title: "PawPetStore — Premium Pet Marketplace & Care",
    description:
      "Find your perfect companion. Shop premium food, toys, cages, and book vaccination appointments with certified veterinarians.",
    url: "https://pawpetstore.com",
    siteName: "PawPetStore",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C2421] dark:bg-[#0D1412] dark:text-[#F3F7F5] transition-colors selection:bg-[#D9A066]/30">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
