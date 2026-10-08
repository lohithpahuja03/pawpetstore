import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductData } from "../lib/data";

export interface CartItem {
  id: string; // unique item key (productId + variant)
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  variantName?: string;
}

export interface Coupon {
  code: string;
  discountPercentage?: number;
  discountAmount?: number;
  minOrder: number;
  maxDiscount?: number;
}

const AVAILABLE_COUPONS: Record<string, Coupon> = {
  PAW10: {
    code: "PAW10",
    discountPercentage: 10,
    minOrder: 500,
  },
  WELCOME20: {
    code: "WELCOME20",
    discountPercentage: 20,
    minOrder: 1000,
    maxDiscount: 1000,
  },
  PETCARE100: {
    code: "PETCARE100",
    discountAmount: 100,
    minOrder: 800,
  },
};

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupon: Coupon | null;
  couponError: string | null;

  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: ProductData, variantName?: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Computed Getters
  getSubtotal: () => number;
  getDiscount: () => number;
  getDeliveryFee: () => number;
  getGrandTotal: () => number;
  getTotalItemsCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        // Seed initial friendly cart item for immediate demo warmth
        {
          id: "prod-acc-1",
          productId: "prod-acc-1",
          name: "PawPetStore CloudComfort Memory Foam Orthopedic Pet Bed",
          price: 3499,
          image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
          quantity: 1,
          category: "accessories",
          variantName: "Large (Labradors / Goldens)",
        },
      ],
      isOpen: false,
      appliedCoupon: null,
      couponError: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, variantName, quantity = 1) => {
        set((state) => {
          const itemId = variantName ? `${product.id}-${variantName}` : product.id;
          const existingIndex = state.items.findIndex((item) => item.id === itemId);

          const variantPrice =
            variantName && product.variants
              ? product.variants.find((v) => v.name === variantName)?.price ?? product.price
              : product.price;

          if (existingIndex > -1) {
            const updated = [...state.items];
            updated[existingIndex].quantity += quantity;
            return { items: updated, isOpen: true };
          }

          const newItem: CartItem = {
            id: itemId,
            productId: product.id,
            name: product.name,
            price: variantPrice,
            image: product.images[0] || "",
            quantity: quantity,
            category: product.category,
            variantName: variantName,
          };

          return { items: [...state.items, newItem], isOpen: true };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [], appliedCoupon: null }),

      applyCoupon: (rawCode) => {
        const code = rawCode.trim().toUpperCase();
        const coupon = AVAILABLE_COUPONS[code];
        const subtotal = get().getSubtotal();

        if (!coupon) {
          set({ couponError: "Invalid coupon code. Try 'PAW10' or 'WELCOME20'." });
          return false;
        }

        if (subtotal < coupon.minOrder) {
          set({
            couponError: `Minimum order value for ${coupon.code} is ₹${coupon.minOrder}.`,
          });
          return false;
        }

        set({ appliedCoupon: coupon, couponError: null });
        return true;
      },

      removeCoupon: () => set({ appliedCoupon: null, couponError: null }),

      getSubtotal: () => {
        const items = get().items;
        return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;

        let discount = 0;
        if (coupon.discountPercentage) {
          discount = (subtotal * coupon.discountPercentage) / 100;
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else if (coupon.discountAmount) {
          discount = coupon.discountAmount;
        }

        return Math.min(discount, subtotal);
      },

      getDeliveryFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= 999) return 0;
        return 99; // Standard nominal shipping under ₹999
      },

      getGrandTotal: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discount = get().getDiscount();
        const delivery = get().getDeliveryFee();
        return Math.max(0, subtotal - discount + delivery);
      },

      getTotalItemsCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: "pawpetstore-cart",
      partialize: (state) => ({ items: state.items, appliedCoupon: state.appliedCoupon }),
    }
  )
);
