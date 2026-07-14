import type { WeatherCondition, WeatherConditionIcon } from "../types/weather.types.js";

interface WeatherConditionDefinition {
  label: string;
  dayIcon: WeatherConditionIcon;
  nightIcon: WeatherConditionIcon;
}

const DEFAULT_CONDITION: WeatherConditionDefinition = {
  label: "Condição desconhecida",
  dayIcon: "cloudy",
  nightIcon: "cloudy"
};

const WEATHER_CODE_DEFINITIONS: Record<number, WeatherConditionDefinition> = {
  0: { label: "Céu limpo", dayIcon: "clear-day", nightIcon: "clear-night" },
  1: { label: "Predominantemente limpo", dayIcon: "clear-day", nightIcon: "clear-night" },
  2: { label: "Parcialmente nublado", dayIcon: "partly-cloudy-day", nightIcon: "partly-cloudy-night" },
  3: { label: "Nublado", dayIcon: "cloudy", nightIcon: "cloudy" },
  45: { label: "Névoa", dayIcon: "fog", nightIcon: "fog" },
  48: { label: "Névoa com geada", dayIcon: "fog", nightIcon: "fog" },
  51: { label: "Garoa fraca", dayIcon: "drizzle", nightIcon: "drizzle" },
  53: { label: "Garoa moderada", dayIcon: "drizzle", nightIcon: "drizzle" },
  55: { label: "Garoa forte", dayIcon: "drizzle", nightIcon: "drizzle" },
  56: { label: "Garoa congelante fraca", dayIcon: "freezing-rain", nightIcon: "freezing-rain" },
  57: { label: "Garoa congelante forte", dayIcon: "freezing-rain", nightIcon: "freezing-rain" },
  61: { label: "Chuva fraca", dayIcon: "rain", nightIcon: "rain" },
  63: { label: "Chuva moderada", dayIcon: "rain", nightIcon: "rain" },
  65: { label: "Chuva forte", dayIcon: "rain", nightIcon: "rain" },
  66: { label: "Chuva congelante fraca", dayIcon: "freezing-rain", nightIcon: "freezing-rain" },
  67: { label: "Chuva congelante forte", dayIcon: "freezing-rain", nightIcon: "freezing-rain" },
  71: { label: "Neve fraca", dayIcon: "snow", nightIcon: "snow" },
  73: { label: "Neve moderada", dayIcon: "snow", nightIcon: "snow" },
  75: { label: "Neve forte", dayIcon: "snow", nightIcon: "snow" },
  77: { label: "Grãos de neve", dayIcon: "snow", nightIcon: "snow" },
  80: { label: "Pancadas de chuva fracas", dayIcon: "rain", nightIcon: "rain" },
  81: { label: "Pancadas de chuva moderadas", dayIcon: "rain", nightIcon: "rain" },
  82: { label: "Pancadas de chuva violentas", dayIcon: "rain", nightIcon: "rain" },
  85: { label: "Pancadas de neve fracas", dayIcon: "snow", nightIcon: "snow" },
  86: { label: "Pancadas de neve fortes", dayIcon: "snow", nightIcon: "snow" },
  95: { label: "Trovoada", dayIcon: "thunderstorm", nightIcon: "thunderstorm" },
  96: { label: "Trovoada com granizo fraco", dayIcon: "thunderstorm", nightIcon: "thunderstorm" },
  99: { label: "Trovoada com granizo forte", dayIcon: "thunderstorm", nightIcon: "thunderstorm" }
};

export const mapWeatherCode = (code: number, isDay: boolean): WeatherCondition => {
  const definition = WEATHER_CODE_DEFINITIONS[code] ?? DEFAULT_CONDITION;
  return {
    code,
    label: definition.label,
    icon: isDay ? definition.dayIcon : definition.nightIcon
  };
};
