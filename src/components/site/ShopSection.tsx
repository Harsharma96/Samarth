import { useState, useMemo } from "react";
import { products } from "@/data/site";
import { useShop } from "@/lib/shop-store";
import { ProductCard } from "@/components/site/ProductCard";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Sparkles,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  Star,
  ArrowUpDown,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORY_TABS = [
  "All",
  "Spicy Masala",
  "Ready Premix",
  "Beverage Premix",
  "Breakfast Premix",
  "Cooking Masala",
  "Special Blends",
];

export function ShopSection({
  selectedCategory,
  onSelectCategory,
}: {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}) {
  const { search, setSearch } = useShop();
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [visibleLimit, setVisibleLimit] = useState(8);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === "All" ||
          p.category === selectedCategory ||
          (selectedCategory === "Masala" && p.category.includes("Masala"));
        
        const matchesSearch =
          !search ||
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (p.nameMr && p.nameMr.includes(search)) ||
          p.category.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return (b.reviews || 0) - (a.reviews || 0);
      });
  }, [selectedCategory, search, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleLimit);
  const hasMore = filteredProducts.length > visibleLimit;

  return (
    <section id="shop" className="section-pad bg-background scroll-mt-24">
      <div className="shell">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
            <span>OUR PRODUCT RANGE</span>
            <span>•</span>
            <span>PREMIUM QUALITY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Spices & Ready Premixes
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            From authentic traditional spice blends to 5-minute instant breakfast and beverage premixes.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-border/70">
          {/* Scrollable Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORY_TABS.map((tab) => {
              const isActive = selectedCategory === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    onSelectCategory(tab);
                    setVisibleLimit(8);
                  }}
                  className={`shrink-0 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]"
                      : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {tab === "All" ? "All Products" : tab}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 md:w-56">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleLimit(8);
                }}
                placeholder="Search products..."
                className="h-9 sm:h-10 w-full rounded-xl border border-border bg-card pl-8 sm:pl-9 pr-7 sm:pr-8 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
              <Search className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-2 text-muted-foreground hover:text-foreground p-0.5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="w-[145px] sm:w-[190px] shrink-0">
              <Select
                value={sortBy}
                onValueChange={(val) =>
                  setSortBy(val as "featured" | "price-asc" | "price-desc" | "rating")
                }
              >
                <SelectTrigger className="h-9 sm:h-10 rounded-xl border border-border/80 bg-card px-2.5 sm:px-3 text-xs sm:text-sm font-medium text-foreground shadow-xs hover:border-primary/50 transition-colors focus:ring-1 focus:ring-primary cursor-pointer">
                  <div className="flex items-center gap-1.5 truncate">
                    <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground shrink-0 hidden sm:inline" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent
                  align="end"
                  className="rounded-xl border border-border/80 bg-card p-1 shadow-lg min-w-[180px] sm:min-w-[200px]"
                >
                  <SelectItem value="featured" className="cursor-pointer text-xs sm:text-sm rounded-lg py-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-gold shrink-0" />
                      <span>Featured (Popular)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="price-asc" className="cursor-pointer text-xs sm:text-sm rounded-lg py-2">
                    <div className="flex items-center gap-2">
                      <ArrowDownNarrowWide className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>Price: Low to High</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="price-desc" className="cursor-pointer text-xs sm:text-sm rounded-lg py-2">
                    <div className="flex items-center gap-2">
                      <ArrowUpNarrowWide className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                      <span>Price: High to Low</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="rating" className="cursor-pointer text-xs sm:text-sm rounded-lg py-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
                      <span>Top Rated</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count & Active Filter Indicator */}
        <div className="flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground mb-4 sm:mb-6">
          <span>
            Showing <strong className="text-foreground">{displayedProducts.length}</strong> of{" "}
            <strong className="text-foreground">{filteredProducts.length}</strong> products
          </span>
          {(search || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                onSelectCategory("All");
                setVisibleLimit(8);
              }}
              className="text-primary hover:underline font-medium flex items-center gap-1"
            >
              <span>Reset Filters</span>
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View More Products Button */}
            {hasMore && (
              <div className="mt-8 sm:mt-12 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleLimit((prev) => prev + 8)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 active:scale-95"
                >
                  <span>View More Products ({filteredProducts.length - visibleLimit} More)</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-16 text-center border rounded-2xl bg-card border-dashed">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
              <SlidersHorizontal className="h-8 w-8" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">No Products Found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              Please try a different search term or clear active filters to see all products.
            </p>
            <button
              onClick={() => {
                setSearch("");
                onSelectCategory("All");
                setVisibleLimit(8);
              }}
              className="mt-4 inline-flex h-9 items-center justify-center rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Show All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
