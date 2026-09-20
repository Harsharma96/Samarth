import { useState, useMemo } from "react";
import { priceListIds, getProducts, brand, delivery } from "@/data/site";
import { useShop, inr } from "@/lib/shop-store";
import {
  ShoppingBag,
  FileSpreadsheet,
  Search,
  Truck,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Plus,
  Minus,
  Check,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function PriceListTable() {
  const { addToCart, cart, setQty, setQuickView } = useShop();
  const [filterText, setFilterText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);

  // All official price list items
  const allItems = useMemo(() => getProducts(priceListIds), []);

  // Available categories in the price list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allItems.map((p) => p.category)));
    return ["All", ...cats];
  }, [allItems]);

  // Filtered items by search text & category
  const items = useMemo(() => {
    return allItems.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(filterText.toLowerCase()) ||
        p.category.toLowerCase().includes(filterText.toLowerCase()) ||
        (p.nameMr && p.nameMr.includes(filterText));
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allItems, filterText, selectedCategory]);

  const [visibleLimit, setVisibleLimit] = useState(6);
  const displayedItems = filterText ? items : items.slice(0, visibleLimit);
  const hasMore = !filterText && items.length > visibleLimit;

  return (
    <section id="price-list" className="section-pad bg-muted/20 border-t border-border/60 scroll-mt-24">
      <div className="shell">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
              <FileSpreadsheet className="h-3.5 w-3.5" />
              <span>OFFICIAL RATE CARD 2026</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Official Price List 2026
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl">
              Direct manufacturer rates for retail packs, 1-20 kg bulk orders, and commercial wholesale supply (20 kg+).
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search products or pack..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-card pl-9 pr-8 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
              />
              {filterText && (
                <button
                  type="button"
                  onClick={() => setFilterText("")}
                  className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground text-xs"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Category Filter Pills (Horizontal Scrolling on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? allItems.length
                : allItems.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setVisibleLimit(6);
                }}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Delivery & Freight Rate Info Bar */}
        <div className="mb-5 rounded-2xl border border-border/70 bg-card p-3 sm:p-4 shadow-xs">
          <button
            type="button"
            onClick={() => setShowDeliveryInfo((prev) => !prev)}
            className="flex w-full items-center justify-between text-left text-xs font-medium text-foreground gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                <Truck className="h-4 w-4" />
              </span>
              <div>
                <span className="font-bold text-foreground">Delivery & Transport Charges:</span>{" "}
                <span className="text-muted-foreground">
                  Bulk 1-20kg @ ₹300 transport • Retail from ₹70 • Delivered within 5 days
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-primary shrink-0 ml-2">
              <span>{showDeliveryInfo ? "Hide Rates" : "View Details"}</span>
              {showDeliveryInfo ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </div>
          </button>

          {showDeliveryInfo && (
            <div className="mt-3 pt-3 border-t border-border/60 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-center text-xs">
              {delivery.cards.map((card, idx) => {
                const isLast = idx === delivery.cards.length - 1;
                return (
                  <div
                    key={card.title}
                    className={`rounded-xl bg-muted/40 p-2 border border-border/50 ${
                      isLast
                        ? "col-span-2 sm:col-span-1 flex flex-row sm:flex-col items-center justify-between sm:justify-center px-3 sm:px-2"
                        : "flex flex-col justify-center"
                    }`}
                  >
                    {isLast ? (
                      <>
                        <div className="text-left sm:text-center">
                          <div className="text-[11px] font-medium text-foreground/80">{card.title}</div>
                          <div className="text-[10px] text-muted-foreground">{card.note}</div>
                        </div>
                        <div className="font-bold text-xs sm:text-sm text-primary">{card.value}</div>
                      </>
                    ) : (
                      <>
                        <div className="text-[11px] font-medium text-foreground/80">{card.title}</div>
                        <div className="font-bold text-xs sm:text-sm text-primary mt-0.5">{card.value}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{card.note}</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile View: High-Density Visual Rate Cards (sm:hidden) */}
        <div className="sm:hidden flex flex-col gap-3">
          {displayedItems.map((p, idx) => {
            const inCart = cart.find((l) => l.id === p.id);
            const inCartQty = inCart?.qty || 0;
            const discountPct = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;

            const wholesaleMsg = `Hello! I would like a wholesale quote for ${p.name} (${p.pack} pack, bulk requirement).`;

            return (
              <div
                key={p.id}
                className="rounded-2xl border border-border/80 bg-card p-3.5 shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
              >
                {/* Header Row: Thumbnail + Details */}
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-14 w-14 rounded-xl object-cover bg-muted border border-border/60 shadow-xs"
                      loading="lazy"
                    />
                    <span className="absolute -top-1.5 -left-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-background font-mono">
                      {idx + 1}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-display text-sm font-bold text-foreground leading-snug">
                        {p.name}
                      </h4>
                      <span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                        {p.pack}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-display text-base font-bold text-primary">
                        {inr(p.price)}
                      </span>
                      {p.mrp > p.price && (
                        <span className="text-[11px] text-muted-foreground line-through">
                          {inr(p.mrp)}
                        </span>
                      )}
                      {discountPct > 0 && (
                        <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.2 text-[10px] font-bold">
                          {discountPct}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Rates Comparison Box: 1-20kg vs 20kg+ */}
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-muted/40 p-2.5 text-center text-xs border border-border/50">
                  <div className="border-r border-border/60 pr-1">
                    <span className="block text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      1-20 kg (Bulk)
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm">
                      {p.bulkRate ? `${inr(p.bulkRate)}/kg` : "—"}
                    </span>
                  </div>
                  <div className="pl-1">
                    <span className="inline-flex items-center justify-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                      20 kg+ (Wholesale)
                    </span>
                    <span className="font-extrabold text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm block">
                      {p.wholesaleRate ? `${inr(p.wholesaleRate)}/kg` : "—"}
                    </span>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="mt-3 flex items-center justify-between gap-2 pt-2.5 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    {/* More Info / Quick View */}
                    <button
                      type="button"
                      onClick={() => setQuickView(p)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background hover:bg-primary/10 hover:border-primary/40 px-2.5 py-1.5 text-xs font-semibold text-foreground hover:text-primary transition-all shadow-xs active:scale-95 cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="h-3.5 w-3.5 text-primary" />
                      <span>More Info</span>
                    </button>

                    {/* WhatsApp Quick Bulk Quote */}
                    <a
                      href={`https://wa.me/91${brand.whatsapp}?text=${encodeURIComponent(wholesaleMsg)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>Quote</span>
                    </a>
                  </div>

                  {/* Add to Cart or Stepper */}
                  {inCartQty > 0 ? (
                    <div className="flex items-center gap-1 rounded-lg border border-primary/40 bg-primary/5 p-0.5">
                      <button
                        type="button"
                        onClick={() => setQty(p.id, inCartQty - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-card text-foreground hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-[1.75rem] text-center font-bold text-xs text-foreground font-mono">
                        {inCartQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(p.id, inCartQty + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => addToCart(p.id, 1)}
                      className="h-8 rounded-lg bg-primary text-primary-foreground text-xs hover:bg-primary/90 px-3.5 font-semibold shadow-xs gap-1.5"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Add to Cart</span>
                    </Button>
                  )}
                </div>
              </div>
            );
          })}

          {items.length === 0 && (
            <div className="rounded-2xl border border-border bg-card p-8 text-center text-xs text-muted-foreground">
              No products found matching "{filterText}".
              <div className="mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilterText("");
                    setSelectedCategory("All");
                  }}
                  className="rounded-lg text-xs"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop View: Full Data Table (hidden sm:block) */}
        <div className="hidden sm:block overflow-x-auto rounded-2xl border border-border/80 bg-card shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/80 text-muted-foreground uppercase text-[11px] font-bold tracking-wider border-b border-border">
              <tr>
                <th className="px-4 py-3.5">#</th>
                <th className="px-4 py-3.5">Product Name</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Packaging</th>
                <th className="px-4 py-3.5">MRP</th>
                <th className="px-4 py-3.5">Retail Price</th>
                <th className="px-4 py-3.5">1-20 kg (Bulk)</th>
                <th className="px-4 py-3.5">20 kg+ (Wholesale)</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {displayedItems.map((p, idx) => {
                const inCart = cart.find((l) => l.id === p.id);
                const inCartQty = inCart?.qty || 0;
                return (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground font-mono">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-8 w-8 rounded-lg object-cover bg-muted border border-border/60 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => setQuickView(p)}
                          loading="lazy"
                        />
                        <span
                          onClick={() => setQuickView(p)}
                          className="font-bold text-foreground hover:text-primary cursor-pointer transition-colors"
                        >
                          {p.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{p.category}</td>
                    <td className="px-4 py-3 font-semibold text-foreground">{p.pack}</td>
                    <td className="px-4 py-3 text-muted-foreground line-through">{inr(p.mrp)}</td>
                    <td className="px-4 py-3 font-bold text-primary">{inr(p.price)}</td>
                    <td className="px-4 py-3 font-semibold text-emerald-600 dark:text-emerald-400">
                      {p.bulkRate ? `${inr(p.bulkRate)}/kg` : "—"}
                    </td>
                    <td className="px-4 py-3 font-bold text-emerald-700 dark:text-emerald-300">
                      {p.wholesaleRate ? `${inr(p.wholesaleRate)}/kg` : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setQuickView(p)}
                          className="h-8 px-3 rounded-lg border border-border/80 bg-background hover:bg-primary/10 hover:border-primary/40 text-foreground hover:text-primary text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                          title="View Product Details"
                        >
                          <Eye className="h-3.5 w-3.5 text-primary" />
                          <span>More Details</span>
                        </button>
                        {inCartQty > 0 ? (
                          <div className="inline-flex items-center gap-1 rounded-lg border border-primary/40 bg-primary/5 p-0.5">
                            <button
                              type="button"
                              onClick={() => setQty(p.id, inCartQty - 1)}
                              className="flex h-6 w-6 items-center justify-center rounded bg-card text-foreground hover:bg-muted"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[1.25rem] text-center font-bold text-xs text-foreground font-mono">
                              {inCartQty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(p.id, inCartQty + 1)}
                              className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground hover:bg-primary/90"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => addToCart(p.id, 1)}
                            className="h-8 rounded-lg bg-primary text-primary-foreground text-xs hover:bg-primary/90 px-3 shadow-xs gap-1"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" />
                            <span>Add</span>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* View More Products Button for Price List */}
        {items.length > 6 && !filterText && (
          <div className="mt-6 sm:mt-8 text-center flex items-center justify-center">
            {hasMore ? (
              <button
                type="button"
                onClick={() => setVisibleLimit(items.length)}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-6 py-2.5 text-xs sm:text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <span>View More Products ({items.length - visibleLimit} More)</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setVisibleLimit(6)}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                <span>Show Less</span>
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

