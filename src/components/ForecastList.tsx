import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getForecast } from "../api/api";
import { useCity } from "../context/CityContext";
import { weatherIconMap } from "../utils/icons";

interface ForecastItem {
  dt: number;
  main: { temp: number };
  weather: { main: string; description: string }[];
}

export default function ForecastList() {
  const { city } = useCity();
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isRTL = i18n.language === "fa";

  // Fetch weather
  useEffect(() => {
    if (!city) return;
    setLoading(true);
    setError(null);
    getForecast(city)
      .then((data) => {
        const daily = data.list.filter((_: any, i: number) => i % 8 === 0);
        setForecast(daily);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [city]);

  if (loading)
    return (
      <Typography
        sx={{ textAlign: "center", color: theme.palette.text.primary, py: 2 }}
      >
        {t("loading")}
      </Typography>
    );

  if (error)
    return (
      <Typography
        sx={{ textAlign: "center", color: theme.palette.error.main, py: 2 }}
      >
        {t("error")}: {error}
      </Typography>
    );

  return (
    <Box
      dir={isRTL ? "rtl" : "ltr"}
      sx={{
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        overflowY: "hidden",
        gap: 2,
        px: 2,
        py: 1,
        scrollSnapType: "x mandatory",
        "& > *": { scrollSnapAlign: "start" },
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": { height: 6 },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.text.disabled,
          borderRadius: 4,
        },
      }}
    >
      {forecast.map((item) => {
        const weatherMain = item.weather[0].main;
        const customIcon =
          weatherIconMap[weatherMain] || weatherIconMap["Clear"];
        const dateStr = new Intl.DateTimeFormat(isRTL ? "fa-IR" : "en-US", {
          weekday: "short",
          day: "numeric",
          month: "short",
        }).format(new Date(item.dt * 1000));

        return (
          <Card
            key={item.dt}
            sx={{
              minWidth: 140,
              flexShrink: 0,
              borderRadius: 3,
              boxShadow: 1,
              textAlign: "center",
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              transition: "transform 0.2s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography fontWeight={600}>{dateStr}</Typography>
              <Box
                component="img"
                src={customIcon}
                alt={item.weather[0].description}
                loading="lazy"
                sx={{ width: 60, height: 60, mx: "auto" }}
              />
              <Typography variant="h6" fontWeight={600}>
                {Math.round(item.main.temp)}°C
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
