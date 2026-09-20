import { useState } from "react";
import { useShop, inr } from "@/lib/shop-store";
import { getProduct, brand, offer } from "@/data/site";
import { X, ShoppingBag, Plus, Minus, Trash2, Tag, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    setQty,
    removeFromCart,
    subtotal,
    discount,
    total,
    promo,
    applyPromo,
    clearPromo,
  } = useShop();

  const [promoInput, setPromoInput] = useState("");

  if (!cartOpen) return null;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromo(promoInput.trim());
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    let itemsList = "";
    cart.forEach((item, idx) => {
      const prod = getProduct(item.id);
      itemsList += `${idx + 1}. ${prod.nameMr || prod.name} (${prod.pack}) x ${item.qty} = ${inr(prod.price * item.qty)}\n`;
    });

    const msg = `🛒 *New Order - Samarth Spices & Premixes*
----------------------------------
${itemsList}----------------------------------
Subtotal: ${inr(subtotal)}
${promo ? `Discount (Promo ${promo}): -${inr(discount)}\n` : ""}Total: ${inr(total)}
----------------------------------
*Customer Details:*
Name: 
Mobile: 
Delivery Address: 
Pincode: 

Please confirm this order.`;

    window.open(
      `https://wa.me/91${brand.whatsapp}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-card border-l border-border shadow-2xl animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h3 className="font-display text-lg font-bold text-foreground">
              Shopping Cart ({cart.reduce((a, b) => a + b.qty, 0)})
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCartOpen(false)}
            className="h-8 w-8 rounded-full"
            aria-label="Close cart"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h4 className="font-display text-lg font-bold text-foreground">Your Cart is Empty</h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                You haven't added any products yet. Explore our freshly ground authentic spices!
              </p>
              <Button
                onClick={() => setCartOpen(false)}
                className="mt-5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold px-6"
              >
                Shop Now
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((line) => {
                const item = getProduct(line.id);
                return (
                  <div
                    key={line.id}
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
                          onClick={() => removeFromCart(line.id)}
                          className="text-muted-foreground hover:text-rose-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-bold text-xs sm:text-sm text-primary">
                          {inr(item.price * line.qty)}
                        </span>

                        {/* Qty +/- */}
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-0.5">
                          <button
                            onClick={() => setQty(line.id, line.qty - 1)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{line.qty}</span>
                          <button
                            onClick={() => setQty(line.id, line.qty + 1)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Calculations and WhatsApp Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-border bg-muted/30 p-5">
            {/* Promo Code Input */}
            <div className="mb-4">
              {promo ? (
                <div className="flex items-center justify-between rounded-xl bg-gold/15 border border-gold/40 px-3 py-2 text-xs">
                  <div className="flex items-center gap-1.5 text-gold-foreground font-bold">
                    <Tag className="h-3.5 w-3.5" />
                    <span>Coupon: {promo} (15% OFF)</span>
                  </div>
                  <button
                    onClick={clearPromo}
                    className="text-muted-foreground hover:text-foreground text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCode} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Coupon Code (e.g. ${offer.code})`}
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="h-9 flex-1 rounded-lg border border-border bg-card px-3 text-xs uppercase focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <Button type="submit" size="sm" variant="outline" className="h-9 text-xs font-bold">
                    Apply
                  </Button>
                </form>
              )}
            </div>

            {/* Calculations */}
            <div className="flex flex-col gap-1.5 text-xs text-muted-foreground pb-4 border-b border-border/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">{inr(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({offer.percent}%)</span>
                  <span>-{inr(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-[11px] text-muted-foreground italic">Calculated by address</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-foreground pt-1.5 border-t border-border/50">
                <span>Total</span>
                <span className="font-display text-base text-primary">{inr(total)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <Button
              onClick={handleWhatsAppCheckout}
              className="mt-4 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Send Order via WhatsApp</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="mt-2 text-[10px] text-center text-muted-foreground">
              Our team will promptly confirm your order on WhatsApp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
