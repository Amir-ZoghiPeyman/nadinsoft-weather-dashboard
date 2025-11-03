import { Container, Grid, Typography } from "@mui/material";
import CurrentWeatherCard from "../components/CurrentWeather";
import ForecastList from "../components/ForecastList";
import WeatherDetailsCard from "../components/WeatherDetails";

export default function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CurrentWeatherCard />
            </Grid>
            <Grid item xs={12}>
              <WeatherDetailsCard />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" mb={2}>
            5-Day Forecast
          </Typography>
          <ForecastList />
        </Grid>
      </Grid>
    </Container>
  );
}
