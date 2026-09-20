import { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";
import { brand } from "@/data/site";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Back to Top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-card/90 text-foreground border border-border shadow-lg backdrop-blur-md transition-all hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* WhatsApp Floating Chat */}
      <a
        href={`https://wa.me/91${brand.whatsapp}?text=${encodeURIComponent("Hello! I would like to know more about Samarth Spices & Premixes.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl transition-all hover:bg-emerald-700 hover:scale-110 active:scale-95 animate-bounce"
        style={{ animationDuration: "3s" }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-lg bg-black/80 px-2.5 py-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none backdrop-blur-sm">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
