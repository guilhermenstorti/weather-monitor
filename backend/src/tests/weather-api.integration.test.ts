import type { Server } from "node:http";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import * as openMeteoClient from "../data/clients/open-meteo.client.js";

vi.mock("../data/clients/open-meteo.client.js", async () => {
  const actual = await vi.importActual<typeof import("../data/clients/open-meteo.client.js")>(
    "../data/clients/open-meteo.client.js"
  );
  return {
    ...actual,
    searchGeocodingResults: vi.fn(),
    fetchForecast: vi.fn()
  };
});

const searchGeocodingResultsMock = vi.mocked(openMeteoClient.searchGeocodingResults);
const fetchForecastMock = vi.mocked(openMeteoClient.fetchForecast);

let server: Server;
let baseUrl: string;

const readJson = async <T>(response: Response): Promise<T> => (await response.json()) as T;

interface ErrorBody {
  message: string;
}

beforeAll(async () => {
  const { createApp } = await import("../app.js");
  const app = createApp();

  await new Promise<void>((resolve) => {
    server = app.listen(0, resolve);
  });

  const address = server.address();
  const port = typeof address === "object" && address ? address.port : 0;
  baseUrl = `http://127.0.0.1:${port}`;
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  searchGeocodingResultsMock.mockReset();
  fetchForecastMock.mockReset();
});

describe("GET /weather", () => {
  it("should return 200 with weather data for a known city", async () => {
    searchGeocodingResultsMock.mockResolvedValue([
      {
        id: 1,
        name: "Curitiba",
        latitude: -25.43,
        longitude: -49.27,
        timezone: "America/Sao_Paulo",
        country: "Brasil",
        country_code: "BR",
        admin1: "Paraná"
      }
    ]);
    fetchForecastMock.mockResolvedValue({
      current: {
        time: "2026-07-14T10:00",
        temperature_2m: 18,
        relative_humidity_2m: 70,
        apparent_temperature: 17,
        is_day: 1,
        weather_code: 3,
        wind_speed_10m: 8
      },
      hourly: { time: ["2026-07-14T10:00"], precipitation_probability: [20], uv_index: [2] },
      daily: {
        time: ["2026-07-14"],
        weather_code: [3],
        temperature_2m_max: [20],
        temperature_2m_min: [12],
        uv_index_max: [3],
        precipitation_probability_max: [30]
      }
    });

    const response = await fetch(`${baseUrl}/weather?city=Curitiba`);
    const body = await readJson<{ city: { name: string }; current: { condition: { label: string } } }>(response);

    expect(response.status).toBe(200);
    expect(body.city.name).toBe("Curitiba");
    expect(body.current.condition.label).toBe("Nublado");
  });

  it("should return 400 when the city query parameter is missing", async () => {
    const response = await fetch(`${baseUrl}/weather`);
    const body = await readJson<ErrorBody>(response);

    expect(response.status).toBe(400);
    expect(body.message).toBeTypeOf("string");
  });

  it("should return 404 when the city cannot be found", async () => {
    searchGeocodingResultsMock.mockResolvedValue([]);

    const response = await fetch(`${baseUrl}/weather?city=Atlantis`);
    const body = await readJson<ErrorBody>(response);

    expect(response.status).toBe(404);
    expect(body.message).toContain("Atlantis");
  });

  it("should return 502 when the Open-Meteo API request fails", async () => {
    searchGeocodingResultsMock.mockRejectedValue(new openMeteoClient.OpenMeteoRequestError("boom"));

    const response = await fetch(`${baseUrl}/weather?city=Curitiba`);
    const body = await readJson<ErrorBody>(response);

    expect(response.status).toBe(502);
    expect(body.message).toBeTypeOf("string");
  });
});

describe("GET /cities", () => {
  it("should return 200 with city suggestions", async () => {
    searchGeocodingResultsMock.mockResolvedValue([
      {
        id: 2,
        name: "Porto Alegre",
        latitude: -30.03,
        longitude: -51.23,
        timezone: "America/Sao_Paulo",
        country: "Brasil",
        country_code: "BR",
        admin1: "Rio Grande do Sul"
      }
    ]);

    const response = await fetch(`${baseUrl}/cities?search=Porto`);
    const body = await readJson<unknown[]>(response);

    expect(response.status).toBe(200);
    expect(body).toEqual([
      {
        id: 2,
        name: "Porto Alegre",
        country: "Brasil",
        admin1: "Rio Grande do Sul",
        latitude: -30.03,
        longitude: -51.23
      }
    ]);
  });

  it("should return 400 when the search query is too short", async () => {
    const response = await fetch(`${baseUrl}/cities?search=a`);
    const body = await readJson<ErrorBody>(response);

    expect(response.status).toBe(400);
    expect(body.message).toBeTypeOf("string");
  });
});
