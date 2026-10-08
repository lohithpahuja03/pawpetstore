"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ShoppingBag, SlidersHorizontal, RefreshCw, Sparkles } from "lucide-react";
import { PRODUCTS, ProductData } from "../../lib/data";
import ProductCard from "../../components/common/ProductCard";
import Button from "../../components/ui/Button";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAnimal, setSelectedAnimal] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<string>("popular");

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedAnimal !== "all") {
      list = list.filter((p) => p.animalType === selectedAnimal || p.animalType === "all");
    }

    if (priceSort === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (priceSort === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (priceSort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, selectedAnimal, priceSort]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedAnimal("all");
    setPriceSort("popular");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4BB787]">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Pet Store & Essentials</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5]">
            Shop All Pet Supplies
          </h1>
          <p className="text-sm text-[#738078] dark:text-[#7E9086] max-w-2xl">
            Premium veterinary-certified nutrition, orthopedic bedding, indestructible toys, and comfortable habitats shipped directly to your door.
          </p>
        </div>

        {/* Filter Navigation Chips */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {[
            { id: "all", label: "All Items" },
            { id: "food", label: "🍖 Food & Treats" },
            { id: "toys", label: "🎾 Toys & Enrichment" },
            { id: "cages", label: "🏰 Cages & Habitats" },
            { id: "accessories", label: "🛏️ Beds & Collars" },
            { id: "grooming", label: "🛁 Grooming" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                selectedCategory === cat.id
                  ? "bg-[#1B4332] text-white dark:bg-[#4BB787] dark:text-[#0D1412]"
                  : "bg-white dark:bg-[#172420] text-[#4A5550] dark:text-[#B6C4BC] border border-[#E2DBD2] dark:border-[#253831] hover:bg-[#FAF8F5]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-semibold text-[#738078]">For Animal:</span>
            <select
              value={selectedAnimal}
              onChange={(e) => setSelectedAnimal(e.target.value)}
              className="h-9 px-3 text-xs font-medium rounded-lg border border-[#E2DBD2] dark:border-[#253831] bg-[#FAF8F5] dark:bg-[#172420] text-[#1C2421] dark:text-[#F3F7F5] focus:outline-none"
            >
              <option value="all">All Animals</option>
              <option value="dogs">Dogs Only</option>
              <option value="cats">Cats Only</option>
              <option value="birds">Birds Only</option>
              <option value="hamsters">Hamsters & Small Pets</option>
            </select>

            {(selectedCategory !== "all" || selectedAnimal !== "all") && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs text-[#DC2626] font-semibold hover:underline px-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <span className="text-xs text-[#738078]">
              {filteredProducts.length} items
            </span>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="h-9 px-3 text-xs font-medium rounded-lg border border-[#E2DBD2] dark:border-[#253831] bg-[#FAF8F5] dark:bg-[#172420] text-[#1C2421] dark:text-[#F3F7F5] focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Customer Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] space-y-3">
            <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
              No products found for this filter
            </h3>
            <p className="text-xs text-[#738078] dark:text-[#7E9086]">
              Try choosing another animal or category.
            </p>
            <Button variant="primary" size="sm" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
