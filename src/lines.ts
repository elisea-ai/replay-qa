// Reading NDJSON line by line. Event parsing does not belong here.

/** Splits file contents into non-empty lines, trimming whitespace. */
export function splitLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

/** Tries to parse a line. Returns null instead of throwing. */
export function tryParse(line: string): Record<string, unknown> | null {
  try {
    const v: unknown = JSON.parse(line);
    return v !== null && typeof v === "object" ? (v as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}
