import { cn } from "@/lib/utils";

/** Hand-drawn ink brush stroke used between chapters. */
export function InkDivider({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 24"
      preserveAspectRatio="none"
      className={cn("h-4 w-full", className)}
    >
      <path
        d="M0 14 Q60 6 140 11 T300 9 Q380 4 460 12 T640 10 Q720 6 800 13 L800 17 Q700 22 600 16 T400 18 Q300 22 200 15 T0 18 Z"
        className="fill-ink"
      />
    </svg>
  );
}
