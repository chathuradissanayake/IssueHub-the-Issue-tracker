// src/pages/Issues.tsx
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId: string;
  role: string;
  email: string;
  exp: number;
  iat?: number;
}

const Issues = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("JWT Token:", token);

      try {
        const decoded = jwtDecode<JwtPayload>(token);

        console.log("Decoded Token:", decoded);

        // Convert expiry time to readable format
        const expiryDate = new Date(decoded.exp * 1000);

        console.log("Token Expiry Time:", expiryDate.toLocaleString());

        // Optional: time remaining
        const remainingTime = decoded.exp * 1000 - Date.now();
        console.log("Time Remaining (ms):", remainingTime);
      } catch (error) {
        console.error("Invalid token, unable to decode:", error);
      }
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Issue Board 🚀</h1>
    </div>
  );
};

export default Issues;