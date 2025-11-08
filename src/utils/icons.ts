import cloudy from "../assets/imgs/Cloudy.png";
import rainy from "../assets/imgs/Rain cloud.png";
import thunder from "../assets/imgs/storm.png";
import sunny from "../assets/imgs/Sunny.png";

export const weatherIconMap: Record<string, string> = {
  Clear: sunny,
  Clouds: cloudy,
  Rain: rainy,
  Drizzle: rainy,
  Thunderstorm: thunder,
  Snow: thunder,
  Mist: thunder,
  Smoke: thunder,
  Haze: cloudy,
  Fog: cloudy,
};
