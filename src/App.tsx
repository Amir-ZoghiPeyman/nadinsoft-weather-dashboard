import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";

export default function App() {
  const handleLogin = (username: string) => {
    localStorage.setItem("username", username);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/login" element={<Login onLogin={handleLogin} />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}
