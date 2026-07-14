import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
  it("should render the provided error message as an alert", () => {
    render(<ErrorState message="Cidade não encontrada" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Cidade não encontrada");
  });
});
