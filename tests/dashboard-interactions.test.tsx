import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LiveChatPanel } from "@/components/dashboard/live-chat-panel";
import { StreamerProfile } from "@/components/dashboard/streamer-profile";

describe("dashboard interactions", () => {
  it("appends live chat messages from local state", () => {
    render(<LiveChatPanel />);

    const input = screen.getByPlaceholderText("Send a message...");
    fireEvent.change(input, { target: { value: "Shipping this live." } });
    fireEvent.click(screen.getByLabelText("Send message"));

    expect(screen.getByText("Shipping this live.")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("toggles follow state", () => {
    render(<StreamerProfile />);

    const followButton = screen.getByRole("button", { name: "Follow" });
    fireEvent.click(followButton);

    expect(
      screen.getByRole("button", { name: "Following" }),
    ).toBeInTheDocument();
  });
});
