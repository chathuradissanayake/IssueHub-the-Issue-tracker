// controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, picture } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      email,
      password: hashedPassword,
      picture,
      role: "user", 
    });

    // generate token with payload
    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        picture: user.picture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token with payload
    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        picture: user.picture,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};