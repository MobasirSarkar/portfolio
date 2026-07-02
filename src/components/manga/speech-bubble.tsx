import { cn } from "@/lib/utils";

type SpeechBubbleProps = React.ComponentPropsWithoutRef<"div"> & {
  tail?: "left" | "right" | "none";
  variant?: "speech" | "shout";
};

export function SpeechBubble({
  className,
  children,
  tail = "left",
  variant = "speech",
  ...props
}: SpeechBubbleProps) {
  return (
    <div
      className={cn(
        "relative border-[3px] border-ink bg-paper px-6 py-4",
        variant === "speech" && "rounded-[2rem]",
        variant === "shout" &&
          "rounded-none [clip-path:polygon(2%_8%,10%_0,90%_2%,100%_12%,98%_88%,92%_100%,8%_98%,0_90%)] border-4",
        className,
      )}
      {...props}
    >
      {children}
      {tail !== "none" && variant === "speech" && (
        <svg
          aria-hidden
          viewBox="0 0 40 32"
          className={cn(
            "absolute -bottom-[26px] h-8 w-10",
            tail === "left" ? "left-8" : "right-8 -scale-x-100",
          )}
        >
          <path
            d="M6 2 Q14 18 2 30 Q22 24 30 2 Z"
            className="fill-paper stroke-ink"
            strokeWidth={3}
          />
          {/* mask the bubble's bottom border where the tail attaches */}
          <rect x={7} y={0} width={22} height={4} className="fill-paper" />
        </svg>
      )}
    </div>
  );
}
