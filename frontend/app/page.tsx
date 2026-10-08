"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Stethoscope,
  Heart,
  Star,
  Award,
  Clock,
  ChevronRight,
  Dog,
  Cat,
  Feather,
  CheckCircle2,
} from "lucide-react";
import {
  PETS,
  PRODUCTS,
  BREEDS,
  ANIMAL_CATEGORIES,
  CARE_SERVICES,
  TESTIMONIALS,
  PetData,
} from "../lib/data";
import { formatCurrency } from "../lib/utils";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import PetCard from "../components/common/PetCard";
import ProductCard from "../components/common/ProductCard";
import BreedCard from "../components/common/BreedCard";
import PetInquiryModal from "../components/common/PetInquiryModal";

export default function HomePage() {
  const [selectedPetForInquiry, setSelectedPetForInquiry] = useState<PetData | null>(null);

  const featuredPets = PETS.filter((p) => p.isFeatured).slice(0, 4);
  const featuredProducts = PRODUCTS.slice(0, 4);
  const foodProducts = PRODUCTS.filter((p) => p.category === "food").slice(0, 3);
  const toyProducts = PRODUCTS.filter((p) => p.category === "toys" || p.category === "accessories").slice(0, 3);
  const popularBreeds = BREEDS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F3ECE2]/60 to-[#FAF8F5] dark:from-[#0D1412] dark:via-[#141F1C] dark:to-[#0D1412] py-12 lg:py-20 border-b border-[#E2DBD2] dark:border-[#253831]">
        {/* Soft Ambient Background Blooms */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#D9A066]/15 dark:bg-[#4BB787]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B4332]/10 dark:bg-[#4BB787]/20 border border-[#1B4332]/20 dark:border-[#4BB787]/30 text-[#1B4332] dark:text-[#4BB787] text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>India&apos;s Most Trusted Certified Pet Ecosystem</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1C2421] dark:text-[#F3F7F5] leading-[1.12]">
                Find Your Perfect Companion.{" "}
                <span className="text-[#1B4332] dark:text-[#4BB787] block sm:inline">
                  Care For Every Paw.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#4A5550] dark:text-[#B6C4BC] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover ethically raised puppies, kittens, birds, and small pets. Shop premium veterinary-approved nutrition, toys, and schedule home pet-care vaccinations in one seamless platform.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link href="/pets">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold shadow-lg gap-2 text-base">
                    <span>Explore Adoptable Pets</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold text-base">
                    Shop Pet Essentials
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E2DBD2] dark:border-[#253831] max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-black text-[#1B4332] dark:text-[#4BB787]">
                    100%
                  </div>
                  <div className="text-[11px] text-[#738078] dark:text-[#7E9086] font-medium leading-tight">
                    Vet Health Certified
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-black text-[#D9A066] dark:text-[#E3B27E]">
                    25,000+
                  </div>
                  <div className="text-[11px] text-[#738078] dark:text-[#7E9086] font-medium leading-tight">
                    Happy Pet Parents
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl font-black text-[#E07A5F] dark:text-[#F08C73]">
                    Zero
                  </div>
                  <div className="text-[11px] text-[#738078] dark:text-[#7E9086] font-medium leading-tight">
                    Puppy Mill Tolerance
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Image */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#172420]">
                  <Image
                    src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80"
                    alt="Happy pets in loving homes"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Overlaid Bottom Card */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-[#141F1C]/95 backdrop-blur-md shadow-lg border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                          Meet Golden Pup &ldquo;Milo&rdquo;
                        </div>
                        <div className="text-[11px] text-[#738078] dark:text-[#7E9086]">
                          Vaccinated • Microchipped • 3 Months
                        </div>
                      </div>
                      <Link href="/pets/pet-dog-1">
                        <span className="text-xs font-bold text-[#1B4332] dark:text-[#4BB787] hover:underline">
                          View Profile →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating Veterinary Shield Floating Card */}
                <div className="absolute -top-4 -left-4 sm:-left-6 p-3.5 rounded-2xl bg-white dark:bg-[#172420] shadow-xl border border-[#E2DBD2] dark:border-[#253831] flex items-center gap-3 animate-bounce [animation-duration:5s]">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F4EE] dark:bg-[#162E24] flex items-center justify-center text-[#1B4332] dark:text-[#4BB787]">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                      Veterinary Inspected
                    </div>
                    <div className="text-[10px] text-[#738078] dark:text-[#7E9086]">
                      Comprehensive Deworming & DNA Clear
                    </div>
                  </div>
                </div>

                {/* Floating Fast Delivery Floating Card */}
                <div className="absolute -bottom-4 -right-4 p-3.5 rounded-2xl bg-white dark:bg-[#172420] shadow-xl border border-[#E2DBD2] dark:border-[#253831] hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF2E9] dark:bg-[#2A2318] flex items-center justify-center text-[#D9A066] dark:text-[#E3B27E]">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                      Express Pet Logistics
                    </div>
                    <div className="text-[10px] text-[#738078] dark:text-[#7E9086]">
                      Safe climate-controlled transit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BROWSE BY ANIMAL CATEGORIES */}
      <section className="py-16 bg-[#FAF8F5] dark:bg-[#0D1412] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D9A066]">
                Species Directory
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5] mt-1">
                Browse By Animal Companion
              </h2>
            </div>
            <Link
              href="/pets"
              className="mt-3 md:mt-0 text-sm font-bold text-[#1B4332] dark:text-[#4BB787] hover:underline flex items-center gap-1"
            >
              <span>Explore All Pet Breeds</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ANIMAL_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/${cat.slug}`}
                className="group relative flex flex-col rounded-3xl overflow-hidden border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#172420] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5] dark:bg-[#141F1C]">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#D9A066]">
                      {cat.count} listings
                    </span>
                    <h3 className="text-xl font-bold leading-tight drop-shadow-sm">
                      {cat.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-[#738078] dark:text-[#7E9086] leading-relaxed">
                    {cat.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#EFECE6] dark:border-[#253831] flex items-center justify-between text-xs font-bold text-[#1B4332] dark:text-[#4BB787]">
                    <span>View {cat.name}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PETS (LIVE ADOPTION SPOTLIGHT) */}
      <section className="py-16 bg-white dark:bg-[#141F1C] border-y border-[#E2DBD2] dark:border-[#253831] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4BB787]">
                Ready For Forever Homes
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5] mt-1">
                Featured Companions Available Now
              </h2>
            </div>
            <Link
              href="/pets"
              className="mt-3 md:mt-0 text-sm font-bold text-[#1B4332] dark:text-[#4BB787] hover:underline flex items-center gap-1"
            >
              <span>See All Pets</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onInquiry={(p) => setSelectedPetForInquiry(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. POPULAR BREEDS ENCYCLOPEDIA SPOTLIGHT */}
      <section className="py-16 bg-[#FAF8F5] dark:bg-[#0D1412] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D9A066]">
                Breed Encyclopedia
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5] mt-1">
                Learn About Popular Breeds & Care
              </h2>
            </div>
            <Link
              href="/dogs"
              className="mt-3 md:mt-0 text-sm font-bold text-[#1B4332] dark:text-[#4BB787] hover:underline flex items-center gap-1"
            >
              <span>Explore All Breeds</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularBreeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SHOP PET ESSENTIALS (FEATURED PRODUCTS) */}
      <section className="py-16 bg-white dark:bg-[#141F1C] border-y border-[#E2DBD2] dark:border-[#253831] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4BB787]">
                Curated Store
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5] mt-1">
                Top Rated Pet Essentials
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-3 md:mt-0 text-sm font-bold text-[#1B4332] dark:text-[#4BB787] hover:underline flex items-center gap-1"
            >
              <span>View Full Shop</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. DUAL SPOTLIGHT: GOURMET FOOD & PLAYFUL TOYS */}
      <section className="py-16 bg-[#FAF8F5] dark:bg-[#0D1412] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Food Section Banner */}
          <div>
            <div className="rounded-3xl bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white p-8 md:p-12 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-lg space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D9A066]">
                  Premium Nutrition
                </span>
                <h3 className="text-2xl sm:text-3xl font-black">
                  Scientifically Balanced Food For Every Stage
                </h3>
                <p className="text-sm text-white/80">
                  Breed-specific kibble, grain-free wet recipes, and vitamin-rich treats for puppies, kittens, birds, and pocket pets.
                </p>
              </div>
              <Link href="/shop/food">
                <Button variant="secondary" size="lg" className="font-bold shrink-0">
                  Shop Food Marketplace →
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {foodProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>

          {/* Toys & Accessories Section Banner */}
          <div>
            <div className="rounded-3xl bg-gradient-to-r from-[#D9A066] to-[#C58B52] text-white p-8 md:p-12 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-lg space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                  Comfort & Play
                </span>
                <h3 className="text-2xl sm:text-3xl font-black">
                  Interactive Toys, Orthopedic Beds & Cages
                </h3>
                <p className="text-sm text-white/90">
                  Durable rubber chews, sisal cat trees, comfortable memory foam beds, and roomy habitats.
                </p>
              </div>
              <Link href="/shop/toys">
                <Button variant="primary" size="lg" className="font-bold shrink-0 shadow-lg">
                  Shop Toys & Beds →
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {toyProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. VACCINATION & PET-CARE SECTION */}
      <section className="py-16 bg-white dark:bg-[#141F1C] border-y border-[#E2DBD2] dark:border-[#253831] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#FAF8F5] dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] text-xs font-bold uppercase tracking-wider">
                  <Stethoscope className="w-3.5 h-3.5" /> Licensed Veterinary Care
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5] tracking-tight">
                  Protect Your Companion With Timely Vaccinations & Checkups
                </h2>
                <p className="text-sm text-[#4A5550] dark:text-[#B6C4BC] leading-relaxed">
                  Book verified clinic appointments or doorstep veterinary visits in Bengaluru, Mumbai, Pune, and Delhi. All immunizations recorded digitally in your pet&apos;s health card.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#1C2421] dark:text-[#F3F7F5]">
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] dark:text-[#52B788]" />
                    <span>Core DHPPi, Tricat, Anti-Rabies & Deworming Protocols</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#1C2421] dark:text-[#F3F7F5]">
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] dark:text-[#52B788]" />
                    <span>Stress-Free Spa Bathing, Trimming & Ear Hygiene</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#1C2421] dark:text-[#F3F7F5]">
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] dark:text-[#52B788]" />
                    <span>Instant WhatsApp Prescription & 48hr Followup Window</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href="/pet-care">
                    <Button variant="accent" size="lg" className="font-bold gap-2 shadow-lg">
                      <span>Book Pet Care Appointment</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Service Cards Preview */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CARE_SERVICES.slice(0, 4).map((srv) => (
                  <div
                    key={srv.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      {srv.badge && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E07A5F] block mb-1">
                          {srv.badge}
                        </span>
                      )}
                      <h4 className="text-sm font-bold text-[#1C2421] dark:text-[#F3F7F5] leading-snug">
                        {srv.name}
                      </h4>
                      <p className="text-[11px] text-[#738078] dark:text-[#7E9086] mt-1 line-clamp-2">
                        {srv.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EFECE6] dark:border-[#253831] flex items-center justify-between">
                      <span className="text-xs font-black text-[#1B4332] dark:text-[#4BB787]">
                        {formatCurrency(srv.price)}
                      </span>
                      <Link href="/pet-care">
                        <span className="text-[11px] font-bold text-[#E07A5F] hover:underline">
                          Select Slot →
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHY PAWPETSTORE (TRUST & ETHICS PILLARS) */}
      <section className="py-16 bg-[#FAF8F5] dark:bg-[#0D1412] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4BB787]">
              The PawPetStore Standard
            </span>
            <h2 className="text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5]">
              Why Pet Parents Put Their Trust in Us
            </h2>
            <p className="text-sm text-[#738078] dark:text-[#7E9086]">
              We built PawPetStore to eliminate shady puppy mills, fake breeders, and low-quality pet products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F4EE] dark:bg-[#162E24] flex items-center justify-center text-[#1B4332] dark:text-[#4BB787]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                Strict Ethical Breeding Audits
              </h3>
              <p className="text-xs text-[#738078] dark:text-[#7E9086] leading-relaxed">
                Every breeder is inspected on-site by veterinary specialists for spacious maternal housing, hygienic enclosures, and humane resting periods. Zero mills allowed.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF2E9] dark:bg-[#2A2318] flex items-center justify-center text-[#D9A066] dark:text-[#E3B27E]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                Lifetime Pet Guidance Guarantee
              </h3>
              <p className="text-xs text-[#738078] dark:text-[#7E9086] leading-relaxed">
                Adopting through PawPetStore comes with lifetime access to veterinary dietary charts, potty-training guidelines, and behavioral counseling.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FBECE8] dark:bg-[#331F1A] flex items-center justify-center text-[#E07A5F] dark:text-[#F08C73]">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                Climate-Controlled Pet Transport
              </h3>
              <p className="text-xs text-[#738078] dark:text-[#7E9086] leading-relaxed">
                We never ship live animals via cargo. Each companion travels accompanied by certified pet handlers in sanitized temperature-controlled vans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CUSTOMER TESTIMONIALS */}
      <section className="py-16 bg-white dark:bg-[#141F1C] border-t border-[#E2DBD2] dark:border-[#253831] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A066]">
              Real Pet Stories
            </span>
            <h2 className="text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5]">
              Loved by 25,000+ Pet Families
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-7 rounded-3xl bg-[#FAF8F5] dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#D9A066]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D9A066]" />
                    ))}
                  </div>
                  <p className="text-xs text-[#4A5550] dark:text-[#B6C4BC] leading-relaxed italic">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#EFECE6] dark:border-[#253831]">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D9A066]">
                    <Image src={t.avatar} alt={t.author} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                      {t.author}
                    </h4>
                    <p className="text-[10px] text-[#738078] dark:text-[#7E9086]">
                      Parent to {t.petName} ({t.petType}) • {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <PetInquiryModal
        pet={selectedPetForInquiry}
        isOpen={!!selectedPetForInquiry}
        onClose={() => setSelectedPetForInquiry(null)}
      />
    </div>
  );
}
