// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import loginImage from "../assets/login_image.png";
import issuehub from "../assets/issuehub.png"; // Import the logo image

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
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
      setIsLogin(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Registration failed";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br ">
      {/* Left Image */}
      <div className="hidden md:block w-1/2 relative">
        <img
          src={loginImage}
          alt="login"
          className="object-cover w-full h-full select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/30" />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex  justify-center p-6">
        <div>
        {/* Logo */}
          <div className="flex justify-center my-6">
            <img src={issuehub} alt="login" className="h-32" />
          </div>
          <div>

            <h2 className="text-4xl font-sans text-cyan-800 mb-6 text-center">
              IssueHub
            </h2>
            
          </div>

          {/* Toggle */}
          <div className="flex mb-6 bg-gray-100 rounded-xl ">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-2 rounded-lg text-sm font-medium transition ${
                isLogin ? "bg-cyan-600 text-white shadow" : "text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-2 rounded-lg text-sm font-medium transition ${
                !isLogin ? "bg-cyan-600 text-white shadow" : "text-gray-600"
              }`}
            >
              Register
            </button>
          </div>
        <div className="w-full max-w-md backdrop-blur-lg shadow-xl rounded-2xl p-6">
          

          

          {isLogin ? (
            <LoginForm onLogin={handleLogin} loading={loading} />
          ) : (
            <RegisterForm onRegister={handleRegister} loading={loading} />
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;