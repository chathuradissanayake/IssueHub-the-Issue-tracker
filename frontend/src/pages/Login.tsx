// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true); // Toggle state for forms
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);

      const { data } = await loginUser({ email, password });

      localStorage.setItem("token", data.token);

      navigate("/issueboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    try {
      setLoading(true);

      await registerUser({ email, password });

      alert("Registration successful! Please log in.");
      setIsLogin(true); // Switch to login form after successful registration
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div >
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`w-1/2 p-2 rounded-tl-xl ${
              isLogin ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`w-1/2 p-2 rounded-tr-xl ${
              !isLogin ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          <LoginForm onLogin={handleLogin} loading={loading} />
        ) : (
          <RegisterForm onRegister={handleRegister} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default Login;