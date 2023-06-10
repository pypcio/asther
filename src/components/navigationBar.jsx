import React from "react";
import { NavLink, useLocation, useNavigation } from "react-router-dom";
import Home from "../routes/home";
// export async function loader({ request, params }) {
//   request.url
//   console.log("tojw url: ", );
//   return
// }
function NavigationBar() {
  const location = useLocation();
  console.log("location: ", location.pathname);
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  // const var1 = {
  //   color: "black",
  // };
  return (
    <nav style={navStyle} className="mh4">
      <NavLink
        className="f4 fw3 pa1 mb0 white  pointer navlink mv3"
        to={location.pathname !== "/" ? "/" : "signIn"}
      >
        {location.pathname === "/" ? (
          <span className="black">Sign in</span>
        ) : location.pathname === "signIn" ? (
          <span className="black">Home</span>
        ) : (
          <span className="black">Home</span>
        )}
      </NavLink>
      <Home />
    </nav>
  );
}
export default NavigationBar;
