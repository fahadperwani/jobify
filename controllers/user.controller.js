import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("-refreshToken");

    if (!user || user.password !== password)
      return res
        .status(404)
        .json({ success: false, message: "Invalid Username or Password" });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save();

    user.password = undefined;

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        data: {
          user,
          accessToken,
          refreshToken,
        },
        message: "Login Successful",
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: {
      refreshToken: 1,
    },
  });

  return res.status(200).json({ message: "User Logged Out" });
};

export const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  console.log("incomingRefreshToken", incomingRefreshToken);

  if (!incomingRefreshToken) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Refresh Token" });
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Refresh Token" });
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Refresh token is expired or used" });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    // const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    const accessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;

    await user.save();

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json({
        success: true,
        data: {
          user,
          accessToken,
          refreshToken: newRefreshToken,
        },
        message: "Access Token Refreshed",
      });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error?.message || "Invalid refresh token",
    });
  }
};
