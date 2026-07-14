import type { WeatherConditionIcon } from "../types";

const GRADIENT_BY_ICON: Record<WeatherConditionIcon, string> = {
  "clear-day": "from-sky-400 via-sky-500 to-blue-600",
  "clear-night": "from-slate-900 via-indigo-950 to-black",
  "partly-cloudy-day": "from-sky-300 via-slate-400 to-slate-600",
  "partly-cloudy-night": "from-slate-800 via-slate-900 to-black",
  cloudy: "from-slate-400 via-slate-500 to-slate-700",
  fog: "from-slate-300 via-slate-400 to-slate-500",
  drizzle: "from-slate-500 via-sky-700 to-slate-800",
  rain: "from-slate-600 via-blue-800 to-slate-900",
  "freezing-rain": "from-cyan-600 via-slate-700 to-slate-900",
  snow: "from-slate-200 via-sky-300 to-slate-500",
  thunderstorm: "from-slate-800 via-purple-900 to-black"
};

export const getWeatherGradient = (icon: WeatherConditionIcon): string => GRADIENT_BY_ICON[icon];
