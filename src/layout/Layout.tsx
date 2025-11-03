import { Outlet } from "react-router";
import { Box } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";

export default function Layout({}) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Outlet />
      <Footer />
    </Box>
  );
}
