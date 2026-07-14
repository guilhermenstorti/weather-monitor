import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as weatherApi from "../api/weather-api";
import { SearchBar } from "./SearchBar";

vi.mock("../api/weather-api", async () => {
  const actual = await vi.importActual<typeof import("../api/weather-api")>("../api/weather-api");
  return { ...actual, fetchCitySuggestions: vi.fn() };
});

const fetchCitySuggestionsMock = vi.mocked(weatherApi.fetchCitySuggestions);

describe("SearchBar", () => {
  beforeEach(() => {
    fetchCitySuggestionsMock.mockReset();
    fetchCitySuggestionsMock.mockResolvedValue([]);
  });

  it("should call onSearch with the typed city when the form is submitted", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} onClear={vi.fn()} isSearching={false} />);

    await user.type(screen.getByLabelText("Buscar cidade"), "Curitiba");
    await user.click(screen.getByRole("button", { name: "Buscar" }));

    expect(onSearch).toHaveBeenCalledWith("Curitiba");
  });

  it("should show city suggestions and call onSearch when a suggestion is selected", async () => {
    fetchCitySuggestionsMock.mockResolvedValue([
      { id: 1, name: "Porto Alegre", country: "Brasil", admin1: "Rio Grande do Sul", latitude: -30, longitude: -51 }
    ]);
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBar onSearch={onSearch} onClear={vi.fn()} isSearching={false} />);

    await user.type(screen.getByLabelText("Buscar cidade"), "Porto");

    const suggestion = await screen.findByText("Porto Alegre, Rio Grande do Sul, Brasil");
    await user.click(suggestion);

    expect(onSearch).toHaveBeenCalledWith("Porto Alegre");
  });

  it("should call onClear and reset the input when the clear button is clicked", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();

    render(<SearchBar onSearch={vi.fn()} onClear={onClear} isSearching={false} />);

    await user.type(screen.getByLabelText("Buscar cidade"), "Recife");
    await user.click(screen.getByRole("button", { name: "Limpar" }));

    expect(onClear).toHaveBeenCalledOnce();
    expect(screen.getByLabelText("Buscar cidade")).toHaveValue("");
  });
});
