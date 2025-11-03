import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";

interface LoginProps {
    onLogin: (username: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [name, setName] = useState("");
    const [language, setLanguage] = useState("English");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onLogin(name);
            navigate("/dashboard");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#EAF6FF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                px: 20,
            }}>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    maxWidth: 900,
                    borderRadius: 4,
                    boxShadow: 3,
                    overflow: "hidden",
                }}>
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
                    }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
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
                            mx: 10
                        }}>
                        <TextField
                            label="Enter Your Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ py: 1.2, mt: { md: 10 }, fontWeight: "bold" }}>
                            LOGIN
                        </Button>
                    </Box>
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        bgcolor: "#D8E9F7",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Box display="flex" flexDirection="column" alignItems="center" mx={14}>
                        <Box
                            component="img"
                            src="/imgs/Sun cloud angled rain.png"
                            alt="sunny"
                            sx={{
                                width: { xs: 140, md: 180 }, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))", mb: -5, ml: 10
                            }}
                        />
                        <Box
                            component="img"
                            src="/imgs/Moon cloud mid rain.png"
                            alt="rainy"
                            sx={{
                                width: { xs: 140, md: 180 },
                                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                                ml: -20
                            }}
                        />
                        <Box
                            component="img"
                            src="/imgs/Moon cloud fast wind.png"
                            alt="foggy"
                            sx={{ width: { xs: 140, md: 180 }, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))", mt: -5, ml: 10 }}
                        />
                    </Box>
                </Grid>
            </Card>

            <Card sx={{ width: "90%", maxWidth: 800, p: 2, boxShadow: 0, bgcolor: "#EAF6FF", display: "flex", justifyContent: "center" }}>
                <CardContent>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Language</InputLabel>
                        <Select
                            value={language}
                            label="Language"
                            onChange={(e) => setLanguage(e.target.value)}>
                            <MenuItem value="English">English</MenuItem>
                            <MenuItem value="فارسی">فارسی</MenuItem>
                        </Select>
                    </FormControl>
                </CardContent>
            </Card>
        </Box>

    );
}
