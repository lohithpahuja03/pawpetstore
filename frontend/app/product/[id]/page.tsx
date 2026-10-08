"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  Check,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { PRODUCTS, ProductData } from "../../../lib/data";
import { formatCurrency, cn } from "../../../lib/utils";
import { useCartStore } from "../../../store/cart-store";
import { useWishlistStore } from "../../../store/wishlist-store";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Rating from "../../../components/ui/Rating";
import ProductCard from "../../../components/common/ProductCard";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product?.variants?.[0]?.name
  );
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [copied, setCopied] = useState(false);

  const { addItem, openCart } = useCartStore();
  const { isProductSaved, toggleProduct } = useWishlistStore();

  if (!product) {
    return notFound();
  }

  const saved = isProductSaved(product.id);
  const currentPrice =
    selectedVariant && product.variants
      ? product.variants.find((v) => v.name === selectedVariant)?.price ?? product.price
      : product.price;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0D1412] py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#738078] hover:text-[#1B4332] dark:hover:text-[#4BB787] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#141F1C] text-[#1C2421] dark:text-[#F3F7F5] hover:bg-[#FAF8F5] transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Link Copied!" : "Share"}</span>
          </button>
        </div>

        {/* Product Overview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#141F1C] shadow-md">
              <Image
                src={product.images[activeImgIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover"
              />
              <button
                onClick={() => toggleProduct(product.id)}
                className={cn(
                  "absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md",
                  saved
                    ? "bg-[#E07A5F] text-white"
                    : "bg-white/90 text-[#738078] hover:text-[#E07A5F] dark:bg-[#141F1C]/90"
                )}
                aria-label="Save to Wishlist"
              >
                <Heart className={cn("w-5 h-5", saved && "fill-white")} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={cn(
                      "relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all",
                      activeImgIndex === idx
                        ? "border-[#1B4332] dark:border-[#4BB787] ring-2 ring-[#1B4332]/20"
                        : "border-[#E2DBD2] dark:border-[#253831] opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Information */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#738078] dark:text-[#7E9086] mb-1">
                <span className="uppercase font-bold tracking-wider">{product.brand}</span>
                <span className="capitalize">{product.category}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C2421] dark:text-[#F3F7F5] leading-tight">
                {product.name}
              </h1>
              <div className="mt-2 flex items-center gap-2">
                <Rating value={product.rating} count={product.reviewCount} size="md" />
                <span className="text-xs text-[#2D6A4F] dark:text-[#52B788] font-bold">
                  • In Stock ({product.stockCount} units available)
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm flex items-center justify-between">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-[#1B4332] dark:text-[#4BB787]">
                  {formatCurrency(currentPrice)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-[#738078] line-through">
                    {formatCurrency(product.compareAtPrice)}
                  </span>
                )}
              </div>
              <span className="text-xs text-[#738078] dark:text-[#7E9086]">
                Inclusive of all taxes
              </span>
            </div>

            {/* Variants Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#4A5550] dark:text-[#B6C4BC]">
                  Select Variant / Pack Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.name}
                      onClick={() => setSelectedVariant(v.name)}
                      className={cn(
                        "px-4 py-2 text-xs font-semibold rounded-xl border transition-all",
                        selectedVariant === v.name
                          ? "border-[#1B4332] bg-[#E8F4EE] text-[#1B4332] dark:border-[#4BB787] dark:bg-[#162E24] dark:text-[#4BB787] ring-1 ring-[#1B4332]"
                          : "border-[#E2DBD2] bg-white text-[#1C2421] dark:border-[#253831] dark:bg-[#141F1C] dark:text-[#F3F7F5] hover:bg-[#FAF8F5]"
                      )}
                    >
                      {v.name} — {formatCurrency(v.price)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Short Description */}
            <p className="text-sm text-[#4A5550] dark:text-[#B6C4BC] leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Quantity Stepper & Add to Cart */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-[#E2DBD2] dark:border-[#253831] rounded-xl overflow-hidden bg-white dark:bg-[#141F1C]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-sm font-bold hover:bg-[#FAF8F5] dark:hover:bg-[#1C2C27] transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-sm font-bold hover:bg-[#FAF8F5] dark:hover:bg-[#1C2C27] transition-colors"
                >
                  +
                </button>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="flex-1 font-bold shadow-xl gap-2 text-base h-12"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart • {formatCurrency(currentPrice * quantity)}</span>
                  </>
                )}
              </Button>
            </div>

            {/* Delivery Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E2DBD2] dark:border-[#253831] text-xs text-[#738078] dark:text-[#7E9086]">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#1B4332] dark:text-[#4BB787] shrink-0" />
                <span>Free delivery above ₹999</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1B4332] dark:text-[#4BB787] shrink-0" />
                <span>100% Genuine product</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[#1B4332] dark:text-[#4BB787] shrink-0" />
                <span>7-Day easy replacement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Overview, Features & Specs */}
        <div className="p-8 rounded-3xl bg-white dark:bg-[#141F1C] border border-[#E2DBD2] dark:border-[#253831] shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
            Product Details & Specifications
          </h2>

          <p className="text-sm text-[#4A5550] dark:text-[#B6C4BC] leading-relaxed">
            {product.description}
          </p>

          {/* Key Features */}
          {product.features && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#4BB787]">
                Key Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A5550] dark:text-[#B6C4BC]">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332] dark:bg-[#4BB787]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ingredients if Food */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#D9A066]">
                Ingredients & Nutritional Analysis
              </h3>
              <p className="text-xs text-[#4A5550] dark:text-[#B6C4BC] leading-relaxed">
                {product.ingredients.join(", ")}.
              </p>
            </div>
          )}

          {/* Specifications Table */}
          {product.specifications && (
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#738078] mb-3">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div
                    key={key}
                    className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#172420] flex justify-between"
                  >
                    <span className="text-[#738078] dark:text-[#7E9086]">{key}</span>
                    <strong className="text-[#1C2421] dark:text-[#F3F7F5]">{val}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products Recommendations */}
        {relatedProducts.length > 0 && (
          <div className="pt-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-[#1C2421] dark:text-[#F3F7F5]">
                You May Also Need
              </h3>
              <Link href="/shop" className="text-xs font-bold text-[#1B4332] dark:text-[#4BB787] hover:underline">
                View more →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
