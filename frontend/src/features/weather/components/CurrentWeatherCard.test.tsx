import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CurrentWeatherCard } from "./CurrentWeatherCard";

describe("CurrentWeatherCard", () => {
  it("should render the city name and the main weather indicators", () => {
    render(
      <CurrentWeatherCard
        city={{
          id: 1,
          name: "Lisboa",
          country: "Portugal",
          countryCode: "PT",
          admin1: "Lisboa",
          latitude: 38.7,
          longitude: -9.1,
          timezone: "Europe/Lisbon"
        }}
        current={{
          temperature: 27,
          apparentTemperature: 28,
          humidity: 55,
          windSpeed: 12,
          uvIndex: 6,
          precipitationProbability: 10,
          isDay: true,
          condition: { code: 0, label: "Céu limpo", icon: "clear-day" }
        }}
      />
    );

    expect(screen.getByRole("heading", { name: "Lisboa" })).toBeInTheDocument();
    expect(screen.getByText("Céu limpo")).toBeInTheDocument();
    expect(screen.getByText("27°")).toBeInTheDocument();
    expect(screen.getByText("12 km/h")).toBeInTheDocument();
    expect(screen.getByText("55%")).toBeInTheDocument();
  });
});
