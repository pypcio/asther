import "../../../style/profile.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../features/reduxSlice/authSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../features/reduxSlice/authSlice";
import { useCookies } from "react-cookie";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
function stringToColor(string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name}`,
  };
}
function PanelRoot() {
  const [, , removeCookie] = useCookies(["jwt-authorization"]);
  const [, , removeRefreshToken] = useCookies(["jwt-refreshToken"]);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeCookie("jwt-authorization");
    removeRefreshToken("jwt-refreshToken");
    dispatch(logOut());
  };
  const name = `${user.name}`;
  return (
    <>
      <div id="sidebar-panel">
        <div id="profile-details">
          <Stack direction="row" spacing={2}>
            <Avatar alt={`${name}`} {...stringAvatar(`${name}`)} />
          </Stack>
          <p>Welcome</p>
          <p className="fw6">{name}</p>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/user">
                <span className="fw5">Weather</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/panel/profile">
                <span>Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/panel/settings">
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <Link onClick={handleLogout}>
                <span>Log out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail-panel">
        <Outlet />
      </div>
    </>
  );
}
export default PanelRoot;
