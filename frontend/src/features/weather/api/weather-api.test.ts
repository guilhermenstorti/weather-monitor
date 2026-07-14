import { describe, expect, it } from "vitest";
import { getUserFacingErrorMessage, WeatherApiError } from "./weather-api";

describe("getUserFacingErrorMessage", () => {
  it("should translate a 404 status into a Portuguese city-not-found message", () => {
    const message = getUserFacingErrorMessage(new WeatherApiError('City "Atlantis" was not found', 404));

    expect(message).toBe("Cidade não encontrada. Verifique o nome e tente novamente.");
  });

  it("should translate a 502 status into a Portuguese upstream-failure message", () => {
    const message = getUserFacingErrorMessage(new WeatherApiError("Failed to reach the Open-Meteo API", 502));

    expect(message).toBe("Não foi possível obter os dados climáticos agora. Tente novamente em instantes.");
  });

  it("should fall back to a generic message for an unmapped status code", () => {
    const message = getUserFacingErrorMessage(new WeatherApiError("Unexpected error", 500));

    expect(message).toBe("Não foi possível carregar o clima. Tente novamente.");
  });
});
