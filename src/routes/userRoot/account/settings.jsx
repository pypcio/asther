import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Paper, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import useForm from "../../../features/hooks/useForm";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import validate from "../../../features/others/validateInfo";
import {
  useDeleteUserMutation,
  useUpdateUserPasswordMutation,
} from "../../../features/servises/userApiSlice";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  logOut,
  selectCurrentUser,
} from "../../../features/reduxSlice/authSlice";

function Settings() {
  const navigate = useNavigate();
  const [passwordFocus, setPasswordFocus] = useState(true);
  const [password2Focus, setPassword2Focus] = useState(true);
  const [changePassword] = useUpdateUserPasswordMutation();
  const inputRef = useRef();
  const [deleteUser] = useDeleteUserMutation();
  const { handleChange, inputs, handleValidation, errors } = useForm(validate);
  const [, , removeCookie] = useCookies(["jwt-authorization"]);
  const [, , removeRefreshToken] = useCookies(["jwt-refreshToken"]);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    removeCookie("jwt-authorization");
    removeRefreshToken("jwt-refreshToken");
    dispatch(logOut());
  };
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const onTimeErrors = handleValidation();

    if (
      onTimeErrors.password2 === "success" &&
      onTimeErrors.password === "success"
    ) {
      try {
        // console.log("zmieniam haslo");
        const updateUser = await changePassword({
          password: inputs.password,
          password2: inputs.password2,
        }).unwrap();
        window.alert("password chaged successfully!");
        inputs.password = "";
        inputs.password2 = "";
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDeleteUser = async () => {
    // console.log("wchodze tu");
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (isConfirmed) {
      try {
        const endUser = deleteUser();
        handleLogout();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="panel-settings">
      <div className="f2 fw3 mt6 mh5 mb3">Settings</div>
      <Box className="box-settings">
        <p className="f4 fw7 mt2 mb0 mh3">Set up new password</p>
        <main className="ph4 pt2 black-80 ">
          <form className="measure" onSubmit={handleChangePassword}>
            <fieldset
              id="password-form"
              className="ba b--transparent ph0 mh0 pv0"
            >
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  password
                </label>
                <input
                  className={`pa2 input-reset babg-transparent hover-white focus-black w-100`}
                  type="password"
                  name="password"
                  autoComplete="off"
                  id="password"
                  ref={inputRef}
                  value={inputs.password}
                  onChange={handleChange}
                  required
                  aria-invalid={errors.password === "error" ? "false" : "true"}
                  aria-describedby="uidnote-log"
                  onFocus={() => {
                    handleValidation();
                    setPasswordFocus(true);
                  }}
                  onBlur={() => {
                    setPasswordFocus(false);
                  }}
                />
                <div
                  id="uidnote-log"
                  className={
                    passwordFocus &&
                    inputs.password &&
                    errors.password === "error"
                      ? "instructions"
                      : "offscreen"
                  }
                  // className={"instructions"}
                >
                  <p>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <span>
                      First capital letter <br />
                      Minimum 8 characters <br />
                      At least one special character
                    </span>
                  </p>
                </div>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password2">
                  New Password
                </label>
                <input
                  className={`pa2 input-reset babg-transparent hover-white focus-black w-100`}
                  type="password"
                  name="password2"
                  id="password2"
                  ref={inputRef}
                  value={inputs.password2}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  aria-invalid={errors.password2 === "error" ? "false" : "true"}
                  aria-describedby="uidnote-log"
                  onFocus={() => {
                    handleValidation();
                    setPassword2Focus(true);
                  }}
                  onBlur={() => {
                    setPassword2Focus(false);
                  }}
                />
                <div
                  id="uidnote-log"
                  className={
                    password2Focus &&
                    inputs.password2 &&
                    errors.password2 === "error"
                      ? "instructions"
                      : "offscreen"
                  }
                  // className={"instructions"}
                >
                  <p>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <span>
                      First capital letter <br />
                      Minimum 8 characters
                      <br />
                      At least one special character
                    </span>
                  </p>
                </div>
              </div>
            </fieldset>
            <div>
              <button type="submit">
                <span>Submit</span>
              </button>
            </div>
          </form>
        </main>
        <Paper elevation={3} />
      </Box>
      <Box className="box-settings">
        <p className="f4 fw7 mt2 mb2 mh3">Delete Acccount</p>
        <p className="mt0 mh3 mb2">All your account data will be wiped out</p>
        <div className="mh3 ">
          <button onClick={handleDeleteUser}>
            <span>Delete my account</span>
          </button>
        </div>
        <Paper elevation={3} />
      </Box>
    </div>
  );
}

export default Settings;
