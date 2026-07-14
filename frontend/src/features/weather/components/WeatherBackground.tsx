import type { ReactNode } from "react";
import { getWeatherGradient } from "../lib/weather-presentation";
import type { WeatherConditionIcon } from "../types";

interface WeatherBackgroundProps {
  icon: WeatherConditionIcon | null;
  children: ReactNode;
}

const DEFAULT_GRADIENT = "from-sky-500 via-sky-600 to-blue-700";

export const WeatherBackground = ({ icon, children }: WeatherBackgroundProps) => {
  const gradient = icon ? getWeatherGradient(icon) : DEFAULT_GRADIENT;

  return (
    <div className={`relative min-h-screen w-full bg-gradient-to-b px-4 transition-colors duration-700 ${gradient}`}>
      {children}
    </div>
  );
};
