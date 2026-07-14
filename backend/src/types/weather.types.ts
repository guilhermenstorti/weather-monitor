export type WeatherConditionIcon =
  | "clear-day"
  | "clear-night"
  | "partly-cloudy-day"
  | "partly-cloudy-night"
  | "cloudy"
  | "fog"
  | "drizzle"
  | "rain"
  | "freezing-rain"
  | "snow"
  | "thunderstorm";

export interface WeatherCondition {
  code: number;
  label: string;
  icon: WeatherConditionIcon;
}

export interface CityLocation {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CitySuggestion {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  precipitationProbability: number;
  isDay: boolean;
  condition: WeatherCondition;
}

export interface DailyForecastDay {
  date: string;
  temperatureMin: number;
  temperatureMax: number;
  uvIndexMax: number;
  precipitationProbability: number;
  condition: WeatherCondition;
}

export interface WeatherResponse {
  city: CityLocation;
  current: CurrentWeather;
  daily: DailyForecastDay[];
}
