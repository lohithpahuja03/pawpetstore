import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Heart, Award, Users, CheckCircle2, ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button";

export const metadata = {
  title: "About Us — PawPetStore",
  description: "Learn about PawPetStore's mission, ethical breeding standards, veterinary advisory council, and animal welfare commitment.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4BB787]">
              Our Founding Story
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5] tracking-tight leading-tight">
              Championing Ethical Pet Parenthood Across India
            </h1>
            <p className="text-base text-[#4A5550] dark:text-[#B6C4BC] leading-relaxed">
              PawPetStore was founded with a singular conviction: every pet deserves a healthy start, and every pet parent deserves absolute transparency.
            </p>
            <p className="text-sm text-[#738078] dark:text-[#7E9086] leading-relaxed">
              Frustrated by unregulated puppy mills and counterfeit pet goods flooding marketplaces, we gathered licensed veterinary surgeons, ethical foster sanctuaries, and animal behaviorists to create a certified platform where welfare always comes before commerce.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-[#172420]">
              <Image
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1000&q=80"
                alt="Loving pet parents and healthy pets"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Core Values Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F4EE] dark:bg-[#162E24] text-[#1B4332] dark:text-[#4BB787] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
              Zero Mill Tolerance
            </h3>
            <p className="text-xs text-[#738078] dark:text-[#7E9086] leading-relaxed">
              We audit all breeder housing on-site for cleanliness, maternal rest schedules, and open exercise yards. We enforce mandatory veterinary sign-offs before any listing is published.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF2E9] dark:bg-[#2A2318] text-[#D9A066] dark:text-[#E3B27E] flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
              Health Certified First
            </h3>
            <p className="text-xs text-[#738078] dark:text-[#7E9086] leading-relaxed">
              Every companion is delivered microchipped, dewormed, and fully vaccinated with registered manufacturer serial barcodes. We stand behind a 30-day health guarantee.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FBECE8] dark:bg-[#331F1A] text-[#E07A5F] dark:text-[#F08C73] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
              Lifetime Foster Support
            </h3>
            <p className="text-xs text-[#738078] dark:text-[#7E9086] leading-relaxed">
              Adopting through PawPetStore connects you directly to our veterinary counselors for lifetime diet adjustments, behavior guidelines, and emergency advice.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-10 rounded-3xl bg-[#1B4332] text-white text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ready to find your four-legged companion?
          </h2>
          <p className="text-sm text-white/80 max-w-xl mx-auto">
            Browse our verified puppies, kittens, birds, and small pets today.
          </p>
          <div className="pt-2">
            <Link href="/pets">
              <Button variant="secondary" size="lg" className="font-bold">
                Explore Available Pets →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
