const GEOCODING_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_BASE_URL = "https://api.open-meteo.com/v1/forecast";
const FORECAST_DAYS = 7;

export class OpenMeteoRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenMeteoRequestError";
  }
}

export interface OpenMeteoGeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
  country_code: string;
  admin1?: string;
}

interface OpenMeteoGeocodingResponse {
  results?: OpenMeteoGeocodingResult[];
}

export interface OpenMeteoForecastResponse {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  hourly: {
    time: string[];
    precipitation_probability: number[];
    uv_index: number[];
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    uv_index_max: number[];
    precipitation_probability_max: number[];
  };
}

export const searchGeocodingResults = async (city: string): Promise<OpenMeteoGeocodingResult[]> => {
  const url = new URL(GEOCODING_BASE_URL);
  url.searchParams.set("name", city);
  url.searchParams.set("count", "10");
  url.searchParams.set("language", "pt");
  url.searchParams.set("format", "json");

  const response = await fetch(url);
  if (!response.ok) {
    throw new OpenMeteoRequestError(`Geocoding request failed with status ${response.status}`);
  }

  const data = (await response.json()) as OpenMeteoGeocodingResponse;
  return data.results ?? [];
};

export const fetchForecast = async (
  latitude: number,
  longitude: number,
  timezone: string
): Promise<OpenMeteoForecastResponse> => {
  const url = new URL(FORECAST_BASE_URL);
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("timezone", timezone);
  url.searchParams.set("forecast_days", String(FORECAST_DAYS));
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m"
  );
  url.searchParams.set("hourly", "precipitation_probability,uv_index");
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max"
  );

  const response = await fetch(url);
  if (!response.ok) {
    throw new OpenMeteoRequestError(`Forecast request failed with status ${response.status}`);
  }

  return (await response.json()) as OpenMeteoForecastResponse;
};
