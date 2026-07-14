import {
  ErrorState,
  LoadingIndicator,
  SearchBar,
  WeatherBackground,
  WeatherPanel,
  useWeatherSearch
} from "../features/weather";

export const WeatherPage = () => {
  const { status, data, errorMessage, searchCity, resetSearch } = useWeatherSearch();
  const isIdle = status === "idle";

  return (
    <WeatherBackground icon={data?.current.condition.icon ?? null}>
      <div
        className={`absolute left-1/2 w-full max-w-md -translate-x-1/2 px-4 transition-all duration-700 ease-out ${
          isIdle ? "top-1/2 -translate-y-1/2" : "top-10 translate-y-0"
        }`}
      >
        <SearchBar onSearch={searchCity} onClear={resetSearch} isSearching={status === "loading"} />

        {isIdle && (
          <p className="mt-6 text-center text-white/80">
            Digite uma cidade para ver o clima atual e a previsão de 7 dias.
          </p>
        )}
      </div>

      {!isIdle && (
        <div className="mx-auto flex max-w-md flex-col items-center gap-6 pt-28">
          {status === "loading" && <LoadingIndicator />}
          {status === "error" && errorMessage && <ErrorState message={errorMessage} />}
          {status === "success" && data && <WeatherPanel weather={data} />}
        </div>
      )}
    </WeatherBackground>
  );
};
