import { NavLink, useLocation } from "react-router-dom";
// import Home from "../routes/home";
// export async function loader({ request, params }) {
//   request.url
//   console.log("tojw url: ", );
//   return
// }
function NavigationBar() {
  const location = useLocation();
  // console.log("location: ", location.pathname);
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };
  return (
    <nav style={navStyle} className="mh5">
      <NavLink
        className="f4 fw3 pa1 mb0 white  pointer navlink mv3"
        to={"user"}
      >
        {location.pathname === "/" ? (
          <span className="black">Sign in</span>
        ) : location.pathname === "signIn" ? (
          <span className="black">Home</span>
        ) : (
          <span className="black">Home</span>
        )}
      </NavLink>
      <div className="main-page">
        <NavLink to="/">ASTHER</NavLink>
      </div>
    </nav>
  );
}
export default NavigationBar;
