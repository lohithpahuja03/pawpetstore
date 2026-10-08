import React from "react";
import { ANIMAL_CATEGORIES } from "../../lib/data";
import AnimalCategoryPage from "../../components/features/AnimalCategoryPage";

export const metadata = {
  title: "Dogs & Puppies for Adoption — PawPetStore",
  description: "Browse certified purebred puppies and dogs for ethical adoption. Labrador Retrievers, Golden Retrievers, German Shepherds, and more.",
};

export default function DogsPage() {
  const category = ANIMAL_CATEGORIES.find((c) => c.slug === "dogs")!;
  return <AnimalCategoryPage category={category} animalType="dogs" />;
}
