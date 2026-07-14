import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoadingIndicator } from "./LoadingIndicator";

describe("LoadingIndicator", () => {
  it("should announce the loading status for assistive technologies", () => {
    render(<LoadingIndicator />);

    expect(screen.getByRole("status")).toHaveTextContent("Carregando previsão do tempo...");
  });
});
