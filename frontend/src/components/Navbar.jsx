import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6">
      <NavLink
        to="/upload"
        className={({ isActive }) =>
          isActive ? "text-blue-400 font-semibold" : "hover:text-blue-300"
        }
      >
        Upload Video
      </NavLink>

      <NavLink
        to="/videos"
        className={({ isActive }) =>
          isActive ? "text-blue-400 font-semibold" : "hover:text-blue-300"
        }
      >
        My Videos
      </NavLink>
    </nav>
  );
};

export default Navbar;
