import { describe, it, expect } from "vitest";
import { clock, tokens, cost } from "../src/format.js";

describe("clock", () => {
  it("converts milliseconds to m:ss", () => {
    expect(clock(706_000)).toBe("11:46");
    expect(clock(9_000)).toBe("0:09");
  });

  it("falls back to 0:00 on bad input", () => {
    expect(clock(-5)).toBe("0:00");
    expect(clock(Number.NaN)).toBe("0:00");
  });
});

describe("tokens and cost", () => {
  it("shortens thousands", () => {
    expect(tokens(940)).toBe("940");
    expect(tokens(38_900)).toBe("38.9k");
  });

  it("rounds cost to two decimals", () => {
    expect(cost(0.4073)).toBe("$0.41");
    expect(cost(-1)).toBe("$0.00");
  });
});
