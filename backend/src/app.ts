import express, { type Express, type NextFunction, type Request, type Response } from "express";
import { getCitySuggestions } from "./controllers/cities.controller.js";
import { getWeatherByCity } from "./controllers/weather.controller.js";

const allowCrossOriginRequests = (_req: Request, res: Response, next: NextFunction): void => {
  res.header("Access-Control-Allow-Origin", process.env.FRONTEND_ORIGIN ?? "*");
  res.header("Access-Control-Allow-Methods", "GET");
  next();
};

export const createApp = (): Express => {
  const app = express();

  app.use(allowCrossOriginRequests);

  app.get("/weather", getWeatherByCity);
  app.get("/cities", getCitySuggestions);

  return app;
};
