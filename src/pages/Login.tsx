import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  CssBaseline,
  useTheme,
} from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";

interface LoginProps {
  onLogin: (username: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const { mode } = useThemeContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name before logging in.");
      return;
    }
    setError("");
    onLogin(name);
    localStorage.setItem("username", name);
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
          px: 20,
          transition: "background-color 0.3s ease",
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
          {/* فرم لاگین */}
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
              Login
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
                label="Enter Your Name"
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
                LOGIN
              </Button>
            </Box>
          </Grid>

          {/* تصاویر سمت راست با استایل اصلی */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              bgcolor: "#D8E9F7",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mx={14}
            >
              <Box
                component="img"
                src="/imgs/Sun cloud angled rain.png"
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
                src="/imgs/Moon cloud mid rain.png"
                alt="rainy"
                sx={{
                  width: { xs: 140, md: 180 },
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                  ml: -20,
                }}
              />
              <Box
                component="img"
                src="/imgs/Moon cloud fast wind.png"
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
      </Box>
    </>
  );
}
