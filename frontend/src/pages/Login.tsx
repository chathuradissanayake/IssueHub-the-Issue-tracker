// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import loginImage from "../assets/login_image.jpg";
import issuehub from "../assets/issuehub.png";

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
      const message = error instanceof Error ? error.message : "Registration failed";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Left — image panel */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden bg-slate-100">
        <img
          src={loginImage}
          alt="IssueHub visual"
          className="object-cover w-full h-full select-none"
        />
        {/* Soft overlay with branding */}
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/40 via-indigo-900/20 to-transparent" />
        <div className="absolute bottom-10 left-10 right-10">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6">
            <p className="text-white font-semibold text-lg mb-1">Track every issue.</p>
            <p className="text-white/70 text-sm">Assign, prioritise, and resolve — all in one clean board.</p>
            {/* Mini stat pills */}
            <div className="flex gap-2 mt-4">
              {[
                { icon: "🔥", label: "Open" },
                { icon: "⚡", label: "In Progress" },
                { icon: "✅", label: "Resolved" },
                { icon: "📦", label: "Closed" },
              ].map((s) => (
                <span key={s.label} className="flex items-center gap-1 bg-white/15 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  {s.icon} {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right — auth panel */}
      <div className="w-full md:w-1/2 flex flex-col items-center  px-6 py-10">
        <div className="w-full max-w-sm">

          {/* Logo + wordmark */}
          <div className="flex flex-col items-center my-4">
            <div className="">
              <img src={issuehub} alt="IssueHub logo" className="h-32 object-contain" />
            </div>
            
          </div>

          {/* Tab toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isLogin
                  ? "bg-white text-sky-600 shadow-sm border border-slate-200"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                !isLogin
                  ? "bg-white text-sky-600 shadow-sm border border-slate-200"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            {isLogin ? (
              <LoginForm onLogin={handleLogin} loading={loading} />
            ) : (
              <RegisterForm onRegister={handleRegister} loading={loading} />
            )}
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-slate-400 mt-6">
            By continuing, you agree to IssueHub's terms of service.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;