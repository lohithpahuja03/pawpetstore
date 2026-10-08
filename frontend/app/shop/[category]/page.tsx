"use client";

import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { PRODUCTS, ProductData } from "../../../lib/data";
import ProductCard from "../../../components/common/ProductCard";
import Button from "../../../components/ui/Button";

const CATEGORY_TITLES: Record<
  string,
  { title: string; subtitle: string; icon: string }
> = {
  food: {
    title: "Pet Food & Gourmet Nutrition",
    subtitle:
      "Veterinarian-approved dry kibble, grain-free wet recipes, raw formulas, and treats for dogs, cats, birds, and pocket pets.",
    icon: "🍖",
  },
  toys: {
    title: "Toys & Interactive Enrichment",
    subtitle:
      "Chew toys, puzzle feeders, laser pointers, feather wands, and exercise wheels to stimulate sharp minds.",
    icon: "🎾",
  },
  cages: {
    title: "Cages, Enclosures & Habitats",
    subtitle:
      "Spacious wrought-iron bird villa cages, glass hamster terrariums, and outdoor playpens built to humane animal standards.",
    icon: "🏰",
  },
  accessories: {
    title: "Beds, Collars, Leashes & Apparel",
    subtitle:
      "Human-grade memory foam orthopedic pet beds, vegetable-tanned leather collars, harness systems, and bowls.",
    icon: "🛏️",
  },
  grooming: {
    title: "Grooming, Hygiene & Healthcare",
    subtitle:
      "Deshedding brushes, organic oatmeal shampoos, tear-stain wipes, ear cleaners, and dental care solutions.",
    icon: "🛁",
  },
};

export default function SubCategoryShopPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = use(params);
  const categoryKey = resolvedParams.category.toLowerCase();
  const info = CATEGORY_TITLES[categoryKey] || {
    title: `${categoryKey.toUpperCase()} Catalog`,
    subtitle: "Explore our premium pet essentials.",
    icon: "🛍️",
  };

  const [selectedAnimal, setSelectedAnimal] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("featured");

  const categoryProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.category === categoryKey);

    if (selectedAnimal !== "all") {
      list = list.filter((p) => p.animalType === selectedAnimal || p.animalType === "all");
    }

    if (sortOrder === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-high") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [categoryKey, selectedAnimal, sortOrder]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#738078] hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Categories</span>
        </Link>

        {/* Category Header Banner */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-2">
          <div className="text-2xl">{info.icon}</div>
          <h1 className="text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5]">
            {info.title}
          </h1>
          <p className="text-sm text-[#738078] dark:text-[#7E9086] max-w-2xl leading-relaxed">
            {info.subtitle}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#738078]">Filter Animal:</span>
            <div className="flex flex-wrap gap-1.5">
              {["all", "dogs", "cats", "birds", "hamsters"].map((animal) => (
                <button
                  key={animal}
                  onClick={() => setSelectedAnimal(animal)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    selectedAnimal === animal
                      ? "bg-[#1B4332] text-white dark:bg-[#4BB787] dark:text-[#0D1412]"
                      : "bg-[#FAF8F5] dark:bg-[#172420] text-[#738078] border border-[#E2DBD2] dark:border-[#253831]"
                  }`}
                >
                  {animal}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#738078]">
              {categoryProducts.length} items
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="h-9 px-3 text-xs font-medium rounded-lg border border-[#E2DBD2] dark:border-[#253831] bg-[#FAF8F5] dark:bg-[#172420] text-[#1C2421] dark:text-[#F3F7F5] focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {categoryProducts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] space-y-3">
            <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
              No products found in this category
            </h3>
            <p className="text-xs text-[#738078] dark:text-[#7E9086]">
              Check out our complete shop for more choices.
            </p>
            <Link href="/shop">
              <Button variant="primary" size="sm">
                View All Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
