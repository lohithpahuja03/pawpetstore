"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Phone,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import Logo from "../ui/Logo";
import { useCartStore } from "../../store/cart-store";
import { useWishlistStore } from "../../store/wishlist-store";
import { useAuthStore } from "../../store/auth-store";
import { useTheme } from "../../hooks/useTheme";
import { PETS, PRODUCTS, BREEDS, ANIMAL_CATEGORIES } from "../../lib/data";
import { formatCurrency, cn } from "../../lib/utils";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { theme, toggleTheme, mounted } = useTheme();
  const { openCart, getTotalItemsCount } = useCartStore();
  const { petIds, productIds } = useWishlistStore();
  const { user, isAuthenticated } = useAuthStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);
  const totalWishlist = petIds.length + productIds.length;
  const cartCount = getTotalItemsCount();

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter search results
  const filteredPets = searchQuery.trim()
    ? PETS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.animalType.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredBreeds = searchQuery.trim()
    ? BREEDS.filter((b) =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 2)
    : [];

  const hasSearchResults =
    filteredPets.length > 0 ||
    filteredProducts.length > 0 ||
    filteredBreeds.length > 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-colors">
      {/* Top Value Announcement Bar */}
      <div className="bg-[#1B4332] text-[#FAF8F5] dark:bg-[#090F0D] text-[11px] sm:text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium text-[#FAF8F5]">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A066]" />
              <span>Free Vet Consultation on Every Pet Adoption!</span>
            </span>
            <span className="hidden md:inline text-white/30">•</span>
            <span className="hidden md:inline text-white/80">
              Free Express Delivery on Orders Over ₹999
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-white/80">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4BB787]" />
              <span>100% Ethical & Vet Certified</span>
            </span>
            <span className="text-white/30">•</span>
            <span className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <Phone className="w-3 h-3" />
              <span>Helpline: +91 98765 43210</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white/95 dark:bg-[#141F1C]/95 backdrop-blur-md border-b border-[#E2DBD2] dark:border-[#253831] px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <div className="shrink-0">
            <Logo variant="full" size="md" />
          </div>

          {/* Center Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#1C2421] dark:text-[#F3F7F5]">
            <Link
              href="/"
              className="hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors py-2"
            >
              Home
            </Link>

            {/* Pets Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("pets")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors py-2 focus:outline-none">
                <span>Explore Pets</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {activeDropdown === "pets" && (
                <div className="absolute top-full left-0 w-80 p-3 rounded-2xl bg-white dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="grid grid-cols-1 gap-1">
                    {ANIMAL_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/${cat.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#1C2C27] transition-colors group"
                      >
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#1C2421] dark:text-[#F3F7F5] group-hover:text-[#1B4332] dark:group-hover:text-[#4BB787]">
                            {cat.name}
                          </div>
                          <div className="text-[11px] text-[#738078] dark:text-[#7E9086] line-clamp-1">
                            {cat.tagline}
                          </div>
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-[#EFECE6] dark:border-[#253831] mt-2 pt-2">
                      <Link
                        href="/pets"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-[#1B4332] dark:text-[#4BB787] hover:underline"
                      >
                        <span>View All Available Pets</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("shop")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors py-2 focus:outline-none">
                <span>Shop</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {activeDropdown === "shop" && (
                <div className="absolute top-full left-0 w-72 p-3 rounded-2xl bg-white dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="space-y-1">
                    <Link
                      href="/shop"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3 py-2 text-xs font-semibold rounded-lg hover:bg-[#FAF8F5] dark:hover:bg-[#1C2C27] text-[#1B4332] dark:text-[#4BB787]"
                    >
                      🛍️ All Products Catalog
                    </Link>
                    <Link
                      href="/shop/food"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3 py-2 text-xs font-medium rounded-lg hover:bg-[#FAF8F5] dark:hover:bg-[#1C2C27]"
                    >
                      🍖 Food & Gourmet Nutrition
                    </Link>
                    <Link
                      href="/shop/toys"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3 py-2 text-xs font-medium rounded-lg hover:bg-[#FAF8F5] dark:hover:bg-[#1C2C27]"
                    >
                      🎾 Toys & Enrichment
                    </Link>
                    <Link
                      href="/shop/cages"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3 py-2 text-xs font-medium rounded-lg hover:bg-[#FAF8F5] dark:hover:bg-[#1C2C27]"
                    >
                      🏰 Cages & Habitats
                    </Link>
                    <Link
                      href="/shop/accessories"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3 py-2 text-xs font-medium rounded-lg hover:bg-[#FAF8F5] dark:hover:bg-[#1C2C27]"
                    >
                      🛏️ Beds, Collars & Leashes
                    </Link>
                    <Link
                      href="/shop/grooming"
                      onClick={() => setActiveDropdown(null)}
                      className="block px-3 py-2 text-xs font-medium rounded-lg hover:bg-[#FAF8F5] dark:hover:bg-[#1C2C27]"
                    >
                      🛁 Grooming & Healthcare
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/pet-care"
              className="flex items-center gap-1.5 hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors py-2"
            >
              <Stethoscope className="w-4 h-4 text-[#E07A5F]" />
              <span>Vaccination & Pet Care</span>
            </Link>

            <Link
              href="/about"
              className="hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors py-2"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors py-2"
            >
              Contact
            </Link>
          </div>

          {/* Right Action Icons & Live Search */}
          <div className="flex items-center gap-3">
            {/* Global Search Bar (with live popup preview) */}
            <div ref={searchRef} className="relative hidden md:block w-48 xl:w-64">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    placeholder="Search pets, food, toys..."
                    className="w-full h-10 pl-9 pr-3 text-xs rounded-full border border-[#E2DBD2] dark:border-[#253831] bg-[#FAF8F5] dark:bg-[#172420] text-[#1C2421] dark:text-[#F3F7F5] focus:outline-none focus:ring-2 focus:ring-[#1B4332] dark:focus:ring-[#4BB787] transition-all"
                  />
                  <Search className="absolute left-3 w-3.5 h-3.5 text-[#738078] dark:text-[#7E9086] pointer-events-none" />
                </div>
              </form>

              {/* Instant Search Results Dropdown */}
              {searchFocused && searchQuery.trim() && (
                <div className="absolute top-full mt-2 right-0 w-80 p-3 rounded-2xl bg-white dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] shadow-2xl z-50 animate-in fade-in duration-150">
                  {hasSearchResults ? (
                    <div className="space-y-3">
                      {filteredPets.length > 0 && (
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-[#738078] px-2 mb-1">
                            Available Pets
                          </p>
                          {filteredPets.map((pet) => (
                            <Link
                              key={pet.id}
                              href={`/pets/${pet.id}`}
                              onClick={() => setSearchFocused(false)}
                              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#1C2C27] transition-colors"
                            >
                              <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                                <Image
                                  src={pet.images[0]}
                                  alt={pet.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold truncate text-[#1C2421] dark:text-[#F3F7F5]">
                                  {pet.name} — {pet.breed}
                                </p>
                                <p className="text-[11px] font-bold text-[#1B4332] dark:text-[#4BB787]">
                                  {formatCurrency(pet.price)}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}

                      {filteredProducts.length > 0 && (
                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-wider text-[#738078] px-2 mb-1">
                            Products
                          </p>
                          {filteredProducts.map((prod) => (
                            <Link
                              key={prod.id}
                              href={`/product/${prod.id}`}
                              onClick={() => setSearchFocused(false)}
                              className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#1C2C27] transition-colors"
                            >
                              <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                                <Image
                                  src={prod.images[0]}
                                  alt={prod.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold truncate text-[#1C2421] dark:text-[#F3F7F5]">
                                  {prod.name}
                                </p>
                                <p className="text-[11px] font-bold text-[#1B4332] dark:text-[#4BB787]">
                                  {formatCurrency(prod.price)}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}

                      <div className="border-t border-[#EFECE6] dark:border-[#253831] pt-2 text-center">
                        <Link
                          href={`/search?q=${encodeURIComponent(searchQuery)}`}
                          onClick={() => setSearchFocused(false)}
                          className="text-xs font-bold text-[#1B4332] dark:text-[#4BB787] hover:underline"
                        >
                          View all results for &ldquo;{searchQuery}&rdquo; →
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-[#738078]">
                      No pets or products matched &ldquo;{searchQuery}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#4A5550] dark:text-[#B6C4BC] hover:bg-[#FAF8F5] dark:hover:bg-[#172420] transition-colors"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#FBBF24] transition-transform rotate-0 scale-100" />
              ) : (
                <Moon className="w-4 h-4 text-[#1B4332] transition-transform rotate-0 scale-100" />
              )}
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/account#wishlist"
              className="relative w-10 h-10 rounded-full hidden sm:flex items-center justify-center text-[#4A5550] dark:text-[#B6C4BC] hover:bg-[#FAF8F5] dark:hover:bg-[#172420] transition-colors"
              aria-label="Saved Pets & Products"
            >
              <Heart className="w-4 h-4" />
              {totalWishlist > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#E07A5F] text-white text-[10px] font-bold flex items-center justify-center">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link
              href="/account"
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-[#FAF8F5] dark:hover:bg-[#172420] transition-colors"
              aria-label="Account"
            >
              {isAuthenticated && user?.avatar ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#D9A066]">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#FAF8F5] dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] flex items-center justify-center text-[#1B4332] dark:text-[#4BB787]">
                  <User className="w-4 h-4" />
                </div>
              )}
            </Link>

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 h-10 px-3.5 rounded-full bg-[#1B4332] text-white hover:bg-[#143527] dark:bg-[#4BB787] dark:text-[#0D1412] dark:hover:bg-[#5FC598] transition-all shadow-sm active:scale-95"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-xs font-bold">{cartCount}</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#1C2421] dark:text-[#F3F7F5] hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-[#141F1C] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#EFECE6] dark:border-[#253831]">
                <Logo variant="compact" size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#738078] hover:bg-[#FAF8F5] dark:hover:bg-[#172420] rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mt-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search pets or products..."
                    className="w-full h-10 pl-9 pr-3 text-xs rounded-xl border border-[#E2DBD2] dark:border-[#253831] bg-[#FAF8F5] dark:bg-[#172420] text-[#1C2421] dark:text-[#F3F7F5]"
                  />
                  <Search className="absolute left-3 top-3 w-4 h-4 text-[#738078]" />
                </div>
              </form>

              {/* Mobile Links */}
              <div className="mt-6 space-y-1 font-semibold text-sm text-[#1C2421] dark:text-[#F3F7F5]">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
                >
                  Home
                </Link>
                <Link
                  href="/dogs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
                >
                  🐕 Dogs & Puppies
                </Link>
                <Link
                  href="/cats"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
                >
                  🐈 Cats & Kittens
                </Link>
                <Link
                  href="/birds"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
                >
                  🦜 Birds & Parrots
                </Link>
                <Link
                  href="/hamsters"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
                >
                  🐹 Hamsters & Small Pets
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
                >
                  🛍️ Complete Shop
                </Link>
                <Link
                  href="/shop/food"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
                >
                  🍖 Pet Food Marketplace
                </Link>
                <Link
                  href="/shop/toys"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
                >
                  🎾 Toys & Accessories
                </Link>
                <Link
                  href="/pet-care"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-[#E07A5F] font-bold hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
                >
                  💉 Vaccination & Pet Care
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
                >
                  Contact Support
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
                >
                  My Account & Orders
                </Link>
              </div>
            </div>

            {/* Mobile Footer Area */}
            <div className="pt-6 border-t border-[#EFECE6] dark:border-[#253831] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#738078]">Theme Appearance</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E2DBD2] dark:border-[#253831] text-xs font-semibold"
                >
                  {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
