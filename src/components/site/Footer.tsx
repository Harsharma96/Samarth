import { brand, footerLinks } from "@/data/site";
import { Flame, Phone, MessageCircle, MapPin, Instagram, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-roast text-roast-foreground pt-8 sm:pt-14 pb-5 sm:pb-8">
      <div className="shell">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-10 pb-6 sm:pb-12 border-b border-white/10">
          {/* Brand Bio */}
          <div className="col-span-2 md:col-span-2 lg:col-span-4 flex flex-col gap-2.5 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-spice text-primary-foreground shadow-sm">
                <Flame className="h-4 w-4 sm:h-6 sm:w-6 text-gold" />
              </div>
              <div>
                <span className="font-display text-base sm:text-lg font-bold tracking-tight text-white block leading-tight">
                  {brand.name}
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-neutral-300 uppercase">
                  {brand.sub}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed max-w-sm">
              {brand.promise} Authentically sourced and traditionally ground Maharashtrian spices and instant food premixes.
            </p>

            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gold font-serif">
              <span>{brand.tagline}</span>
            </div>

            {/* Social Link */}
            <div className="flex items-center gap-2 sm:gap-3 mt-0.5 sm:mt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
              <a
                href={`https://wa.me/91${brand.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gold mb-2 sm:mb-4">Shop</h4>
            <ul className="flex flex-col gap-1.5 sm:gap-2.5 text-xs text-neutral-300">
              {footerLinks.shop.map((item) => (
                <li key={item}>
                  <a href="#shop" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gold mb-2 sm:mb-4">Company</h4>
            <ul className="flex flex-col gap-1.5 sm:gap-2.5 text-xs text-neutral-300">
              {footerLinks.company.map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-2 lg:col-span-4 flex flex-col gap-2 sm:gap-3">
            <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gold mb-0.5 sm:mb-1">Contact & Address</h4>
            
            <div className="flex items-start gap-2.5 text-xs text-neutral-300">
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold shrink-0 mt-0.5" />
              <span>{brand.address.join(" ")}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-neutral-300">
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold shrink-0" />
              <a href={`tel:${brand.phone}`} className="hover:text-white transition-colors font-mono">
                {brand.phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-neutral-300">
              <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
              <a
                href={`https://wa.me/91${brand.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors font-mono"
              >
                +91 {brand.whatsapp} (WhatsApp Order)
              </a>
            </div>

            <div className="mt-1 sm:mt-2 rounded-xl bg-white/5 p-2.5 sm:p-3 text-[10px] sm:text-[11px] text-neutral-300 border border-white/10">
              <p className="font-semibold text-white">Delivery Timeline:</p>
              <p>Safe dispatch and doorstep delivery within 5 business days of booking.</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-3.5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3 text-[10px] sm:text-[11px] text-neutral-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p className="flex items-center justify-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
            <span>in Pune, Maharashtra</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
