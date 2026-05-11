"use client";

import { create } from "zustand";

import { initialDonationFeed } from "@/lib/donations/fixtures";
import type { DonationFeedItem } from "@/lib/donations/types";

type DonationFeedState = {
  items: DonationFeedItem[];
  addDonation: (item: DonationFeedItem) => void;
  updateDonation: (
    id: string,
    patch: Partial<Pick<DonationFeedItem, "status" | "txHash" | "explorerUrl">>,
  ) => void;
};

export const useDonationFeedStore = create<DonationFeedState>((set) => ({
  items: initialDonationFeed,
  addDonation: (item) =>
    set((state) => ({
      items: [item, ...state.items].slice(0, 30),
    })),
  updateDonation: (id, patch) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    })),
}));
