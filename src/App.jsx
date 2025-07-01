"use client"

import "./App.css"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import Libros from "./pages/Libros"
import Alumnos from "./pages/Alumnos"
import Prestamos from "./pages/Prestamos"
import ProtectedRoute from "./components/ProtectedRoute"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Integrantes from "./pages/Integrantes"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/integrantes" element={<Integrantes />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role={"admin"}>
                <AdminPage />
              </ProtectedRoute>
            }
          >
            <Route path="libros" element={<Libros />} />
            <Route path="alumnos" element={<Alumnos />} />
            <Route path="prestamos" element={<Prestamos />} />
          </Route>

          {/* Ruta catch-all para páginas no encontradas */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
