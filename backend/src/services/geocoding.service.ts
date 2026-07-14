import { searchGeocodingResults, type OpenMeteoGeocodingResult } from "../data/clients/open-meteo.client.js";
import type { CityLocation, CitySuggestion } from "../types/weather.types.js";

export class CityNotFoundError extends Error {
  constructor(city: string) {
    super(`City "${city}" was not found`);
    this.name = "CityNotFoundError";
  }
}

const toCitySuggestion = (result: OpenMeteoGeocodingResult): CitySuggestion => ({
  id: result.id,
  name: result.name,
  country: result.country,
  admin1: result.admin1,
  latitude: result.latitude,
  longitude: result.longitude
});

const toCityLocation = (result: OpenMeteoGeocodingResult): CityLocation => ({
  id: result.id,
  name: result.name,
  country: result.country,
  countryCode: result.country_code,
  admin1: result.admin1,
  latitude: result.latitude,
  longitude: result.longitude,
  timezone: result.timezone
});

export const searchCitySuggestions = async (query: string): Promise<CitySuggestion[]> => {
  const results = await searchGeocodingResults(query);
  return results.map(toCitySuggestion);
};

export const findCityLocation = async (city: string): Promise<CityLocation> => {
  const results = await searchGeocodingResults(city);
  const [bestMatch] = results;

  if (!bestMatch) {
    throw new CityNotFoundError(city);
  }

  return toCityLocation(bestMatch);
};
