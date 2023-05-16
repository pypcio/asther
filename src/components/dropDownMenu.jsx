import { useState, useRef, useEffect } from "react";
import { Form, Link, NavLink, useParams } from "react-router-dom";
//style
import "../style/dropDownMenu.css";
import editImage from "../assets/icon-edit.png";
import deleteImage from "../assets/icon-delete.png";
import { BiMenu } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";

function DropDownMenu({ id }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  // const { weatherId } = useParams();
  const handleToggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true); // Use the 'capture' phase
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className={`dropdown-container`}>
      <div className={`dropdown ${isOpen ? "open" : ""}`} ref={dropdownRef}>
        {/* Dropdown menu content */}
        <ul>
          <li>
            <NavLink to={`/weathers/${id}/edit`}>
              <AiOutlineEdit />
            </NavLink>
          </li>
          <li>
            <Form method="post" action={`/weathers/${id}/delete`}>
              <button type="submit" name="intent" value="delete">
                <MdDeleteOutline />
              </button>
            </Form>
          </li>
        </ul>
      </div>

      {/* Toggle button */}
      <div className="toggle-button" onClick={handleToggleMenu}>
        <BsThreeDots />
      </div>
    </div>
  );
}
export default DropDownMenu;
