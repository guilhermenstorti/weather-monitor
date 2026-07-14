import type { Request, Response } from "express";
import { OpenMeteoRequestError } from "../data/clients/open-meteo.client.js";
import { CityNotFoundError } from "../services/geocoding.service.js";
import { getWeatherForCity } from "../services/weather.service.js";

export const getWeatherByCity = async (req: Request, res: Response): Promise<void> => {
  const city = req.query.city;

  if (typeof city !== "string" || city.trim().length === 0) {
    res.status(400).json({ message: "The 'city' query parameter is required" });
    return;
  }

  try {
    const weather = await getWeatherForCity(city.trim());
    res.status(200).json(weather);
  } catch (error) {
    if (error instanceof CityNotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }

    if (error instanceof OpenMeteoRequestError) {
      res.status(502).json({ message: "Failed to reach the Open-Meteo API" });
      return;
    }

    res.status(500).json({ message: "Unexpected error while fetching weather data" });
  }
};
