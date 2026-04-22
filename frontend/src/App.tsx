import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import IssueBoard from "./pages/IssueBoard";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/issueboard" element={<ProtectedRoute><IssueBoard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;