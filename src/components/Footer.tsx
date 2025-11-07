import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { lang } = useLanguage();

  const gradientBg =
    theme.palette.mode === "light"
      ? "linear-gradient(90deg, #F3FAFE, #CCDDDD9E 61.96%, #F3FAFE)"
      : "linear-gradient(90deg, #292F45, #3F4861, #151D32)";

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        background: gradientBg,
        color: theme.palette.getContrastText(
          theme.palette.mode === "light" ? "#BBDEFB" : "#1976D2"
        ),
        transition: "background 0.4s ease",
        direction: lang === "fa" ? "rtl" : "ltr",
        boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          component="img"
          src="/imgs/nadinsoft.png"
          alt="nadinsoft"
          sx={{ width: 50 }}
        />
        <Typography variant="body2" fontWeight={500}>
          {t("rights")}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton color="inherit" size="small">
            <MailOutlineIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{t("contact")}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton color="inherit" size="small">
            <CalendarMonthOutlinedIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{t("date")}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
