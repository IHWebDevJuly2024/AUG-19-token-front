import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

function Navbar() {
  const { user, verifyUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    verifyUser();
  };
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "selected" : "")}
            to="/"
          >
            Home
          </NavLink>
        </li>
        {!user ? (
          <>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "selected" : "")}
                to="/signup"
              >
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "selected" : "")}
                to="/login"
              >
                Log In
              </NavLink>
            </li>
          </>
        ) : (
          <li onClick={handleLogout}>Logout</li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
