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

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // generate OTP
    const otp = generateOtp();

    // 2 minute expiry
    const otpExpiry = new Date(
      Date.now() + 2 * 60 * 1000
    );

    let user = existingUser;

    // create user
    if (!user) {
      user = await User.create({
        email,
        password: hashedPassword,
        picture,
        role: "user",
        otp,
        otpExpiry,
        isVerified: false,
      });
    } else {
        // update existing unverified user
        user.password = hashedPassword;
        user.picture = picture;
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();
      }

    // send OTP email
    await sendOtpEmail(email, otp);

    res.status(200).json({
      message: "OTP sent successfully",
      email,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// VERIFY OTP
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({message: "User not found",});
}

    // invalid OTP
    if (user.otp !== otp) {
      return res.status(400).json({message: "Invalid OTP",});
    }

    // expired OTP
    if (!user.otpExpiry ||user.otpExpiry < new Date()) {
      return res.status(400).json({message: "OTP expired",});
    }

    // verify user
    user.isVerified = true;

    // clear OTP fields
    user.otp = undefined;

    user.otpExpiry = undefined;

    await user.save();

    // generate token
    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    res.status(200).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "OTP verification failed",});
  }
};


// RESEND OTP
export const resendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({email,});

    if (!user) {
      return res.status(400).json({message: "User not found",});
    }

    // generate new OTP
    const otp = generateOtp();

    user.otp = otp;

    user.otpExpiry = new Date(
      Date.now() + 2 * 60 * 1000
    );

    await user.save();

    // send new OTP
    await sendOtpEmail(email, otp);
    res.status(200).json({message: "OTP resent successfully",});

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Failed to resend OTP",});
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

    const isMatch = await bcrypt.compare(password, user.password);

    // prevent unverified login
    if (!user.isVerified && isMatch) {
      
      const otp = generateOtp();
      user.otp = otp;

      user.otpExpiry = new Date(Date.now() + 2 * 60 * 1000);

      await user.save();
      await sendOtpEmail(user.email, otp);
      return res.status(403).json({
        requiresOtp: true,
        email: user.email,
        message:
          "Email not verified. OTP sent.",
      });
    }   

    // check password
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