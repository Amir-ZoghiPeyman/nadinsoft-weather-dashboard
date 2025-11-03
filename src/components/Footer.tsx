import { Box, Typography, IconButton } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function Footer() {
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
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          component="img"
          src="../../public/imgs/nadinsoft.png"
          alt="nadinsoft"
          sx={{
            width: 50,
          }}
        />
        <Typography variant="body2" color="#003464">
          All rights of this site are reserved for Nadin Sadr Aria Engineering
          Company.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ color: "#BBC1C4" }}>
            <MailOutlineIcon sx={{ color: "#003464" }} />
          </IconButton>
          <Typography variant="body2" color="#003464" sx={{ mt: 0.5 }}>
            contact us : info@nadin.ir
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ color: "#BBC1C4" }}>
            <CalendarMonthOutlinedIcon sx={{ color: "#003464" }} />
          </IconButton>
          <Typography variant="body2" color="#003464" sx={{ mt: 0.5 }}>
            12:25 . Monday 23 December 2023
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
