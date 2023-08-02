import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="pa4">
      <header className="tc">
        <h1 className="f1 lh-title fw4 o-70 mt4 mb2">
          Welcome to <span className="fw6">Asther</span>
        </h1>
        <p className="f4 o-70 mt2">Your Personal Weather Diary</p>
        <NavLink
          to="register"
          className="f5 link dim br-pill ph3 pv2 mb2 dib white bg-blue"
        >
          Sign Up
        </NavLink>
      </header>
    </div>
  );
};

export default Home;
