// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Issues from "./pages/Issues";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/issues" element={<ProtectedRoute><Issues /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;