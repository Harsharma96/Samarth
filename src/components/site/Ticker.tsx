import { announcements } from "@/data/site";

export function Ticker() {
  const items = [...announcements, ...announcements];
  return (
    <div className="relative overflow-hidden bg-roast py-2 text-roast-foreground">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {items.map((text, i) => (
          <span key={i} className="flex items-center gap-10 text-xs tracking-wide md:text-sm">
            {text}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
