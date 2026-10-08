"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from "lucide-react";
import { useCartStore } from "../../store/cart-store";
import { formatCurrency, cn } from "../../lib/utils";
import Button from "../ui/Button";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
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
    getTotalItemsCount,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState("");
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const delivery = getDeliveryFee();
  const grandTotal = getGrandTotal();
  const itemCount = getTotalItemsCount();

  const freeShippingThreshold = 999;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#141F1C] text-[#1C2421] dark:text-[#F3F7F5] shadow-2xl flex flex-col border-l border-[#E2DBD2] dark:border-[#253831]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#EFECE6] dark:border-[#1C2C27]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#1B4332] dark:text-[#4BB787]" />
              <h2 className="text-lg font-bold">Your Pet Cart</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E8F4EE] dark:bg-[#162E24] text-[#1B4332] dark:text-[#4BB787]">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="rounded-lg p-2 text-[#738078] hover:bg-[#FAF8F5] hover:text-[#1C2421] dark:text-[#7E9086] dark:hover:bg-[#1C2C27] dark:hover:text-[#F3F7F5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Tier Banner */}
          {items.length > 0 && (
            <div className="px-6 py-3.5 bg-[#FAF8F5] dark:bg-[#172420] border-b border-[#EFECE6] dark:border-[#1C2C27]">
              <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                <span className="flex items-center gap-1.5 text-[#4A5550] dark:text-[#B6C4BC]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9A066]" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-[#2D6A4F] dark:text-[#52B788] font-bold">
                      🎉 You unlocked FREE Shipping!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-[#1C2421] dark:text-white">{formatCurrency(amountNeededForFreeShipping)}</strong> more for FREE delivery
                    </span>
                  )}
                </span>
                <span className="font-bold">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E2DBD2] dark:bg-[#253831] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D9A066] to-[#1B4332] dark:from-[#E3B27E] dark:to-[#4BB787] rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items Scrollable List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#E8F4EE] dark:bg-[#162E24] flex items-center justify-center text-[#1B4332] dark:text-[#4BB787]">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Your cart is waiting for some goodies</h3>
                  <p className="text-sm text-[#738078] dark:text-[#7E9086] mt-1 max-w-xs">
                    Explore delicious food, interactive toys, comfy beds, and grooming supplies for your pets.
                  </p>
                </div>
                <Link href="/shop" onClick={closeCart}>
                  <Button variant="primary">Explore Shop</Button>
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 rounded-xl border border-[#EFECE6] dark:border-[#253831] bg-white dark:bg-[#172420] shadow-sm hover:border-[#1B4332]/20 dark:hover:border-[#4BB787]/20 transition-all"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#FAF8F5] dark:bg-[#141F1C]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#1C2421] dark:text-[#F3F7F5] truncate leading-tight">
                        {item.name}
                      </h4>
                      {item.variantName && (
                        <p className="text-xs text-[#738078] dark:text-[#7E9086] mt-0.5">
                          {item.variantName}
                        </p>
                      )}
                      <p className="text-sm font-bold text-[#1B4332] dark:text-[#4BB787] mt-1">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#FAF8F5] dark:border-[#1C2C27]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E2DBD2] dark:border-[#253831] rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs font-bold hover:bg-[#FAF8F5] dark:hover:bg-[#1C2C27] transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs font-bold hover:bg-[#FAF8F5] dark:hover:bg-[#1C2C27] transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#738078] hover:text-[#DC2626] dark:hover:text-[#F87171] p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="border-t border-[#EFECE6] dark:border-[#1C2C27] bg-[#FAF8F5] dark:bg-[#172420] p-6 space-y-4">
              {/* Promo Coupon Field */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#EAF4EE] dark:bg-[#142E22] border border-[#2D6A4F]/20 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[#2D6A4F] dark:text-[#52B788]">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{appliedCoupon.code} applied (-{formatCurrency(discount)})</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-[#DC2626] hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. PAW10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#141F1C] uppercase placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-[#1B4332]"
                    />
                    <Button type="submit" size="sm" variant="outline">
                      Apply
                    </Button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-[#DC2626] mt-1">{couponError}</p>
                )}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-[#4A5550] dark:text-[#B6C4BC]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1C2421] dark:text-[#F3F7F5]">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2D6A4F] dark:text-[#52B788]">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatCurrency(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="font-semibold text-[#1C2421] dark:text-[#F3F7F5]">
                    {delivery === 0 ? "FREE" : formatCurrency(delivery)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1C2421] dark:text-[#F3F7F5] pt-2 border-t border-[#E2DBD2] dark:border-[#253831]">
                  <span>Total</span>
                  <span className="text-[#1B4332] dark:text-[#4BB787]">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link href="/checkout" onClick={closeCart} className="block w-full">
                  <Button variant="primary" size="lg" className="w-full gap-2 font-bold shadow-md">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/cart" onClick={closeCart} className="block w-full text-center">
                  <button className="text-xs text-[#738078] hover:text-[#1B4332] dark:hover:text-[#4BB787] font-medium py-1">
                    View Full Cart Page
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
