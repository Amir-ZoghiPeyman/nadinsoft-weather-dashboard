import {
  Box,
  Button,
  Card,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import foggy from "/imgs/Moon cloud fast wind.png";
import rainy from "/imgs/Moon cloud mid rain.png";
import sunny from "/imgs/Sun cloud angled rain.png";
interface LoginProps {
  onLogin: (username: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();
  const { lang, setLanguage } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(t("pleaseEnterName"));
      return;
    }
    setError("");
    onLogin(name);
    navigate("/dashboard");
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: theme.palette.background.default,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 4,
          transition: "background-color 0.3s ease",
          direction: lang === "fa" ? "rtl" : "ltr",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            maxWidth: 900,
            borderRadius: 4,
            boxShadow: 3,
            overflow: "hidden",
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={600}
              gutterBottom
              color={theme.palette.text.primary}
            >
              {t("login")}
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: "100%",
                maxWidth: 300,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label={t("enterName")}
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                error={!!error}
                helperText={error}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ py: 1.2, fontWeight: "bold", mt: { md: 10 } }}
              >
                {t("login")}
              </Button>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              bgcolor: "#404961",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mx={4}
            >
              <Box
                component="img"
                src={sunny}
                alt="sunny"
                sx={{
                  width: { xs: 140, md: 180 },
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  mb: -5,
                  ml: 10,
                }}
              />
              <Box
                component="img"
                src={rainy}
                alt="rainy"
                sx={{
                  width: { xs: 140, md: 180 },
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  ml: -20,
                }}
              />
              <Box
                component="img"
                src={foggy}
                alt="foggy"
                sx={{
                  width: { xs: 140, md: 180 },
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  mt: -5,
                  ml: 10,
                }}
              />
            </Box>
          </Grid>
        </Card>
        <FormControl sx={{ mt: 3, minWidth: 120 }}>
          <InputLabel id="language-select-label">{t("language")}</InputLabel>
          <Select
            labelId="language-select-label"
            value={lang}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="fa">فارسی</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
