import { useState } from "react";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Phone,
  MessageCircle,
  Flame,
} from "lucide-react";
import { brand, navLinks } from "@/data/site";
import { useShop } from "@/lib/shop-store";
import { Button } from "@/components/ui/button";

export function Navbar({ onOpenWishlist }: { onOpenWishlist: () => void }) {
  const { cartCount, wishlist, setCartOpen, search, setSearch } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const shopEl = document.getElementById("shop");
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/85 transition-all">
      <div className="shell flex h-14 sm:h-16 md:h-18 items-center justify-between gap-2 sm:gap-4">
        {/* Full-width Search Bar Overlay when active on mobile */}
        {showSearchInput ? (
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 flex items-center gap-2 animate-fade-up"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search spices & premixes..."
                autoFocus
                className="h-9 sm:h-10 w-full rounded-full border border-primary/30 bg-card pl-9 pr-8 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-2 text-muted-foreground hover:text-foreground p-0.5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch("");
                setShowSearchInput(false);
              }}
              className="h-9 px-3 rounded-full text-xs font-semibold hover:bg-muted"
            >
              Cancel
            </Button>
          </form>
        ) : (
          <>
            {/* Brand Logo & Name */}
            <a
              href="#home"
              className="group flex items-center gap-2 sm:gap-2.5 transition-transform hover:scale-[1.01] min-w-0"
            >
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-spice text-primary-foreground shadow-sm shadow-primary/25 transition-transform group-hover:rotate-6">
                <Flame className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-gold animate-pulse" />
              </div>
              <div className="flex flex-col min-w-0 justify-center">
                <span className="font-display text-sm sm:text-base md:text-lg font-bold tracking-tight text-foreground leading-none truncate">
                  {brand.nameEn}
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-muted-foreground uppercase leading-none mt-1 truncate">
                  Pure Spices & Ready Premixes
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Action Controls (Search, Wishlist, Cart, WhatsApp, Mobile Toggle) */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setShowSearchInput(true)}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-foreground/75 hover:text-primary hover:bg-muted/70 transition-colors"
                aria-label="Search spices"
              >
                <Search className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={onOpenWishlist}
                className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-foreground/75 hover:text-primary hover:bg-muted/70 transition-colors"
                aria-label="View Wishlist"
              >
                <Heart className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                {wishlist.length > 0 && (
                  <span className="absolute 0 top-0.5 right-0.5 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground shadow-xs animate-pop">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Sleek Compact Cart Pill Button */}
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative flex h-8 sm:h-9 items-center gap-1.5 px-2.5 sm:px-3 rounded-full bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 active:scale-95 transition-all"
                aria-label="View Cart"
              >
                <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="text-[11px] sm:text-xs font-bold">Cart</span>
                {cartCount > 0 && (
                  <span className="flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-gold text-[9px] sm:text-[10px] font-black text-gold-foreground shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* WhatsApp desktop badge */}
              <a
                href={`https://wa.me/91${brand.whatsapp}?text=${encodeURIComponent("Hello! I would like to inquire about Samarth Spices and Premixes.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 h-8 sm:h-9 px-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold shadow-xs transition-all hover:scale-105"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </a>

              {/* Mobile Hamburger Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full text-foreground/80 hover:text-foreground hover:bg-muted/70 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-border/80 bg-background/98 px-5 py-5 shadow-xl animate-fade-up">
          <div className="flex flex-col gap-2 pb-5 border-b border-border">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors py-2 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-muted-foreground">→</span>
              </a>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-2.5">
            <a
              href={`tel:${brand.phone}`}
              className="flex items-center justify-center gap-2 h-10 rounded-xl border border-border bg-card text-foreground font-medium text-xs sm:text-sm hover:bg-muted transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span>Call: {brand.phone}</span>
            </a>
            <a
              href={`https://wa.me/91${brand.whatsapp}?text=${encodeURIComponent("Hello! I would like to place an order for Samarth Spices and Premixes.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-10 rounded-xl bg-emerald-600 text-white font-medium text-xs sm:text-sm hover:bg-emerald-700 transition-colors shadow-xs"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp Direct Order ({brand.whatsapp})</span>
            </a>
          </div>

          <div className="mt-5 text-center text-[11px] text-muted-foreground">
            <p className="font-semibold text-foreground">{brand.nameEn}</p>
            <p className="mt-0.5">{brand.address.join(" ")}</p>
          </div>
        </div>
      )}
    </header>
  );
}
