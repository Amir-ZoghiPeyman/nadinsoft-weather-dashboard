import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NoMatch from "./pages/NoMatch";
import Layout from "./layout/Layout";

export default function App() {
  const handleLogin = (username: string) => {
    localStorage.setItem("username", username);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route index element={<Navigate to="/login" />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}
