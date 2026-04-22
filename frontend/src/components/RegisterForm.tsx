// src/components/RegisterForm.tsx
import { useState } from "react";

interface RegisterFormProps {
  onRegister: (email: string, password: string) => Promise<void>;
  loading: boolean;
}

const RegisterForm = ({ onRegister, loading }: RegisterFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = () => {
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    onRegister(email, password);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-80">
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

      <input
        className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Re-type Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default RegisterForm;