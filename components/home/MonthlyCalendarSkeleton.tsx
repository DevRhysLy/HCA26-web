export default function MonthlyCalendarSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="hidden lg:block w-full rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
        <div className="mb-6 h-10 rounded-full bg-black/5" />
        <div className="mb-3 grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="h-4 rounded bg-black/5" />
          ))}
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-2">
              <div className="min-h-[88px] rounded-2xl bg-black/5" />
              <div className="col-span-6 overflow-hidden rounded-2xl border border-black/10">
                <div className="h-10 bg-black/5" />
                <div className="grid grid-cols-6 gap-2 p-2">
                  {Array.from({ length: 6 }).map((_, dayIndex) => (
                    <div
                      key={dayIndex}
                      className="min-h-[88px] rounded-2xl bg-black/5"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="lg:hidden rounded-3xl border border-black/10 bg-white p-7 shadow-sm">
        <div className="mb-6 h-10 rounded-full bg-black/5" />
        <div className="h-4 w-32 rounded bg-black/5" />
        <div className="mt-4 space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-24 rounded-2xl bg-black/5" />
          ))}
        </div>
        <div className="mt-8 h-4 w-20 rounded bg-black/5" />
        <div className="mt-4 space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={`event-${index}`} className="h-28 rounded-2xl bg-black/5" />
          ))}
        </div>
      </aside>
    </div>
  );
}
