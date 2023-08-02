import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/reduxSlice/authSlice";
import { useLoginMutation } from "../../features/servises/authApiSlice";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import validate from "../../features/others/validateInfo";
import useForm from "../../features/hooks/useForm";
import { useRef } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
function SignIn() {
  const navigate = useNavigate();
  const [data] = useLoginMutation();
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [loginFocus, setLoginFocus] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(true);
  const [, setToken] = useCookies(["jwt-authorization"]);
  const [, setRefreshToken] = useCookies(["jwt-refreshToken"]);
  const { handleChange, inputs, handleValidation, errors } = useForm(validate);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const onTimeErrors = handleValidation();
    if (
      onTimeErrors.login === "success" &&
      onTimeErrors.password === "success"
    ) {
      try {
        const userData = await data({
          login: inputs.login,
          password: inputs.password,
        }).unwrap();
        const decodeToken = jwt_decode(userData.token);
        const decodeRefreshToken = jwt_decode(userData.refreshToken);
        dispatch(setCredentials({ ...userData }));
        setToken("jwt-authorization", userData.token, {
          expires: new Date(decodeToken.exp * 1000),
        });
        setRefreshToken("jwt-refreshToken", userData.refreshToken, {
          expires: new Date(decodeRefreshToken.exp * 1000),
        });

        navigate("/user");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <article
      className={`br3 ba shadow-5 b--black-20 mt4 mb3 w-100 w-50-m w-25-l mw center fade-in`}
    >
      <main id="login-form" className="pa4 black-80 ">
        <form className="measure" onSubmit={handleSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="login">
                Login
              </label>
              <input
                className={`pa2 input-reset babg-transparent hover-white focus-black w-100 ${errors.login} ? "error" : "success"`}
                type="text"
                name="login"
                autoComplete="off"
                id="login"
                ref={inputRef}
                value={inputs.login}
                onChange={handleChange}
                required
                aria-invalid={errors.login === "error" ? "false" : "true"}
                aria-describedby="uidnote-login"
                onFocus={() => {
                  handleValidation();
                  setLoginFocus(true);
                }}
                onBlur={() => {
                  setLoginFocus(false);
                }}
              />
              <div
                id="uidnote-loginin"
                className={
                  loginFocus && inputs.login && errors.login === "error"
                    ? "instructions"
                    : "offscreen"
                }
              >
                <p>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>
                    3 to 12 characters. <br />
                    Best to start with capital letter <br />
                  </span>
                </p>
              </div>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className={`b pa2 input-reset ba  bg-transparent hover-white w-100 ${errors.password} ? "error" : "success"`}
                type="password"
                name="password"
                id="password"
                value={inputs.password}
                onChange={handleChange}
                autoComplete="off"
                required
                aria-invalid={errors.password === "error" ? "false" : "true"}
                aria-describedby="uidnote-login"
                onFocus={() => {
                  // handleValidation();
                  setPasswordFocus(true);
                }}
                onBlur={() => {
                  setPasswordFocus(false);
                }}
              />
              <div
                id="uidnote-login"
                className={
                  passwordFocus &&
                  inputs.password &&
                  errors.password === "error"
                    ? "instructions"
                    : "offscreen"
                }
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
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3 flex justify-center ">
            <p className="black flex items-center ph3 f5">New here?</p>
            <Link
              to="/register"
              className="flex items-center b ph3 pv2 input-reset bg-transparent grow pointer f6  dim"
            >
              <span className="black fw5">Register</span>
            </Link>
          </div>
        </form>
      </main>
    </article>
  );
}

export default SignIn;
