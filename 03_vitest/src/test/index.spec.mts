import { describe, it, expect } from "vitest";
import { add } from "../index.mjs";

/**
 * add関数のテスト
 */
describe("add", () => {
  /**
   * 単体テスト１
   */
  it("num1 + num2 =", () => {
    expect(add(2, 2)).toBe(4);
  });
});
