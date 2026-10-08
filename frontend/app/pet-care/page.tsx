"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { CARE_SERVICES, CareServiceData } from "../../lib/data";
import { useAuthStore, UserAppointment } from "../../store/auth-store";
import { formatCurrency } from "../../lib/utils";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";

export default function PetCarePage() {
  const { user, bookAppointment } = useAuthStore();

  const [selectedService, setSelectedService] = useState<CareServiceData | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<number>(1);

  const [bookingForm, setFormData] = useState({
    petName: "Milo",
    petType: "Dogs",
    petAge: "6 Months",
    clinicName: "PawPetStore Wellness Center - Indiranagar, Bengaluru",
    date: "Tomorrow, 10:30 AM",
    timeSlot: "10:30 AM - 11:00 AM",
    ownerName: user?.name || "Lohith Pahuja",
    ownerPhone: user?.phone || "+91 98765 43210",
  });

  const [confirmedBooking, setConfirmedBooking] = useState<UserAppointment | null>(null);

  const handleSelectService = (srv: CareServiceData) => {
    setSelectedService(srv);
    setBookingStep(1);
    setConfirmedBooking(null);
    setBookingModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedService) return;

    const apt = bookAppointment({
      serviceName: selectedService.name,
      petName: bookingForm.petName,
      petType: bookingForm.petType,
      clinicName: bookingForm.clinicName,
      date: "April 18, 2026",
      timeSlot: bookingForm.timeSlot,
      status: "Confirmed",
      amount: selectedService.price,
    });

    setConfirmedBooking(apt);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <div className="p-8 md:p-14 rounded-3xl bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#D9A066] uppercase tracking-wider">
              <Stethoscope className="w-3.5 h-3.5" /> Licensed Veterinary Network
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Vaccination, Wellness & Pet Care
            </h1>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Book stress-free immunizations, dental cleanings, hygienic grooming retreats, and certified health checkups with board-certified veterinary doctors.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-white/90">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#4BB787]" />
                <span>100% Genuine Barcoded Vaccines</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#D9A066]" />
                <span>Flexible Same-Day Rescheduling</span>
              </span>
            </div>
          </div>
        </div>

        {/* Services Directory */}
        <div className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4BB787]">
                Clinical Treatments
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5] mt-1">
                Select a Veterinary Service
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CARE_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="p-8 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm flex flex-col justify-between space-y-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#1C2C27] text-[#738078] dark:text-[#B6C4BC] border border-[#E2DBD2] dark:border-[#253831]">
                      {srv.category} • {srv.duration}
                    </span>
                    {srv.badge && (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FBECE8] text-[#E07A5F] dark:bg-[#331F1A]">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                    {srv.name}
                  </h3>

                  <p className="text-xs text-[#738078] dark:text-[#7E9086] leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="pt-2 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1C2421] dark:text-[#F3F7F5] block">
                      Package Includes:
                    </span>
                    {srv.includes.map((inc, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#4A5550] dark:text-[#B6C4BC]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F] dark:text-[#52B788] shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EFECE6] dark:border-[#253831] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#738078] block">Fee per pet</span>
                    <span className="text-xl font-extrabold text-[#1B4332] dark:text-[#4BB787]">
                      {formatCurrency(srv.price)}
                    </span>
                  </div>

                  <Button
                    variant="accent"
                    size="md"
                    onClick={() => handleSelectService(srv)}
                    className="font-bold gap-2"
                  >
                    <span>Book Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinics Network List */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
            PawPetStore Veterinary Centers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#4A5550] dark:text-[#B6C4BC]">
            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] space-y-2">
              <strong className="text-sm text-[#1C2421] dark:text-[#F3F7F5] block">
                Bengaluru - Indiranagar Flagship
              </strong>
              <p>100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038</p>
              <p className="text-[#1B4332] dark:text-[#4BB787] font-semibold">
                Open Daily: 8:00 AM - 10:00 PM • Emergency On Call
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] space-y-2">
              <strong className="text-sm text-[#1C2421] dark:text-[#F3F7F5] block">
                Mumbai - Bandra West Center
              </strong>
              <p>Hill Road, Bandra West, Mumbai 400050</p>
              <p className="text-[#1B4332] dark:text-[#4BB787] font-semibold">
                Open Daily: 9:00 AM - 9:00 PM
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] space-y-2">
              <strong className="text-sm text-[#1C2421] dark:text-[#F3F7F5] block">
                Delhi NCR - Vasant Vihar
              </strong>
              <p>Block A, Vasant Vihar, New Delhi 110057</p>
              <p className="text-[#1B4332] dark:text-[#4BB787] font-semibold">
                Open Daily: 9:00 AM - 9:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Wizard Modal */}
      <Modal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        title={confirmedBooking ? "Appointment Confirmed!" : `Book ${selectedService?.name}`}
        description={
          confirmedBooking
            ? `Your booking ref is ${confirmedBooking.bookingRef}.`
            : "Select your preferred slot and clinic facility."
        }
        maxWidth="md"
      >
        {confirmedBooking ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EAF4EE] dark:bg-[#142E22] text-[#2D6A4F] dark:text-[#52B788] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                Booking Confirmed! Reference: {confirmedBooking.bookingRef}
              </h3>
              <p className="text-xs text-[#738078] dark:text-[#7E9086] mt-1">
                A confirmation SMS and calendar invite has been sent to {bookingForm.ownerPhone}.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#172420] text-left text-xs space-y-1">
              <div><strong>Service:</strong> {confirmedBooking.serviceName}</div>
              <div><strong>Patient:</strong> {confirmedBooking.petName}</div>
              <div><strong>Facility:</strong> {confirmedBooking.clinicName}</div>
              <div><strong>Schedule:</strong> {confirmedBooking.date} ({confirmedBooking.timeSlot})</div>
            </div>

            <div className="flex gap-2">
              <Link href="/account" className="flex-1">
                <Button variant="primary" className="w-full">
                  View in My Appointments
                </Button>
              </Link>
              <Button variant="outline" onClick={() => setBookingModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Pet Name"
                value={bookingForm.petName}
                onChange={(e) => setFormData({ ...bookingForm, petName: e.target.value })}
              />
              <Input
                label="Species / Breed"
                value={bookingForm.petType}
                onChange={(e) => setFormData({ ...bookingForm, petType: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A5550] dark:text-[#B6C4BC] mb-1.5">
                Select Facility
              </label>
              <select
                value={bookingForm.clinicName}
                onChange={(e) => setFormData({ ...bookingForm, clinicName: e.target.value })}
                className="w-full h-11 rounded-xl border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#141F1C] px-3 text-xs font-medium"
              >
                <option>PawPetStore Wellness Center - Indiranagar, Bengaluru</option>
                <option>PawPetStore Clinic - Bandra West, Mumbai</option>
                <option>PawPetStore Clinic - Vasant Vihar, Delhi NCR</option>
                <option>At-Home Doorstep Visit (Doctor Van)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A5550] dark:text-[#B6C4BC] mb-1.5">
                Preferred Time Slot
              </label>
              <select
                value={bookingForm.timeSlot}
                onChange={(e) => setFormData({ ...bookingForm, timeSlot: e.target.value })}
                className="w-full h-11 rounded-xl border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#141F1C] px-3 text-xs font-medium"
              >
                <option>10:00 AM - 10:30 AM</option>
                <option>11:30 AM - 12:00 PM</option>
                <option>02:00 PM - 02:30 PM</option>
                <option>04:30 PM - 05:00 PM</option>
                <option>06:00 PM - 06:30 PM</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Parent Name"
                value={bookingForm.ownerName}
                onChange={(e) => setFormData({ ...bookingForm, ownerName: e.target.value })}
              />
              <Input
                label="WhatsApp Phone"
                value={bookingForm.ownerPhone}
                onChange={(e) => setFormData({ ...bookingForm, ownerPhone: e.target.value })}
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setBookingModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleConfirmBooking} className="font-bold">
                Confirm Booking • {selectedService && formatCurrency(selectedService.price)}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
