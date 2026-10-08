"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Heart,
  ShieldCheck,
  Send,
  CheckCircle2,
} from "lucide-react";
import Logo from "../ui/Logo";
import Button from "../ui/Button";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#FAF8F5] dark:bg-[#090F0D] text-[#1C2421] dark:text-[#F3F7F5] border-t border-[#E2DBD2] dark:border-[#253831] transition-colors">
      {/* Newsletter & Club Section */}
      <div className="border-b border-[#E2DBD2] dark:border-[#253831]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl bg-[#1B4332] text-white p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#D9A066]/10 pointer-events-none" />

            <div className="max-w-xl space-y-2 text-center lg:text-left z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-wider uppercase text-[#D9A066]">
                <Heart className="w-3.5 h-3.5 fill-[#D9A066]" /> PawPetStore Club
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Get 10% Off Your First Pet Order
              </h3>
              <p className="text-sm text-white/80">
                Join 25,000+ conscious pet parents. Receive veterinary wellness tips, adoption alerts, and members-only VIP flash discounts.
              </p>
            </div>

            <div className="w-full lg:w-auto z-10">
              {subscribed ? (
                <div className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/15 text-white backdrop-blur-md">
                  <CheckCircle2 className="w-5 h-5 text-[#4BB787]" />
                  <span className="text-sm font-semibold">
                    Welcome to the PawPetStore family! Check your inbox for code <strong>PAW10</strong>.
                  </span>
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-2 max-w-md w-full"
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-12 px-5 rounded-xl bg-white text-[#1C2421] placeholder:text-[#738078] text-sm focus:outline-none focus:ring-2 focus:ring-[#D9A066] min-w-[260px]"
                  />
                  <Button
                    type="submit"
                    variant="accent"
                    size="md"
                    className="h-12 font-bold px-6 shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="w-4 h-4 ml-1.5" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="full" size="md" />
            <p className="text-sm text-[#738078] dark:text-[#7E9086] max-w-sm leading-relaxed">
              PawPetStore is India&apos;s premier certified pet marketplace and healthcare platform. We partner exclusively with certified ethical breeding sanctuaries and licensed veterinarians to ensure every pet enters a loving, healthy forever home.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-[#738078] dark:text-[#7E9086]">
              <span>Follow our happy tails:</span>
              <span className="hover:text-[#1B4332] dark:hover:text-[#4BB787] cursor-pointer">Instagram</span>
              <span>•</span>
              <span className="hover:text-[#1B4332] dark:hover:text-[#4BB787] cursor-pointer">YouTube</span>
              <span>•</span>
              <span className="hover:text-[#1B4332] dark:hover:text-[#4BB787] cursor-pointer">Twitter/X</span>
            </div>
          </div>

          {/* Column: Animal Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C2421] dark:text-[#F3F7F5]">
              Explore Animals
            </h4>
            <ul className="space-y-2 text-sm text-[#738078] dark:text-[#7E9086]">
              <li>
                <Link href="/dogs" className="hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors">
                  Dogs & Puppies
                </Link>
              </li>
              <li>
                <Link href="/cats" className="hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors">
                  Cats & Kittens
                </Link>
              </li>
              <li>
                <Link href="/birds" className="hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors">
                  Birds & Parrots
                </Link>
              </li>
              <li>
                <Link href="/hamsters" className="hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors">
                  Hamsters & Small Pets
                </Link>
              </li>
              <li>
                <Link href="/pets" className="hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors font-semibold">
                  Browse All 50+ Pets →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Shop Essentials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C2421] dark:text-[#F3F7F5]">
              Shop Essentials
            </h4>
            <ul className="space-y-2 text-sm text-[#738078] dark:text-[#7E9086]">
              <li>
                <Link href="/shop/food" className="hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors">
                  Food & Nutrition
                </Link>
              </li>
              <li>
                <Link href="/shop/toys" className="hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors">
                  Toys & Puzzles
                </Link>
              </li>
              <li>
                <Link href="/shop/cages" className="hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors">
                  Cages & Habitats
                </Link>
              </li>
              <li>
                <Link href="/shop/accessories" className="hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors">
                  Orthopedic Beds & Leashes
                </Link>
              </li>
              <li>
                <Link href="/shop/grooming" className="hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors">
                  Grooming & Hygiene
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Contact & Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C2421] dark:text-[#F3F7F5]">
              Care & Helpdesk
            </h4>
            <ul className="space-y-2.5 text-xs text-[#738078] dark:text-[#7E9086]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1B4332] dark:text-[#4BB787] shrink-0 mt-0.5" />
                <span>Indiranagar 100ft Rd, Bengaluru 560038</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1B4332] dark:text-[#4BB787] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1B4332] dark:text-[#4BB787] shrink-0" />
                <span>support@pawpetstore.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1B4332] dark:text-[#4BB787] shrink-0" />
                <span>Daily: 9:00 AM – 9:00 PM IST</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/pet-care"
                  className="inline-flex items-center gap-1 font-bold text-[#E07A5F] hover:underline"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Book Vet Appointment</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-[#E2DBD2] dark:border-[#253831] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#738078] dark:text-[#7E9086]">
          <p>© {new Date().getFullYear()} PawPetStore Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
            <a href="#privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
