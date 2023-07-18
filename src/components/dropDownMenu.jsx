import { Link } from "react-router-dom";
//style
// import "../style/dropDownMenu.css";
// import editImage from "../assets/icon-edit.png";
// import deleteImage from "../assets/icon-delete.png";
// import { BiMenu } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useDeleteUserDataMutation } from "../features/servises/userApiSlice";
// import { HiOutlineMenuAlt4 } from "react-icons/hi";
// import { BsThreeDots } from "react-icons/bs";

function DropDownMenu({ id }) {
  // console.log("nowe id", id);
  const [deleteUserData] = useDeleteUserDataMutation();
  const handleDeleteLocation = async (e) => {
    e.preventDefault();
    try {
      const response = await deleteUserData(id);
    } catch (error) {
      console.log("nie udalo sie usunac", error);
    }
  };
  // console.log("pokaz mi Id: ", id);
  return (
    <div className="dropdown">
      <ul>
        <li>
          <Link to={`weathers/${id}/edit`}>
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
