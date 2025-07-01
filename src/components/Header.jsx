"use client"

// src/components/Header.jsx
import { useState, useEffect } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import "../styles/header.css"

function Header() {
  const [user, setUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const stored = localStorage.getItem("user")
    setUser(stored ? JSON.parse(stored) : null)
  }, [location])

  // Cerrar menú cuando cambia la ubicación
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const isAdmin = user && user.rol === "admin"

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    navigate("/login")
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-left">
          <h1 className="site-title">Biblioteca Escolar</h1>

          {/* Navegación escritorio */}
          <div className="nav-links-desktop">
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
        </div>

        {/* Botón de usuario escritorio */}
        <div className="nav-right-desktop">
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

        {/* Botón hamburguesa móvil */}
        <button
          className={`hamburger ${isMenuOpen ? "hamburger-active" : ""}`}
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Menú móvil */}
        <div className={`mobile-menu ${isMenuOpen ? "mobile-menu-open" : ""}`}>
          <div className="mobile-menu-content">
            <NavLink to="/" className="mobile-nav-link" onClick={closeMenu}>
              Inicio
            </NavLink>
            <NavLink to="/integrantes" className="mobile-nav-link" onClick={closeMenu}>
              Integrantes
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin" className="mobile-nav-link" onClick={closeMenu}>
                Admin
              </NavLink>
            )}

            <div className="mobile-auth-section">
              {!user ? (
                <NavLink to="/login" className="btn login-btn mobile-auth-btn" onClick={closeMenu}>
                  Iniciar sesión
                </NavLink>
              ) : (
                <button className="btn logout-btn mobile-auth-btn" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Overlay para cerrar menú móvil */}
        {isMenuOpen && <div className="mobile-menu-overlay" onClick={closeMenu}></div>}
      </nav>
    </header>
  )
}

export default Header
