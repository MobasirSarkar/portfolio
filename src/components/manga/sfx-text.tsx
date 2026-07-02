import { cn } from "@/lib/utils";

type SfxTextProps = React.ComponentPropsWithoutRef<"span"> & {
  decorative?: boolean;
};

/** Onomatopoeia display text — "WHAM!", "ドン!" etc. Decorative by default. */
export function SfxText({
  className,
  decorative = true,
  ...props
}: SfxTextProps) {
  return (
    <span
      aria-hidden={decorative || undefined}
      className={cn(
        "font-display uppercase leading-none tracking-wide select-none",
        className,
      )}
      {...props}
    />
  );
}
