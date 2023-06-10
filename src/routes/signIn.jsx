import React from "react";
import { Form, Link, redirect } from "react-router-dom";

export async function action({ request, params }) {
  console.log("odpala?");
  const formData = await request.formData();
  const update = Object.fromEntries(formData);
  console.log(update);
  return redirect("/");
}
function SignIn() {
  return (
    <article className="br3 ba shadow-5 b--black-20 mv4 w-100 w-50-m w-25-l mw center">
      <main className="pa4 black-80">
        <Form method="post" className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba b--black bg-transparent hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
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
            <p className="black flex items-center ph3">New here?</p>
            <Link
              to="/register"
              className="flex items-center b ph3 pv2 input-reset bg-transparent grow pointer f6  dim"
            >
              <span className="black fw5">Register</span>
            </Link>
          </div>
        </Form>
      </main>
    </article>
  );
}

export default SignIn;
