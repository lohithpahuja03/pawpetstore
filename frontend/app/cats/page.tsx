import React from "react";
import { ANIMAL_CATEGORIES } from "../../lib/data";
import AnimalCategoryPage from "../../components/features/AnimalCategoryPage";

export const metadata = {
  title: "Cats & Kittens for Adoption — PawPetStore",
  description: "Explore vaccinated, playful kittens and gentle adult cats. Persian Cats, Maine Coons, British Shorthairs, and Bengals.",
};

export default function CatsPage() {
  const category = ANIMAL_CATEGORIES.find((c) => c.slug === "cats")!;
  return <AnimalCategoryPage category={category} animalType="cats" />;
}
