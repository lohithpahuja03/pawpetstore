"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  QrCode,
  Banknote,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useCartStore } from "../../store/cart-store";
import { useAuthStore, UserOrder } from "../../store/auth-store";
import { formatCurrency, cn } from "../../lib/utils";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function CheckoutPage() {
  const { items, getSubtotal, getDiscount, getDeliveryFee, getGrandTotal, clearCart } =
    useCartStore();
  const { user, addresses, createOrder } = useAuthStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    fullName: user?.name || "Lohith Pahuja",
    email: user?.email || "lohithpahuja03@gmail.com",
    phone: user?.phone || "+91 98765 43210",
    addressLine1: addresses[0]?.addressLine1 || "Tower 4, Apt 12B, Palm Meadows",
    addressLine2: addresses[0]?.addressLine2 || "Varthur Road, Whitefield",
    city: addresses[0]?.city || "Bengaluru",
    state: addresses[0]?.state || "Karnataka",
    postalCode: addresses[0]?.postalCode || "560066",
    paymentMethod: "UPI (Google Pay / PhonePe)",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<UserOrder | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const delivery = getDeliveryFee();
  const grandTotal = getGrandTotal();

  if (items.length === 0 && !completedOrder) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] flex items-center justify-center p-6">
        <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] text-center max-w-md space-y-4">
          <h2 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
            Your cart is empty
          </h2>
          <p className="text-xs text-[#738078] dark:text-[#7E9086]">
            Add items to your cart before proceeding to checkout.
          </p>
          <Link href="/shop">
            <Button variant="primary">Shop Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const placed = createOrder({
        items: items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          image: i.image,
        })),
        total: grandTotal,
        status: "Processing",
        paymentMethod: formData.paymentMethod,
        shippingAddress: {
          id: `addr-${Date.now()}`,
          fullName: formData.fullName,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          isDefault: true,
        },
      });

      clearCart();
      setIsProcessing(false);
      setCompletedOrder(placed);
    }, 1200);
  };

  // Completed Order Celebration View
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] py-16 transition-colors">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#EAF4EE] dark:bg-[#142E22] text-[#2D6A4F] dark:text-[#52B788] flex items-center justify-center mx-auto shadow-lg animate-bounce [animation-duration:2s]">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D9A066]">
              Order Confirmed
            </span>
            <h1 className="text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5]">
              Thank You For Your Order!
            </h1>
            <p className="text-sm text-[#738078] dark:text-[#7E9086]">
              We have received your order <strong>{completedOrder.orderNumber}</strong>. A confirmation has been sent to <strong>{formData.email}</strong>.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6] dark:border-[#253831] text-xs font-semibold">
              <span className="text-[#738078]">Order Total:</span>
              <span className="text-base font-extrabold text-[#1B4332] dark:text-[#4BB787]">
                {formatCurrency(completedOrder.total)}
              </span>
            </div>

            <div className="text-xs space-y-1 text-[#4A5550] dark:text-[#B6C4BC]">
              <div><strong>Deliver to:</strong> {formData.fullName}</div>
              <div>{formData.addressLine1}, {formData.city}, {formData.state} - {formData.postalCode}</div>
              <div><strong>Payment:</strong> {completedOrder.paymentMethod}</div>
              <div><strong>Estimated Delivery:</strong> Within 2-3 Business Days</div>
            </div>

            {/* Tracking Status Timeline */}
            <div className="pt-4 border-t border-[#EFECE6] dark:border-[#253831]">
              <div className="text-xs font-bold text-[#1C2421] dark:text-[#F3F7F5] mb-3">
                Fulfillment Status:
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">
                <div className="p-2 rounded-lg bg-[#EAF4EE] dark:bg-[#142E22] text-[#2D6A4F] dark:text-[#52B788]">
                  ✓ Placed
                </div>
                <div className="p-2 rounded-lg bg-[#FAF2E9] dark:bg-[#2A2318] text-[#D9A066]">
                  Processing
                </div>
                <div className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#172420] text-[#738078]">
                  Shipped
                </div>
                <div className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#172420] text-[#738078]">
                  Delivered
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/account">
              <Button variant="primary" size="md">
                View in Account Dashboard
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="md">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#738078] hover:text-[#1B4332] dark:hover:text-[#4BB787]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Checkout Form Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step Indicators */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm text-xs font-bold">
              <button
                onClick={() => setStep(1)}
                className={cn(
                  "flex items-center gap-1.5",
                  step >= 1 ? "text-[#1B4332] dark:text-[#4BB787]" : "text-[#738078]"
                )}
              >
                <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white dark:bg-[#4BB787] dark:text-[#0D1412] flex items-center justify-center text-[11px]">
                  1
                </span>
                <span>Contact</span>
              </button>
              <div className="h-0.5 w-10 bg-[#E2DBD2] dark:bg-[#253831]" />
              <button
                onClick={() => setStep(2)}
                className={cn(
                  "flex items-center gap-1.5",
                  step >= 2 ? "text-[#1B4332] dark:text-[#4BB787]" : "text-[#738078]"
                )}
              >
                <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white dark:bg-[#4BB787] dark:text-[#0D1412] flex items-center justify-center text-[11px]">
                  2
                </span>
                <span>Address</span>
              </button>
              <div className="h-0.5 w-10 bg-[#E2DBD2] dark:bg-[#253831]" />
              <button
                onClick={() => setStep(3)}
                className={cn(
                  "flex items-center gap-1.5",
                  step === 3 ? "text-[#1B4332] dark:text-[#4BB787]" : "text-[#738078]"
                )}
              >
                <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white dark:bg-[#4BB787] dark:text-[#0D1412] flex items-center justify-center text-[11px]">
                  3
                </span>
                <span>Payment</span>
              </button>
            </div>

            {/* Step 1: Contact Details */}
            {step === 1 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-5">
                <h2 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                  Step 1: Contact Information
                </h2>

                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email Address"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button variant="primary" onClick={() => setStep(2)} className="font-bold gap-2">
                    <span>Continue to Address</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Delivery Address */}
            {step === 2 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-5">
                <h2 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                  Step 2: Shipping Address
                </h2>

                <div className="space-y-4">
                  <Input
                    label="Flat / House / Building"
                    required
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  />
                  <Input
                    label="Street / Landmark / Area"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                    <Input
                      label="State"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                    <Input
                      label="Pincode"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={() => setStep(3)} className="font-bold gap-2">
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Options */}
            {step === 3 && (
              <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-5">
                <h2 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                  Step 3: Select Payment Method
                </h2>

                <div className="space-y-3">
                  {[
                    {
                      id: "UPI (Google Pay / PhonePe)",
                      title: "UPI / Instant QR",
                      desc: "Google Pay, PhonePe, Paytm, BHIM",
                      icon: <QrCode className="w-5 h-5 text-[#1B4332] dark:text-[#4BB787]" />,
                    },
                    {
                      id: "Credit or Debit Card",
                      title: "Credit / Debit Card",
                      desc: "Visa, MasterCard, RuPay, Amex",
                      icon: <CreditCard className="w-5 h-5 text-[#1B4332] dark:text-[#4BB787]" />,
                    },
                    {
                      id: "Cash on Delivery",
                      title: "Cash on Delivery (COD)",
                      desc: "Pay in cash when order arrives at your door",
                      icon: <Banknote className="w-5 h-5 text-[#1B4332] dark:text-[#4BB787]" />,
                    },
                  ].map((pay) => (
                    <label
                      key={pay.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all",
                        formData.paymentMethod === pay.id
                          ? "border-[#1B4332] bg-[#E8F4EE]/50 dark:border-[#4BB787] dark:bg-[#162E24]/50 ring-1 ring-[#1B4332]"
                          : "border-[#E2DBD2] dark:border-[#253831] hover:bg-[#FAF8F5] dark:hover:bg-[#172420]"
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={pay.id}
                        checked={formData.paymentMethod === pay.id}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        className="text-[#1B4332] focus:ring-[#1B4332] w-4 h-4"
                      />
                      <div className="p-2 rounded-xl bg-white dark:bg-[#141F1C] shadow-sm">
                        {pay.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                          {pay.title}
                        </div>
                        <div className="text-xs text-[#738078] dark:text-[#7E9086]">
                          {pay.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#172420] border border-[#E2DBD2] dark:border-[#253831] text-xs text-[#738078] space-y-1">
                  <div className="font-semibold text-[#1C2421] dark:text-[#F3F7F5] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
                    <span>Safe & Verified Gateway</span>
                  </div>
                  <p>
                    All card and UPI transactions are secured via 256-bit SSL encryption. We never store your full card numbers or banking passwords.
                  </p>
                </div>

                <div className="pt-2 flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    isLoading={isProcessing}
                    onClick={handlePlaceOrder}
                    className="font-bold text-base px-8 shadow-xl"
                  >
                    Place Order • {formatCurrency(grandTotal)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-4">
              <h3 className="text-base font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                Order Items ({items.length})
              </h3>

              <div className="max-h-64 overflow-y-auto divide-y divide-[#EFECE6] dark:divide-[#253831] pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAF8F5] dark:bg-[#172420] shrink-0 border border-[#E2DBD2] dark:border-[#253831]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-[#1C2421] dark:text-[#F3F7F5] truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#738078]">
                        Qty: {item.quantity} {item.variantName && `• ${item.variantName}`}
                      </p>
                    </div>
                    <span className="text-xs font-bold">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-3 border-t border-[#EFECE6] dark:border-[#253831] space-y-2 text-xs text-[#4A5550] dark:text-[#B6C4BC]">
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
                  <span>Shipping</span>
                  <span className="font-semibold text-[#1C2421] dark:text-[#F3F7F5]">
                    {delivery === 0 ? "FREE" : formatCurrency(delivery)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#1C2421] dark:text-[#F3F7F5] pt-2 border-t border-[#E2DBD2] dark:border-[#253831]">
                  <span>Total Due</span>
                  <span className="text-[#1B4332] dark:text-[#4BB787]">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
