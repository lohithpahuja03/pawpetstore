"use client";

import React, { useState, useMemo, use } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Sparkles, Filter, RefreshCw } from "lucide-react";
import { PETS, PRODUCTS, BREEDS, PetData, ProductData, BreedData } from "../../lib/data";
import PetCard from "../../components/common/PetCard";
import ProductCard from "../../components/common/ProductCard";
import BreedCard from "../../components/common/BreedCard";
import PetInquiryModal from "../../components/common/PetInquiryModal";
import Button from "../../components/ui/Button";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<"all" | "pets" | "products" | "breeds">("all");
  const [selectedPetForInquiry, setSelectedPetForInquiry] = useState<PetData | null>(null);

  const query = searchQuery.trim().toLowerCase();

  const matchingPets = useMemo(() => {
    if (!query) return PETS;
    return PETS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.breed.toLowerCase().includes(query) ||
        p.animalType.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query)
    );
  }, [query]);

  const matchingProducts = useMemo(() => {
    if (!query) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query)
    );
  }, [query]);

  const matchingBreeds = useMemo(() => {
    if (!query) return BREEDS;
    return BREEDS.filter(
      (b) =>
        b.name.toLowerCase().includes(query) ||
        b.animalType.toLowerCase().includes(query) ||
        b.origin.toLowerCase().includes(query) ||
        b.temperament.some((t) => t.toLowerCase().includes(query))
    );
  }, [query]);

  const totalResults =
    matchingPets.length + matchingProducts.length + matchingBreeds.length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search Header Input */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4BB787]">
            <Search className="w-3.5 h-3.5" />
            <span>Global Search Experience</span>
          </div>

          <div className="max-w-2xl relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pets, breeds, dog food, cat toys..."
              className="w-full h-14 pl-12 pr-4 text-base rounded-2xl border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#141F1C] text-[#1C2421] dark:text-[#F3F7F5] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            />
            <Search className="absolute left-4 top-4.5 w-5 h-5 text-[#738078]" />
          </div>

          <p className="text-xs text-[#738078] dark:text-[#7E9086]">
            Showing <strong>{totalResults}</strong> results for &ldquo;{searchQuery || "all"}&rdquo;
          </p>
        </div>

        {/* Facet Tabs */}
        <div className="flex flex-wrap gap-2 pb-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === "all"
                ? "bg-[#1B4332] text-white dark:bg-[#4BB787] dark:text-[#0D1412]"
                : "bg-white dark:bg-[#172420] text-[#738078] border border-[#E2DBD2] dark:border-[#253831]"
            }`}
          >
            All Results ({totalResults})
          </button>
          <button
            onClick={() => setActiveTab("pets")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === "pets"
                ? "bg-[#1B4332] text-white dark:bg-[#4BB787] dark:text-[#0D1412]"
                : "bg-white dark:bg-[#172420] text-[#738078] border border-[#E2DBD2] dark:border-[#253831]"
            }`}
          >
            🐾 Pets ({matchingPets.length})
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === "products"
                ? "bg-[#1B4332] text-white dark:bg-[#4BB787] dark:text-[#0D1412]"
                : "bg-white dark:bg-[#172420] text-[#738078] border border-[#E2DBD2] dark:border-[#253831]"
            }`}
          >
            🛍️ Products ({matchingProducts.length})
          </button>
          <button
            onClick={() => setActiveTab("breeds")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              activeTab === "breeds"
                ? "bg-[#1B4332] text-white dark:bg-[#4BB787] dark:text-[#0D1412]"
                : "bg-white dark:bg-[#172420] text-[#738078] border border-[#E2DBD2] dark:border-[#253831]"
            }`}
          >
            📚 Breeds ({matchingBreeds.length})
          </button>
        </div>

        {/* Results Container */}
        {totalResults === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] space-y-3">
            <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
              No results found for &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="text-xs text-[#738078] dark:text-[#7E9086] max-w-sm mx-auto">
              Check your spelling or try searching for general terms like &ldquo;Labrador&rdquo;, &ldquo;Kibble&rdquo;, or &ldquo;Cage&rdquo;.
            </p>
            <Button variant="primary" size="sm" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Pets Section */}
            {(activeTab === "all" || activeTab === "pets") && matchingPets.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2DBD2] dark:border-[#253831] pb-3">
                  <h2 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                    Available Pets ({matchingPets.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {matchingPets.map((pet) => (
                    <PetCard
                      key={pet.id}
                      pet={pet}
                      onInquiry={(p) => setSelectedPetForInquiry(p)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Products Section */}
            {(activeTab === "all" || activeTab === "products") && matchingProducts.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2DBD2] dark:border-[#253831] pb-3">
                  <h2 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                    Products & Essentials ({matchingProducts.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {matchingProducts.map((prod) => (
                    <ProductCard key={prod.id} product={prod} />
                  ))}
                </div>
              </div>
            )}

            {/* Breeds Section */}
            {(activeTab === "all" || activeTab === "breeds") && matchingBreeds.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2DBD2] dark:border-[#253831] pb-3">
                  <h2 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                    Breed Profiles ({matchingBreeds.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {matchingBreeds.map((breed) => (
                    <BreedCard key={breed.id} breed={breed} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <PetInquiryModal
        pet={selectedPetForInquiry}
        isOpen={!!selectedPetForInquiry}
        onClose={() => setSelectedPetForInquiry(null)}
      />
    </div>
  );
}
