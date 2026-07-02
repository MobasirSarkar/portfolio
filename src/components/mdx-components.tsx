import type { MDXComponents } from "mdx/types";
import { highlight } from "sugar-high";

function CodeBlock({ children, className, ...props }: React.ComponentPropsWithoutRef<"code">) {
  // fenced blocks carry a language-* class; inline code does not
  if (typeof children === "string" && className) {
    return (
      <code
        className={className}
        dangerouslySetInnerHTML={{ __html: highlight(children) }}
        {...props}
      />
    );
  }
  return (
    <code
      className="border border-ink/30 bg-secondary px-1.5 py-0.5 font-mono text-[0.85em]"
      {...props}
    >
      {children}
    </code>
  );
}

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-10 mb-4 inline-block border-b-4 border-electric font-display text-2xl tracking-wide sm:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-3 font-display text-xl tracking-wide sm:text-2xl" {...props} />
  ),
  p: (props) => <p className="my-4 leading-relaxed" {...props} />,
  ul: (props) => <ul className="my-4 list-disc space-y-2 pl-6" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-2 pl-6" {...props} />,
  strong: (props) => <strong className="font-bold" {...props} />,
  a: (props) => (
    <a className="font-bold text-electric-deep underline decoration-2 underline-offset-2 hover:text-electric" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="my-6 border-l-4 border-electric bg-secondary px-4 py-2 italic" {...props} />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto border-2 border-ink bg-ink p-4 font-mono text-sm text-paper panel-shadow-sm [&_.sh\_\_line]:leading-relaxed"
      {...props}
    />
  ),
  code: CodeBlock,
};
