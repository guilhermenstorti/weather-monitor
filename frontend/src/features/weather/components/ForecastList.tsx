import { WeatherIcon } from "./WeatherIcon";
import type { DailyForecastDay } from "../types";

interface ForecastListProps {
  days: DailyForecastDay[];
}

const MIN_BAR_WIDTH_PERCENT = 6;

const formatWeekday = (isoDate: string): string =>
  new Date(`${isoDate}T00:00:00`).toLocaleDateString("pt-BR", { weekday: "short" });

export const ForecastList = ({ days }: ForecastListProps) => {
  const overallMin = Math.min(...days.map((day) => day.temperatureMin));
  const overallMax = Math.max(...days.map((day) => day.temperatureMax));
  const temperatureRange = overallMax - overallMin || 1;

  return (
    <section className="w-full max-w-md rounded-3xl bg-white/10 p-5 text-white shadow-2xl backdrop-blur-xl">
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-white/70">Previsão de 7 dias</h2>
      <ul className="flex flex-col gap-3">
        {days.map((day) => {
          const startPercent = ((day.temperatureMin - overallMin) / temperatureRange) * 100;
          const widthPercent = Math.max(
            ((day.temperatureMax - day.temperatureMin) / temperatureRange) * 100,
            MIN_BAR_WIDTH_PERCENT
          );

          return (
            <li key={day.date} className="grid grid-cols-[3rem_2rem_1fr_auto] items-center gap-3 text-sm">
              <span className="capitalize text-white/80">{formatWeekday(day.date)}</span>
              <WeatherIcon icon={day.condition.icon} className="h-6 w-6" />
              <span className="relative h-1.5 rounded-full bg-white/20">
                <span
                  className="absolute h-1.5 rounded-full bg-gradient-to-r from-sky-300 to-amber-300"
                  style={{ left: `${startPercent}%`, width: `${widthPercent}%` }}
                />
              </span>
              <span className="w-16 text-right text-white/90">
                {Math.round(day.temperatureMin)}° / {Math.round(day.temperatureMax)}°
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
