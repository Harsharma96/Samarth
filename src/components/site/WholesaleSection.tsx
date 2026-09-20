import { delivery } from "@/data/site";
import { Truck, Building2 } from "lucide-react";

export function WholesaleSection() {
  return (
    <section id="wholesale" className="section-pad bg-background scroll-mt-24">
      <div className="shell">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 text-gold-foreground px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 className="h-4 w-4 text-gold" />
            <span>WHOLESALE & BULK SUPPLY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Special Rates for Wholesale & Bulk Orders
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Direct factory pricing for hotels, mess facilities, caterers, canteens, and grocery retailers in 500g, 1kg, and 20kg+ bulk packing.
          </p>
        </div>

        {/* Delivery Charges Rate Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border/70 bg-card p-4 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-foreground">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Truck className="h-4 w-4" />
                </div>
                <span>Standard Delivery & Transport Charges</span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                Pan-India Delivery
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-2.5">
              {delivery.cards.map((card, idx) => {
                const isLast = idx === delivery.cards.length - 1;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border border-border/70 bg-background p-2 sm:p-2.5 text-center shadow-2xs hover:border-primary/40 transition-all ${
                      isLast
                        ? "col-span-2 sm:col-span-1 border-primary/25 bg-primary/5 sm:bg-background sm:border-border/70 flex flex-row sm:flex-col items-center justify-between sm:justify-center px-3 sm:px-2.5"
                        : "flex flex-col justify-center"
                    }`}
                  >
                    {isLast ? (
                      <>
                        <div className="text-left sm:text-center">
                          <p className="text-[11px] sm:text-xs font-semibold text-foreground/90">{card.title}</p>
                          <p className="text-[9px] sm:text-[10px] text-muted-foreground">{card.note}</p>
                        </div>
                        <p className="font-display text-xs sm:text-base font-bold text-primary bg-primary/10 sm:bg-transparent px-2.5 sm:px-0 py-0.5 rounded-md sm:mt-0.5">
                          {card.value}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-[11px] sm:text-xs font-semibold text-foreground/80">{card.title}</p>
                        <p className="font-display text-sm sm:text-base font-bold text-primary mt-0.5 leading-tight">
                          {card.value}
                        </p>
                        <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{card.note}</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-muted-foreground mt-3 italic flex items-center gap-1.5 text-center sm:text-left">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>{delivery.booking}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

