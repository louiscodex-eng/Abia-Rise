import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="nav-logo">
          <img src="/abia-rise.png" alt="Logo" />
          <span>Abia Arise</span>
        </div>

        {/* Links - Conditional based on authentication */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {!isAuthenticated ? (
            // Show these links when NOT logged in
            <>
              <NavLink to="/register" className="nav-link" onClick={closeMenu}>
                Register
              </NavLink>

              <NavLink to="/login" className="nav-link" onClick={closeMenu}>
                Login
              </NavLink>
            </>
          ) : (
            // Show these links when logged in
            <>
              <NavLink to="/dashboard" className="nav-link" onClick={closeMenu}>
                Dashboard
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

              <button
                className="nav-link logout-btn"
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "inherit",
                  padding: "0",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>
    </nav>
  );
}

export default Navbar;