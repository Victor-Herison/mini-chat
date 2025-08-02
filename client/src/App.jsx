import React from "react";
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";


import Chat from "./pages/Chat";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Chat />} />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </BrowserRouter>
  );
}
