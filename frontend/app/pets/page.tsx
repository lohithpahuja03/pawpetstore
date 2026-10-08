"use client";

import React, { useState, useMemo } from "react";
import { Filter, SlidersHorizontal, RefreshCw, Sparkles } from "lucide-react";
import { PETS, ANIMAL_CATEGORIES, PetData } from "../../lib/data";
import { formatCurrency } from "../../lib/utils";
import PetCard from "../../components/common/PetCard";
import PetInquiryModal from "../../components/common/PetInquiryModal";
import Button from "../../components/ui/Button";

export default function PetsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedGender, setSelectedGender] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [vaccinatedOnly, setVaccinatedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [selectedPetForInquiry, setSelectedPetForInquiry] = useState<PetData | null>(null);

  const filteredPets = useMemo(() => {
    let result = [...PETS];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.animalType === selectedCategory);
    }

    if (selectedGender !== "all") {
      result = result.filter((p) => p.gender === selectedGender);
    }

    if (selectedLocation !== "all") {
      result = result.filter((p) => p.location.toLowerCase().includes(selectedLocation.toLowerCase()));
    }

    if (vaccinatedOnly) {
      result = result.filter((p) => p.vaccinated);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.reverse();
    }

    return result;
  }, [selectedCategory, selectedGender, selectedLocation, vaccinatedOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedGender("all");
    setSelectedLocation("all");
    setVaccinatedOnly(false);
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4BB787]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ethical Pet Marketplace</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5]">
            Adoptable Pets & Companions
          </h1>
          <p className="text-sm text-[#738078] dark:text-[#7E9086] max-w-2xl">
            Every animal listed on PawPetStore comes with verified clinical veterinary records, purebred pedigree documentation, and a health safety certificate.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Animal Category */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-10 px-3 text-xs font-semibold rounded-xl border border-[#E2DBD2] dark:border-[#253831] bg-[#FAF8F5] dark:bg-[#172420] text-[#1C2421] dark:text-[#F3F7F5] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
              >
                <option value="all">All Species (Dogs, Cats, Birds, Hamsters)</option>
                <option value="dogs">Dogs Only</option>
                <option value="cats">Cats Only</option>
                <option value="birds">Birds Only</option>
                <option value="hamsters">Hamsters & Small Pets</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="h-10 px-3 text-xs font-semibold rounded-xl border border-[#E2DBD2] dark:border-[#253831] bg-[#FAF8F5] dark:bg-[#172420] text-[#1C2421] dark:text-[#F3F7F5] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
              >
                <option value="all">Gender: Any</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="h-10 px-3 text-xs font-semibold rounded-xl border border-[#E2DBD2] dark:border-[#253831] bg-[#FAF8F5] dark:bg-[#172420] text-[#1C2421] dark:text-[#F3F7F5] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
              >
                <option value="all">Location: All Cities</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi NCR</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>

            {/* Vaccinated Toggle */}
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold select-none px-3 py-2 rounded-xl border border-[#E2DBD2] dark:border-[#253831] bg-[#FAF8F5] dark:bg-[#172420]">
              <input
                type="checkbox"
                checked={vaccinatedOnly}
                onChange={(e) => setVaccinatedOnly(e.target.checked)}
                className="rounded text-[#1B4332] focus:ring-[#1B4332] w-4 h-4"
              />
              <span>Vaccinated Only</span>
            </label>

            {(selectedCategory !== "all" ||
              selectedGender !== "all" ||
              selectedLocation !== "all" ||
              vaccinatedOnly) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-[#DC2626] font-semibold hover:underline px-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Sort By */}
          <div className="flex items-center justify-between lg:justify-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#EFECE6] dark:border-[#253831]">
            <span className="text-xs text-[#738078] dark:text-[#7E9086] whitespace-nowrap">
              {filteredPets.length} pets available
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 px-3 text-xs font-semibold rounded-xl border border-[#E2DBD2] dark:border-[#253831] bg-[#FAF8F5] dark:bg-[#172420] text-[#1C2421] dark:text-[#F3F7F5] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Pet Listing Grid */}
        {filteredPets.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] space-y-3">
            <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
              No pets match your selected filters
            </h3>
            <p className="text-xs text-[#738078] dark:text-[#7E9086] max-w-sm mx-auto">
              Try adjusting your category, location, or vaccination filter to see more companions.
            </p>
            <Button variant="primary" size="sm" onClick={resetFilters}>
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onInquiry={(p) => setSelectedPetForInquiry(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      <PetInquiryModal
        pet={selectedPetForInquiry}
        isOpen={!!selectedPetForInquiry}
        onClose={() => setSelectedPetForInquiry(null)}
      />
    </div>
  );
}
