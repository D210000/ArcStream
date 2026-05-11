import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCompactAddress(address: string) {
  if (address.length < 12) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatCurrency(amount: string | number, symbol = "USDC") {
  const numericAmount = typeof amount === "string" ? Number(amount) : amount;

  if (Number.isNaN(numericAmount)) {
    return `0 ${symbol}`;
  }

  return `${numericAmount.toLocaleString("en-US", {
    maximumFractionDigits: 6,
    minimumFractionDigits: numericAmount < 1 ? 2 : 0,
  })} ${symbol}`;
}
