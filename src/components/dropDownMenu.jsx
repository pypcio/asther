import { useState, useRef, useEffect, forwardRef } from "react";
import { Form, Link, NavLink, useParams } from "react-router-dom";
//style
// import "../style/dropDownMenu.css";
// import editImage from "../assets/icon-edit.png";
// import deleteImage from "../assets/icon-delete.png";
// import { BiMenu } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
// import { HiOutlineMenuAlt4 } from "react-icons/hi";
// import { BsThreeDots } from "react-icons/bs";

function DropDownMenu({ id }) {
  return (
    <div className="dropdown">
      <ul>
        <li>
          <Link to={`/${id}/edit`}>
            <AiOutlineEdit /> <span>Edit</span>
          </Link>
        </li>
        <li>
          <Form method="post" action={`/1/${id}/delete`}>
            <button type="submit" name="intent" value="delete">
              <MdDeleteOutline /> <span>Delete</span>
            </button>
          </Form>
        </li>
      </ul>
    </div>
  );
}
export default DropDownMenu;
