import React from "react";
import { ANIMAL_CATEGORIES } from "../../lib/data";
import AnimalCategoryPage from "../../components/features/AnimalCategoryPage";

export const metadata = {
  title: "Hamsters & Small Pets — PawPetStore",
  description: "Sweet Syrian hamsters, dwarf hamsters, and friendly guinea pigs. Explore small pet care and spacious natural habitats.",
};

export default function HamstersPage() {
  const category = ANIMAL_CATEGORIES.find((c) => c.slug === "hamsters")!;
  return <AnimalCategoryPage category={category} animalType="hamsters" />;
}
