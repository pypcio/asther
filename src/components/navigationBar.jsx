import { NavLink, useLocation } from "react-router-dom";

function NavigationBar() {
  const location = useLocation();
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  return (
    <nav style={navStyle} className="mh5">
      <div className="main-page dim f4 fw3 pa1 mb0 white  pointer navlink mv3">
        {location.pathname === "/signIn" ||
        location.pathname === "/register" ? (
          <NavLink to="/">Home</NavLink>
        ) : (
          ""
        )}
      </div>
      <div className="main-page dim f4 fw3 pa1 mb0 white  pointer navlink mv3">
        {location.pathname === "/" ? (
          <NavLink to="user">Sign in</NavLink>
        ) : location.pathname === "/signIn" ? (
          <NavLink to="register">Sign up</NavLink>
        ) : (
          <NavLink to="signIn">Sign in</NavLink>
        )}
      </div>
    </nav>
  );
}
export default NavigationBar;
