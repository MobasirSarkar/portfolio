import { skills } from "@/lib/content";
import { skillIconMap } from "@/lib/icon-map";

// tech names that differ from their skills.json entry
const skillAliases: Record<string, string> = {
  Golang: "Go",
  "NATS JetStream": "NATS",
  "MinIO S3": "MinIO",
  "Tailwind CSS": "TailwindCSS",
  "@tanstack/react-router": "TanStack Router",
  "Tanstack Router": "TanStack Router",
  "HTML/CSS/JS": "HTML5",
};

const skillByName = new Map(
  skills.flatMap((category) => category.skills.map((skill) => [skill.name, skill] as const)),
);

/** Tech tag with its brand-colored icon when the name matches skills.json. */
export function StackChip({ name }: { name: string }) {
  const skill = skillByName.get(skillAliases[name] ?? name);
  const Icon = skill ? skillIconMap[skill.icon] : undefined;
  return (
    <span className="flex items-center gap-1.5 border border-ink bg-secondary px-2 py-0.5 font-mono text-xs">
      {skill && Icon && (
        <Icon aria-hidden className="size-3.5 shrink-0" style={{ color: skill.color }} />
      )}
      {name}
    </span>
  );
}
