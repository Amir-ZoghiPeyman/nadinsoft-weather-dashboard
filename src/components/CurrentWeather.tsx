import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Card,
  CardContent,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCurrentWeather } from "../api/api";
import { useCity } from "../context/CityContext";
import { weatherIconMap } from "../utils/icons";

export default function CurrentWeatherCard() {
  const { city } = useCity();
  const [data, setData] = useState<any>(null);
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!city) return;
    setData(null);
    getCurrentWeather(city).then(setData);
  }, [city]);

  const isRTL = i18n.language === "fa";
  if (!data)
    return (
      <Card
        dir={isRTL ? "rtl" : "ltr"}
        sx={{
          borderRadius: 3,
          boxShadow: 2,
          width: "100%",
          height: "90%",
          backgroundColor: theme.palette.secondary.main,
          backdropFilter: "blur(10px)",
          p: 3,
        }}
      >
        <Skeleton variant="text" width={100} height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={160} height={25} sx={{ mb: 3 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Skeleton variant="text" width={80} height={40} />
            <Skeleton variant="text" width={140} height={20} />
          </Box>
          <Skeleton variant="circular" width={70} height={70} />
        </Box>
      </Card>
    );

  const weatherMain = data.weather[0].main;
  const customIcon = weatherIconMap[weatherMain] || weatherIconMap["Clear"];
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const high = Math.round(data.main.temp_max);
  const low = Math.round(data.main.temp_min);

  const now = new Date();
  const weekday = now.toLocaleDateString(
    i18n.language === "fa" ? "fa-IR" : "en-US",
    { weekday: "long" }
  );
  const dateStr = now.toLocaleDateString(
    i18n.language === "fa" ? "fa-IR" : "en-GB",
    { day: "2-digit", month: "short", year: "numeric" }
  );
  const timeStr = now.toLocaleTimeString(
    i18n.language === "fa" ? "fa-IR" : "en-US",
    { hour: "2-digit", minute: "2-digit" }
  );

  return (
    <Card
      dir={isRTL ? "rtl" : "ltr"}
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        width: "100%",
        height: "90%",
        backgroundColor: theme.palette.secondary.main,
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CardContent sx={{ width: "100%", py: 2, px: 3 }}>
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

        <Box mb={1}>
          <Typography variant="h6" fontWeight={700} color="primary.dark">
            {weekday}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dateStr} {timeStr}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box textAlign={isRTL ? "right" : "left"}>
            <Typography variant="h4" fontWeight={700}>
              {temp}°C
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("maxTemp")}: {high} {t("minTemp")}: {low}
            </Typography>
          </Box>

          <Box
            textAlign="center"
            ml={30}
            sx={{ display: "flex", flexDirection: "column-reverse" }}
          >
            <Typography variant="body1" fontWeight={600}>
              {data.weather[0].main}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("feelsLike")}: {feelsLike}°
            </Typography>

            <Box
              component="img"
              src={customIcon}
              alt={data.weather[0].description}
              sx={{ width: 70, height: 70 }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
