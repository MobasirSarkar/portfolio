import { cn } from "@/lib/utils";

type PanelProps = React.ComponentPropsWithoutRef<"div"> & {
  tilt?: "left" | "right" | "none";
  shadow?: "ink" | "electric" | "none";
};

export function Panel({
  className,
  tilt = "none",
  shadow = "ink",
  ...props
}: PanelProps) {
  return (
    <div
      className={cn(
        "relative border-4 border-ink bg-paper text-ink",
        shadow === "ink" && "panel-shadow",
        shadow === "electric" && "panel-shadow-electric",
        tilt === "left" && "-rotate-1",
        tilt === "right" && "rotate-1",
        className,
      )}
      {...props}
    />
  );
}
