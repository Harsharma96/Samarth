import { useState, useEffect } from "react";
import { Tag, Clock, Copy, Check } from "lucide-react";
import { offer } from "@/data/site";
import { useShop } from "@/lib/shop-store";
import { toast } from "sonner";

export function OfferBanner() {
  const { applyPromo } = useShop();
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: offer.endsInHours,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    applyPromo(offer.code);
    setCopied(true);
    toast.success(`Coupon code ${offer.code} copied & applied! (15% OFF)`);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="relative overflow-hidden bg-spice text-white py-6 md:py-8 shadow-inner">
      <div className="shell flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Headline & Discount */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold/20 text-gold border border-gold/40 shadow-sm">
            <Tag className="h-7 w-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-gold px-2.5 py-0.5 text-xs font-black text-gold-foreground uppercase tracking-wider mb-1">
              {offer.discountLabel}
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
              {offer.headline}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-200 mt-0.5">
              Get an instant 15% discount on all spices and premixes!
            </p>
          </div>
        </div>

        {/* Right Timer and Coupon Code Box */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {/* Countdown Clock */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Clock className="h-4 w-4 text-gold animate-spin" style={{ animationDuration: "8s" }} />
            <span className="text-neutral-300">Offer ends in:</span>
            <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-white">
              <span className="rounded bg-black/40 px-2 py-1 border border-white/10">
                {String(timeLeft.hours).padStart(2, "0")}h
              </span>
              <span>:</span>
              <span className="rounded bg-black/40 px-2 py-1 border border-white/10">
                {String(timeLeft.minutes).padStart(2, "0")}m
              </span>
              <span>:</span>
              <span className="rounded bg-black/40 px-2 py-1 border border-white/10 text-gold">
                {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
          </div>

          {/* Coupon Pill Button */}
          <button
            onClick={handleCopy}
            className="group flex items-center gap-2 rounded-full border-2 border-dashed border-gold bg-black/30 hover:bg-black/50 px-4 py-2 transition-all hover:scale-105 active:scale-95 shadow-md"
            title="Click to copy and apply promo code"
          >
            <span className="text-xs text-neutral-300">Code:</span>
            <span className="font-mono text-base font-black text-gold tracking-widest">
              {offer.code}
            </span>
            {copied ? (
              <Check className="h-4 w-4 text-emerald-400" />
            ) : (
              <Copy className="h-4 w-4 text-neutral-300 group-hover:text-white" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
