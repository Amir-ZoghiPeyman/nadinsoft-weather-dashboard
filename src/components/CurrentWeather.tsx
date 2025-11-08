import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCurrentWeather } from "../api/api";
import { useCity } from "../context/CityContext";
import { weatherIconMap } from "../utils/icons";

interface WeatherData {
  name: string;
  weather: { main: string; description: string }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
}

export default function CurrentWeatherCard() {
  const { city } = useCity();
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "fa";

  // Fetch weather
  useEffect(() => {
    if (!city) return;
    setData(null);
    setError(null);
    getCurrentWeather(city)
      .then(setData)
      .catch(() => setError(t("fetchError") || "Error fetching weather"));
  }, [city, t]);

  // Compute values only when data changes
  const weatherInfo = useMemo(() => {
    if (!data) return null;

    const w = data.weather[0].main;
    return {
      weatherMain: w,
      customIcon: weatherIconMap[w] || weatherIconMap["Clear"],
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
    };
  }, [data]);

  // Localized date/time
  const now = new Date();
  const weekday = now.toLocaleDateString(isRTL ? "fa-IR" : "en-US", {
    weekday: "long",
  });
  const dateStr = now.toLocaleDateString(isRTL ? "fa-IR" : "en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString(isRTL ? "fa-IR" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Shared Card style
  const cardStyle = {
    borderRadius: 3,
    boxShadow: 2,
    width: "100%",
    height: "90%",
    backgroundColor: theme.palette.secondary.main,
    backdropFilter: "blur(10px)",
    direction: isRTL ? "rtl" : ("ltr" as const),
  };

  // Loading state (skeleton)
  if (!data)
    return (
      <Card sx={cardStyle}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton animation="wave" height={30} width="40%" sx={{ mb: 1 }} />
          <Skeleton animation="wave" height={25} width="60%" sx={{ mb: 3 }} />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Skeleton animation="wave" height={40} width={80} />
              <Skeleton animation="wave" height={20} width={140} />
            </Box>
            <Skeleton
              animation="wave"
              variant="circular"
              width={70}
              height={70}
            />
          </Box>
        </CardContent>
      </Card>
    );

  if (error)
    return (
      <Card sx={cardStyle}>
        <CardContent sx={{ py: 4 }}>
          <Typography color="error.main" textAlign="center" fontWeight={600}>
            {error}
          </Typography>
        </CardContent>
      </Card>
    );

  return (
    <Card sx={cardStyle}>
      <CardContent sx={{ width: "100%", py: 2, px: 3, minHeight: 220 }}>
        {/* Location */}
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          my={1}
          sx={{
            backgroundColor: theme.palette.background.default,
            p: 1,
            borderRadius: 4,
          }}
        >
          <LocationOnIcon sx={{ width: 18, height: 18 }} />
          <Typography variant="body1" fontWeight={500}>
            {data.name}
          </Typography>
        </Box>

        {/* Date & Time */}
        <Box mb={1}>
          <Typography variant="h6" fontWeight={700} color="primary.dark">
            {weekday}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dateStr} {timeStr}
          </Typography>
        </Box>

        {/* Temperature and Icon */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={4}
        >
          <Box textAlign={isRTL ? "right" : "left"}>
            <Typography variant="h4" fontWeight={700}>
              {weatherInfo?.temp}°C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("maxTemp")}: {weatherInfo?.high} {t("minTemp")}:{" "}
              {weatherInfo?.low}
            </Typography>
          </Box>

          <Box
            textAlign="center"
            sx={{
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              {data.weather[0].main}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("feelsLike")}: {weatherInfo?.feelsLike}°
            </Typography>

            <Box
              component="img"
              src={weatherInfo?.customIcon}
              alt={data.weather[0].description}
              sx={{ width: 70, height: 70 }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
