import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  selectCurrentToken,
  selectCurrentUser,
  selectRefreshToken,
} from "../../../features/reduxSlice/authSlice";
import * as jose from "jose";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

function RequireAuth() {
  const token = useSelector(selectCurrentToken);
  const refreshToken = useSelector(selectRefreshToken);
  const user = useSelector(selectCurrentUser);
  // console.log("user:", user);
  const [, , removeCookie] = useCookies(["jwt-authorization"]);
  const [, , removeRefreshCookie] = useCookies(["jwt-refreshToken"]);
  const currentTime = Date.now();
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);
  const secret = new TextEncoder().encode(
    import.meta.env.VITE_REACT_APP_VERIFY_TOKEN
  );

  useEffect(() => {
    const validateToken = async (tokenToValidate, cookieName) => {
      if (tokenToValidate) {
        try {
          const decode = await jose.jwtVerify(tokenToValidate, secret);
          return decode.payload.exp * 1000 > currentTime;
        } catch (error) {
          // Token is invalid or couldn't be verified
          console.log("error");
          if (cookieName === "jwt-authorization") {
            removeCookie("jwt-authorization");
          } else if (cookieName === "jwt-refreshToken") {
            removeRefreshCookie("jwt-refreshToken");
          }
          return false;
        }
      }
      return false;
    };

    const checkTokenValidity = async () => {
      const tokenValid = await validateToken(token, "jwt-authorization");
      const refreshTokenValid = await validateToken(
        refreshToken,
        "jwt-refreshToken"
      );
      setIsTokenValid(tokenValid || refreshTokenValid);
      setIsVerificationComplete(true);
    };

    checkTokenValidity();
  }, [
    token,
    refreshToken,
    removeCookie,
    removeRefreshCookie,
    currentTime,
    secret,
  ]);

  const location = useLocation();

  if (!isVerificationComplete) {
    // Render a loading state while verification is in progress
    return (
      <div className="loading-screen">
        <Box sx={{ display: "flex" }}>
          <CircularProgress style={{ height: "5rem", width: "5rem" }} />
        </Box>
      </div>
    );
  }
  return isTokenValid ? (
    <Outlet />
  ) : (
    <Navigate to="/signIn" state={{ from: location }} replace />
  );
}

export default RequireAuth;
