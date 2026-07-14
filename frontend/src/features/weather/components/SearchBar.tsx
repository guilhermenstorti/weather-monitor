import { useState } from "react";
import { Button } from "../../../components/ui/Button";
import { useCitySuggestions } from "../hooks/useCitySuggestions";
import type { CitySuggestion } from "../types";

interface SearchBarProps {
  onSearch: (city: string) => void;
  onClear: () => void;
  isSearching: boolean;
}

const formatSuggestionLabel = (suggestion: CitySuggestion): string =>
  [suggestion.name, suggestion.admin1, suggestion.country].filter(Boolean).join(", ");

export const SearchBar = ({ onSearch, onClear, isSearching }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const { suggestions } = useCitySuggestions(query);

  const submitSearch = (city: string) => {
    if (city.trim().length === 0) return;
    setIsSuggestionsOpen(false);
    onSearch(city.trim());
  };

  const handleSelectSuggestion = (suggestion: CitySuggestion) => {
    setQuery(suggestion.name);
    submitSearch(suggestion.name);
  };

  const handleClear = () => {
    setQuery("");
    setIsSuggestionsOpen(false);
    onClear();
  };

  return (
    <div className="relative w-full max-w-md">
      <form
        className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 ring-1 ring-white/25 backdrop-blur-lg"
        onSubmit={(event) => {
          event.preventDefault();
          submitSearch(query);
        }}
      >
        <input
          type="text"
          value={query}
          placeholder="Buscar cidade..."
          aria-label="Buscar cidade"
          className="flex-1 bg-transparent text-white placeholder-white/60 outline-none"
          onChange={(event) => {
            setQuery(event.target.value);
            setIsSuggestionsOpen(true);
          }}
          onFocus={() => setIsSuggestionsOpen(true)}
        />
        {query.length > 0 && (
          <Button type="button" variant="ghost" onClick={handleClear}>
            Limpar
          </Button>
        )}
        <Button type="submit" disabled={isSearching}>
          Buscar
        </Button>
      </form>

      {isSuggestionsOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl bg-white/95 text-slate-900 shadow-xl">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id}>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-sm hover:bg-slate-100"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {formatSuggestionLabel(suggestion)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
