import type { LucideIcon } from "lucide-react";
import {
  Bell,
  Compass,
  Heart,
  Home,
  MessageSquare,
  Radio,
  Search,
  TrendingUp,
} from "lucide-react";

export type SidebarItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  active?: boolean;
};

export type ChatMessage = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  message: string;
  time: string;
};

export type StreamCard = {
  id: string;
  name: string;
  title: string;
  viewers: string;
  category: "Trading" | "Development" | "Contracts" | "RWAs";
  routeSlug: string;
  image: string;
  accent: string;
};

export type AnalyticsWidget = {
  label: string;
  value: string;
  delta: string;
  tone: "purple" | "green" | "blue";
};

export const sidebarItems: SidebarItem[] = [
  { label: "Home", icon: Home, href: "/", active: true },
  { label: "Live Now", icon: Radio, href: "/streams/neon-finals" },
  { label: "Discover", icon: Search, href: "/?panel=discover" },
  { label: "Following", icon: Heart, href: "/?panel=following" },
  { label: "Messages", icon: MessageSquare, href: "/?panel=messages" },
  { label: "Notifications", icon: Bell, href: "/?panel=notifications" },
];

export const chatMessages: ChatMessage[] = [
  {
    id: "1",
    name: "0xA7B...3F2c",
    handle: "builder",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    message: "Loving the build!",
    time: "1m",
  },
  {
    id: "2",
    name: "Web3Lover",
    handle: "web3lover",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
    message: "This is insane! ARC is the future.",
    time: "2m",
  },
  {
    id: "3",
    name: "DeFiDegen",
    handle: "defidegen",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
    message: "Just tipped $10 USDC.",
    time: "2m",
  },
  {
    id: "4",
    name: "BuilderDAO",
    handle: "builderdao",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=80&q=80",
    message: "Great work as always.",
    time: "3m",
  },
  {
    id: "5",
    name: "0xC91...b78a",
    handle: "rocket",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80",
    message: "When are you launching?",
    time: "3m",
  },
];

export const liveStreams: StreamCard[] = [
  {
    id: "crypto-max",
    name: "CryptoMax",
    title: "Trading on ARC",
    viewers: "2.4K",
    category: "Trading",
    routeSlug: "neon-finals",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=440&q=80",
    accent: "from-sky-500/20 to-violet-600/20",
  },
  {
    id: "sasha",
    name: "Sasha",
    title: "Web3 Development",
    viewers: "1.1K",
    category: "Development",
    routeSlug: "midnight-synth",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=440&q=80",
    accent: "from-emerald-400/20 to-orange-300/20",
  },
  {
    id: "chain-builder",
    name: "ChainBuilder",
    title: "Smart Contracts",
    viewers: "893",
    category: "Contracts",
    routeSlug: "ship-fast",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=440&q=80",
    accent: "from-cyan-400/20 to-indigo-500/20",
  },
  {
    id: "luna",
    name: "Luna",
    title: "DeFi and RWAs",
    viewers: "651",
    category: "RWAs",
    routeSlug: "neon-finals",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=440&q=80",
    accent: "from-fuchsia-400/20 to-amber-300/20",
  },
];

export const analyticsWidgets: AnalyticsWidget[] = [
  {
    label: "Tips today",
    value: "$1,248.75",
    delta: "+18.2%",
    tone: "purple",
  },
  {
    label: "Live viewers",
    value: "1.2K",
    delta: "+9.4%",
    tone: "blue",
  },
  {
    label: "Goal progress",
    value: "50%",
    delta: "$1,250 raised",
    tone: "green",
  },
];

export const quickTips = ["$1", "$5", "$10", "$50"];

export const searchSuggestions = [
  "streamers",
  "topics",
  "collections",
  "creator tokens",
];

export const topCategories = [
  "Web3",
  "ARC",
  "Live Coding",
  "DeFi",
];

export const mainStreamer = {
  name: "Alexandra",
  handle: "0xAlex...Streamer",
  subtitle: "Building the future on ARC",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  hero:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1300&q=85",
  viewers: "1.2K",
  balance: "$1,248.75",
  walletAddress: "0x1111111111111111111111111111111111111111" as const,
};

export const navActions = [
  { label: "Explore", icon: Compass },
  { label: "Growth", icon: TrendingUp },
];
