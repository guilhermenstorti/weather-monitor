import { beforeEach, describe, expect, it, vi } from "vitest";
import * as openMeteoClient from "../data/clients/open-meteo.client.js";
import { CityNotFoundError, findCityLocation, searchCitySuggestions } from "./geocoding.service.js";

vi.mock("../data/clients/open-meteo.client.js", async () => {
  const actual = await vi.importActual<typeof import("../data/clients/open-meteo.client.js")>(
    "../data/clients/open-meteo.client.js"
  );
  return { ...actual, searchGeocodingResults: vi.fn() };
});

const searchGeocodingResultsMock = vi.mocked(openMeteoClient.searchGeocodingResults);

describe("findCityLocation", () => {
  beforeEach(() => {
    searchGeocodingResultsMock.mockReset();
  });

  it("should return the first geocoding match as the city location", async () => {
    searchGeocodingResultsMock.mockResolvedValue([
      {
        id: 1,
        name: "São Paulo",
        latitude: -23.55,
        longitude: -46.63,
        timezone: "America/Sao_Paulo",
        country: "Brasil",
        country_code: "BR",
        admin1: "São Paulo"
      }
    ]);

    const city = await findCityLocation("São Paulo");

    expect(city).toEqual({
      id: 1,
      name: "São Paulo",
      country: "Brasil",
      countryCode: "BR",
      admin1: "São Paulo",
      latitude: -23.55,
      longitude: -46.63,
      timezone: "America/Sao_Paulo"
    });
  });

  it("should throw CityNotFoundError when there are no matches", async () => {
    searchGeocodingResultsMock.mockResolvedValue([]);

    await expect(findCityLocation("Cidade Inexistente")).rejects.toThrow(CityNotFoundError);
  });
});

describe("searchCitySuggestions", () => {
  beforeEach(() => {
    searchGeocodingResultsMock.mockReset();
  });

  it("should map geocoding results to city suggestions", async () => {
    searchGeocodingResultsMock.mockResolvedValue([
      {
        id: 2,
        name: "Porto",
        latitude: 41.15,
        longitude: -8.61,
        timezone: "Europe/Lisbon",
        country: "Portugal",
        country_code: "PT",
        admin1: "Porto"
      }
    ]);

    const suggestions = await searchCitySuggestions("Porto");

    expect(suggestions).toEqual([
      { id: 2, name: "Porto", country: "Portugal", admin1: "Porto", latitude: 41.15, longitude: -8.61 }
    ]);
  });
});
