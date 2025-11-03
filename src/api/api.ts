import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  params: {
    appid: import.meta.env.API_KEY,
    units: "metric",
  },
});

export default api;

export const getWeatherByCity = async (city: string) => {
  try {
    const response = await api.get("/weather", {
      params: { q: city },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};
