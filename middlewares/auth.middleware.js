import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  console.log(req.body);
  console.log("Cookie", req.header("Authorization"));
  try {
    console.log(req.body);
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid access token" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded: ", decodedToken);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid access token" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: error?.message || "Invalid access token",
    });
  }
};
