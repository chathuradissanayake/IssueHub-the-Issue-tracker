import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

// Connect to the database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));