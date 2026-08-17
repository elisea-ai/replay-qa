// Чтение NDJSON построчно. Разбор событий сюда не входит.

/** Режет содержимое файла на непустые строки, обрезая пробелы по краям. */
export function splitLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}

/** Пробует разобрать строку. Возвращает null вместо исключения. */
export function tryParse(line: string): Record<string, unknown> | null {
  try {
    const v: unknown = JSON.parse(line);
    return v !== null && typeof v === "object" ? (v as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}
