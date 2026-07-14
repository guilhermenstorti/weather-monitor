import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as weatherApi from "../features/weather/api/weather-api";
import { WeatherPage } from "./WeatherPage";

vi.mock("../features/weather/api/weather-api", async () => {
  const actual = await vi.importActual<typeof import("../features/weather/api/weather-api")>(
    "../features/weather/api/weather-api"
  );
  return { ...actual, fetchWeatherByCity: vi.fn(), fetchCitySuggestions: vi.fn() };
});

const fetchWeatherByCityMock = vi.mocked(weatherApi.fetchWeatherByCity);
const fetchCitySuggestionsMock = vi.mocked(weatherApi.fetchCitySuggestions);

describe("WeatherPage", () => {
  beforeEach(() => {
    fetchWeatherByCityMock.mockReset();
    fetchCitySuggestionsMock.mockReset();
    fetchCitySuggestionsMock.mockResolvedValue([]);
  });

  it("should display the weather panel after a successful search", async () => {
    fetchWeatherByCityMock.mockResolvedValue({
      city: {
        id: 1,
        name: "Recife",
        country: "Brasil",
        countryCode: "BR",
        latitude: -8,
        longitude: -34.9,
        timezone: "America/Recife"
      },
      current: {
        temperature: 30,
        apparentTemperature: 33,
        humidity: 65,
        windSpeed: 15,
        uvIndex: 9,
        precipitationProbability: 5,
        isDay: true,
        condition: { code: 0, label: "Céu limpo", icon: "clear-day" }
      },
      daily: [
        {
          date: "2026-07-14",
          temperatureMin: 24,
          temperatureMax: 31,
          uvIndexMax: 10,
          precipitationProbability: 5,
          condition: { code: 0, label: "Céu limpo", icon: "clear-day" }
        }
      ]
    });

    const user = userEvent.setup();
    render(<WeatherPage />);

    await user.type(screen.getByLabelText("Buscar cidade"), "Recife");
    await user.click(screen.getByRole("button", { name: "Buscar" }));

    expect(await screen.findByRole("heading", { name: "Recife" })).toBeInTheDocument();
  });

  it("should display a Portuguese error message when the city is not found", async () => {
    fetchWeatherByCityMock.mockRejectedValue(new weatherApi.WeatherApiError('City "Atlantis" was not found', 404));

    const user = userEvent.setup();
    render(<WeatherPage />);

    await user.type(screen.getByLabelText("Buscar cidade"), "Atlantis");
    await user.click(screen.getByRole("button", { name: "Buscar" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Cidade não encontrada. Verifique o nome e tente novamente.");
  });

  it("should center the search bar vertically while idle and move it to the top once a search resolves", async () => {
    fetchWeatherByCityMock.mockRejectedValue(new weatherApi.WeatherApiError("boom", 500));

    const user = userEvent.setup();
    const { container } = render(<WeatherPage />);

    const getSearchBarWrapper = () => container.querySelector('input[aria-label="Buscar cidade"]')?.closest(".absolute");

    expect(getSearchBarWrapper()).toHaveClass("top-1/2");
    expect(getSearchBarWrapper()).not.toHaveClass("top-10");

    await user.type(screen.getByLabelText("Buscar cidade"), "Atlantis");
    await user.click(screen.getByRole("button", { name: "Buscar" }));
    await screen.findByRole("alert");

    expect(getSearchBarWrapper()).toHaveClass("top-10");
    expect(getSearchBarWrapper()).not.toHaveClass("top-1/2");
  });
});
