import {
  Container,
  Grid,
  Typography,
  useTheme,
  CircularProgress,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Suspense, lazy } from "react";

const CurrentWeatherCard = lazy(() => import("../components/CurrentWeather"));
const WeatherDetailsCard = lazy(() => import("../components/WeatherDetails"));
const ForecastList = lazy(() => import("../components/ForecastList"));

export default function Dashboard() {
  const { t } = useTranslation();
  const theme = useTheme();

  const fallbackBox = (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "center", py: 4 }}
    >
      <CircularProgress color="primary" />
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ pt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Grid container display={"flex"} gap={4}>
            <Grid item xs={12}>
              <Suspense fallback={fallbackBox}>
                <CurrentWeatherCard />
              </Suspense>
            </Grid>
            <Grid item xs={12}>
              <Suspense fallback={fallbackBox}>
                <WeatherDetailsCard />
              </Suspense>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  p: 1,
                  px: 4,
                  py: 2,
                  borderRadius: 5,
                }}
              >
                <Typography variant="h6" mb={1}>
                  {t("forecast")}
                </Typography>
                <Suspense fallback={fallbackBox}>
                  <ForecastList />
                </Suspense>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
