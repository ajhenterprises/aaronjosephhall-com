export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function isoDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

/** ~200 wpm average adult reading speed. */
export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
