import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  selectCurrentToken,
  selectRefreshToken,
} from "../../../features/reduxSlice/authSlice";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { decodeToken } from "../../../features/others/decodeToken";

function RequireAuth() {
  const token = useSelector(selectCurrentToken);
  const refreshToken = useSelector(selectRefreshToken);
  const [, , removeCookie] = useCookies(["jwt-authorization"]);
  const [, , removeRefreshCookie] = useCookies(["jwt-refreshToken"]);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isVerificationComplete, setIsVerificationComplete] = useState(false);

  useEffect(() => {
    const validateToken = async (tokenToValidate, cookieName) => {
      const currentTime = Date.now();
      if (tokenToValidate) {
        try {
          const decode = await decodeToken(tokenToValidate);
          return decode.exp * 1000 > currentTime;
        } catch (error) {
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
  }, [token, refreshToken]);
  const location = useLocation();

  if (!isVerificationComplete) {
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
