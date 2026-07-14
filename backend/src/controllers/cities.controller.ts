import type { Request, Response } from "express";
import { OpenMeteoRequestError } from "../data/clients/open-meteo.client.js";
import { searchCitySuggestions } from "../services/geocoding.service.js";

const MIN_SEARCH_LENGTH = 2;

export const getCitySuggestions = async (req: Request, res: Response): Promise<void> => {
  const search = req.query.search;

  if (typeof search !== "string" || search.trim().length < MIN_SEARCH_LENGTH) {
    res.status(400).json({ message: `The 'search' query parameter must have at least ${MIN_SEARCH_LENGTH} characters` });
    return;
  }

  try {
    const suggestions = await searchCitySuggestions(search.trim());
    res.status(200).json(suggestions);
  } catch (error) {
    if (error instanceof OpenMeteoRequestError) {
      res.status(502).json({ message: "Failed to reach the Open-Meteo API" });
      return;
    }

    res.status(500).json({ message: "Unexpected error while searching cities" });
  }
};
