"use client";

import { CheckCircle2, PlugZap, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ARC_DOCS_NOTES, ARC_TESTNET } from "@/lib/arc/constants";
import { formatCompactAddress } from "@/lib/utils";
import { useWalletStore } from "@/store/wallet-store";

export function WalletOnboarding() {
  const { wallet, status, error, connect, switchNetwork } = useWalletStore();

  return (
    <section className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
          <Wallet className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold">Wallet</h2>
          <p className="text-sm text-muted-foreground">
            Send rewards without exposing chain details to viewers.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {wallet ? (
          <div className="flex items-center justify-between rounded-md border border-border bg-background p-3 text-sm">
            <span>{formatCompactAddress(wallet.address)}</span>
            {status === "connected" ? (
              <span className="flex items-center gap-1 text-emerald-300">
                <CheckCircle2 className="size-4" />
                Arc ready
              </span>
            ) : (
              <span className="text-amber-200">Switch network</span>
            )}
          </div>
        ) : null}

        {status === "wrong_network" ? (
          <Button className="w-full" onClick={switchNetwork} type="button">
            <PlugZap className="size-4" />
            Use {ARC_TESTNET.name}
          </Button>
        ) : (
          <Button
            className="w-full"
            disabled={status === "connecting"}
            onClick={connect}
            type="button"
          >
            <PlugZap className="size-4" />
            {status === "connecting" ? "Connecting..." : "Connect wallet"}
          </Button>
        )}

        {status === "missing_provider" ? (
          <p className="text-sm text-amber-200">
            Install a browser wallet that supports custom EVM networks.
          </p>
        ) : null}
        {error && status === "error" ? (
          <p className="text-sm text-red-300">{error}</p>
        ) : null}
        <p className="text-xs text-muted-foreground">
          {ARC_DOCS_NOTES.embeddedWallet}
        </p>
      </div>
    </section>
  );
}
