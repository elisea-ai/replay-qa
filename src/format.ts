// Formatting values for display.

/** Milliseconds to `m:ss`. Negative and non-finite input yields `0:00`. */
export function clock(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "0:00";
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Token count in short form: 1204 becomes `1.2k`. */
export function tokens(n: number): string {
  if (!Number.isFinite(n) || n < 0) return "0";
  if (n < 1000) return String(Math.floor(n));
  return `${(n / 1000).toFixed(1)}k`;
}

/** Cost in dollars, always two decimals. */
export function cost(usd: number): string {
  if (!Number.isFinite(usd) || usd < 0) return "$0.00";
  return `$${usd.toFixed(2)}`;
}
