import type { CitySuggestion, WeatherResponse } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3333";

export class WeatherApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "WeatherApiError";
    this.status = status;
  }
}

const parseErrorMessage = async (response: Response): Promise<string> => {
  try {
    const body = (await response.json()) as { message?: string };
    return body.message ?? `Request failed with status ${response.status}`;
  } catch {
    return `Request failed with status ${response.status}`;
  }
};

const USER_FACING_MESSAGE_BY_STATUS: Record<number, string> = {
  400: "Informe uma cidade válida para buscar o clima.",
  404: "Cidade não encontrada. Verifique o nome e tente novamente.",
  502: "Não foi possível obter os dados climáticos agora. Tente novamente em instantes."
};
const DEFAULT_USER_FACING_MESSAGE = "Não foi possível carregar o clima. Tente novamente.";

export const getUserFacingErrorMessage = (error: WeatherApiError): string =>
  USER_FACING_MESSAGE_BY_STATUS[error.status] ?? DEFAULT_USER_FACING_MESSAGE;

export const fetchWeatherByCity = async (city: string): Promise<WeatherResponse> => {
  const url = new URL("/weather", API_BASE_URL);
  url.searchParams.set("city", city);

  const response = await fetch(url);
  if (!response.ok) {
    throw new WeatherApiError(await parseErrorMessage(response), response.status);
  }

  return (await response.json()) as WeatherResponse;
};

export const fetchCitySuggestions = async (search: string): Promise<CitySuggestion[]> => {
  const url = new URL("/cities", API_BASE_URL);
  url.searchParams.set("search", search);

  const response = await fetch(url);
  if (!response.ok) {
    throw new WeatherApiError(await parseErrorMessage(response), response.status);
  }

  return (await response.json()) as CitySuggestion[];
};
