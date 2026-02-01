import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="nav-logo">
          <img src="/abia-rise.png" alt="Logo" />
          <span>Abia Rise</span>
        </div>

        {/* Links */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <NavLink
            to="/register"
            className="nav-link"
            onClick={closeMenu}
          >
            Register
          </NavLink>

          <NavLink
            to="/login"
            className="nav-link"
            onClick={closeMenu}
          >
            Login
          </NavLink>

          <NavLink
            to="/modify-details"
            className="nav-link"
            onClick={closeMenu}
          >
            Modify Details
          </NavLink>

          <NavLink
            to="/reset-password"
            className="nav-link"
            onClick={closeMenu}
          >
            Reset Password
          </NavLink>
        </div>

        {/* Hamburger */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
