import "../../styles/form.css"

const AlumnoForm = (props) => {
  const { form, handleChange, handleSubmit, showAddButton, handleEditSubmit } = props

  // Lista de cursos disponibles
  const cursosDisponibles = [
    "1ro",
    "2do",
    "3ro",
    "4to",
    "5to",
    "6to",
    "7mo",
  ]

  const handleDniChange = (e) => {
    // Solo permitir números en el DNI
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 8) {
      handleChange({
        target: {
          name: "dni",
          value: value,
        },
      })
    }
  }

  const handleNombreChange = (e) => {
    // Capitalizar primera letra de cada palabra
    const value = e.target.value.replace(/\b\w/g, (l) => l.toUpperCase())
    handleChange({
      target: {
        name: "nombre",
        value: value,
      },
    })
  }

  return (
    <div className="formulario-container">
      <h2>{showAddButton ? "Agregar Nuevo Alumno" : "Editar Alumno"}</h2>
      <form className="formulario" onSubmit={showAddButton ? handleSubmit : handleEditSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo:</label>
          <input
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleNombreChange}
            placeholder="Ej: Juan Pérez"
            required
            minLength="2"
            maxLength="50"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dni">DNI:</label>
          <input
            id="dni"
            name="dni"
            value={form.dni}
            onChange={handleDniChange}
            placeholder="12345678"
            required
            minLength="7"
            maxLength="8"
            pattern="[0-9]{7,8}"
            title="El DNI debe tener entre 7 y 8 dígitos"
          />
          <small>Solo números, entre 7 y 8 dígitos</small>
        </div>

        <div className="form-group">
          <label htmlFor="curso">Curso:</label>
          <select id="curso" name="curso" value={form.curso} onChange={handleChange} required>
            <option value="">Seleccionar curso...</option>
            {cursosDisponibles.map((curso) => (
              <option key={curso} value={curso}>
                {curso}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          {showAddButton ? "Agregar Alumno" : "Guardar Cambios"}
        </button>
      </form>
    </div>
  )
}

export default AlumnoForm
