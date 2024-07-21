import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = React.useState(location.pathname);
  const user = useSelector((state) => state.global.user);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <nav className="bg-indigo-500 p-4 flex flex-row justify-between">
      <div className="text-3xl font-bold text-white">Jobify</div>
      <ul className="flex flex-row gap-10 mt-4">
        <li className="mb-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-indigo-200" : "text-white hover:text-indigo-200"
            }
            onClick={() => handleLinkClick("/")}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/add-company"
            className={({ isActive }) =>
              isActive ? "text-indigo-200" : "text-white hover:text-indigo-200"
            }
            onClick={() => handleLinkClick("/add-company")}
          >
            Add Company
          </NavLink>
        </li>
        <li className="mb-2">
          <NavLink
            to="/add-job"
            className={({ isActive }) =>
              isActive ? "text-indigo-200" : "text-white hover:text-indigo-200"
            }
            onClick={() => handleLinkClick("/add-job")}
          >
            Add Job
          </NavLink>
        </li>
      </ul>
      <div className="flex items-center">
        <IoPersonOutline size={24} className="mr-2 text-white" />
        <span className="text-white">{user?.username || "Username"}</span>
        <IoLogOutOutline
          size={24}
          className="ml-4 text-white cursor-pointer"
          onClick={() => console.log("Logout clicked")}
        />
      </div>
    </nav>
  );
};

export default Navbar;
