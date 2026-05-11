import type { Metadata } from "next";
import "@rainbow-me/rainbowkit/styles.css";

import { Providers } from "@/app/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArcStream",
  description: "Livestreaming with programmable onchain rewards on Arc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
