import { useState, useEffect, useCallback, useRef } from "react";
import { whyChoose } from "@/data/site";
import { Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export function WhyChooseUs() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(1);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = whyChoose.length;

  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
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
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
              <span>OUR PROMISE</span>
              <span>•</span>
              <span>WHY CHOOSE US</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Why Choose Samarth Spices?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground mt-1 max-w-xl">
              Pure ingredients, hygienic preparation, and authentic traditional flavor in every blend.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={prevSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm active:scale-90"
              aria-label="Previous why choose slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm active:scale-90"
              aria-label="Next why choose slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slider Track */}
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
            {whyChoose.map((item, idx) => (
              <div
                key={idx}
                className="shrink-0 px-2 sm:px-3"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <div className="h-full flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 sm:p-7 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/40 hover:-translate-y-1">
                  <div>
                    {/* Top Emoji & Verified Tag */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-gold/25 text-3xl shadow-inner border border-primary/10">
                        {item.emoji}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 text-emerald-600 px-2.5 py-0.5 text-[11px] font-bold">
                        <Check className="h-3 w-3" />
                        <span>Verified Quality</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2">
                      {item.text}
                    </p>
                  </div>

                  {/* Guarantee Footer */}
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-primary font-semibold">
                      <Sparkles className="h-3.5 w-3.5 text-gold" />
                      <span>100% Natural Purity</span>
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">0{idx + 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-7 sm:w-8 bg-primary shadow-sm"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
