export const API_CONFIG = {
  BASE_URL: "https://api.openweathermap.org",
  GEO: "https://api.openweathermap.org/geo/1.0/direct",
  API_KEY: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
  DEFAULT_PARAMS: {
    units: "metric",
    appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY,
  },
};
