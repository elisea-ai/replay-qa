import { describe, it, expect } from "vitest";
import { splitLines, tryParse } from "../src/lines.js";

describe("splitLines", () => {
  it("выбрасывает пустые строки", () => {
    expect(splitLines('{"a":1}\n\n{"b":2}\n')).toEqual(['{"a":1}', '{"b":2}']);
  });

  it("обрезает пробелы по краям", () => {
    expect(splitLines('  {"a":1}  ')).toEqual(['{"a":1}']);
  });
});

describe("tryParse", () => {
  it("разбирает объект", () => {
    expect(tryParse('{"t":0,"type":"prompt"}')).toEqual({ t: 0, type: "prompt" });
  });

  it("возвращает null на обрезанной строке", () => {
    expect(tryParse('{"id":"ev_003c","ts":118.4,"kind":"read_f')).toBeNull();
  });

  it("возвращает null на не-объекте", () => {
    expect(tryParse("42")).toBeNull();
  });
});
