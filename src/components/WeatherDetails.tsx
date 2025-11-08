import {
  Card,
  CardContent,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getForecast } from "../api/api";
import { useCity } from "../context/CityContext";

export default function MonthlyTemperatureChart() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { city } = useCity();
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!city) return;
    setLoading(true);
    getForecast(city).then((data) => {
      const daily = data.list.filter((_: any, i: number) => i % 8 === 0);
      const mapped = daily.map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        temp: Math.round(item.main.temp),
      }));
      setChartData(mapped);
      setLoading(false);
    });
  }, [city]);

  if (loading)
    return (
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
          width: "100%",
          minHeight: 220,
          px: 2,
          bgcolor: theme.palette.secondary.main,
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            mb={1}
            color={theme.palette.text.primary}
          >
            {t("dailyAvgTemp")} — {city || "..."}
          </Typography>
          <Skeleton variant="rectangular" width="100%" height={160} />
        </CardContent>
      </Card>
    );

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 2,
        width: "100%",
        minHeight: 220,
        px: 2,
        bgcolor: theme.palette.secondary.main,
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          mb={1}
          color={theme.palette.text.primary}
        >
          {t("dailyAvgTemp")} — {city}
        </Typography>

        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.divider}
            />
            <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
            <YAxis
              stroke={theme.palette.text.secondary}
              tickFormatter={(v) => `${v}°C`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 8,
                border: `1px solid ${theme.palette.divider}`,
              }}
              formatter={(value: number) => [`${value}°C`, "Temp"]}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke={theme.palette.primary.main}
              strokeWidth={2.5}
              dot={{ r: 3, fill: theme.palette.primary.main }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
