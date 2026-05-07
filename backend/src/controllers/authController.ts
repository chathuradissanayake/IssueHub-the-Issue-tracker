import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateToken } from "../utils/jwt";
import { generateOtp } from "../utils/generateOtp";
import { sendOtpEmail } from "../utils/sendOtpEmail";

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, picture } = req.body;

    const existingUser = await User.findOne({ email });

    // if user already verified → block
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 min

    let user;

    if (!existingUser) {
      user = await User.create({
        email,
        password: hashedPassword,
        picture,
        role: "user",
        isVerified: false,
        otp,
        otpExpiry,
      });
    } else {
      existingUser.password = hashedPassword;
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;
      await existingUser.save();
      user = existingUser;
    }

    await sendOtpEmail(email, otp);

    return res.status(200).json({
      message: "OTP sent to email",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
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


export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry! < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return res.json({ message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};