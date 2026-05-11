import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Providers } from "@/app/providers";
import { LandingPage } from "@/components/landing/landing-page";

describe("LandingPage", () => {
  it("renders the ArcStream live dashboard experience", () => {
    render(
      <Providers>
        <LandingPage />
      </Providers>,
    );

    expect(screen.getAllByText("ArcStream")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Alexandra" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Live Now" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Send a Tip" })).toBeInTheDocument();
    expect(screen.getByText("Live Chat")).toBeInTheDocument();
  });
});
