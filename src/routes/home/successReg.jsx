import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { selectRole } from "../../features/reduxSlice/protetedSlice";
import { useDispatch, useSelector } from "react-redux";
import { setRole, eraseRole } from "../../features/reduxSlice/protetedSlice";
import { useEffect } from "react";
import { Paper, Box } from "@mui/material";
import { selectCurrentUser } from "../../features/reduxSlice/authSlice";
function SuccessReg() {
  const navigate = useNavigate();
  const role = useSelector(selectRole);
  const user = useSelector(selectCurrentUser);
  console.log(user);
  console.log(role);
  const dispatch = useDispatch();
  const handleChange = () => {
    dispatch(eraseRole());
    navigate("/");
  };
  useEffect(() => {
    if (role !== "registered") {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex justify-center center flex-column w-70 mt5  mh-auto">
      <Box id="reg-1" className="box-settings">
        <div className="f2 fw4  mh5 mb3 mt2 ">Registration Successful!</div>
        <p className="f5 fw4 mt2 mb3 mb0 mh3">
          You are now a member of our community.
          <br /> Feel free to explore and enjoy your experience
        </p>
        <Paper elevation={3} />
        <NavLink
          to="signIn"
          className="flex justify-center center f5 link dim br-pill ph4 pv2 mb2 dib white bg-blue w-6rem h-2rem"
          onClick={handleChange}
        >
          Login
        </NavLink>
      </Box>
    </div>
  );
}

export default SuccessReg;
