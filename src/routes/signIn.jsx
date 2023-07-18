import {
  Form,
  Link,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/authSlice";
import { useLoginMutation } from "../APIs/authApiSlice";

//context
//submitting form
// export const action =
//   (setAuth) =>
//   async ({ request, params }) => {
//     const formData = await request.formData();
//     const update = Object.fromEntries(formData);
//     const login = await userServises.logIn(update);
//     console.log("login: ", login);
//     setAuth(login);
//     return redirect("/user");
//   };

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [data, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await data({ login, password }).unwrap();
      dispatch(setCredentials({ ...userData, login }));
      setLogin("");
      setPassword("");
      console.log("co to jest: ", userData);
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("loading...", isLoading);
  return (
    <article
      className={`br3 ba shadow-5 b--black-20 mv4 w-100 w-50-m w-25-l mw center fade-in`}
    >
      <main className="pa4 black-80">
        <form className="measure" onSubmit={handleSubmit}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="login">
                Login
              </label>
              <input
                className="pa2 input-reset ba b--black bg-transparent hover-white w-100"
                type="text"
                name="login"
                autoComplete="off"
                id="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba b--black bg-transparent hover-white w-100"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
