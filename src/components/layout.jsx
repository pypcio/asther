import NavigationBar from "./navigationBar";
import "../style/layout.css";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
function Layout() {
  return (
    <div id="wrap">
      <div id="app">
        <NavigationBar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
