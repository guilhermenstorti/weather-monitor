import { describe, expect, it } from "vitest";
import { mapWeatherCode } from "./weather-condition.mapper.js";

describe("mapWeatherCode", () => {
  it("should map a known code to its label and day icon", () => {
    const condition = mapWeatherCode(0, true);

    expect(condition).toEqual({ code: 0, label: "Céu limpo", icon: "clear-day" });
  });

  it("should map the same code to the night icon variant when it is not day", () => {
    const condition = mapWeatherCode(0, false);

    expect(condition.icon).toBe("clear-night");
  });

  it("should fall back to a default condition for an unknown code", () => {
    const condition = mapWeatherCode(9999, true);

    expect(condition.label).toBe("Condição desconhecida");
    expect(condition.icon).toBe("cloudy");
  });
});
