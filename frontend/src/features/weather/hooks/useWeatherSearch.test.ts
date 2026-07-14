import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as weatherApi from "../api/weather-api";
import { useWeatherSearch } from "./useWeatherSearch";

vi.mock("../api/weather-api", async () => {
  const actual = await vi.importActual<typeof import("../api/weather-api")>("../api/weather-api");
  return { ...actual, fetchWeatherByCity: vi.fn() };
});

const fetchWeatherByCityMock = vi.mocked(weatherApi.fetchWeatherByCity);

describe("useWeatherSearch", () => {
  beforeEach(() => {
    fetchWeatherByCityMock.mockReset();
  });

  it("should expose the weather data after a successful search", async () => {
    fetchWeatherByCityMock.mockResolvedValue({
      city: {
        id: 1,
        name: "Curitiba",
        country: "Brasil",
        countryCode: "BR",
        latitude: -25.4,
        longitude: -49.2,
        timezone: "America/Sao_Paulo"
      },
      current: {
        temperature: 18,
        apparentTemperature: 17,
        humidity: 70,
        windSpeed: 8,
        uvIndex: 2,
        precipitationProbability: 20,
        isDay: true,
        condition: { code: 3, label: "Nublado", icon: "cloudy" }
      },
      daily: []
    });

    const { result } = renderHook(() => useWeatherSearch());

    await act(async () => {
      await result.current.searchCity("Curitiba");
    });

    expect(result.current.status).toBe("success");
    expect(result.current.data?.city.name).toBe("Curitiba");
  });

  it("should expose a translated, user-facing error message when the city is not found", async () => {
    fetchWeatherByCityMock.mockRejectedValue(new weatherApi.WeatherApiError('City "Atlantis" was not found', 404));

    const { result } = renderHook(() => useWeatherSearch());

    await act(async () => {
      await result.current.searchCity("Atlantis");
    });

    expect(result.current.status).toBe("error");
    expect(result.current.errorMessage).toBe("Cidade não encontrada. Verifique o nome e tente novamente.");
  });

  it("should reset back to the idle state", async () => {
    fetchWeatherByCityMock.mockRejectedValue(new weatherApi.WeatherApiError("boom", 500));
    const { result } = renderHook(() => useWeatherSearch());

    await act(async () => {
      await result.current.searchCity("Atlantis");
    });

    act(() => {
      result.current.resetSearch();
    });

    expect(result.current.status).toBe("idle");
    expect(result.current.errorMessage).toBeNull();
  });
});
