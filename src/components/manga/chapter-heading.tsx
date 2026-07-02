import { cn } from "@/lib/utils";

type ChapterHeadingProps = {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export function ChapterHeading({
  number,
  title,
  subtitle,
  className,
}: ChapterHeadingProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <div className="inline-block -skew-x-6 border-4 border-ink bg-ink px-6 py-3 panel-shadow-electric">
        <p className="skew-x-6 font-display text-sm tracking-[0.3em] text-electric">
          CHAPTER {number}
        </p>
        <h2 className="skew-x-6 font-display text-4xl text-paper sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-3 font-bold text-sm tracking-wide text-current opacity-70">
          {subtitle}
        </p>
      )}
    </div>
  );
}
