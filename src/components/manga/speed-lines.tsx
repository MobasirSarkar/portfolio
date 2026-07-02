import { cn } from "@/lib/utils";

type SpeedLinesProps = {
  count?: number;
  className?: string;
};

/** Radial manga speed-line burst. Coordinates rounded so SSR and client serialize identically. */
export function SpeedLines({ count = 56, className }: SpeedLinesProps) {
  const round = (n: number) => Math.round(n * 100) / 100;
  const lines = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    // deterministic pseudo-random variation per line
    const jitter = ((i * 7919) % 100) / 100;
    const inner = 32 + jitter * 14;
    const width = 0.4 + jitter * 1.1;
    return {
      x1: round(Math.cos(angle) * inner),
      y1: round(Math.sin(angle) * inner),
      x2: round(Math.cos(angle) * 75),
      y2: round(Math.sin(angle) * 75),
      width: round(width),
    };
  });

  return (
    <svg
      aria-hidden
      viewBox="-50 -50 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          strokeWidth={l.width}
          className="stroke-ink"
        />
      ))}
    </svg>
  );
}
