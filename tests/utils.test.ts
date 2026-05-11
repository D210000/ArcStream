import { describe, expect, it } from "vitest";

import { formatCompactAddress, formatCurrency } from "@/lib/utils";

describe("utils", () => {
  it("compacts EVM addresses", () => {
    expect(
      formatCompactAddress("0x1234567890abcdef1234567890abcdef12345678"),
    ).toBe("0x1234...5678");
  });

  it("formats reward amounts", () => {
    expect(formatCurrency("25", "USDC")).toBe("25 USDC");
    expect(formatCurrency("0.5", "USDC")).toBe("0.50 USDC");
  });
});
