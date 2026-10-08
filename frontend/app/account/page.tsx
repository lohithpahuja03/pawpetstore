"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import { useAuthStore } from "../../store/auth-store";
import { useWishlistStore } from "../../store/wishlist-store";
import { PETS, PRODUCTS } from "../../lib/data";
import { formatCurrency, cn } from "../../lib/utils";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import PetCard from "../../components/common/PetCard";
import ProductCard from "../../components/common/ProductCard";

type TabType = "orders" | "appointments" | "addresses" | "wishlist" | "profile";

export default function AccountDashboardPage() {
  const {
    user,
    isAuthenticated,
    addresses,
    orders,
    appointments,
    login,
    logout,
    updateProfile,
    addAddress,
    removeAddress,
    setDefaultAddress,
  } = useAuthStore();

  const { petIds, productIds } = useWishlistStore();

  const [activeTab, setActiveTab] = useState<
    "orders" | "appointments" | "addresses" | "wishlist" | "profile"
  >("orders");

  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    addressLine1: "",
    addressLine2: "",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "",
    isDefault: false,
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const savedPets = PETS.filter((p) => petIds.includes(p.id));
  const savedProducts = PRODUCTS.filter((p) => productIds.includes(p.id));

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddress.addressLine1 && newAddress.postalCode) {
      addAddress(newAddress);
      setAddressModalOpen(false);
      setNewAddress({
        fullName: user?.name || "",
        phone: user?.phone || "",
        addressLine1: "",
        addressLine2: "",
        city: "Bengaluru",
        state: "Karnataka",
        postalCode: "",
        isDefault: false,
      });
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Header Card */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#1B4332] dark:border-[#4BB787] shadow-md">
              <Image
                src={
                  user?.avatar ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                }
                alt={user?.name || "User"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5]">
                  {user?.name || "Guest Pet Parent"}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F4EE] dark:bg-[#162E24] text-[#2D6A4F] dark:text-[#52B788]">
                  Verified Parent
                </span>
              </div>
              <p className="text-xs text-[#738078] dark:text-[#7E9086] mt-1">
                {user?.email} • {user?.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                leftIcon={<LogOut className="w-4 h-4" />}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => login("parent@pawpetstore.com", "Lohith Pahuja")}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex flex-wrap gap-2 pb-2">
          {[
            { id: "orders", label: `📦 Orders (${orders.length})` },
            { id: "appointments", label: `💉 Appointments (${appointments.length})` },
            { id: "addresses", label: `📍 Address Book (${addresses.length})` },
            { id: "wishlist", label: `❤️ Saved Items (${savedPets.length + savedProducts.length})` },
            { id: "profile", label: "⚙️ Profile Settings" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={cn(
                "px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm",
                activeTab === tab.id
                  ? "bg-[#1B4332] text-white dark:bg-[#4BB787] dark:text-[#0D1412]"
                  : "bg-white dark:bg-[#172420] text-[#738078] dark:text-[#B6C4BC] border border-[#E2DBD2] dark:border-[#253831] hover:bg-[#FAF8F5]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
              Past Orders & Tracking
            </h2>

            {orders.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] space-y-2">
                <p className="text-sm font-bold">No orders placed yet</p>
                <Link href="/shop">
                  <Button variant="primary" size="sm">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-6 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#EFECE6] dark:border-[#253831] gap-2">
                      <div>
                        <span className="text-xs text-[#738078]">Order #{ord.orderNumber}</span>
                        <div className="text-xs font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                          Placed on {ord.date}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#EAF4EE] dark:bg-[#142E22] text-[#2D6A4F] dark:text-[#52B788]">
                          {ord.status}
                        </span>
                        <span className="text-sm font-extrabold text-[#1B4332] dark:text-[#4BB787]">
                          {formatCurrency(ord.total)}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAF8F5] shrink-0 border border-[#E2DBD2] dark:border-[#253831]">
                            <Image src={it.image} alt={it.name} fill className="object-cover" />
                          </div>
                          <div className="text-xs min-w-0">
                            <p className="font-semibold truncate">{it.name}</p>
                            <p className="text-[#738078]">
                              Qty: {it.quantity} • {formatCurrency(it.price)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-xs text-[#738078] flex items-center justify-between border-t border-[#EFECE6] dark:border-[#253831]">
                      <span>Payment: {ord.paymentMethod}</span>
                      <span>Delivery: {ord.shippingAddress.city}, {ord.shippingAddress.state}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Pet Appointments */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                Veterinary Appointments & Pet Care
              </h2>
              <Link href="/pet-care">
                <Button variant="accent" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  Book New Care Slot
                </Button>
              </Link>
            </div>

            {appointments.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] space-y-2">
                <p className="text-sm font-bold">No clinic appointments scheduled</p>
                <Link href="/pet-care">
                  <Button variant="accent" size="sm">
                    Book Vaccination
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-6 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#D9A066]">
                        Ref: {apt.bookingRef}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EAF4EE] dark:bg-[#142E22] text-[#2D6A4F] dark:text-[#52B788]">
                        {apt.status}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                      {apt.serviceName}
                    </h3>

                    <div className="text-xs space-y-1 text-[#738078] dark:text-[#7E9086]">
                      <div>
                        <strong>Pet:</strong> {apt.petName} ({apt.petType})
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#1B4332] dark:text-[#4BB787]" />
                        <span>{apt.date} • {apt.timeSlot}</span>
                      </div>
                      <div>
                        <strong>Facility:</strong> {apt.clinicName}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#EFECE6] dark:border-[#253831] flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1B4332] dark:text-[#4BB787]">
                        {formatCurrency(apt.amount)}
                      </span>
                      <span className="text-[#2D6A4F] dark:text-[#52B788] font-semibold">
                        ✓ Doctor Assigned
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Address Book */}
        {activeTab === "addresses" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                Saved Delivery Addresses
              </h2>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => setAddressModalOpen(true)}
              >
                Add New Address
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-6 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5 text-xs text-[#4A5550] dark:text-[#B6C4BC]">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-[#1C2421] dark:text-[#F3F7F5]">
                        {addr.fullName}
                      </strong>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F4EE] text-[#2D6A4F]">
                          Default
                        </span>
                      )}
                    </div>
                    <p>{addr.addressLine1}</p>
                    {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                    <p>
                      {addr.city}, {addr.state} - {addr.postalCode}
                    </p>
                    <p>Phone: {addr.phone}</p>
                  </div>

                  <div className="pt-2 border-t border-[#EFECE6] dark:border-[#253831] flex items-center justify-between">
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-xs font-semibold text-[#1B4332] dark:text-[#4BB787] hover:underline"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => removeAddress(addr.id)}
                      className="text-xs text-[#DC2626] font-semibold hover:underline ml-auto flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Saved Wishlist */}
        {activeTab === "wishlist" && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
              Saved Pets & Products
            </h2>

            {savedPets.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#1B4332] dark:text-[#4BB787]">
                  Saved Pets ({savedPets.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {savedPets.map((pet) => (
                    <PetCard key={pet.id} pet={pet} />
                  ))}
                </div>
              </div>
            )}

            {savedProducts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#1B4332] dark:text-[#4BB787]">
                  Saved Products ({savedProducts.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {savedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}

            {savedPets.length === 0 && savedProducts.length === 0 && (
              <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] space-y-2">
                <p className="text-sm font-bold">Your wishlist is empty</p>
                <p className="text-xs text-[#738078]">
                  Tap the heart icon on any pet or product to save them here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Profile Settings */}
        {activeTab === "profile" && (
          <div className="max-w-xl p-8 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
              Account Profile
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <Input
                label="Full Name"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              />
              <Input
                label="Email"
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              />
              <Input
                label="Phone"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              />

              <div className="pt-2 flex justify-end">
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        title="Add New Delivery Address"
        description="Add a new shipping destination for your pet supplies."
      >
        <form onSubmit={handleSaveAddress} className="space-y-3">
          <Input
            label="Full Name"
            required
            value={newAddress.fullName}
            onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
          />
          <Input
            label="Phone"
            required
            value={newAddress.phone}
            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
          />
          <Input
            label="Flat / Building"
            required
            value={newAddress.addressLine1}
            onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
          />
          <Input
            label="Street / Area"
            value={newAddress.addressLine2}
            onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
          />
          <div className="grid grid-cols-3 gap-2">
            <Input
              label="City"
              required
              value={newAddress.city}
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            />
            <Input
              label="State"
              required
              value={newAddress.state}
              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
            />
            <Input
              label="Pincode"
              required
              value={newAddress.postalCode}
              onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setAddressModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Address
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
