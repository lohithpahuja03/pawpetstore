"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { PetData } from "../../lib/data";
import { formatCurrency, cn } from "../../lib/utils";
import { useWishlistStore } from "../../store/wishlist-store";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

interface PetCardProps {
  pet: PetData;
  className?: string;
  onInquiry?: (pet: PetData) => void;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, className, onInquiry }) => {
  const { isPetSaved, togglePet } = useWishlistStore();
  const saved = isPetSaved(pet.id);

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#172420] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden",
        className
      )}
    >
      {/* Pet Image Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5] dark:bg-[#141F1C]">
        <Image
          src={pet.images[0]}
          alt={pet.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <Badge variant="primary" size="sm" className="backdrop-blur-md bg-white/90 dark:bg-[#162E24]/90 shadow-sm">
            {pet.gender} • {pet.age} {pet.ageUnit}
          </Badge>
          {pet.isFeatured && (
            <Badge variant="secondary" size="sm" className="shadow-sm">
              <Sparkles className="w-3 h-3" /> Featured
            </Badge>
          )}
        </div>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.preventDefault();
            togglePet(pet.id);
          }}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md z-10",
            saved
              ? "bg-[#E07A5F] text-white"
              : "bg-white/90 text-[#738078] hover:text-[#E07A5F] dark:bg-[#141F1C]/90"
          )}
          aria-label="Save to Wishlist"
        >
          <Heart className={cn("w-4 h-4", saved && "fill-white")} />
        </button>

        {/* Health Guarantee Pill */}
        {pet.vaccinated && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#141F1C]/90 backdrop-blur-md text-[11px] font-semibold text-[#2D6A4F] dark:text-[#52B788] shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Vaccinated</span>
          </div>
        )}
      </div>

      {/* Pet Information */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-[#738078] dark:text-[#7E9086]">
            <span>{pet.breed}</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate max-w-[120px]">{pet.location.split(",")[0]}</span>
            </span>
          </div>
          <Link href={`/pets/${pet.id}`}>
            <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5] group-hover:text-[#1B4332] dark:group-hover:text-[#4BB787] transition-colors mt-0.5">
              {pet.name}
            </h3>
          </Link>
        </div>

        {/* Temperament Tags */}
        <div className="flex flex-wrap gap-1">
          {pet.temperament.slice(0, 3).map((trait) => (
            <span
              key={trait}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FAF8F5] dark:bg-[#1C2C27] text-[#4A5550] dark:text-[#B6C4BC] border border-[#EFECE6] dark:border-[#253831]"
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Price & Action */}
        <div className="pt-3 mt-auto border-t border-[#EFECE6] dark:border-[#1C2C27] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-[#738078] block">Adoption Fee</span>
            <span className="text-base font-extrabold text-[#1B4332] dark:text-[#4BB787]">
              {formatCurrency(pet.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {onInquiry && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onInquiry(pet)}
                className="text-xs font-semibold px-2.5 h-8"
              >
                Inquire
              </Button>
            )}
            <Link href={`/pets/${pet.id}`}>
              <Button variant="primary" size="sm" className="text-xs font-semibold h-8 gap-1 px-3">
                <span>Meet {pet.name}</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
