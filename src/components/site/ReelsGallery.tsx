import { useState, useEffect, useCallback, useRef } from "react";
import { reels, brand } from "@/data/site";
import { Instagram, Play, ChevronLeft, ChevronRight } from "lucide-react";

export function ReelsGallery() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(2);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Duplicate reels to allow smooth extended looping
  const displayReels = [...reels, ...reels];
  const total = displayReels.length;

  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 1280) {
        setCardsPerView(5);
      } else if (window.innerWidth >= 1024) {
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

  // Smooth auto-run carousel every 2.8 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="py-8 sm:py-12 bg-muted/20 border-t border-border/60 overflow-hidden">
      <div className="shell">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary mb-1">
              <Instagram className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-pink-600" />
              <span>Follow Us On Instagram</span>
            </div>
            <h2 className="font-display text-xl sm:text-3xl font-bold tracking-tight text-foreground">
              Recipes & Culinary Inspiration
            </h2>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5">
              A delicious showcase of meals made effortlessly with Samarth Spices.
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] sm:text-xs font-bold text-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-2xs"
            >
              <Instagram className="h-3.5 w-3.5 text-pink-600" />
              <span>Follow {brand.instagram}</span>
            </a>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1">
              <button
                onClick={prevSlide}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-2xs active:scale-90 cursor-pointer"
                aria-label="Previous reel"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={nextSlide}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all shadow-2xs active:scale-90 cursor-pointer"
                aria-label="Next reel"
              >
                <ChevronRight className="h-3.5 w-3.5" />
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
            {displayReels.map((item, idx) => (
              <div
                key={idx}
                className="shrink-0 px-1.5 sm:px-2"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-[9/15] max-h-[290px] sm:max-h-[320px] md:max-h-[330px] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-muted border border-border/70 shadow-2xs transition-all duration-300 hover:shadow-md hover:border-primary/50 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

                  {/* Play Icon Badge */}
                  <div className="absolute top-2.5 right-2.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-transform group-hover:scale-110 shadow-sm">
                    <Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-white" />
                  </div>

                  {/* Caption & Hashtag Overlay */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                    <p className="text-[11px] sm:text-xs font-bold leading-tight drop-shadow line-clamp-2">
                      {item.caption}
                    </p>
                    <span className="text-[9px] sm:text-[10px] text-gold mt-1 inline-block font-semibold">
                      #SamarthSpices
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="mt-4 sm:mt-5 flex items-center justify-center gap-1.5">
          {Array.from({ length: Math.min(maxIndex + 1, 8) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === (current % Math.min(maxIndex + 1, 8))
                  ? "w-6 bg-primary shadow-xs"
                  : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to reel slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
