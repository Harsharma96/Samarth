import { useState, useEffect, useCallback, useRef } from "react";
import { reviews, ratingSummary } from "@/data/site";
import { StarRating } from "@/components/site/StarRating";
import { CheckCircle2, Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(1);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = reviews.length;

  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, total - cardsPerView);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-run carousel every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) {
      nextSlide();
    } else if (diff < -45) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="section-pad bg-background overflow-hidden">
      <div className="shell">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
            <span>CUSTOMER REVIEWS</span>
            <span>•</span>
            <span>VERIFIED BUYERS</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            2,500+ Satisfied Customers
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1.5">
            Loved by home cooks, food enthusiasts, and restaurant chefs across Maharashtra.
          </p>
        </div>

        {/* Rating Summary Card + Auto-running Testimonials Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Rating Breakdown Card */}
          <div className="lg:col-span-4 rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-4 sm:p-6 lg:p-8 shadow-xs">
            <div className="flex flex-row items-center gap-3.5 sm:flex-col sm:text-center">
              {/* Left Score Block on Mobile */}
              <div className="shrink-0 text-center min-w-[96px] sm:min-w-0">
                <div className="font-display text-4xl sm:text-5xl font-black text-foreground leading-none">
                  {ratingSummary.score}
                </div>
                <div className="flex justify-center mt-1.5 sm:mt-2">
                  <StarRating value={ratingSummary.score} size={16} />
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 sm:mt-2 font-medium leading-tight">
                  <span className="sm:hidden">
                    <strong className="text-foreground">{ratingSummary.count}</strong> reviews
                  </span>
                  <span className="hidden sm:inline">
                    Based on <strong className="text-foreground">{ratingSummary.count}</strong> verified customer reviews
                  </span>
                </p>
              </div>

              {/* Vertical divider line on mobile */}
              <div className="sm:hidden w-px self-stretch bg-border/60 my-0.5" />

              {/* Breakdown Bars */}
              <div className="flex-1 flex flex-col gap-1.5 sm:gap-2 sm:mt-6 w-full">
                {ratingSummary.bars.map((bar) => (
                  <div key={bar.star} className="flex items-center gap-2 sm:gap-3 text-xs">
                    <span className="flex items-center gap-0.5 w-5 sm:w-7 shrink-0 text-muted-foreground font-semibold text-[11px]">
                      <span>{bar.star}</span>
                      <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-gold text-gold" />
                    </span>
                    <div className="h-1.5 sm:h-2 flex-1 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gold transition-all duration-700"
                        style={{ width: `${bar.percent}%` }}
                      />
                    </div>
                    <span className="w-6 sm:w-8 shrink-0 text-right text-[10px] sm:text-[11px] text-muted-foreground font-medium">
                      {bar.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Auto-Running Testimonials Carousel */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Carousel Header with Navigation Controls */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Real Verified Customer Stories</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm active:scale-90"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm active:scale-90"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Carousel Track */}
            <div
              className="relative overflow-hidden cursor-grab active:cursor-grabbing"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${current * (100 / cardsPerView)}%)`,
                }}
              >
                {reviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="shrink-0 px-2"
                    style={{ width: `${100 / cardsPerView}%` }}
                  >
                    <div className="h-full relative rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/40 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <StarRating value={rev.rating} size={14} />
                          <Quote className="h-5 w-5 text-primary/30" />
                        </div>
                        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic mb-5">
                          "{rev.text}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3.5 border-t border-border/60">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs sm:text-sm font-bold text-foreground">{rev.name}</p>
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          </div>
                          <p className="text-[11px] text-muted-foreground">{rev.city}, Maharashtra</p>
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/80 bg-primary/5 px-2 py-0.5 rounded-md">
                          Verified Buyer
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-7 bg-primary shadow-sm"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
