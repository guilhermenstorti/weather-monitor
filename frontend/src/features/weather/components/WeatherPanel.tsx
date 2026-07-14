import { CurrentWeatherCard } from "./CurrentWeatherCard";
import { ForecastList } from "./ForecastList";
import type { WeatherResponse } from "../types";

interface WeatherPanelProps {
  weather: WeatherResponse;
}

export const WeatherPanel = ({ weather }: WeatherPanelProps) => (
  <div className="flex w-full flex-col items-center gap-6">
    <CurrentWeatherCard city={weather.city} current={weather.current} />
    <ForecastList days={weather.daily} />
  </div>
);
