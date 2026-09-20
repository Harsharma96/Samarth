import { useState, useEffect, useCallback, useRef } from "react";
import { reels, brand } from "@/data/site";
import { Instagram, Play, ChevronLeft, ChevronRight } from "lucide-react";

export function ReelsGallery() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(2);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = reels.length;

  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 1024) {
        setCardsPerView(4);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(3);
      } else {
        setCardsPerView(2);
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
    <section className="section-pad bg-muted/20 border-t border-border/60 overflow-hidden">
      <div className="shell">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-2">
              <Instagram className="h-3.5 w-3.5 text-pink-600" />
              <span>FOLLOW US ON INSTAGRAM</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
              Recipes & Culinary Inspiration
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              A delicious showcase of meals made effortlessly with Samarth Spices.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-xs font-bold text-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-sm"
            >
              <Instagram className="h-4 w-4 text-pink-600" />
              <span>Follow {brand.instagram}</span>
            </a>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm active:scale-90"
                aria-label="Previous reel"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextSlide}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-sm active:scale-90"
                aria-label="Next reel"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
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
            {reels.map((item, idx) => (
              <div
                key={idx}
                className="shrink-0 px-2 sm:px-2.5"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <div className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-muted border border-border/70 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

                  {/* Play Icon Badge */}
                  <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-transform group-hover:scale-110 shadow-sm">
                    <Play className="h-3.5 w-3.5 fill-white" />
                  </div>

                  {/* Caption & Hashtag Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs sm:text-sm font-bold leading-snug drop-shadow line-clamp-2">
                      {item.caption}
                    </p>
                    <span className="text-[10px] sm:text-[11px] text-gold mt-1.5 inline-block font-semibold">
                      #SamarthSpices
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-7 bg-primary shadow-sm"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to reel slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
