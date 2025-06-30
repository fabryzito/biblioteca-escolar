// src/components/Header.jsx
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "../styles/header.css";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
  }, [location]);

  const isAdmin = user && user.rol === "admin";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-left">
          <h1 className="site-title">Biblioteca Escolar</h1>
          <NavLink to="/" className="nav-link">
            Inicio
          </NavLink>
          <NavLink to="/integrantes" className="nav-link">
            Integrantes
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
          )}
        </div>

        <div className="nav-right">
          {!user ? (
            <NavLink to="/login" className="btn login-btn">
              Iniciar sesión
            </NavLink>
          ) : (
            <button className="btn logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

