import { describe, it, expect } from "vitest";
import { splitLines, tryParse } from "../src/lines.js";

describe("splitLines", () => {
  it("drops empty lines", () => {
    expect(splitLines('{"a":1}\n\n{"b":2}\n')).toEqual(['{"a":1}', '{"b":2}']);
  });

  it("trims surrounding whitespace", () => {
    expect(splitLines('  {"a":1}  ')).toEqual(['{"a":1}']);
  });
});

describe("tryParse", () => {
  it("parses an object", () => {
    expect(tryParse('{"t":0,"type":"prompt"}')).toEqual({ t: 0, type: "prompt" });
  });

  it("returns null on a truncated line", () => {
    expect(tryParse('{"id":"ev_003c","ts":118.4,"kind":"read_f')).toBeNull();
  });

  it("returns null on a non-object", () => {
    expect(tryParse("42")).toBeNull();
  });
});
