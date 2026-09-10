import type { ReactNode } from "react";

export default function AtAGlance({ children }: { children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-hca-border bg-hca-surface p-6 md:p-8">
      <h2 className="font-serif text-2xl font-semibold text-hca-ink">
        At a glance
      </h2>
      <div className="mt-6 space-y-8">{children}</div>
    </aside>
  );
}
