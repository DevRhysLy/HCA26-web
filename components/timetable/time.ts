export function parseTimeToMinutes(label: string): number | null {
  const m = label.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;

  let h = parseInt(m[1], 10) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;

  return h * 60 + parseInt(m[2], 10);
}

export function formatTime(min: number): string {
  const h24 = Math.floor(min / 60);
  const mm = min % 60;
  const ampm = h24 >= 12 ? "PM" : "AM";
  const h12 = ((h24 + 11) % 12) + 1;

  return `${h12}:${mm.toString().padStart(2, "0")} ${ampm}`;
}
