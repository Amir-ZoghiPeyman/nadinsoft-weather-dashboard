import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Select,
  FormControl,
  InputLabel,
  Box,
  useTheme,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeContext();
  const { t } = useTranslation();
  const { lang, setLanguage } = useLanguage();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
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
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          transition: "background-color 0.3s ease",
          flexDirection: lang === "fa" ? "row-reverse" : "row",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            component="img"
            src="/imgs/weather.png"
            alt="weather logo"
            sx={{ width: 50, borderRadius: "50%" }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Weather Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl
            size="small"
            sx={{
              minWidth: 150,
              backgroundColor: theme.palette.background.default,
              borderRadius: 1,
            }}
          >
            <InputLabel id="city-label">{t("city")}</InputLabel>
            <Select
              labelId="city-label"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((city) => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
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
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Box sx={{ px: 2, py: 1, display: "flex", flexDirection: "column", gap: 1, minWidth: 180 }}>
              {username && (
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                  {t("welcome", { name: username })}
                </Typography>
              )}

              <Typography variant="subtitle2">{t("language")}</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant={lang === "fa" ? "contained" : "outlined"} size="small" onClick={() => setLanguage("fa")}>FA</Button>
                <Button variant={lang === "en" ? "contained" : "outlined"} size="small" onClick={() => setLanguage("en")}>EN</Button>
              </Box>

              <Typography variant="subtitle2" sx={{ mt: 1 }}>{t("theme")} ({mode})</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant={mode === "light" ? "contained" : "outlined"} size="small" onClick={() => toggleTheme("light")}>Light</Button>
                <Button variant={mode === "dark" ? "contained" : "outlined"} size="small" onClick={() => toggleTheme("dark")}>Dark</Button>
              </Box>

              <Button variant="contained" color="error" size="small" sx={{ mt: 2 }} onClick={handleLogout}>
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
