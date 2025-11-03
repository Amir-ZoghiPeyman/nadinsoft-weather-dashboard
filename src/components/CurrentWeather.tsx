import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCurrentWeather } from "../api/api";
import { useCity } from "../context/CityContext";

export default function CurrentWeatherCard() {
  const { city } = useCity();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!city) return;
    getCurrentWeather(city).then(setData);
  }, [city]);
  if (!data) return <Typography>Loading...</Typography>;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5">{data.name}</Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h3">{Math.round(data.main.temp)}°C</Typography>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
          />
        </Box>
        <Typography>{data.weather[0].description}</Typography>
      </CardContent>
    </Card>
  );
}
