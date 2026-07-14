import { beforeEach, describe, expect, it, vi } from "vitest";
import * as openMeteoClient from "../data/clients/open-meteo.client.js";
import * as geocodingService from "./geocoding.service.js";
import { getWeatherForCity } from "./weather.service.js";

vi.mock("../data/clients/open-meteo.client.js", async () => {
  const actual = await vi.importActual<typeof import("../data/clients/open-meteo.client.js")>(
    "../data/clients/open-meteo.client.js"
  );
  return { ...actual, fetchForecast: vi.fn() };
});

vi.mock("./geocoding.service.js", async () => {
  const actual = await vi.importActual<typeof import("./geocoding.service.js")>("./geocoding.service.js");
  return { ...actual, findCityLocation: vi.fn() };
});

const fetchForecastMock = vi.mocked(openMeteoClient.fetchForecast);
const findCityLocationMock = vi.mocked(geocodingService.findCityLocation);

describe("getWeatherForCity", () => {
  beforeEach(() => {
    fetchForecastMock.mockReset();
    findCityLocationMock.mockReset();
  });

  it("should assemble the weather response combining city, current and daily forecast", async () => {
    findCityLocationMock.mockResolvedValue({
      id: 1,
      name: "Lisboa",
      country: "Portugal",
      countryCode: "PT",
      admin1: "Lisboa",
      latitude: 38.72,
      longitude: -9.14,
      timezone: "Europe/Lisbon"
    });

    fetchForecastMock.mockResolvedValue({
      current: {
        time: "2026-07-14T15:00",
        temperature_2m: 27.4,
        relative_humidity_2m: 55,
        apparent_temperature: 28.1,
        is_day: 1,
        weather_code: 0,
        wind_speed_10m: 12.3
      },
      hourly: {
        time: ["2026-07-14T14:00", "2026-07-14T15:00"],
        precipitation_probability: [5, 10],
        uv_index: [4, 6]
      },
      daily: {
        time: ["2026-07-14"],
        weather_code: [0],
        temperature_2m_max: [30],
        temperature_2m_min: [20],
        uv_index_max: [7],
        precipitation_probability_max: [15]
      }
    });

    const weather = await getWeatherForCity("Lisboa");

    expect(weather.city.name).toBe("Lisboa");
    expect(weather.current).toEqual({
      temperature: 27.4,
      apparentTemperature: 28.1,
      humidity: 55,
      windSpeed: 12.3,
      uvIndex: 6,
      precipitationProbability: 10,
      isDay: true,
      condition: { code: 0, label: "Céu limpo", icon: "clear-day" }
    });
    expect(weather.daily).toEqual([
      {
        date: "2026-07-14",
        temperatureMin: 20,
        temperatureMax: 30,
        uvIndexMax: 7,
        precipitationProbability: 15,
        condition: { code: 0, label: "Céu limpo", icon: "clear-day" }
      }
    ]);
  });

  it("should propagate CityNotFoundError when the city cannot be geocoded", async () => {
    findCityLocationMock.mockRejectedValue(new geocodingService.CityNotFoundError("Atlantis"));

    await expect(getWeatherForCity("Atlantis")).rejects.toThrow(geocodingService.CityNotFoundError);
    expect(fetchForecastMock).not.toHaveBeenCalled();
  });
});
