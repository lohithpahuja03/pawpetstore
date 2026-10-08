import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  petIds: string[];
  productIds: string[];
  togglePet: (petId: string) => void;
  toggleProduct: (productId: string) => void;
  isPetSaved: (petId: string) => boolean;
  isProductSaved: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      petIds: ["pet-dog-1", "pet-cat-1"],
      productIds: ["prod-food-1"],

      togglePet: (petId) => {
        set((state) => {
          const exists = state.petIds.includes(petId);
          return {
            petIds: exists
              ? state.petIds.filter((id) => id !== petId)
              : [...state.petIds, petId],
          };
        });
      },

      toggleProduct: (productId) => {
        set((state) => {
          const exists = state.productIds.includes(productId);
          return {
            productIds: exists
              ? state.productIds.filter((id) => id !== productId)
              : [...state.productIds, productId],
          };
        });
      },

      isPetSaved: (petId) => get().petIds.includes(petId),
      isProductSaved: (productId) => get().productIds.includes(productId),
    }),
    {
      name: "pawpetstore-wishlist",
    }
  )
);
