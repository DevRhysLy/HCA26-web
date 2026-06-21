export default function MonthlyCalendarSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr] animate-pulse">
      <div className="hidden lg:block rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
        <div className="mb-6 h-10 rounded-full bg-black/5" />
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, index) => (
            <div
              key={index}
              className="min-h-[88px] rounded-2xl bg-black/5"
            />
          ))}
        </div>
      </div>

      <aside className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
        <div className="h-8 w-40 rounded-full bg-black/5" />
        <div className="mt-6 space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-28 rounded-2xl bg-black/5" />
          ))}
        </div>
      </aside>
    </div>
  );
}
