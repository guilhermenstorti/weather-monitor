import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("should keep the readme sidebar closed by default", () => {
    const { container } = render(
      <AppShell>
        <div>page content</div>
      </AppShell>
    );

    const aside = container.querySelector("aside");

    expect(aside).toHaveClass("w-0");
    expect(aside).toHaveAttribute("aria-hidden", "true");
    expect(aside).toHaveAttribute("inert");
  });

  it("should open the sidebar and show the real README content when the info button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AppShell>
        <div>page content</div>
      </AppShell>
    );

    await user.click(screen.getByRole("button", { name: "Open project information" }));

    const aside = container.querySelector("aside");

    expect(aside).toHaveClass("w-full");
    expect(aside).not.toHaveAttribute("inert");
    expect(await screen.findByRole("heading", { name: /about the project/i })).toBeInTheDocument();
  });

  it("should close the sidebar when the close button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AppShell>
        <div>page content</div>
      </AppShell>
    );

    await user.click(screen.getByRole("button", { name: "Open project information" }));
    await user.click(screen.getByRole("button", { name: "Close project information" }));

    expect(container.querySelector("aside")).toHaveClass("w-0");
  });

  it("should close the sidebar when Escape is pressed", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <AppShell>
        <div>page content</div>
      </AppShell>
    );

    await user.click(screen.getByRole("button", { name: "Open project information" }));
    await user.keyboard("{Escape}");

    expect(container.querySelector("aside")).toHaveClass("w-0");
  });
});
