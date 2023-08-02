import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../features/reduxSlice/authSlice";
import { useCookies } from "react-cookie";
const settings = ["Profile", "Settings", "Logout"];

export default function Index() {
  const [, , removeCookie] = useCookies(["jwt-authorization"]);
  const [, , removeRefreshToken] = useCookies(["jwt-refreshToken"]);
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
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
    <div id="detail-index" className="mh5 mv4">
      <Link className="upper-logo  ph4 dim" to="/">
        ASTHER
      </Link>
      <div>
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
    </div>
  );
}
