import { WeatherIcon } from "./WeatherIcon";
import type { CityLocation, CurrentWeather } from "../types";

interface CurrentWeatherCardProps {
  city: CityLocation;
  current: CurrentWeather;
}

interface StatItemProps {
  label: string;
  value: string;
}

const StatItem = ({ label, value }: StatItemProps) => (
  <div className="flex flex-col items-center rounded-2xl bg-white/10 px-3 py-2 backdrop-blur-md">
    <span className="text-xs uppercase tracking-wide text-white/70">{label}</span>
    <span className="text-base font-semibold text-white">{value}</span>
  </div>
);

export const CurrentWeatherCard = ({ city, current }: CurrentWeatherCardProps) => (
  <section className="w-full max-w-md rounded-3xl bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl">
    <header className="text-center">
      <h1 className="text-2xl font-semibold">{city.name}</h1>
      <p className="text-sm text-white/70">{[city.admin1, city.country].filter(Boolean).join(", ")}</p>
    </header>

    <div className="mt-4 flex items-center justify-center gap-4">
      <WeatherIcon icon={current.condition.icon} className="h-20 w-20" />
      <div className="text-center">
        <p className="text-6xl font-light">{Math.round(current.temperature)}°</p>
        <p className="text-sm text-white/80">{current.condition.label}</p>
      </div>
    </div>

    <p className="mt-2 text-center text-sm text-white/70">
      Sensação térmica de {Math.round(current.apparentTemperature)}°
    </p>

    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatItem label="Vento" value={`${Math.round(current.windSpeed)} km/h`} />
      <StatItem label="Índice UV" value={`${Math.round(current.uvIndex)}`} />
      <StatItem label="Umidade" value={`${Math.round(current.humidity)}%`} />
      <StatItem label="Chuva" value={`${Math.round(current.precipitationProbability)}%`} />
    </div>
  </section>
);
