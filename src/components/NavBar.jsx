import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../slices/constants";
import { removeUser } from "../slices/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  console.log("NavBar==>", { user });
  const handleLogOut = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/logout", {
        withCredentials: true,
      });
      if (res) {
        dispatch(removeUser(null));
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="navbar bg-base-300 shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Dev Tinder
        </Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.imageUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections Request</Link>
              </li>
              <li>
                <Link to="/allconnections">Connections</Link>
              </li>
              <li>
                <button type="button" onClick={() => handleLogOut()}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
