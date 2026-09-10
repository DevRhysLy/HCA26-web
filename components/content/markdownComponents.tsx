import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/** Stable plugin list — avoids re-creating on every render. */
export const markdownRemarkPlugins = [remarkGfm];

/** Stable component map for react-markdown. Defined once at module scope. */
export const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-hca-blue mt-10 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold text-hca-red mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-black/70 leading-relaxed mb-5">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-hca-blue underline hover:text-hca-red transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 text-black/70 space-y-2 mb-5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 text-black/70 space-y-2 mb-5">
      {children}
    </ol>
  ),
  li: ({ children }) => <li>{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-hca-blue pl-4 italic text-black/60 my-6">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-hca-ink">{children}</strong>
  ),
};
