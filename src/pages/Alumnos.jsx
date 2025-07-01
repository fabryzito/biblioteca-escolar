import { useEffect, useState } from "react"
import axios from "axios"
import AlumnoForm from "../crud/alumnos/AlumnoForm"
import { scrollToTop } from "../utils/scrollToTop"
import "../styles/alumnos.css"

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([])
  const [showAddButton, setShowAddButton] = useState(true)

  const [form, setForm] = useState({
    nombre: "",
    dni: "",
    curso: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validar que el DNI no esté duplicado
    const dniExists = alumnos.some((alumno) => alumno.dni === form.dni)
    if (dniExists) {
      alert("Ya existe un alumno con ese DNI")
      return
    }

    axios
      .post("http://localhost:4004/alumnos", form)
      .then((res) => {
        alert("Alumno agregado correctamente")
        setAlumnos([...alumnos, res.data])
        setForm({
          nombre: "",
          dni: "",
          curso: "",
        })
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    axios.get("http://localhost:4004/alumnos").then((res) => setAlumnos(res.data))
  }, [])

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este alumno?")
    if (!confirmDelete) return

    axios
      .delete(`http://localhost:4004/alumnos/${id}`)
      .then(() => {
        setAlumnos(alumnos.filter((alumno) => alumno.id !== id))
        alert("Alumno eliminado correctamente")
      })
      .catch((err) => console.error(err))
  }

  const handleEditButton = (id) => {
    setShowAddButton(false)
    axios
      .get(`http://localhost:4004/alumnos/${id}`)
      .then((res) => {
        setForm(res.data)
        scrollToTop()
      })
      .catch((err) => console.error(err))
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()

    // Validar que el DNI no esté duplicado (excepto el alumno actual)
    const dniExists = alumnos.some((alumno) => alumno.dni === form.dni && alumno.id !== form.id)
    if (dniExists) {
      alert("Ya existe otro alumno con ese DNI")
      return
    }

    axios
      .put(`http://localhost:4004/alumnos/${form.id}`, form)
      .then((res) => {
        setAlumnos(alumnos.map((alumno) => (alumno.id === form.id ? res.data : alumno)))
        alert("Alumno editado correctamente")
        setForm({
          nombre: "",
          dni: "",
          curso: "",
        })

        setShowAddButton(true)
      })
      .catch((err) => console.error(err))
  }

  // Función para obtener estadísticas por curso
  const getEstadisticasPorCurso = () => {
    const cursos = {}
    alumnos.forEach((alumno) => {
      cursos[alumno.curso] = (cursos[alumno.curso] || 0) + 1
    })
    return cursos
  }

  const estadisticasCursos = getEstadisticasPorCurso()
  const cursoConMasAlumnos = Object.keys(estadisticasCursos).reduce((a, b) => 
    estadisticasCursos[a] > estadisticasCursos[b] ? a : b, ""
  )

  return (
    <div className="alumnos-container">
      <div className="alumnos-header">
        <h1 className="alumnos-title">Gestión de Alumnos</h1>
        <p className="alumnos-subtitle">Administra el registro de estudiantes de tu institución</p>
      </div>

      <AlumnoForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        showAddButton={showAddButton}
        handleEditSubmit={handleEditSubmit}
      />

      <div className="alumnos-actions">
        <button
          className="btn-primary"
          onClick={() => {
            setShowAddButton(true)
            setForm({
              nombre: "",
              dni: "",
              curso: "",
            })
            scrollToTop()
          }}
        >
          <span className="btn-icon">+</span>
          Agregar Nuevo Alumno
        </button>
      </div>

      <div className="alumnos-content">
       

        {alumnos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👨‍🎓</div>
            <h3>No hay alumnos registrados</h3>
            <p>¡Agrega el primer alumno para comenzar!</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="alumnos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre Completo</th>
                  <th>DNI</th>
                  <th>Curso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alumnos
                  .sort((a, b) => a.curso.localeCompare(b.curso) || a.nombre.localeCompare(b.nombre))
                  .map((alumno, index) => (
                    <tr key={alumno.id} className={index % 2 === 0 ? "row-even" : "row-odd"}>
                      <td className="id-cell">#{alumno.id}</td>
                      <td className="nombre-cell">{alumno.nombre}</td>
                      <td className="dni-cell">{alumno.dni}</td>
                      <td className="curso-cell">
                        <span className="curso-badge">{alumno.curso}</span>
                      </td>
                      <td className="actions-cell">
                        <button
                          className="btn-edit-table"
                          onClick={() => handleEditButton(alumno.id)}
                          title="Editar alumno"
                        >
                          ✏️
                        </button>
                        <button
                          className="btn-delete-table"
                          onClick={() => handleDelete(alumno.id)}
                          title="Eliminar alumno"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Alumnos
