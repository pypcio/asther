import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { convertedDate } from "../../../features/others/functions";
import { useGetUserDataQuery } from "../../../features/servises/userApiSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../features/reduxSlice/authSlice";
import { useCookies } from "react-cookie";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { FaRegUserCircle } from "react-icons/fa";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
const settings = ["Profile", "Settings", "Logout"];

export default function WeatherRoot() {
  const [, , removeCookie] = useCookies(["jwt-authorization"]);
  const [, , removeRefreshToken] = useCookies(["jwt-refreshToken"]);
  const dispatch = useDispatch();
  const { weatherId } = useParams();
  const { data: weather = [], isLoading } = useGetUserDataQuery(weatherId, {
    skip: !weatherId, // Skip the query if weatherId is not available
    refetchOnMountOrArgChange: true,
  });
  const location = useLocation();
  const [currentFocus, setCurrentFocus] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  // console.log("weatherRoot: ", weather);
  useEffect(() => {
    location.pathname === `/user/${weatherId}`
      ? setCurrentFocus(true)
      : setCurrentFocus(false);
  }, [location.pathname]);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    removeCookie("jwt-authorization");
    removeRefreshToken("jwt-refreshToken");
    dispatch(logOut());
  };
  return (
    <main id="detail-main">
      {!isLoading ? (
        <section id="mainDisplay">
          <div id="weather">
            <div>
              <Link to={`edit`}>
                <h3 className="dim">{weather.location.city || `City`}</h3>
              </Link>
              <h4>
                {convertedDate(
                  weather.location.current.dt + weather.location.timezone_offset
                )}
              </h4>
              <Link to="/">
                <h4 className="dim">ASTHER</h4>
              </Link>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  id="user-settings"
                >
                  <FaRegUserCircle />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    {setting === "Profile" ? (
                      <NavLink to={`/panel/${setting.toLowerCase()}`}>
                        {setting}
                      </NavLink>
                    ) : setting === "Settings" ? (
                      <NavLink to={`/panel/${setting.toLowerCase()}`}>
                        {setting}
                      </NavLink>
                    ) : (
                      <NavLink onClick={handleLogout}>{setting}</NavLink>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <div id="linki-pogodowe">
              <p>
                <Link className={currentFocus ? "active" : ""} to={""}>
                  Current
                </Link>
              </p>
              <p>
                <NavLink to={`hourly`}>Hourly</NavLink>
              </p>
              <p>
                <NavLink to={`daily`}>Daily</NavLink>
              </p>
            </div>
          </div>
          <div id="weather-template">
            <Outlet />
          </div>
        </section>
      ) : (
        <div id="loading-weather-root">
          <div className="skeleton-display">
            <Stack spacing={1}>
              <div id="skeleton-nav">
                <Skeleton variant="rectangular" width={100} height={"2rem"} />
                <Skeleton variant="rectangular" width={300} height={"2rem"} />
              </div>
              <div id="skeleton-buttons">
                <Skeleton
                  variant="rectangular"
                  width={"5rem"}
                  height={"2rem"}
                />
                <Skeleton
                  variant="rectangular"
                  width={"5rem"}
                  height={"2rem"}
                />
                <Skeleton
                  variant="rectangular"
                  width={"5rem"}
                  height={"2rem"}
                />
              </div>
              <Skeleton variant="text" sx={{ fontSize: "0.1rem" }} />
              <Skeleton variant="rectangular" width={"auto"} height={120} />
            </Stack>
          </div>
        </div>
      )}
    </main>
  );
}
