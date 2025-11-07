import SettingsIcon from "@mui/icons-material/Settings";
import {
  AppBar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCity } from "../context/CityContext";
import { useLanguage } from "../context/LanguageContext";
import { useThemeContext } from "../context/ThemeContext";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const { t } = useTranslation();
  const { lang, setLanguage } = useLanguage();
  const { city, setCity } = useCity(); //

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const popularCities = [
    "Tehran",
    "London",
    "NewYork",
    "Paris",
    "Tokyo",
    "Berlin",
    "Dubai",
    "Sydney",
    "Moscow",
    "Toronto",
  ];

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) setUsername(storedName);

    const fetchCities = async () => {
      try {
        const res = await axios.get(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const iran = res.data.data.find((c: any) => c.country === "Iran");
        setCities(iran?.cities.slice(0, 10) || []);
      } catch (err) {
        console.error("Error fetching cities:", err);
      }
    };
    fetchCities();
  }, []);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: theme.palette.navbar.main,
          color: theme.palette.text.primary,
          flexDirection: lang === "fa" ? "row-reverse" : "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexDirection: lang === "fa" ? "row-reverse" : "row",
          }}
        >
          <Box
            component="img"
            src="/imgs/weather.png"
            alt="logo"
            sx={{ width: 50, borderRadius: "50%" }}
          />
          <Typography variant="h6" fontWeight="bold">
            {t("weatherDashboard")}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexDirection: lang === "fa" ? "row-reverse" : "row",
          }}
        >
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="city-label">{t("city")}</InputLabel>
            <Select
              labelId="city-label"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {popularCities.map((c) => (
                <MenuItem key={c} value={c}>
                  {t(`cities.${c}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <IconButton color="inherit" onClick={handleMenuOpen}>
            <SettingsIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <Box
              sx={{
                px: 2,
                py: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {username && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    direction: lang === "fa" ? "rtl" : "ltr",
                  }}
                >
                  {t("welcome", { name: username })}
                </Typography>
              )}
              <Typography
                variant="subtitle2"
                sx={{ direction: lang === "fa" ? "rtl" : "ltr" }}
              >
                {t("language")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mb: 2,
                  width: "100%",
                }}
              >
                <Button
                  fullWidth
                  sx={{ flex: 1 }}
                  variant={lang === "fa" ? "contained" : "outlined"}
                  onClick={() => setLanguage("fa")}
                >
                  FA
                </Button>

                <Button
                  fullWidth
                  sx={{ flex: 1 }}
                  variant={lang === "en" ? "contained" : "outlined"}
                  onClick={() => setLanguage("en")}
                >
                  EN
                </Button>
              </Box>

              <Typography
                variant="subtitle2"
                sx={{ direction: lang === "fa" ? "rtl" : "ltr" }}
              >
                {t("theme")} ({mode})
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  variant={mode === "light" ? "contained" : "outlined"}
                  onClick={() => toggleTheme("light")}
                >
                  Light
                </Button>
                <Button
                  variant={mode === "dark" ? "contained" : "outlined"}
                  onClick={() => toggleTheme("dark")}
                >
                  Dark
                </Button>
              </Box>

              <Button
                variant="contained"
                color="error"
                onClick={handleLogout}
                sx={{ mt: 1 }}
              >
                {t("logout")}
              </Button>
            </Box>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
