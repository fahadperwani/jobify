import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducer";
import Loading from "../components/Loading";
import { jwtDecode } from "jwt-decode";

export const PrivateRoutesLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.global.user);

  const decodedToken = (token) => {
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

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = Cookies.get("accessToken");
      console.log("Access Token: ", accessToken);
      const token = decodedToken(accessToken);
      if (accessToken) {
        if (!token) {
          Cookies.remove("accessToken");
          navigate("/login", { replace: true });
          setLoading(false);
        } else {
          if (!user) {
            dispatch(login(token));
          }
          setLoading(false);
        }
      } else {
        navigate("/login", { replace: true });
        setLoading(false);
      }
    };

    checkToken();
  }, [navigate]);
  return loading ? (
    <Loading />
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
