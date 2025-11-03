import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCurrentWeather } from "../api/api";
import { useCity } from "../context/CityContext";

export default function WeatherDetailsCard() {
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
        <Typography variant="h6" mb={2}>
          Weather Details — {city}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Humidity: {data.main.humidity}%</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Pressure: {data.main.pressure} hPa</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Wind Speed: {data.wind.speed} m/s</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              Feels Like: {Math.round(data.main.feels_like)}°C
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
