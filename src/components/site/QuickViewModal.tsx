import { useState } from "react";
import { useShop, inr } from "@/lib/shop-store";
import { X, ShoppingBag, Plus, Minus, Heart, Utensils, Sparkles } from "lucide-react";
import { StarRating } from "@/components/site/StarRating";
import { Button } from "@/components/ui/button";

export function QuickViewModal() {
  const { quickView, setQuickView, addToCart, wishlist, toggleWishlist } = useShop();
  const [qty, setQty] = useState(1);

  if (!quickView) return null;

  const isWishlisted = wishlist.includes(quickView.id);

  const handleAddToCart = () => {
    addToCart(quickView.id, qty);
    setQuickView(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickView(null)}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl animate-fade-up">
        {/* Close Button */}
        <button
          onClick={() => setQuickView(null)}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-md hover:bg-muted transition-colors border border-border/60"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Image */}
          <div className="md:col-span-5 relative bg-muted aspect-square md:aspect-auto">
            <img
              src={quickView.image}
              alt={quickView.name}
              className="h-full w-full object-cover object-center"
            />
            {quickView.badge && (
              <span className="absolute top-3 left-3 rounded-md bg-primary px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground uppercase tracking-wider shadow-sm">
                {quickView.badge}
              </span>
            )}
          </div>

          {/* Right Product Details */}
          <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground mb-1">
                <span className="font-semibold">{quickView.category}</span>
                <div className="flex items-center gap-1">
                  <StarRating value={quickView.rating} size={13} />
                  <span className="font-bold text-foreground">{quickView.rating}</span>
                  <span>({quickView.reviews})</span>
                </div>
              </div>

              {/* Titles */}
              <h3 className="font-display text-2xl font-bold text-foreground leading-tight">
                {quickView.name}
              </h3>

              {/* Price & Pack */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-2xl font-bold text-primary">
                  {inr(quickView.price)}
                </span>
                {quickView.mrp > quickView.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {inr(quickView.mrp)}
                  </span>
                )}
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-foreground">
                  Pack: {quickView.pack}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {quickView.description}
              </p>

              {/* Ingredients */}
              <div className="mt-4 rounded-xl bg-muted/40 p-3 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-foreground mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span>Ingredients:</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {quickView.ingredients}
                </p>
              </div>

              {/* How To Use */}
              <div className="mt-3 rounded-xl bg-gold/10 border border-gold/30 p-3 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-gold-foreground mb-1">
                  <Utensils className="h-3.5 w-3.5" />
                  <span>How to Use:</span>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  {quickView.howToUse}
                </p>
              </div>

              {quickView.bulkRate && (
                <p className="mt-2.5 text-[11px] font-semibold text-emerald-700">
                  📦 Wholesale (1-20kg): {inr(quickView.bulkRate)}/kg | (20kg+): {inr(quickView.wholesaleRate || quickView.bulkRate - 10)}/kg
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
              {/* Qty +/- */}
              <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-2.5 py-1.5">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="text-muted-foreground hover:text-foreground p-0.5"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="text-sm font-bold w-6 text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="text-muted-foreground hover:text-foreground p-0.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Add to Cart */}
              <Button
                onClick={handleAddToCart}
                className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs sm:text-sm h-11 shadow-sm gap-2"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Add to Cart ({inr(quickView.price * qty)})</span>
              </Button>

              {/* Wishlist toggle */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleWishlist(quickView.id)}
                className={`h-11 w-11 rounded-xl shrink-0 ${isWishlisted ? "text-rose-500 border-rose-200" : ""}`}
                aria-label="Toggle Wishlist"
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
