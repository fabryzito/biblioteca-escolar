import { NavLink, Outlet } from "react-router-dom"
import "../styles/admin.css"

const AdminPage = () => {
  return (
    <div className="admin-content">
      <nav id="admin-nav">
        <NavLink to="/admin/libros" className="nav-link">
          Libros
        </NavLink>
        <NavLink to="/admin/alumnos" className="nav-link">
          Alumnos
        </NavLink>
        <NavLink to="/admin/prestamos" className="nav-link">
          Prestamos
        </NavLink>
      </nav>
      <div className="content-wrapper">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminPage
