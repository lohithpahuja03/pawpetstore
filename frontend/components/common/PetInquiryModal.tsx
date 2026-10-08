"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { PetData } from "../../lib/data";
import { formatCurrency } from "../../lib/utils";
import Modal from "../ui/Modal";
import Input, { Textarea } from "../ui/Input";
import Button from "../ui/Button";

interface PetInquiryModalProps {
  pet: PetData | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PetInquiryModal: React.FC<PetInquiryModalProps> = ({
  pet,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    experience: "Experienced pet parent",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryRef, setInquiryRef] = useState("INQ-98124");

  if (!pet) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const refCode = `INQ-${Math.floor(10000 + Math.random() * 90000)}`;
    setInquiryRef(refCode);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={submitted ? "Adoption Inquiry Received!" : `Inquire About ${pet.name}`}
      description={
        submitted
          ? "Our ethical adoption team has received your request."
          : `Connect with our veterinary counselors regarding ${pet.breed} (${pet.gender}, ${pet.age} ${pet.ageUnit}).`
      }
      maxWidth="md"
    >
      {submitted ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#EAF4EE] dark:bg-[#142E22] text-[#2D6A4F] dark:text-[#52B788] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
              Thank you for choosing to adopt {pet.name}!
            </h4>
            <p className="text-xs text-[#738078] dark:text-[#7E9086] mt-2 max-w-sm mx-auto">
              Inquiry Reference: <strong>{inquiryRef}</strong>.
              A licensed pet counselor will contact you via WhatsApp/phone at <strong>{formData.phone || "+91 98765 43210"}</strong> within 2 business hours.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] text-left text-xs space-y-1">
            <div className="font-semibold text-[#1C2421] dark:text-[#F3F7F5]">What happens next:</div>
            <div className="text-[#738078] dark:text-[#7E9086]">1. Virtual home readiness & lifestyle check</div>
            <div className="text-[#738078] dark:text-[#7E9086]">2. Live video meet & greet with {pet.name}</div>
            <div className="text-[#738078] dark:text-[#7E9086]">3. Free veterinary health certification handover</div>
          </div>
          <Button variant="primary" onClick={handleClose} className="w-full">
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quick Pet Preview Banner */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#172420] border border-[#EFECE6] dark:border-[#253831]">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
              <Image src={pet.images[0]} alt={pet.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-[#1C2421] dark:text-[#F3F7F5] truncate">
                {pet.name} ({pet.breed})
              </h4>
              <p className="text-xs text-[#738078] dark:text-[#7E9086]">
                Location: {pet.location} • Adoption Fee: {formatCurrency(pet.price)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Your Full Name"
              required
              placeholder="e.g. Rahul Verma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="Phone Number (WhatsApp)"
              required
              placeholder="e.g. +91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Email Address"
              type="email"
              required
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Your City"
              required
              placeholder="e.g. Bengaluru, Mumbai"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A5550] dark:text-[#B6C4BC] mb-1.5">
              Household Pet Experience
            </label>
            <select
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full h-11 rounded-xl border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#141F1C] px-4 text-xs font-medium text-[#1C2421] dark:text-[#F3F7F5] focus:outline-none focus:ring-2 focus:ring-[#1B4332]"
            >
              <option>First-time pet parent (Need guidance)</option>
              <option>Experienced pet parent</option>
              <option>Have other friendly pets at home</option>
              <option>Family with young children</option>
            </select>
          </div>

          <Textarea
            label="Tell us about your home & why you love this companion"
            placeholder="Share a short note about your lifestyle, work schedule, or any questions for our veterinarian..."
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <div className="flex items-center gap-2 text-[11px] text-[#738078] dark:text-[#7E9086]">
            <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
            <span>PawPetStore never supports unethical mills. 100% vaccinated & health vetted.</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="md" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              className="font-bold px-6"
            >
              Submit Adoption Inquiry
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default PetInquiryModal;
