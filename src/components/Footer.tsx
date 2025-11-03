import { Box, Typography, IconButton, useTheme } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function Footer() {
  const theme = useTheme();

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
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
        color: theme.palette.text.primary,
        transition: "background-color 0.3s ease",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          component="img"
          src="/imgs/nadinsoft.png"
          alt="nadinsoft"
          sx={{ width: 50 }}
        />
        <Typography variant="body2">
          All rights of this site are reserved for Nadin Sadr Aria Engineering
          Company.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit">
            <MailOutlineIcon />
          </IconButton>
          <Typography variant="body2">contact us : info@nadin.ir</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton color="inherit">
            <CalendarMonthOutlinedIcon />
          </IconButton>
          <Typography variant="body2">
            12:25 · Monday 23 December 2023
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
