import { brand, storyFeatures } from "@/data/site";
import heroImg3 from "@/assets/hero-3.jpg";
import logoImg from "@/assets/logo.jpg";
import { Sparkles, MapPin, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section id="about" className="section-pad bg-muted/30 border-y border-border/60 scroll-mt-24">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Visual Column with Image & Badge Overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 shadow-xl">
              <img
                src={heroImg3}
                alt="Traditional Indian spice grinding and preparation"
                className="w-full h-full object-cover aspect-[16/10] sm:aspect-[4/3] transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-4 sm:-bottom-6 right-2 sm:right-6 rounded-xl sm:rounded-2xl bg-card p-2.5 sm:p-4 border border-border shadow-lg max-w-[210px] sm:max-w-[250px]">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <img
                  src={logoImg}
                  alt={brand.name}
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shrink-0 border border-primary/20 shadow-xs"
                />
                <div>
                  <p className="text-[11px] sm:text-xs font-bold text-foreground leading-tight">{brand.short}</p>
                  <p className="text-[10px] sm:text-[11px] text-primary font-medium mt-0.5 line-clamp-1">Pure Flavours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Story Column */}
          <div className="lg:col-span-6 flex flex-col justify-center mt-6 sm:mt-0">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2 sm:mb-3 w-fit">
              <span>OUR HERITAGE</span>
              <span>•</span>
              <span>OUR STORY</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-snug sm:leading-tight">
              Homemade Tradition & Authentic Taste
            </h2>

            <p className="mt-2.5 sm:mt-4 text-xs sm:text-base text-muted-foreground leading-relaxed">
              Samarth Spices & Premixes was born with a singular mission — delivering 100% authentic, pure, and chemical-free spices to every kitchen. Hand-selected whole spices, slow-roasted to perfection and hygienically ground, enhance both the appetizing aroma and delicious taste of every meal.
            </p>

            <p className="mt-2 sm:mt-3 text-xs sm:text-base text-muted-foreground leading-relaxed">
              Today, we are the trusted brand for thousands of households, hotels, mess facilities, and commercial caterers across Maharashtra.
            </p>

            {/* Feature Pills (3-column side-by-side compact grid on mobile) */}
            <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              {storyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/70 bg-card p-2 sm:p-3 text-center shadow-2xs hover:border-primary/40 transition-all flex flex-col items-center justify-center"
                >
                  <span className="text-lg sm:text-2xl mb-0.5 sm:mb-1 block">{feat.emoji}</span>
                  <p className="text-[10px] sm:text-xs font-bold text-foreground leading-tight line-clamp-1">
                    {feat.title}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5 line-clamp-2 leading-tight">
                    {feat.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Address & Direct Contact */}
            <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-border/70 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
                <span>{brand.address.join(" ")}</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a href={`tel:${brand.phone}`} className="flex-1 sm:flex-initial">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full sm:w-auto h-8 sm:h-9 rounded-full text-[11px] sm:text-xs font-semibold gap-1.5 px-3"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>{brand.phone}</span>
                  </Button>
                </a>
                <a
                  href={`https://wa.me/91${brand.whatsapp}?text=${encodeURIComponent(
                    "Hello! I would like more information about Samarth Spices and Premixes."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial"
                >
                  <Button
                    size="sm"
                    className="w-full sm:w-auto h-8 sm:h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] sm:text-xs font-semibold gap-1.5 shadow-xs px-3"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
