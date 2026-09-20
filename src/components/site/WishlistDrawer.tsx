import { useShop, inr } from "@/lib/shop-store";
import { getProduct } from "@/data/site";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WishlistDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-card border-l border-border shadow-2xl animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
            <h3 className="font-display text-lg font-bold text-foreground">
              Wishlist ({wishlist.length})
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
            aria-label="Close wishlist"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-5">
          {wishlist.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
                <Heart className="h-8 w-8 text-muted-foreground" />
              </div>
              <h4 className="font-display text-lg font-bold text-foreground">Your Wishlist is Empty</h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                You haven't saved any items yet. Click the heart icon on any product to save it here.
              </p>
              <Button
                onClick={onClose}
                className="mt-5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold px-6"
              >
                Explore Spices
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {wishlist.map((id) => {
                const item = getProduct(id);
                return (
                  <div
                    key={id}
                    className="flex items-center gap-3.5 rounded-xl border border-border/70 bg-background p-3 shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover bg-muted shrink-0"
                    />

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h5 className="font-display text-xs sm:text-sm font-bold text-foreground line-clamp-1">
                            {item.nameMr || item.name}
                          </h5>
                          <p className="text-[11px] text-muted-foreground">{item.pack}</p>
                        </div>
                        <button
                          onClick={() => toggleWishlist(id)}
                          className="text-muted-foreground hover:text-rose-500 transition-colors p-1"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm text-primary">
                          {inr(item.price)}
                        </span>

                        <Button
                          size="sm"
                          onClick={() => {
                            addToCart(id, 1);
                            toggleWishlist(id);
                          }}
                          className="h-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-[11px] px-3 gap-1.5"
                        >
                          <ShoppingBag className="h-3 w-3" />
                          <span>Move to Cart</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
