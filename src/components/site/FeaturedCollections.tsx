import { useState } from "react";
import { bestSellerIds, masalaIds, getProducts } from "@/data/site";
import { ProductCard } from "@/components/site/ProductCard";
import { Flame, Sparkles, ChevronDown, ArrowRight } from "lucide-react";

export function FeaturedCollections() {
  const [showAllMasale, setShowAllMasale] = useState(false);

  const bestSellers = getProducts(bestSellerIds);
  const masale = getProducts(showAllMasale ? masalaIds : masalaIds.slice(0, 4));

  return (
    <div className="flex flex-col gap-12 sm:gap-16 md:gap-24">
      {/* 1. Best Sellers Section */}
      <section id="best-sellers" className="section-pad bg-muted/35 border-y border-border/50 scroll-mt-24">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-gold/15 text-gold-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span>CUSTOMER FAVORITES</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                Our Most Loved Best Sellers
              </h2>
              <p className="text-xs sm:text-base text-muted-foreground mt-1 max-w-xl">
                Trusted by thousands of customers — authentic taste and exceptional quality spices.
              </p>
            </div>
            <a
              href="#shop"
              className="text-xs sm:text-sm font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View Full Shop</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View More Products CTA Button */}
          <div className="mt-6 sm:mt-10 text-center">
            <a
              href="#shop"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-5 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-xs"
            >
              <span>Explore More Products in Shop</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Masale Collection Banner & Grid */}
      <section id="masala-collection" className="shell scroll-mt-24">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-spice p-5 sm:p-8 md:p-12 text-white mb-6 sm:mb-10 shadow-lg">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3 backdrop-blur-md">
              <Flame className="h-3.5 w-3.5 text-gold" />
              <span>AUTHENTIC SPICES</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Authentic Maharashtrian Spices
            </h2>
            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-neutral-200 leading-relaxed font-medium">
              Vada Pav Chutney, Misal Kat, Garam Masala, and Dum Biryani Masala — elevate every meal with authentic homestyle flavors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {masale.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View More Masale Expand Button */}
        <div className="mt-6 sm:mt-8 text-center flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setShowAllMasale((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-full bg-spice text-white px-5 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-sm font-bold hover:bg-spice/90 transition-all shadow-xs active:scale-95"
          >
            <span>{showAllMasale ? "Show Less Masale" : `View More Masale (${masalaIds.length - 4} More)`}</span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAllMasale ? "rotate-180" : ""}`} />
          </button>
        </div>
      </section>
    </div>
  );
}
