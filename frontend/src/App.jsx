import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

function PrivateRoute({ children, isLoggedIn }) {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function GuestRoute({ children, isLoggedIn }) {
  return !isLoggedIn ? children : <Navigate to="/" replace />;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Boolean(localStorage.getItem("token"))
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <GuestRoute isLoggedIn={isLoggedIn}>
              <Login onLogin={() => setIsLoggedIn(true)} />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute isLoggedIn={isLoggedIn}>
              <Signup onLogin={() => setIsLoggedIn(true)} />
            </GuestRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Home onLogout={() => setIsLoggedIn(false)} />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
