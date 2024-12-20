import { API_CONFIG } from "./config";
import type {
  WeatherData,
  ForecastData,
  GeocodingResponse,
  Coordinates,
} from "./types";

const createUrl = (
  endpoint: string,
  params: Record<string, string | number>
): string => {
  const searchParams = new URLSearchParams({
    appid: API_CONFIG.API_KEY,
    ...Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, value.toString()])
    ),
  });
  return `${endpoint}?${searchParams.toString()}`;
};

const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API Error: ${response.statusText}`);
  }

  return response.json();
};

export const getCurrentWeather = async ({
  lat,
  lon,
}: Coordinates): Promise<WeatherData> => {
  const url = createUrl(`${API_CONFIG.BASE_URL}/weather`, {
    lat,
    lon,
    units: API_CONFIG.DEFAULT_PARAMS.units,
  });
  return fetchData<WeatherData>(url);
};

export const getForecast = async ({
  lat,
  lon,
}: Coordinates): Promise<ForecastData> => {
  const url = createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
    lat,
    lon,
    units: "metric",
  });
  return fetchData<ForecastData>(url);
};

export const reverseGeocode = async ({
  lat,
  lon,
}: Coordinates): Promise<GeocodingResponse[]> => {
  const url = createUrl(`${API_CONFIG.GEO}/reverse`, {
    lat,
    lon,
    limit: "1",
  });
  return fetchData<GeocodingResponse[]>(url);
};

export const searchLocations = async (
  query: string
): Promise<GeocodingResponse[]> => {
  const url = createUrl(`${API_CONFIG.GEO}/direct`, {
    q: query,
    limit: "5",
  });
  return fetchData<GeocodingResponse[]>(url);
};
