import { User } from "../models/user.model";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user)
      res.status(401).send({ success: false, message: "Invalid access token" });

    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({
        success: false,
        message: error?.message || "Invalid access token",
      });
  }
});
