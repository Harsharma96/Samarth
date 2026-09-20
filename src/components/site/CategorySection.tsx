import { categories } from "@/data/site";
import { ArrowRight } from "lucide-react";

export function CategorySection({
  activeCategory,
  onSelectCategory,
}: {
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}) {
  const handleClick = (filter: string) => {
    if (filter === "Wholesale") {
      const el = document.getElementById("wholesale");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    onSelectCategory(filter);
    const shopEl = document.getElementById("shop");
    if (shopEl) shopEl.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-6 sm:py-10 md:py-14 bg-background">
      <div className="shell">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-4 sm:mb-7">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
              <span>EXPLORE CATEGORIES</span>
              <span>•</span>
              <span>WIDE VARIETY</span>
            </div>
            <h2 className="font-display text-xl sm:text-3xl font-bold tracking-tight text-foreground">
              Our Signature Categories
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 max-w-xl">
              Authentic spices and quick premixes ready for every kitchen.
            </p>
          </div>

          <a
            href="#shop"
            className="group hidden sm:inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            <span>View All Products</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Categories Grid - Compact, Clean & Modern */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.filter;
            return (
              <button
                key={cat.name}
                onClick={() => handleClick(cat.filter)}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border text-left transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                  isSelected
                    ? "border-primary ring-2 ring-primary/30 shadow-md"
                    : "border-border/70 hover:border-primary/50"
                }`}
              >
                {/* Image Background Container with Compact Aspect Ratio */}
                <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden bg-muted">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Clean Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  
                  {/* Compact Frosted Emoji Badge */}
                  <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg bg-black/45 backdrop-blur-md text-xs sm:text-sm shadow-sm border border-white/20">
                    {cat.emoji}
                  </span>

                  {/* Title Overlay */}
                  <div className="absolute bottom-2 left-2.5 right-2.5 sm:bottom-2.5 sm:left-3 sm:right-3 text-white">
                    <h3 className="font-display text-xs sm:text-sm md:text-base font-bold tracking-tight leading-tight line-clamp-1 drop-shadow-sm group-hover:text-gold transition-colors">
                      {cat.name}
                    </h3>
                    <div className="text-[10px] sm:text-[11px] text-white/80 font-medium flex items-center gap-0.5 mt-0.5">
                      <span>Explore</span>
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
