import { fetchForecast, type OpenMeteoForecastResponse } from "../data/clients/open-meteo.client.js";
import { findCityLocation } from "./geocoding.service.js";
import { mapWeatherCode } from "./weather-condition.mapper.js";
import type { DailyForecastDay, WeatherResponse } from "../types/weather.types.js";

const findHourlyIndexForTime = (hourlyTimes: string[], targetTime: string): number => {
  const index = hourlyTimes.indexOf(targetTime);
  return index === -1 ? 0 : index;
};

const buildDailyForecast = (daily: OpenMeteoForecastResponse["daily"]): DailyForecastDay[] =>
  daily.time.map((date, index) => ({
    date,
    temperatureMin: daily.temperature_2m_min[index],
    temperatureMax: daily.temperature_2m_max[index],
    uvIndexMax: daily.uv_index_max[index],
    precipitationProbability: daily.precipitation_probability_max[index],
    condition: mapWeatherCode(daily.weather_code[index], true)
  }));

export const getWeatherForCity = async (city: string): Promise<WeatherResponse> => {
  const cityLocation = await findCityLocation(city);
  const forecast = await fetchForecast(cityLocation.latitude, cityLocation.longitude, cityLocation.timezone);

  const hourlyIndex = findHourlyIndexForTime(forecast.hourly.time, forecast.current.time);
  const isDay = forecast.current.is_day === 1;

  return {
    city: cityLocation,
    current: {
      temperature: forecast.current.temperature_2m,
      apparentTemperature: forecast.current.apparent_temperature,
      humidity: forecast.current.relative_humidity_2m,
      windSpeed: forecast.current.wind_speed_10m,
      uvIndex: forecast.hourly.uv_index[hourlyIndex] ?? 0,
      precipitationProbability: forecast.hourly.precipitation_probability[hourlyIndex] ?? 0,
      isDay,
      condition: mapWeatherCode(forecast.current.weather_code, isDay)
    },
    daily: buildDailyForecast(forecast.daily)
  };
};
