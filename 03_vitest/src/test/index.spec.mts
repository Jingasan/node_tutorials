import { describe, it, expect } from "vitest";
import { add } from "../index.mjs";

describe("add", () => {
  it("num1 + num2 =", () => {
    expect(add(2, 2)).toBe(4);
  });
});
