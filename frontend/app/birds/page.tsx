import React from "react";
import { ANIMAL_CATEGORIES } from "../../lib/data";
import AnimalCategoryPage from "../../components/features/AnimalCategoryPage";

export const metadata = {
  title: "Birds & Parrots — PawPetStore",
  description: "Hand-tamed cockatiels, musical budgies, and colorful lovebirds raised in humane aviary sanctuaries.",
};

export default function BirdsPage() {
  const category = ANIMAL_CATEGORIES.find((c) => c.slug === "birds")!;
  return <AnimalCategoryPage category={category} animalType="birds" />;
}
