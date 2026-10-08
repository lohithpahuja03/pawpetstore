"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  MapPin,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Share2,
  Stethoscope,
  Info,
  Phone,
} from "lucide-react";
import { PETS, PRODUCTS, PetData } from "../../../lib/data";
import { formatCurrency, cn } from "../../../lib/utils";
import { useWishlistStore } from "../../../store/wishlist-store";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import PetCard from "../../../components/common/PetCard";
import ProductCard from "../../../components/common/ProductCard";
import PetInquiryModal from "../../../components/common/PetInquiryModal";

export default function PetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const pet = PETS.find((p) => p.id === resolvedParams.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { isPetSaved, togglePet } = useWishlistStore();

  if (!pet) {
    return notFound();
  }

  const saved = isPetSaved(pet.id);
  const relatedPets = PETS.filter(
    (p) => p.animalType === pet.animalType && p.id !== pet.id
  ).slice(0, 3);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.animalType === pet.animalType || p.animalType === "all"
  ).slice(0, 3);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/pets"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#738078] hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Pets</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#141F1C] text-[#1C2421] dark:text-[#F3F7F5] hover:bg-[#FAF8F5] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Link Copied!" : "Share Profile"}</span>
          </button>
        </div>

        {/* Main Pet Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#141F1C] shadow-md">
              <Image
                src={pet.images[activeImageIndex] || pet.images[0]}
                alt={pet.name}
                fill
                priority
                className="object-cover"
              />

              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="primary" size="md" className="backdrop-blur-md bg-white/90 dark:bg-[#141F1C]/90 shadow-sm">
                  {pet.gender} • {pet.age} {pet.ageUnit}
                </Badge>
                {pet.isFeatured && (
                  <Badge variant="secondary" size="md">
                    <Sparkles className="w-3.5 h-3.5" /> Featured
                  </Badge>
                )}
              </div>

              <button
                onClick={() => togglePet(pet.id)}
                className={cn(
                  "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg",
                  saved
                    ? "bg-[#E07A5F] text-white"
                    : "bg-white/90 text-[#738078] hover:text-[#E07A5F] dark:bg-[#141F1C]/90"
                )}
                aria-label="Save to Wishlist"
              >
                <Heart className={cn("w-5 h-5", saved && "fill-white")} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {pet.images.length > 1 && (
              <div className="flex gap-3">
                {pet.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all",
                      activeImageIndex === idx
                        ? "border-[#1B4332] dark:border-[#4BB787] ring-2 ring-[#1B4332]/20"
                        : "border-[#E2DBD2] dark:border-[#253831] opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt={`${pet.name} photo ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Veterinary Guarantees Banner */}
            <div className="p-5 rounded-2xl bg-[#EAF4EE] dark:bg-[#142E22] border border-[#2D6A4F]/20 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-[#2D6A4F] dark:text-[#52B788] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#2D6A4F] dark:text-[#52B788]">
                  PawPetStore Certified Health Guarantee
                </h4>
                <p className="text-xs text-[#2D6A4F]/90 dark:text-[#52B788]/90 leading-relaxed">
                  {pet.healthStatus}. Comes with verified vaccination booklet, microchip serial tag, and 30-day comprehensive health warranty covering any genetic conditions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pet Attributes & Adoption CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-[#738078] dark:text-[#7E9086]">
                <span>{pet.breed}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{pet.location}</span>
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#1C2421] dark:text-[#F3F7F5] mt-1">
                {pet.name}
              </h1>
            </div>

            {/* Price Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-[#738078] dark:text-[#7E9086] block">
                  Adoption Contribution
                </span>
                <span className="text-2xl sm:text-3xl font-black text-[#1B4332] dark:text-[#4BB787]">
                  {formatCurrency(pet.price)}
                </span>
              </div>
              <div className="text-right">
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-[#E8F4EE] dark:bg-[#162E24] text-[#2D6A4F] dark:text-[#52B788]">
                  Available For Adoption
                </span>
              </div>
            </div>

            {/* Key Statistics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831]">
                <span className="text-[#738078] dark:text-[#7E9086] block">Age</span>
                <strong className="text-sm text-[#1C2421] dark:text-[#F3F7F5]">
                  {pet.age} {pet.ageUnit}
                </strong>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831]">
                <span className="text-[#738078] dark:text-[#7E9086] block">Gender</span>
                <strong className="text-sm text-[#1C2421] dark:text-[#F3F7F5]">
                  {pet.gender}
                </strong>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831]">
                <span className="text-[#738078] dark:text-[#7E9086] block">Color</span>
                <strong className="text-sm text-[#1C2421] dark:text-[#F3F7F5]">
                  {pet.color}
                </strong>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831]">
                <span className="text-[#738078] dark:text-[#7E9086] block">Current Weight</span>
                <strong className="text-sm text-[#1C2421] dark:text-[#F3F7F5]">
                  {pet.weight}
                </strong>
              </div>
            </div>

            {/* Temperament */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A5550] dark:text-[#B6C4BC]">
                Personality & Temperament
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {pet.temperament.map((trait) => (
                  <span
                    key={trait}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] text-[#1C2421] dark:text-[#F3F7F5]"
                  >
                    ✨ {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Story & Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4A5550] dark:text-[#B6C4BC]">
                About {pet.name}
              </h3>
              <p className="text-sm text-[#4A5550] dark:text-[#B6C4BC] leading-relaxed">
                {pet.description}
              </p>
            </div>

            {/* Care Tips */}
            <div className="space-y-2 p-4 rounded-2xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4BB787] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Care & Nutrition Tips
              </h3>
              <ul className="space-y-1.5 text-xs text-[#4A5550] dark:text-[#B6C4BC]">
                {pet.careTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F] dark:text-[#52B788] shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full font-bold shadow-xl text-base py-4"
                onClick={() => setInquiryModalOpen(true)}
              >
                Inquire to Adopt {pet.name}
              </Button>
              <p className="text-[11px] text-center text-[#738078] dark:text-[#7E9086]">
                No commitment. Connect with our adoption counselors to schedule a live video call.
              </p>
            </div>
          </div>
        </div>

        {/* Related Pets */}
        {relatedPets.length > 0 && (
          <div className="pt-12 border-t border-[#E2DBD2] dark:border-[#253831] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                Other {pet.animalType} You May Love
              </h3>
              <Link href={`/${pet.animalType}`} className="text-xs font-bold text-[#1B4332] dark:text-[#4BB787] hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPets.map((p) => (
                <PetCard key={p.id} pet={p} />
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-10 border-t border-[#E2DBD2] dark:border-[#253831] space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                Recommended Food & Gear for {pet.name}
              </h3>
              <Link href="/shop" className="text-xs font-bold text-[#1B4332] dark:text-[#4BB787] hover:underline">
                Shop all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Modal */}
      <PetInquiryModal
        pet={pet}
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
      />
    </div>
  );
}
