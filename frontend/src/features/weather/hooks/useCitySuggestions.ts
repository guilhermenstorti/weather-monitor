import { useEffect, useState } from "react";
import { fetchCitySuggestions } from "../api/weather-api";
import type { CitySuggestion } from "../types";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_DELAY_MS = 300;

export const useCitySuggestions = (query: string) => {
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      return;
    }

    let isCancelled = false;

    const timeoutId = setTimeout(() => {
      fetchCitySuggestions(trimmedQuery)
        .then((results) => {
          if (!isCancelled) {
            setSuggestions(results);
          }
        })
        .catch(() => {
          if (!isCancelled) {
            setSuggestions([]);
          }
        });
    }, DEBOUNCE_DELAY_MS);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [query]);

  return { suggestions };
};
