import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NoMatch from "./pages/NoMatch";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* ProtectedRoute for more security */}
          <Route path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          {/* NoMatch page for unavailable pages */}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
