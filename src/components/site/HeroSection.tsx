import { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { heroSlides, brand } from "@/data/site";
import { Button } from "@/components/ui/button";

const SLIDE_DURATION = 5000; // 5 seconds per slide

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrent(index);
    setProgress(0);
  };

  // Auto-run timer with progress bar
  useEffect(() => {
    if (isPaused) return;

    const step = 50; // update progress every 50ms
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (step / SLIDE_DURATION) * 100;
      });
    }, step);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      // Swiped Left -> Next
      nextSlide();
    } else if (diff < -50) {
      // Swiped Right -> Prev
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = heroSlides[current] ?? heroSlides[0]!;

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Hero Carousel Container - Lower text alignment, no dead space above */}
      <div className="relative min-h-[460px] sm:min-h-[520px] md:min-h-[600px] lg:min-h-[660px] w-full flex items-end">
        {heroSlides.map((item, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === current
                ? "opacity-100 z-10 pointer-events-auto"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with Rich Spice Imagery */}
            <img
              src={item.image}
              alt={item.alt}
              className="h-full w-full object-cover object-center transform transition-transform duration-[7000ms] ease-out"
              style={{ transform: idx === current ? "scale(1.03)" : "scale(1.1)" }}
            />
            {/* Gradient Overlays: Clear top for spices, protective contrast in bottom half for text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/15 sm:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
          </div>
        ))}

        {/* Top Auto-Run Live Progress Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 h-1 bg-white/10">
          <div
            className="h-full bg-gold transition-all duration-75 ease-linear shadow-sm shadow-gold/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Content Overlay - Shifted downward nicely with best modern styling */}
        <div className="shell relative z-20 pt-16 sm:pt-24 pb-8 sm:pb-12 text-white w-full">
          <div className="max-w-2xl animate-fade-up">
            {/* Kicker Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gold/50 bg-black/45 px-3 py-1 sm:px-3.5 sm:py-1.5 backdrop-blur-md mb-2.5 sm:mb-4 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold animate-pulse" />
              <span className="text-[11px] sm:text-xs md:text-sm font-bold tracking-wide text-gold">
                {slide.kicker}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-lg">
              {slide.titleMr}
            </h1>

            {/* Subtitle */}
            <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-neutral-200 leading-relaxed max-w-xl font-medium drop-shadow-sm">
              {slide.subtitle}
            </p>

            {/* CTA Buttons - Responsive side-by-side on mobile, never overlapping */}
            <div className="mt-5 sm:mt-6 flex flex-row items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
              <a href={slide.href} className="flex-1 sm:flex-initial">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-full bg-gold text-gold-foreground hover:bg-gold/90 font-bold px-4 sm:px-7 h-10 sm:h-12 text-xs sm:text-sm shadow-lg shadow-gold/30 flex items-center justify-center gap-1.5 sm:gap-2 transition-transform hover:scale-105 active:scale-95"
                >
                  <span className="truncate">{slide.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                </Button>
              </a>

              <a
                href={`https://wa.me/91${brand.whatsapp}?text=${encodeURIComponent("Hello! I would like to place an order for Samarth Spices and Premixes.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full border-white/40 bg-white/15 text-white hover:bg-white/25 backdrop-blur-md h-10 sm:h-12 px-3 sm:px-6 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
                  <span className="truncate">WhatsApp Order</span>
                </Button>
              </a>
            </div>

            {/* Micro Trust Bullet */}
            <div className="mt-3.5 sm:mt-5 flex items-center gap-2 text-[11px] sm:text-xs text-neutral-300">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Fresh, 100% pure & hygienic spices dispatched directly from Moshi, Pune</span>
            </div>
          </div>
        </div>

        {/* Desktop Side Chevron Arrows */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-all hover:bg-black/75 hover:scale-110 border border-white/20 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition-all hover:bg-black/75 hover:scale-110 border border-white/20 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </section>
  );
}
