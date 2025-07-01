"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/buscador.css"

const BuscadorLibros = () => {
  const [libros, setLibros] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [librosFiltrados, setLibrosFiltrados] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Cargar todos los libros al iniciar
    axios
      .get("http://localhost:4004/libros")
      .then((res) => {
        setLibros(res.data)
        setLibrosFiltrados(res.data) // Mostrar todos los libros por defecto
        setCargando(false)
      })
      .catch((err) => {
        console.error(err)
        setCargando(false)
      })
  }, [])

  useEffect(() => {
    // Filtrar libros cuando cambie la búsqueda
    if (busqueda.trim() === "") {
      setLibrosFiltrados(libros) // Mostrar todos si no hay búsqueda
    } else {
      const resultados = libros.filter(
        (libro) =>
          libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
          libro.autor.toLowerCase().includes(busqueda.toLowerCase()) ||
          libro.year.toString().includes(busqueda),
      )
      setLibrosFiltrados(resultados)
    }
  }, [busqueda, libros])

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value)
  }

  const limpiarBusqueda = () => {
    setBusqueda("")
  }

  const handleImageError = (e) => {
    e.target.src = "/placeholder.svg?height=200&width=150"
    e.target.alt = "Imagen no disponible"
  }

  if (cargando) {
    return (
      <div className="buscador-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando libros...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="buscador-container">
      <div className="buscador-header">
        <h2>Biblioteca Escolar</h2>
        <p>Descubre y busca entre nuestra colección de libros</p>
      </div>

      <div className="buscador-input-container">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          placeholder="Buscar por título, autor o año..."
          value={busqueda}
          onChange={handleBusquedaChange}
          className="buscador-input"
        />
        {busqueda && (
          <button onClick={limpiarBusqueda} className="limpiar-btn">
            ✕
          </button>
        )}
      </div>

      <div className="resultados-container">
        <div className="resultados-header">
          <h3>
            {busqueda ? (
              <>
                Resultados para "{busqueda}" ({librosFiltrados.length}{" "}
                {librosFiltrados.length === 1 ? "libro" : "libros"})
              </>
            ) : (
              <>
                Todos los libros ({librosFiltrados.length} {librosFiltrados.length === 1 ? "libro" : "libros"})
              </>
            )}
          </h3>

          {busqueda && (
            <button onClick={limpiarBusqueda} className="ver-todos-btn">
              Ver todos los libros
            </button>
          )}
        </div>

        {librosFiltrados.length === 0 ? (
          <div className="no-resultados">
            {busqueda ? (
              <>
                <div className="no-resultados-icon">📚</div>
                <h4>No se encontraron libros</h4>
                <p>No hay libros que coincidan con tu búsqueda "{busqueda}".</p>
                <button onClick={limpiarBusqueda} className="btn-ver-todos">
                  Ver todos los libros
                </button>
              </>
            ) : (
              <>
                <div className="no-resultados-icon">📚</div>
                <h4>No hay libros disponibles</h4>
                <p>Aún no se han agregado libros a la biblioteca.</p>
              </>
            )}
          </div>
        ) : (
          <div className="libros-grid">
            {librosFiltrados.map((libro) => (
              <div key={libro.id} className="libro-card">
                <div className="libro-image-container">
                  <img
                    src={libro.imagen || "/placeholder.svg?height=200&width=150"}
                    alt={`Portada de ${libro.titulo}`}
                    className="libro-image"
                    onError={handleImageError}
                  />
                  <div className="libro-overlay">
                    <span className={`stock-badge ${libro.stock > 0 ? "disponible" : "agotado"}`}>
                      {libro.stock > 0 ? `${libro.stock} disponibles` : "Sin stock"}
                    </span>
                  </div>
                </div>
                <div className="libro-info">
                  <h4 className="libro-titulo">{libro.titulo}</h4>
                  <p className="libro-autor">Por: {libro.autor}</p>
                  <p className="libro-year">Año: {libro.year}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default BuscadorLibros
