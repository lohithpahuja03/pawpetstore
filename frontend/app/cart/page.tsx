"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useCartStore } from "../../store/cart-store";
import { formatCurrency } from "../../lib/utils";
import Button from "../../components/ui/Button";

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscount,
    getDeliveryFee,
    getGrandTotal,
    clearCart,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const delivery = getDeliveryFee();
  const grandTotal = getGrandTotal();

  const freeShippingThreshold = 999;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-4 border-b border-[#E2DBD2] dark:border-[#253831]">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5]">
              Shopping Cart
            </h1>
            <p className="text-xs text-[#738078] dark:text-[#7E9086] mt-1">
              Review your items before proceeding to safe checkout.
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-[#DC2626] font-semibold hover:underline"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] space-y-4">
            <div className="w-20 h-20 rounded-full bg-[#E8F4EE] dark:bg-[#162E24] text-[#1B4332] dark:text-[#4BB787] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
              Your cart is waiting for some goodies
            </h2>
            <p className="text-xs text-[#738078] dark:text-[#7E9086] max-w-sm mx-auto">
              Explore nutrient-dense food, sturdy cages, durable toys, and cozy orthopedic pet beds.
            </p>
            <Link href="/shop">
              <Button variant="primary" size="md">
                Browse Pet Shop
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Delivery Bar */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-[#4A5550] dark:text-[#B6C4BC]">
                    <Sparkles className="w-4 h-4 text-[#D9A066]" />
                    {amountNeeded === 0 ? (
                      <span className="text-[#2D6A4F] dark:text-[#52B788] font-bold">
                        🎉 Free Express Delivery Unlocked!
                      </span>
                    ) : (
                      <span>
                        Add <strong>{formatCurrency(amountNeeded)}</strong> more to unlock FREE delivery
                      </span>
                    )}
                  </span>
                  <span>{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#E2DBD2] dark:bg-[#253831] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D9A066] to-[#1B4332] dark:from-[#E3B27E] dark:to-[#4BB787] rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] divide-y divide-[#EFECE6] dark:divide-[#253831] overflow-hidden shadow-sm">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-5 items-center">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-[#FAF8F5] dark:bg-[#172420] shrink-0 border border-[#E2DBD2] dark:border-[#253831]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1 text-center sm:text-left">
                      <h3 className="text-sm font-bold text-[#1C2421] dark:text-[#F3F7F5] line-clamp-1">
                        {item.name}
                      </h3>
                      {item.variantName && (
                        <p className="text-xs text-[#738078] dark:text-[#7E9086]">
                          {item.variantName}
                        </p>
                      )}
                      <p className="text-sm font-extrabold text-[#1B4332] dark:text-[#4BB787]">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E2DBD2] dark:border-[#253831] rounded-xl overflow-hidden bg-[#FAF8F5] dark:bg-[#172420]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-sm font-bold hover:bg-[#EFECE6] dark:hover:bg-[#253831]"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-sm font-bold hover:bg-[#EFECE6] dark:hover:bg-[#253831]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-bold w-20 text-right">
                        {formatCurrency(item.price * item.quantity)}
                      </span>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#738078] hover:text-[#DC2626] p-2 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-5">
                <h2 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                  Order Summary
                </h2>

                {/* Coupon Input */}
                <div className="space-y-2">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#EAF4EE] dark:bg-[#142E22] border border-[#2D6A4F]/20 text-xs">
                      <span className="font-bold text-[#2D6A4F] dark:text-[#52B788]">
                        🎉 {appliedCoupon.code} (-{formatCurrency(discount)})
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-[#DC2626] font-semibold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApply} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Coupon code (PAW10)"
                        className="flex-1 px-3 py-2 text-xs uppercase rounded-xl border border-[#E2DBD2] dark:border-[#253831] bg-[#FAF8F5] dark:bg-[#172420] focus:outline-none"
                      />
                      <Button type="submit" variant="outline" size="sm">
                        Apply
                      </Button>
                    </form>
                  )}
                  {couponError && (
                    <p className="text-[11px] text-[#DC2626]">{couponError}</p>
                  )}
                </div>

                {/* Calculation Details */}
                <div className="space-y-2.5 text-xs text-[#4A5550] dark:text-[#B6C4BC] pt-2 border-t border-[#EFECE6] dark:border-[#253831]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1C2421] dark:text-[#F3F7F5]">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#2D6A4F] dark:text-[#52B788]">
                      <span>Coupon Discount</span>
                      <span className="font-semibold">-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-[#1C2421] dark:text-[#F3F7F5]">
                      {delivery === 0 ? "FREE" : formatCurrency(delivery)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-[#1C2421] dark:text-[#F3F7F5] pt-3 border-t border-[#E2DBD2] dark:border-[#253831]">
                    <span>Grand Total</span>
                    <span className="text-[#1B4332] dark:text-[#4BB787]">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>

                <Link href="/checkout" className="block w-full">
                  <Button variant="primary" size="lg" className="w-full font-bold shadow-lg gap-2 text-base">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <div className="space-y-2 pt-2 text-[11px] text-[#738078] dark:text-[#7E9086]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                    <span>Safe 256-bit Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#1B4332] shrink-0" />
                    <span>Free shipping on all orders over ₹999</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
