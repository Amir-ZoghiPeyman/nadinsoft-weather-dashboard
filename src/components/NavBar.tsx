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
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { blue } from "@mui/material/colors";

interface NavbarProps {
    onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>("");

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const res = await axios.get("https://countriesnow.space/api/v0.1/countries");
                const iran = res.data.data.find((c: any) => c.country === "Iran");
                setCities(iran?.cities.slice(0, 10) || []);
            } catch (err) {
                console.error("Error fetching cities:", err);
            }
        };
        fetchCities();
    }, []);

    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between", backgroundColor: "white" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                        component="img"
                        src="../../public/imgs/weather.png"
                        alt="weather logo"
                        sx={{
                            width: 50, borderRadius: 9999
                        }}
                    />

                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#003464" }}>
                        Weather Dashboard
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <FormControl size="small" sx={{ minWidth: 150, backgroundColor: "white", borderRadius: 1 }}>
                        <InputLabel id="city-label">City</InputLabel>
                        <Select
                            labelId="city-label"
                            value={selectedCity}
                            label="City"
                            onChange={(e) => setSelectedCity(e.target.value)}
                        >
                            {cities.map((city) => (
                                <MenuItem key={city} value={city}>
                                    {city}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <IconButton sx={{ color: "#BBC1C4" }} onClick={handleMenuOpen}>
                        <SettingsIcon />
                    </IconButton>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <Box sx={{ px: 2, py: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography variant="subtitle2">Language</Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button variant="outlined" size="small">FA</Button>
                                <Button variant="outlined" size="small">EN</Button>
                            </Box>

                            <Typography variant="subtitle2" sx={{ mt: 1 }}>
                                Theme
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                <Button variant="outlined" size="small">Light</Button>
                                <Button variant="outlined" size="small">Dark</Button>
                            </Box>

                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                sx={{ mt: 2 }}
                                onClick={() => {
                                    handleMenuClose();
                                    onLogout();
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
