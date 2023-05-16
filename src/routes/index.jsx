import astherLogo from "../assets/logo-5.svg";
export default function Index() {
  return (
    <div id="zero-state">
      <h1>Asther</h1>
      <p>Your Personal Weather Diary</p>
      <img src={astherLogo} className="logo" alt="Asther logo" />
    </div>
  );
}
