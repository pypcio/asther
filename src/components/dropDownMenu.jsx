import { Link, useNavigate, useParams } from "react-router-dom";

import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { useDeleteUserDataMutation } from "../features/servises/userApiSlice";

function DropDownMenu({ id }) {
  // console.log("nowe id", id);
  const navigate = useNavigate();
  const { weatherId } = useParams();
  // console.log("id", id);
  const [deleteUserData] = useDeleteUserDataMutation();
  const handleDeleteLocation = async (e) => {
    e.preventDefault();
    try {
      const response = deleteUserData(id);
      if (`${id}` === `${weatherId}`) {
        navigate("/user");
      }
    } catch (error) {
      console.log("nie udalo sie usunac", error);
    }
  };
  return (
    <div className="dropdown">
      <ul>
        <li>
          <Link to={`/user/${id}/edit`}>
            <AiOutlineEdit /> <span>Edit</span>
          </Link>
        </li>
        <li>
          <form onSubmit={handleDeleteLocation}>
            <button type="submit" name="intent" value="delete">
              <MdDeleteOutline /> <span>Delete</span>
            </button>
          </form>
        </li>
      </ul>
    </div>
  );
}
export default DropDownMenu;
