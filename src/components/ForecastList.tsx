import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getForecast } from "../api/api";
import { useCity } from "../context/CityContext";
import { weatherIconMap } from "../utils/icons";
import { useTranslation } from "react-i18next";

export default function ForecastList() {
  const { city } = useCity();
  const [forecast, setForecast] = useState<any[]>([]);
  const { t, i18n } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    if (!city) return;
    getForecast(city).then((data) => {
      const daily = data.list.filter((_: any, i: number) => i % 8 === 0);
      setForecast(daily);
    });
  }, [city]);

  if (!forecast.length)
    return (
      <Typography
        sx={{
          textAlign: "center",
          color: theme.palette.text.primary,
          py: 2,
        }}
      >
        {t("loading")}
      </Typography>
    );

  const isRTL = i18n.language === "fa";

  return (
    <Box
      dir={isRTL ? "rtl" : "ltr"}
      sx={{
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        overflowY: "hidden",
        gap: 2,
        py: 1,
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
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Typography fontWeight={600}>
                {new Date(item.dt * 1000).toLocaleDateString(
                  i18n.language === "fa" ? "fa-IR" : "en-US",
                  {
                    weekday: "short",
                  }
                )}
              </Typography>
              <Box
                component="img"
                src={customIcon}
                alt={item.weather[0].description}
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
