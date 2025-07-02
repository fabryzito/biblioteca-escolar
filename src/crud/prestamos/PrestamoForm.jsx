import "../../styles/form.css"

const PrestamoForm = (props) => {
  const { form, handleChange, handleSubmit, showAddButton, handleEditSubmit, alumnos, libros } = props

  // Obtener fecha actual para establecer mínimos
  const today = new Date().toISOString().split("T")[0]

  // Filtrar libros con stock disponible
  const librosDisponibles = libros.filter((libro) => libro.stock > 0)

  return (
    <div className="formulario-container">
      <h2>{showAddButton ? "Registrar Nuevo Préstamo" : "Editar Préstamo"}</h2>
      <form className="formulario" onSubmit={showAddButton ? handleSubmit : handleEditSubmit}>
        <div className="form-group">
          <label htmlFor="alumnoId">Alumno:</label>
          <select id="alumnoId" name="alumnoId" value={form.alumnoId} onChange={handleChange} required>
            <option value="">Seleccionar alumno...</option>
            {alumnos.map((alumno) => (
              <option key={alumno.id} value={alumno.id}>
                {alumno.nombre} - {alumno.curso} (DNI: {alumno.dni}) 
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="libroId">Libro:</label>
          <select id="libroId" name="libroId" value={form.libroId} onChange={handleChange} required>
            <option value="">Seleccionar libro...</option>
            {librosDisponibles.map((libro) => (
              <option key={libro.id} value={libro.id}>
                {libro.titulo} - {libro.autor} (Stock: {libro.stock})
              </option>
            ))}
          </select>
          {librosDisponibles.length === 0 && <small style={{ color: "red" }}>No hay libros disponibles en stock</small>}
        </div>

        <div className="form-group">
          <label htmlFor="fechaEntrega">Fecha de Entrega:</label>
          <input
            id="fechaEntrega"
            name="fechaEntrega"
            type="date"
            value={form.fechaEntrega}
            onChange={handleChange}
            min={today}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fechaDevolucion">Fecha de Devolución:</label>
          <input
            id="fechaDevolucion"
            name="fechaDevolucion"
            type="date"
            value={form.fechaDevolucion}
            onChange={handleChange}
            min={form.fechaEntrega || today}
            required
          />
          <small>La fecha de devolución debe ser posterior a la fecha de entrega</small>
        </div>

        <button type="submit" className="submit-btn">
          {showAddButton ? "Registrar Préstamo" : "Guardar Cambios"}
        </button>
      </form>
    </div>
  )
}

export default PrestamoForm
