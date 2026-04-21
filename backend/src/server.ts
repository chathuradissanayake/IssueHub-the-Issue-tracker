import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import issueRoutes from "./routes/issueRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

// Connect to the database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));