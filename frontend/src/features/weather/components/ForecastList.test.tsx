import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ForecastList } from "./ForecastList";

describe("ForecastList", () => {
  it("should render one entry per forecast day with its min and max temperatures", () => {
    render(
      <ForecastList
        days={[
          {
            date: "2026-07-14",
            temperatureMin: 12,
            temperatureMax: 20,
            uvIndexMax: 3,
            precipitationProbability: 30,
            condition: { code: 3, label: "Nublado", icon: "cloudy" }
          },
          {
            date: "2026-07-15",
            temperatureMin: 10,
            temperatureMax: 18,
            uvIndexMax: 2,
            precipitationProbability: 40,
            condition: { code: 61, label: "Chuva fraca", icon: "rain" }
          }
        ]}
      />
    );

    expect(screen.getByText("12° / 20°")).toBeInTheDocument();
    expect(screen.getByText("10° / 18°")).toBeInTheDocument();
  });
});
