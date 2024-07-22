import { jwtDecode } from "jwt-decode";

export const decodedToken = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) return null;
    return decodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};
