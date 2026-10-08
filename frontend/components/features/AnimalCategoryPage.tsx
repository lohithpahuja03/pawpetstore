"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Heart, Stethoscope } from "lucide-react";
import {
  AnimalCategoryData,
  BreedData,
  PetData,
  ProductData,
  PETS,
  PRODUCTS,
  BREEDS,
} from "../../lib/data";
import PetCard from "../common/PetCard";
import ProductCard from "../common/ProductCard";
import BreedCard from "../common/BreedCard";
import PetInquiryModal from "../common/PetInquiryModal";
import Button from "../ui/Button";

interface AnimalCategoryPageProps {
  category: AnimalCategoryData;
  animalType: "dogs" | "cats" | "birds" | "hamsters";
}

export const AnimalCategoryPage: React.FC<AnimalCategoryPageProps> = ({
  category,
  animalType,
}) => {
  const [selectedPet, setSelectedPet] = useState<PetData | null>(null);
  const [selectedBreedFilter, setSelectedBreedFilter] = useState<string>("all");

  const categoryBreeds = BREEDS.filter((b) => b.animalType === animalType);
  const allCategoryPets = PETS.filter((p) => p.animalType === animalType);

  const displayedPets =
    selectedBreedFilter === "all"
      ? allCategoryPets
      : allCategoryPets.filter((p) => p.breedSlug === selectedBreedFilter);

  const categoryProducts = PRODUCTS.filter(
    (p) => p.animalType === animalType || p.animalType === "all"
  ).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Category Hero Banner */}
      <section className="relative bg-[#1B4332] dark:bg-[#141F1C] text-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D9A066] uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Certified {category.name}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                {category.name}
              </h1>
              <p className="text-base text-white/80 max-w-xl leading-relaxed">
                {category.description}
              </p>
              <div className="flex items-center gap-6 pt-2 text-xs font-medium text-white/90">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#4BB787]" />
                  <span>100% Core Vaccinated</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-[#D9A066]" />
                  <span>KCPI / Certified Pedigrees</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Breed Encyclopedia Section */}
      <section className="py-14 bg-[#FAF8F5] dark:bg-[#0D1412] border-b border-[#E2DBD2] dark:border-[#253831]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D9A066]">
                Explore Breeds
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5] mt-1">
                {category.name} Breed Encyclopedia
              </h2>
            </div>
            <span className="text-xs text-[#738078] dark:text-[#7E9086] mt-2 sm:mt-0 font-medium">
              Showing {categoryBreeds.length} verified breeds
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryBreeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Available Pets for Adoption / Inquiry */}
      <section className="py-14 bg-white dark:bg-[#141F1C] border-b border-[#E2DBD2] dark:border-[#253831]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4BB787]">
                Adoption Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5] mt-1">
                Meet Available {category.name}
              </h2>
            </div>

            {/* Quick Breed Filter Chips */}
            <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
              <button
                onClick={() => setSelectedBreedFilter("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedBreedFilter === "all"
                    ? "bg-[#1B4332] text-white dark:bg-[#4BB787] dark:text-[#0D1412]"
                    : "bg-[#FAF8F5] dark:bg-[#172420] text-[#738078] border border-[#E2DBD2] dark:border-[#253831]"
                }`}
              >
                All {category.name}
              </button>
              {categoryBreeds.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBreedFilter(b.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedBreedFilter === b.slug
                      ? "bg-[#1B4332] text-white dark:bg-[#4BB787] dark:text-[#0D1412]"
                      : "bg-[#FAF8F5] dark:bg-[#172420] text-[#738078] border border-[#E2DBD2] dark:border-[#253831]"
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {displayedPets.length === 0 ? (
            <div className="py-12 text-center text-[#738078]">
              No pets found for this breed filter right now. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedPets.map((pet) => (
                <PetCard
                  key={pet.id}
                  pet={pet}
                  onInquiry={(p) => setSelectedPet(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Recommended Essentials for this Species */}
      <section className="py-14 bg-[#FAF8F5] dark:bg-[#0D1412]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D9A066]">
                Tailored Nutrition & Toys
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5] mt-1">
                Essentials for {category.name}
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold text-[#1B4332] dark:text-[#4BB787] hover:underline flex items-center gap-1"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* Adoption Inquiry Modal */}
      <PetInquiryModal
        pet={selectedPet}
        isOpen={!!selectedPet}
        onClose={() => setSelectedPet(null)}
      />
    </div>
  );
};

export default AnimalCategoryPage;
