import { User } from "../models/user.model.js";

export const login = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("-refreshToken");

    console.log(user);

    if (!user || user.password !== password)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

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
    res.status(500).json({ success: false, message: error.message });
  }
};
