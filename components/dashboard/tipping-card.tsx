"use client";

import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { parseUnits } from "viem";
import {
  useAccount,
  useChainId,
  useSendTransaction,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from "wagmi";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { arcTestnet } from "@/lib/arc/wagmi";
import { mainStreamer, quickTips } from "@/lib/dashboard/mock-data";
import { cn } from "@/lib/utils";
import { useDashboardUiStore } from "@/store/dashboard-ui-store";

type TipStatus = "idle" | "validating" | "confirming" | "submitted" | "success" | "error";

export function TippingCard() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("10.00");
  const [status, setStatus] = useState<TipStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();
  const selectedTip = useDashboardUiStore((state) => state.selectedTip);
  const setSelectedTip = useDashboardUiStore((state) => state.setSelectedTip);
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { openConnectModal } = useConnectModal();
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain();
  const {
    data: txHash,
    sendTransactionAsync,
    isPending: isWalletPending,
  } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    setAmount(selectedTip.replace("$", ""));
  }, [selectedTip]);

  useEffect(() => {
    if (isSuccess) {
      setStatus("success");
    }
  }, [isSuccess]);

  const validationError = useMemo(() => {
    const numericAmount = Number(amount);

    if (!amount.trim()) {
      return "Enter a tip amount.";
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return "Tip amount must be greater than 0.";
    }

    if (!/^\d+(\.\d{1,6})?$/.test(amount)) {
      return "Use up to 6 decimal places for USDC.";
    }

    return undefined;
  }, [amount]);

  async function submitTip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(undefined);
    setStatus("validating");

    if (!isConnected) {
      setStatus("idle");
      openConnectModal?.();
      return;
    }

    if (validationError) {
      setErrorMessage(validationError);
      setStatus("error");
      return;
    }

    try {
      if (chainId !== arcTestnet.id) {
        await switchChainAsync({ chainId: arcTestnet.id });
      }

      setStatus("confirming");
      await sendTransactionAsync({
        to: mainStreamer.walletAddress,
        value: parseUnits(amount, 18),
        chainId: arcTestnet.id,
      });
      setStatus("submitted");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to send the tip.",
      );
      setStatus("error");
    }
  }

  const isBusy =
    status === "validating" ||
    status === "confirming" ||
    status === "submitted" ||
    isWalletPending ||
    isSwitchingChain ||
    isConfirming;

  return (
    <section className="glass-card rounded-2xl p-5" id="tip-card">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <h2 className="text-lg font-black text-slate-950">Send a Tip</h2>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          on ARC Testnet
          <span className="size-2 rounded-full bg-emerald-400" />
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-3xl font-black text-slate-950">{amount}</span>
          <span className="flex items-center gap-2 font-black text-slate-900">
            <span className="grid size-6 place-items-center rounded-full bg-blue-500 text-xs text-white">
              $
            </span>
            USDC
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {quickTips.map((tip) => (
          <button
            className={cn(
              "h-12 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 transition hover:-translate-y-0.5 hover:border-violet-300 hover:text-violet-700",
              selectedTip === tip &&
                "border-violet-400 bg-violet-50 text-violet-700 shadow-sm",
            )}
            key={tip}
            onClick={() => setSelectedTip(tip)}
            type="button"
          >
            {tip}
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-5 h-14 w-full rounded-2xl bg-gradient-to-r from-fuchsia-500 to-violet-600 text-base shadow-xl shadow-violet-500/20 hover:from-fuchsia-400 hover:to-violet-500 active:scale-[0.99]">
            Send Tip
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send USDC tip</DialogTitle>
            <DialogDescription>
              This will prompt your connected wallet to send native USDC on Arc
              Testnet.
            </DialogDescription>
          </DialogHeader>

          <form className="mt-5 space-y-4" onSubmit={submitTip}>
            <label className="block space-y-2 text-sm font-bold text-slate-800">
              Amount
              <Input
                aria-invalid={Boolean(validationError)}
                inputMode="decimal"
                onChange={(event) => setAmount(event.target.value)}
                placeholder="10.00"
                value={amount}
              />
            </label>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <div className="flex justify-between gap-3">
                <span>Recipient</span>
                <span className="font-bold text-slate-950">
                  {mainStreamer.handle}
                </span>
              </div>
              <div className="mt-2 flex justify-between gap-3">
                <span>Network</span>
                <span className="font-bold text-slate-950">
                  {arcTestnet.name}
                </span>
              </div>
            </div>

            {validationError || errorMessage ? (
              <p className="text-sm font-medium text-rose-600">
                {errorMessage ?? validationError}
              </p>
            ) : null}

            {txHash ? (
              <a
                className="block text-sm font-bold text-violet-700 hover:text-violet-500"
                href={`${arcTestnet.blockExplorers.default.url}/tx/${txHash}`}
                rel="noreferrer"
                target="_blank"
              >
                View transaction
              </a>
            ) : null}

            <Button
              className="h-12 w-full rounded-2xl"
              disabled={isBusy}
              type="submit"
            >
              {!isConnected
                ? "Connect wallet"
                : isSwitchingChain
                  ? "Switching network..."
                  : status === "confirming" || isWalletPending
                    ? "Confirm in wallet..."
                    : status === "submitted" || isConfirming
                      ? "Waiting for receipt..."
                      : status === "success"
                        ? "Tip sent"
                        : "Send tip"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
        <span>You are sending to</span>
        <Image
          alt={mainStreamer.name}
          className="size-8 rounded-full object-cover"
          height={32}
          src={mainStreamer.avatar}
          width={32}
        />
        <span className="font-black text-slate-950">
          {address ? mainStreamer.handle : "Connect wallet first"}
        </span>
      </div>
    </section>
  );
}
