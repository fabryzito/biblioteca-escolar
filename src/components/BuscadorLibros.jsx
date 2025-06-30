import { useState, useEffect } from "react"
import axios from "axios"
import "../styles/buscador.css"

const BuscadorLibros = () => {
  const [libros, setLibros] = useState([])
  const [busqueda, setBusqueda] = useState("")
  const [librosFiltrados, setLibrosFiltrados] = useState([])
  const [mostrarResultados, setMostrarResultados] = useState(false)

  useEffect(() => {
    // Cargar todos los libros al iniciar
    axios
      .get("http://localhost:4004/libros")
      .then((res) => {
        setLibros(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    // Filtrar libros cuando cambie la búsqueda
    if (busqueda.trim() === "") {
      setLibrosFiltrados([])
      setMostrarResultados(false)
    } else {
      const resultados = libros.filter(
        (libro) =>
          libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
          libro.autor.toLowerCase().includes(busqueda.toLowerCase()) ||
          libro.year.toString().includes(busqueda),
      )
      setLibrosFiltrados(resultados)
      setMostrarResultados(true)
    }
  }, [busqueda, libros])

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value)
  }

  const limpiarBusqueda = () => {
    setBusqueda("")
    setMostrarResultados(false)
  }

  return (
    <div className="buscador-container">
      <div className="buscador-header">
        <h2>Buscar Libros</h2>
      </div>

      <div className="buscador-input-container">
        <input
          type="text"
          placeholder="Escribe aquí para buscar..."
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

      {mostrarResultados && (
        <div className="resultados-container">
          <h3>
            Resultados ({librosFiltrados.length} {librosFiltrados.length === 1 ? "libro" : "libros"})
          </h3>

          {librosFiltrados.length === 0 ? (
            <div className="no-resultados">
              <p>No se encontraron libros que coincidan con tu búsqueda.</p>
            </div>
          ) : (
            <div className="libros-grid">
              {librosFiltrados.map((libro) => (
                <div key={libro.id} className="libro-card">
                  <div className="libro-info">
                    <h4 className="libro-titulo">{libro.titulo}</h4>
                    <p className="libro-autor">Por: {libro.autor}</p>
                    <p className="libro-year">Año: {libro.year}</p>
                    <div className="libro-stock">
                      <span className={`stock-badge ${libro.stock > 0 ? "disponible" : "agotado"}`}>
                        {libro.stock > 0 ? `${libro.stock} disponibles` : "Sin stock"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!mostrarResultados && libros.length > 0 && (
        <div className="sugerencias">
          <h3>Libros disponibles en la biblioteca</h3>
          <p>Total de libros: {libros.length}</p>
        </div>
      )}
    </div>
  )
}

export default BuscadorLibros
