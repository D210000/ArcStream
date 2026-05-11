import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LandingPage } from "@/components/landing/landing-page";

describe("LandingPage", () => {
  it("renders the ArcStream landing experience", () => {
    render(<LandingPage />);

    expect(screen.getByRole("heading", { name: "ArcStream" })).toBeInTheDocument();
    expect(screen.getByText("Live now")).toBeInTheDocument();
    expect(screen.getAllByText("Watch stream")).toHaveLength(3);
  });
});
