"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Check, Star } from "lucide-react";
import { ProductData } from "../../lib/data";
import { formatCurrency, cn } from "../../lib/utils";
import { useCartStore } from "../../store/cart-store";
import { useWishlistStore } from "../../store/wishlist-store";
import Badge from "../ui/Badge";
import Rating from "../ui/Rating";

interface ProductCardProps {
  product: ProductData;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addItem } = useCartStore();
  const { isProductSaved, toggleProduct } = useWishlistStore();
  const [added, setAdded] = useState(false);

  const saved = isProductSaved(product.id);
  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#172420] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden",
        className
      )}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8F5] dark:bg-[#141F1C]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent && (
            <Badge variant="accent" size="sm" className="font-bold shadow-sm">
              {discountPercent}% OFF
            </Badge>
          )}
          {product.isBestSeller && (
            <Badge variant="secondary" size="sm" className="shadow-sm">
              Best Seller
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleProduct(product.id);
          }}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-md z-10",
            saved
              ? "bg-[#E07A5F] text-white"
              : "bg-white/90 text-[#738078] hover:text-[#E07A5F] dark:bg-[#141F1C]/90"
          )}
          aria-label="Add to Wishlist"
        >
          <Heart className={cn("w-4 h-4", saved && "fill-white")} />
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-5 space-y-2.5">
        <div className="flex items-center justify-between text-xs text-[#738078] dark:text-[#7E9086]">
          <span className="uppercase tracking-wider font-semibold text-[10px]">
            {product.brand}
          </span>
          <Rating value={product.rating} count={product.reviewCount} size="sm" />
        </div>

        <Link href={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-bold text-[#1C2421] dark:text-[#F3F7F5] group-hover:text-[#1B4332] dark:group-hover:text-[#4BB787] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Pricing & Cart Action */}
        <div className="pt-2 mt-auto border-t border-[#EFECE6] dark:border-[#1C2C27] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-[#1B4332] dark:text-[#4BB787]">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#738078] line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 active:scale-95 shadow-sm",
              added
                ? "bg-[#2D6A4F] text-white dark:bg-[#52B788]"
                : "bg-[#1B4332] text-white hover:bg-[#143527] dark:bg-[#4BB787] dark:text-[#0D1412] dark:hover:bg-[#5FC598]"
            )}
            title="Add to Cart"
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
