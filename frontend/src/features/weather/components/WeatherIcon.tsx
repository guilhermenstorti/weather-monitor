import type { WeatherConditionIcon } from "../types";
import { BoltGlyph, CloudGlyph, FogGlyph, MoonGlyph, RainGlyph, SnowGlyph, SunGlyph } from "./weather-icon-parts";

interface WeatherIconProps {
  icon: WeatherConditionIcon;
  className?: string;
}

const renderIcon = (icon: WeatherConditionIcon, sizeClassName: string) => {
  switch (icon) {
    case "clear-day":
      return <SunGlyph className={`${sizeClassName} text-amber-300`} />;
    case "clear-night":
      return <MoonGlyph className={`${sizeClassName} text-slate-100`} />;
    case "partly-cloudy-day":
      return (
        <div className="relative">
          <SunGlyph className="absolute -left-1.5 -top-1.5 h-5 w-5 text-amber-300" />
          <CloudGlyph className={`relative ${sizeClassName} text-slate-100`} />
        </div>
      );
    case "partly-cloudy-night":
      return (
        <div className="relative">
          <MoonGlyph className="absolute -left-1.5 -top-1.5 h-4 w-4 text-slate-200" />
          <CloudGlyph className={`relative ${sizeClassName} text-slate-300`} />
        </div>
      );
    case "cloudy":
      return <CloudGlyph className={`${sizeClassName} text-slate-200`} />;
    case "fog":
      return (
        <div className="relative">
          <CloudGlyph className={`${sizeClassName} text-slate-300`} />
          <FogGlyph className="absolute inset-0 h-full w-full text-slate-100" />
        </div>
      );
    case "drizzle":
    case "rain":
    case "freezing-rain":
      return (
        <div className="relative">
          <CloudGlyph className={`${sizeClassName} text-slate-300`} />
          <RainGlyph className="absolute inset-0 h-full w-full text-sky-300" />
        </div>
      );
    case "snow":
      return (
        <div className="relative">
          <CloudGlyph className={`${sizeClassName} text-slate-200`} />
          <SnowGlyph className="absolute inset-0 h-full w-full text-white" />
        </div>
      );
    case "thunderstorm":
      return (
        <div className="relative">
          <CloudGlyph className={`${sizeClassName} text-slate-400`} />
          <BoltGlyph className="absolute inset-0 h-full w-full text-amber-300" />
        </div>
      );
    default:
      return <CloudGlyph className={`${sizeClassName} text-slate-200`} />;
  }
};

export const WeatherIcon = ({ icon, className = "h-10 w-10" }: WeatherIconProps) => renderIcon(icon, className);
