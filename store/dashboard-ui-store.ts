"use client";

import { create } from "zustand";

type DisplayMode = "light" | "focus" | "fullscreen";

type DashboardUiState = {
  selectedTip: string;
  displayMode: DisplayMode;
  sidebarOpen: boolean;
  notificationOpen: boolean;
  unreadNotifications: number;
  setSelectedTip: (tip: string) => void;
  setDisplayMode: (mode: DisplayMode) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleNotifications: () => void;
  markNotificationsRead: () => void;
};

export const useDashboardUiStore = create<DashboardUiState>((set) => ({
  selectedTip: "$10",
  displayMode: "light",
  sidebarOpen: false,
  notificationOpen: false,
  unreadNotifications: 3,
  setSelectedTip: (tip) => set({ selectedTip: tip }),
  setDisplayMode: (mode) => set({ displayMode: mode }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleNotifications: () =>
    set((state) => ({ notificationOpen: !state.notificationOpen })),
  markNotificationsRead: () => set({ unreadNotifications: 0 }),
}));
