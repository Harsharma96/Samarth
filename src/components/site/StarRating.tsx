import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  value,
  className,
  size = 14,
}: {
  value: number;
  className?: string;
  size?: number;
}) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-gold", className)} aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className={i <= Math.round(value) ? "fill-current" : "opacity-30"}
        />
      ))}
    </span>
  );
}
