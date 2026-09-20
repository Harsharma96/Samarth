import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { offer, getProduct, type Product } from "@/data/site";

type CartLine = { id: string; qty: number };

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  quickView: Product | null;
  search: string;
  promo: string | null;
  cartCount: number;
  subtotal: number;
  discount: number;
  total: number;
  setCartOpen: (v: boolean) => void;
  setQuickView: (p: Product | null) => void;
  setSearch: (v: string) => void;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
  applyPromo: (code: string) => boolean;
  clearPromo: () => void;
};

const ShopContext = createContext<ShopState | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [promo, setPromo] = useState<string | null>(null);

  const addToCart = useCallback((id: string, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
    toast.success(`${getProduct(id).name} added to cart`);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => {
      const has = prev.includes(id);
      toast[has ? "message" : "success"](
        has ? "Removed from wishlist" : `${getProduct(id).name} saved to wishlist`,
      );
      return has ? prev.filter((w) => w !== id) : [...prev, id];
    });
  }, []);

  const applyPromo = useCallback((code: string) => {
    if (code.trim().toUpperCase() === offer.code) {
      setPromo(offer.code);
      toast.success("Promo code applied successfully.");
      return true;
    }
    toast.error("Invalid promo code");
    return false;
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((sum, l) => sum + getProduct(l.id).price * l.qty, 0),
    [cart],
  );
  const discount = promo ? Math.round((subtotal * offer.percent) / 100) : 0;
  const cartCount = cart.reduce((n, l) => n + l.qty, 0);

  const value: ShopState = {
    cart,
    wishlist,
    cartOpen,
    quickView,
    search,
    promo,
    cartCount,
    subtotal,
    discount,
    total: subtotal - discount,
    setCartOpen,
    setQuickView,
    setSearch,
    addToCart,
    setQty,
    removeFromCart,
    toggleWishlist,
    applyPromo,
    clearPromo: () => setPromo(null),
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}

/** Scroll-reveal helper used across sections. */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
