import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducer";
import Loading from "../components/Loading";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/NavBar";
import { decodedToken } from "../utils/jwt";
import { axiosInstance } from "../utils/axios";
import axios from "axios";

export const PrivateRoutesLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.global.user);

  useEffect(() => {
    const checkToken = async () => {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);
      if (!accessToken) {
        navigate("/login", { replace: true });
        setLoading(false);
      }
      const token = decodedToken(accessToken);
      console.log("Accesss Tokens ", token);
      if (!token) {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("refreshToken", refreshToken);
        if (refreshToken) {
          axios
            .post(
              process.env.REACT_APP_BACKEND_URI +
                "/api/user/refreshAccessToken",
              {},
              { withCredentials: true }
            )
            .then((res) => {
              if (res.data.data.success) {
                localStorage.setItem("accessToken", res.data.data.accessToken);
                localStorage.setItem(
                  "refreshToken",
                  res.data.data.refreshToken
                );
                axiosInstance.defaults.headers.common["Authorization"] = `
          Bearer ${res.data.data.accessToken}`;
                dispatch(login(res.data.data.user));
              } else {
                navigate("/login", { replace: true });
              }
            })
            .catch(() => {
              navigate("/login", { replace: true });
            });
        } else {
          navigate("/login", { replace: true });
        }
      } else {
        if (!user) {
          console.log("hel");
          dispatch(login(token));
          if (!axiosInstance.defaults.headers.common["Authorization"])
            axiosInstance.defaults.headers.common["Authorization"] = `
          Bearer ${token}`;
        }
        setLoading(false);
      }
    };

    checkToken();
  }, []);
  return loading ? (
    <Loading />
  ) : user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
