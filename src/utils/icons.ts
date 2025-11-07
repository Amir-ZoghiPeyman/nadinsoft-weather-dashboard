import sunny from "../../public/imgs/Sunny.png";
import cloudy from "../../public/imgs/Cloudy.png";
import rainy from "../../public/imgs/Rain cloud.png";
import thunder from "../../public/imgs/storm.png";

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
