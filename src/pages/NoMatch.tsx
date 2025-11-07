import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function NoMatch() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const isFa = i18n.language === "fa";

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
        direction: isFa ? "rtl" : "ltr",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontWeight: "bold", fontSize: "6rem", mb: 1 }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {t("notFound.title")}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        {t("notFound.message")}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate("/")}>
        {t("notFound.goHome")}
      </Button>
    </Box>
  );
}
