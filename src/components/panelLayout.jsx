import { Outlet } from "react-router-dom";
function PanelLayout() {
  return (
    <div id="panel-layout">
      <Outlet />
    </div>
  );
}
export default PanelLayout;
