import { Navigate } from "react-router-dom";

function SuccessReg({ isAllowed, handlePermission }) {
  if (isAllowed) {
    handlePermission(false);
    return <div>tekst i tak dalej</div>;
  } else {
    return <Navigate to={"/"} replace />;
  }
}

export default SuccessReg;
