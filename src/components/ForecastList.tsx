import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getForecast } from "../api/api";
import { useCity } from "../context/CityContext";

export default function ForecastList() {
  const { city } = useCity();
  const [forecast, setForecast] = useState<any[]>([]);

  useEffect(() => {
    if (!city) return;
    getForecast(city).then((data) => {
      const daily = data.list.filter((_: any, i: number) => i % 8 === 0);
      setForecast(daily);
    });
  }, [city]);

  if (!forecast.length) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: 2,
        py: 1,
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": { height: 8 },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: 4,
        },
      }}
    >
      {forecast.map((item) => (
        <Card
          key={item.dt}
          sx={{
            minWidth: 160,
            flexShrink: 0,
            borderRadius: 3,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography>
              {new Date(item.dt * 1000).toLocaleDateString()}
            </Typography>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <Typography variant="h6">{Math.round(item.main.temp)}°C</Typography>
            <Typography variant="body2">
              {item.weather[0].description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
