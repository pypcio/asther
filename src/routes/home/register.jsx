import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../features/servises/authApiSlice";
import { useState } from "react";
import useForm from "../../features/hooks/useForm";
import validate from "../../features/others/validateInfo";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";

function Register() {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const inputRef = useRef();
  const [loginFocus, setLoginFocus] = useState(true);
  const [passwordFocus, setPasswordFocus] = useState(true);
  const [emailFocus, setEmailFocus] = useState(true);
  const { handleChange, inputs, handleValidation, errors } = useForm(validate);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const onTimeErrors = handleValidation();
    if (
      onTimeErrors.login === "success" &&
      onTimeErrors.password === "success" &&
      onTimeErrors.email === "success"
    ) {
      try {
        const userData = await registerUser({
          login: inputs.login,
          password: inputs.password,
          email: inputs.email,
        }).unwrap();
        navigate("/user");
      } catch (error) {
        console.log(error);
      }
    }
  };
  // console.log("login", login);
  return (
    <article className="mt3 mb-auto br3 ba shadow-5 b--black-20  w-100 w-50-m w-25-l mw center fade-in">
      <main id="register-form" className="pa4 black-80">
        <form onSubmit={handleSubmit} className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mt2">
              <label className="db fw6 lh-copy f6" htmlFor="login">
                Login
              </label>
              <input
                className={`pa2 input-reset ba b--black bg-transparent hover-bg-light-blue hover-white w-100 ${errors.login} ? "error" : "success"`}
                type="text"
                name="login"
                id="login"
                autoComplete="off"
                ref={inputRef}
                value={inputs.login}
                onChange={handleChange}
                required
                aria-invalid={errors.login === "error" ? "false" : "true"}
                aria-describedby="uidnote-log"
                onFocus={() => {
                  handleValidation();
                  setLoginFocus(true);
                }}
                onBlur={() => {
                  setLoginFocus(false);
                }}
              />
              <div
                id="uidnote-log"
                className={
                  loginFocus && inputs.login && errors.login === "error"
                    ? "instructions"
                    : "offscreen"
                }
              >
                <p>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>
                    3 to 12characters. <br />
                    Best to start with capital letter <br />
                  </span>
                </p>
              </div>
            </div>
            <div className="mt2">
              <label className="db fw6 lh-copy f6" htmlFor="email">
                Email
              </label>
              <input
                className={`pa2 input-reset ba b--black bg-transparent hover-bg-light-blue hover-white w-100 ${errors.email} ? "error" : "success"`}
                type="email"
                name="email"
                id="email"
                value={inputs.email}
                onChange={handleChange}
                autoComplete="off"
                required
                aria-invalid={errors.email === "error" ? "false" : "true"}
                aria-describedby="uidnote-log"
                onFocus={() => {
                  handleValidation();
                  setEmailFocus(true);
                }}
                onBlur={() => {
                  setEmailFocus(false);
                }}
              />
              <div
                id="uidnote-log"
                className={
                  emailFocus && inputs.email && errors.email === "error"
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
            <div className="mt2">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className={`b pa2 input-reset ba b--black bg-transparent hover-bg-light-blue hover-white w-100 ${errors.password} ? "error" : "success"`}
                type="password"
                name="password"
                id="password"
                value={inputs.password}
                onChange={handleChange}
                autoComplete="off"
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
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="register"
            />
          </div>
          <div className="lh-copy mt3 flex justify-center ">
            <p className="black flex items-center ph3 f5">
              Already have account?
            </p>
            <Link
              to="/signIn"
              className="flex items-center b ph3 pv2 input-reset bg-transparent grow pointer f6  dim"
            >
              <span className="black fw5">Login</span>
            </Link>
          </div>
        </form>
      </main>
    </article>
  );
}

export default Register;
