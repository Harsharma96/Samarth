import { Heart, ShoppingBag, Eye, Plus, Minus } from "lucide-react";
import type { Product } from "@/data/site";
import { useShop, inr } from "@/lib/shop-store";
import { StarRating } from "@/components/site/StarRating";
import { Button } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist, setQuickView, cart, setQty } = useShop();
  const isWishlisted = wishlist.includes(product.id);
  const cartItem = cart.find((item) => item.id === product.id);

  const discountPercent =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl sm:rounded-2xl border border-border/70 bg-card p-2 sm:p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40">
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg sm:rounded-xl bg-muted/40">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges (Top Left) */}
        <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="inline-flex items-center rounded-md bg-primary px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[9px] sm:text-[10px] font-bold text-primary-foreground uppercase tracking-wider shadow-sm">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="inline-flex items-center rounded-md bg-gold px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[9px] sm:text-[10px] font-black text-gold-foreground uppercase tracking-wider shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick Action Floating Buttons (Top Right) */}
        <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 flex flex-col gap-1 z-10">
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full backdrop-blur-md shadow-sm transition-all active:scale-90 hover:scale-110 ${
              isWishlisted
                ? "bg-rose-500 text-white"
                : "bg-card/90 text-foreground hover:text-rose-500"
            }`}
          >
            <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isWishlisted ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={() => setQuickView(product)}
            aria-label="Quick View Product"
            className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-card/90 text-foreground backdrop-blur-md shadow-sm transition-all active:scale-90 hover:scale-110 hover:text-primary"
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* Pack Size Pill (Bottom Left on Image) */}
        <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 z-10">
          <span className="inline-flex items-center rounded bg-black/65 backdrop-blur-md px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-white shadow-sm">
            {product.pack}
          </span>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="mt-2 sm:mt-3 flex flex-1 flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-1 text-muted-foreground mb-1">
            <span className="font-medium text-[10px] sm:text-xs truncate">{product.category}</span>
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <StarRating value={product.rating} size={11} className="hidden sm:inline-flex" />
              <span className="sm:hidden text-gold text-[10px]">★</span>
              <span className="font-bold text-foreground text-[10px] sm:text-[11px]">{product.rating}</span>
              <span className="text-[9px] sm:text-[10px] text-muted-foreground">({product.reviews})</span>
            </div>
          </div>

          {/* Product Titles */}
          <h3
            onClick={() => setQuickView(product)}
            className="font-display text-xs sm:text-base md:text-lg font-bold text-foreground hover:text-primary transition-colors cursor-pointer line-clamp-1 leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1 mt-0.5">
            {product.category}
          </p>

          {/* Brief Description (hidden on mobile to keep grid compact & neat) */}
          <p className="hidden sm:line-clamp-2 mt-1.5 text-xs text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add To Cart */}
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-border/60">
          <div className="flex items-baseline justify-between gap-1 mb-2 sm:mb-2.5">
            <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
              <span className="font-display text-sm sm:text-xl font-bold text-primary">
                {inr(product.price)}
              </span>
              {product.mrp > product.price && (
                <span className="text-[10px] sm:text-xs text-muted-foreground line-through">
                  {inr(product.mrp)}
                </span>
              )}
            </div>

            {product.bulkRate && (
              <span
                className="text-[8px] sm:text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1 sm:px-1.5 py-0.5 rounded border border-emerald-200/60 truncate"
                title="Wholesale bulk rate for 1kg - 20kg"
              >
                Bulk: {inr(product.bulkRate)}/kg
              </span>
            )}
          </div>

          {/* Action Row: More Details + Add to Cart / Qty Stepper */}
          <div className="flex items-center gap-1.5 w-full">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setQuickView(product);
              }}
              className="h-7 sm:h-9 px-2 sm:px-2.5 rounded-lg sm:rounded-xl border border-border/80 bg-muted/50 hover:bg-muted text-foreground text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-colors shrink-0 shadow-2xs"
              title="More Details & Recipe"
            >
              <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground" />
              <span>More</span>
            </button>

            {cartItem && cartItem.qty > 0 ? (
              <div className="flex-1 flex h-7 sm:h-9 items-center justify-between rounded-lg sm:rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm px-1.5 sm:px-2 shadow-sm">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setQty(product.id, cartItem.qty - 1);
                  }}
                  className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded bg-white/20 hover:bg-white/30 text-white active:scale-90 transition-all text-xs"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="font-bold text-[10px] sm:text-xs px-1 truncate">
                  {cartItem.qty} in cart
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setQty(product.id, cartItem.qty + 1);
                  }}
                  className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded bg-white/20 hover:bg-white/30 text-white active:scale-90 transition-all text-xs"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product.id, 1);
                }}
                size="sm"
                className="flex-1 rounded-lg sm:rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-[11px] sm:text-xs h-7 sm:h-9 shadow-xs flex items-center justify-center gap-1 transition-transform active:scale-[0.98] px-2"
              >
                <ShoppingBag className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                <span className="sm:hidden">Add +</span>
                <span className="hidden sm:inline">Add to Cart</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
