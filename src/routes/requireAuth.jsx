import { Outlet, Navigate, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "../features/authSlice";

function RequireAuth() {
  const token = useSelector(selectCurrentToken);
  // const user = useSelector(selectCurrentUser);
  // console.log("current user: ", user?.name, user?.id);
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/signIn" state={{ from: location }} replace />
  );
}

export default RequireAuth;
