import { describe, expect, it } from "vitest";

import { ARC_TESTNET } from "@/lib/arc/constants";

describe("ARC_TESTNET", () => {
  it("uses the confirmed Arc Testnet defaults", () => {
    expect(ARC_TESTNET.chainId).toBe(5042002);
    expect(ARC_TESTNET.rpcUrl).toBe("https://rpc.testnet.arc.network");
    expect(ARC_TESTNET.wsUrl).toBe("wss://rpc.testnet.arc.network");
    expect(ARC_TESTNET.explorerUrl).toBe("https://testnet.arcscan.app");
    expect(ARC_TESTNET.contracts.usdc).toBe(
      "0x3600000000000000000000000000000000000000",
    );
  });
});
