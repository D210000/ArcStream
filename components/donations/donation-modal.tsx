"use client";

import { FormEvent, useMemo, useState } from "react";
import { Gift, Loader2, Send } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendNftReward } from "@/lib/arc/nft";
import { sendTokenReward } from "@/lib/arc/rewards";
import type { RewardAssetKind } from "@/lib/arc/types";
import { donationFormSchema } from "@/lib/donations/validation";
import type { DonationFeedItem } from "@/lib/donations/types";
import { formatCurrency } from "@/lib/utils";
import { useDonationFeedStore } from "@/store/donation-feed-store";
import { useWalletStore } from "@/store/wallet-store";

type DonationModalProps = {
  streamerAddress: `0x${string}`;
  creatorName: string;
};

const assetOptions: Array<{ value: RewardAssetKind; label: string }> = [
  { value: "usdc", label: "USDC" },
  { value: "token", label: "Token" },
  { value: "nft", label: "NFT" },
];

export function DonationModal({
  streamerAddress,
  creatorName,
}: DonationModalProps) {
  const [open, setOpen] = useState(false);
  const [assetKind, setAssetKind] = useState<RewardAssetKind>("usdc");
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const wallet = useWalletStore((state) => state.wallet);
  const walletStatus = useWalletStore((state) => state.status);
  const addDonation = useDonationFeedStore((state) => state.addDonation);
  const updateDonation = useDonationFeedStore((state) => state.updateDonation);

  const canSubmit = useMemo(
    () => wallet && walletStatus === "connected" && !isSubmitting,
    [isSubmitting, wallet, walletStatus],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);

    if (!wallet || walletStatus !== "connected") {
      setError("Connect a wallet on Arc Testnet before sending a reward.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const parsed = donationFormSchema.safeParse({
      assetKind,
      amount: String(formData.get("amount") ?? ""),
      tokenAddress: String(formData.get("tokenAddress") ?? ""),
      nftContractAddress: String(formData.get("nftContractAddress") ?? ""),
      nftTokenId: String(formData.get("nftTokenId") ?? ""),
      message: String(formData.get("message") ?? ""),
    });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the reward details.");
      return;
    }

    const donationId = crypto.randomUUID();
    const values = parsed.data;
    const pendingItem: DonationFeedItem = {
      id: donationId,
      donorName: "You",
      donorAddress: wallet.address,
      streamerAddress,
      assetKind: values.assetKind,
      assetLabel:
        values.assetKind === "usdc"
          ? "USDC"
          : values.assetKind === "token"
            ? "Custom token"
            : "Collectible",
      amountLabel:
        values.assetKind === "nft"
          ? `#${values.nftTokenId}`
          : formatCurrency(values.amount, values.assetKind === "usdc" ? "USDC" : "TOK"),
      message: values.message || `Supported ${creatorName}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    addDonation(pendingItem);
    setIsSubmitting(true);

    try {
      const result =
        values.assetKind === "nft"
          ? await sendNftReward(
              {
                kind: "nft",
                recipientAddress: streamerAddress,
                contractAddress: values.nftContractAddress as `0x${string}`,
                tokenId: values.nftTokenId,
              },
              wallet.address,
            )
          : await sendTokenReward({
              kind: values.assetKind,
              recipientAddress: streamerAddress,
              amount: values.amount,
              token:
                values.assetKind === "usdc"
                  ? "USDC"
                  : (values.tokenAddress as `0x${string}`),
            });

      updateDonation(donationId, {
        status: "confirmed",
        txHash: result.txHash,
        explorerUrl: result.explorerUrl,
      });
      setOpen(false);
    } catch (sendError) {
      updateDonation(donationId, { status: "failed" });
      setError(
        sendError instanceof Error
          ? sendError.message
          : "Reward transaction failed.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <Gift className="size-4" />
          Send reward
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reward {creatorName}</DialogTitle>
          <DialogDescription>
            Tip with USDC, send a token, or transfer a collectible on Arc.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-5 space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-3 gap-2">
            {assetOptions.map((option) => (
              <button
                className={`h-10 rounded-md border text-sm font-semibold transition ${
                  assetKind === option.value
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
                key={option.value}
                onClick={() => setAssetKind(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>

          {assetKind === "usdc" || assetKind === "token" ? (
            <label className="block space-y-2 text-sm font-medium">
              Amount
              <Input inputMode="decimal" name="amount" placeholder="10.00" />
            </label>
          ) : null}

          {assetKind === "token" ? (
            <label className="block space-y-2 text-sm font-medium">
              Token address
              <Input name="tokenAddress" placeholder="0x..." />
            </label>
          ) : null}

          {assetKind === "nft" ? (
            <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
              <label className="block space-y-2 text-sm font-medium">
                NFT contract
                <Input name="nftContractAddress" placeholder="0x..." />
              </label>
              <label className="block space-y-2 text-sm font-medium">
                Token ID
                <Input inputMode="numeric" name="nftTokenId" placeholder="184" />
              </label>
            </div>
          ) : null}

          <label className="block space-y-2 text-sm font-medium">
            Message
            <Textarea
              maxLength={140}
              name="message"
              placeholder="Add a quick note for the creator"
            />
          </label>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <Button className="w-full" disabled={!canSubmit} type="submit">
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
            {isSubmitting ? "Sending..." : "Send reward"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
