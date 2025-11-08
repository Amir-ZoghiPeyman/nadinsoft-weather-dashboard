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

  const contrastColor = theme.palette.getContrastText(
    theme.palette.mode === "light" ? "#BBDEFB" : "#1976D2"
  );

  const flexCenterGap = (gap: number | string = 1) => ({
    display: "flex",
    alignItems: "center",
    gap,
  });

  const footerItems = [
    { icon: <MailOutlineIcon fontSize="small" />, label: t("contact") },
    { icon: <CalendarMonthOutlinedIcon fontSize="small" />, label: t("date") },
  ];

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
        flexDirection: { xs: "column", sm: "row" },
        gap: { xs: 1, sm: 0 },
        background: gradientBg,
        color: contrastColor,
        transition: "background 0.4s ease",
        direction: lang === "fa" ? "rtl" : "ltr",
        boxShadow: "0 -2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {/* Logo & Description */}
      <Box sx={flexCenterGap(2)}>
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

      {/* Email & Date */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {footerItems.map((item, idx) => (
          <Box key={idx} sx={flexCenterGap(0.5)}>
            <IconButton color="inherit" size="small">
              {item.icon}
            </IconButton>
            <Typography variant="body2">{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
