import { faqs } from "@/data/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FaqSection() {
  return (
    <section id="contact" className="py-8 sm:py-14 bg-background scroll-mt-20">
      <div className="shell max-w-3xl mx-auto">
        <div className="text-center mb-5 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <HelpCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-display text-xl sm:text-3xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 max-w-md mx-auto">
            Everything you need to know about our products, orders, packaging, wholesale rates, and delivery.
          </p>
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-border/70 bg-card p-3 sm:p-6 shadow-xs">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="border-border/50 last:border-b-0"
              >
                <AccordionTrigger className="py-2.5 sm:py-3.5 text-left font-display text-xs sm:text-sm font-semibold text-foreground hover:text-primary hover:no-underline leading-snug">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-3 pt-0 text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
