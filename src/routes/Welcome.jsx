import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "../features/authSlice";
import { Link } from "react-router-dom";

export default function Welcome() {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  console.log("user", user);
  console.log("token", token);
  return (
    <div>
      <Link to="/user">KURWAAA</Link>
    </div>
  );
}
