import axios from "axios";

const API_KEY = "b58b2eba2534575694b6098bff6a8cfa";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getCurrentWeather = async (city: string) => {
  const res = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
      lang: "en",
    },
  });
  return res.data;
};

export const getForecast = async (city: string) => {
  const res = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: "metric",
      lang: "en",
    },
  });
  return res.data;
};
