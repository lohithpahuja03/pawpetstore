"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Input, { Textarea } from "../../components/ui/Input";
import { cn } from "../../lib/utils";

const FAQS = [
  {
    q: "How does PawPetStore guarantee ethical pet adoption?",
    a: "Every listed puppy, kitten, bird, and small pet undergoes rigorous on-site veterinary inspections. We strictly verify maternal health intervals, hygienic enclosures, and provide complete DNA and vaccination records before any companion enters their new home.",
  },
  {
    q: "How are live animals transported safely across cities?",
    a: "We never ship pets via cargo freight. All pets travel in sanitized, temperature-controlled veterinary transit vehicles accompanied by certified animal caregivers, complete with food, hydration, and regular rest stops.",
  },
  {
    q: "What is your return & replacement policy on pet supplies?",
    a: "All pet food, beds, cages, and accessories come with a 7-day hassle-free replacement guarantee if damaged or unsatisfactory. Food bags must remain unopened in original packaging.",
  },
  {
    q: "How do clinic and vaccination bookings work?",
    a: "Choose your preferred veterinary clinic or doorstep visit, pick a date & time slot, and confirm. Your booking barcode syncs automatically with your pet's digital health record.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Adoption Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Contact Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4BB787]">
            We&apos;re Here For You & Your Pets
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5]">
            Contact PawPetStore
          </h1>
          <p className="text-sm text-[#738078] dark:text-[#7E9086]">
            Have questions about an adoptable companion, a veterinary appointment, or order tracking? Reach out to our pet care counselors.
          </p>
        </div>

        {/* Contact Info Grid & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                Direct Support Channels
              </h3>

              <div className="space-y-4 text-xs text-[#4A5550] dark:text-[#B6C4BC]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E8F4EE] dark:bg-[#162E24] text-[#1B4332] dark:text-[#4BB787] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-sm text-[#1C2421] dark:text-[#F3F7F5] block">
                      Phone & WhatsApp Helpline
                    </strong>
                    <p className="mt-0.5">+91 98765 43210 / +91 80 4123 4567</p>
                    <span className="text-[10px] text-[#738078]">Toll-free 9:00 AM – 9:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF2E9] dark:bg-[#2A2318] text-[#D9A066] dark:text-[#E3B27E] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-sm text-[#1C2421] dark:text-[#F3F7F5] block">
                      Email Inquiries
                    </strong>
                    <p className="mt-0.5">support@pawpetstore.com</p>
                    <span className="text-[10px] text-[#738078]">Average response time &lt; 2 hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FBECE8] dark:bg-[#331F1A] text-[#E07A5F] dark:text-[#F08C73] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-sm text-[#1C2421] dark:text-[#F3F7F5] block">
                      Headquarters & Flagship Clinic
                    </strong>
                    <p className="mt-0.5">
                      100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] dark:bg-[#1C2C27] text-[#738078] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-sm text-[#1C2421] dark:text-[#F3F7F5] block">
                      Clinic Operating Hours
                    </strong>
                    <p className="mt-0.5">Monday to Sunday: 8:00 AM – 10:00 PM</p>
                    <span className="text-[10px] text-[#2D6A4F] font-bold">24/7 Emergency Line Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                  Send Us a Message
                </h3>
                <p className="text-xs text-[#738078] dark:text-[#7E9086] mt-1">
                  Fill out the form below and our team will get back to you promptly.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#EAF4EE] dark:bg-[#142E22] text-[#2D6A4F] dark:text-[#52B788] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-[#738078] dark:text-[#7E9086] max-w-sm mx-auto">
                    Thank you for writing to PawPetStore. One of our counselors will contact you via email at <strong>{formData.email}</strong> within 2 hours.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A5550] dark:text-[#B6C4BC] mb-1.5">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full h-11 rounded-xl border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#141F1C] px-3 text-xs font-medium text-[#1C2421] dark:text-[#F3F7F5] focus:outline-none"
                      >
                        <option>Adoption Inquiry</option>
                        <option>Veterinary & Vaccination Care</option>
                        <option>Order Status & Tracking</option>
                        <option>Breeder Partnership</option>
                        <option>General Feedback</option>
                      </select>
                    </div>
                  </div>

                  <Textarea
                    label="Your Message"
                    required
                    rows={4}
                    placeholder="Tell us how we can help you and your companion..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />

                  <div className="pt-2 flex justify-end">
                    <Button type="submit" variant="primary" size="lg" className="font-bold px-8 shadow-md">
                      <span>Send Message</span>
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A066]">
              Common Questions
            </span>
            <h2 className="text-2xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#141F1C] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-[#1C2421] dark:text-[#F3F7F5]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-[#738078] transition-transform duration-200 shrink-0 ml-2",
                      openFaq === idx && "rotate-180 text-[#1B4332] dark:text-[#4BB787]"
                    )}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-[#4A5550] dark:text-[#B6C4BC] leading-relaxed border-t border-[#EFECE6] dark:border-[#253831] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
