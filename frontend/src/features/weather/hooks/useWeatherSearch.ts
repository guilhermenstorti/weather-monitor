import { useCallback, useState } from "react";
import { fetchWeatherByCity, getUserFacingErrorMessage, WeatherApiError } from "../api/weather-api";
import type { WeatherResponse } from "../types";

type WeatherSearchStatus = "idle" | "loading" | "success" | "error";

interface WeatherSearchState {
  status: WeatherSearchStatus;
  data: WeatherResponse | null;
  errorMessage: string | null;
}

const INITIAL_STATE: WeatherSearchState = { status: "idle", data: null, errorMessage: null };
const GENERIC_ERROR_MESSAGE = "Não foi possível carregar o clima. Tente novamente.";

export const useWeatherSearch = () => {
  const [state, setState] = useState<WeatherSearchState>(INITIAL_STATE);

  const searchCity = useCallback(async (city: string) => {
    setState({ status: "loading", data: null, errorMessage: null });

    try {
      const weather = await fetchWeatherByCity(city);
      setState({ status: "success", data: weather, errorMessage: null });
    } catch (error) {
      const message = error instanceof WeatherApiError ? getUserFacingErrorMessage(error) : GENERIC_ERROR_MESSAGE;
      setState({ status: "error", data: null, errorMessage: message });
    }
  }, []);

  const resetSearch = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  return { ...state, searchCity, resetSearch };
};
