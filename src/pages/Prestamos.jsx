import { useEffect, useState } from "react"
import axios from "axios"
import PrestamoForm from "../crud/prestamos/PrestamoForm"
import { scrollToTop } from "../utils/scrollToTop"
import "../styles/prestamos.css"

const Prestamos = () => {
  const [prestamos, setPrestamos] = useState([])
  const [alumnos, setAlumnos] = useState([])
  const [libros, setLibros] = useState([])
  const [showAddButton, setShowAddButton] = useState(true)

  const [form, setForm] = useState({
    alumnoId: "",
    libroId: "",
    fechaEntrega: "",
    fechaDevolucion: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Verificar que el libro tenga stock disponible
    const libro = libros.find((l) => l.id === form.libroId)
    if (!libro || libro.stock <= 0) {
      alert("El libro seleccionado no tiene stock disponible")
      return
    }

    // Verificar que la fecha de devolución sea posterior a la de entrega
    if (new Date(form.fechaDevolucion) <= new Date(form.fechaEntrega)) {
      alert("La fecha de devolución debe ser posterior a la fecha de entrega")
      return
    }

    axios
      .post("http://localhost:4004/prestamos", form)
      .then((res) => {
        // Reducir el stock del libro
        const libroActualizado = { ...libro, stock: libro.stock - 1 }
        axios.put(`http://localhost:4004/libros/${libro.id}`, libroActualizado).then(() => {
          setLibros(libros.map((l) => (l.id === libro.id ? libroActualizado : l)))
        })

        alert("Préstamo registrado correctamente")
        setPrestamos([...prestamos, res.data])
        setForm({
          alumnoId: "",
          libroId: "",
          fechaEntrega: "",
          fechaDevolucion: "",
        })
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    // Cargar todas las tablas
    Promise.all([
      axios.get("http://localhost:4004/prestamos"),
      axios.get("http://localhost:4004/alumnos"),
      axios.get("http://localhost:4004/libros"),
    ]).then(([prestamosRes, alumnosRes, librosRes]) => {
      setPrestamos(prestamosRes.data)
      setAlumnos(alumnosRes.data)
      setLibros(librosRes.data)
    })
  }, [])

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas marcar este préstamo como devuelto?")
    if (!confirmDelete) return

    const prestamo = prestamos.find((p) => p.id === id)
    const libro = libros.find((l) => l.id === prestamo.libroId)

    axios.delete(`http://localhost:4004/prestamos/${id}`)
      .then(() => {
        // Aumentar el stock del libro
        const libroActualizado = { ...libro, stock: libro.stock + 1 }
        axios.put(`http://localhost:4004/libros/${libro.id}`, libroActualizado).then(() => {
          setLibros(libros.map((l) => (l.id === libro.id ? libroActualizado : l)))
        })

        setPrestamos(prestamos.filter((prestamo) => prestamo.id !== id))
        alert("Préstamo marcado como devuelto correctamente")
      })
      .catch((err) => console.error(err))
  }

  const handleEditButton = (id) => {
    setShowAddButton(false)
    axios
      .get(`http://localhost:4004/prestamos/${id}`)
      .then((res) => {
        setForm(res.data)
        scrollToTop()
      })
      .catch((err) => console.error(err))
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()

    // Verificar fechas
    if (new Date(form.fechaDevolucion) <= new Date(form.fechaEntrega)) {
      alert("La fecha de devolución debe ser posterior a la fecha de entrega")
      return
    }

    axios
      .put(`http://localhost:4004/prestamos/${form.id}`, form)
      .then((res) => {
        setPrestamos(prestamos.map((prestamo) => (prestamo.id === form.id ? res.data : prestamo)))
        alert("Préstamo editado correctamente")
        setForm({
          alumnoId: "",
          libroId: "",
          fechaEntrega: "",
          fechaDevolucion: "",
        })
        setShowAddButton(true)
      })
      .catch((err) => console.error(err))
  }

  // Función para obtener nombre del alumno
  const getNombreAlumno = (alumnoId) => {
    const alumno = alumnos.find((a) => a.id === alumnoId)
    return alumno ? alumno.nombre : "Alumno no encontrado"
  }

  // Función para obtener título del libro
  const getTituloLibro = (libroId) => {
    const libro = libros.find((l) => l.id === libroId)
    return libro ? libro.titulo : "Libro no encontrado"
  }

  // Función para verificar si un préstamo está vencido
  const isVencido = (fechaDevolucion) => {
    return new Date(fechaDevolucion) < new Date()
  }

  // Función para obtener días restantes o vencidos
  const getDiasRestantes = (fechaDevolucion) => {
    const hoy = new Date()
    const fechaDev = new Date(fechaDevolucion)
    const diferencia = Math.ceil((fechaDev - hoy) / (1000 * 60 * 60 * 24))
    return diferencia
  }

  // Estadísticas
  const prestamosActivos = prestamos.filter((p) => !isVencido(p.fechaDevolucion))
  const prestamosVencidos = prestamos.filter((p) => isVencido(p.fechaDevolucion))
  const prestamosPorVencer = prestamos.filter((p) => {
    const dias = getDiasRestantes(p.fechaDevolucion)
    return dias <= 3 && dias >= 0
  })

  return (
    <div className="prestamos-container">
      <div className="prestamos-header">
        <h1 className="prestamos-title">Gestión de Préstamos</h1>
        <p className="prestamos-subtitle">Controla los préstamos de libros y su devolución</p>
      </div>

      <PrestamoForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        showAddButton={showAddButton}
        handleEditSubmit={handleEditSubmit}
        alumnos={alumnos}
        libros={libros}
      />

      <div className="prestamos-actions">
        <button
          className="btn-primary"
          onClick={() => {
            setShowAddButton(true)
            setForm({
              alumnoId: "",
              libroId: "",
              fechaEntrega: "",
              fechaDevolucion: "",
            })
            scrollToTop()
          }}
        >
          <span className="btn-icon">📚</span>
          Registrar Nuevo Préstamo
        </button>
      </div>

      <div className="prestamos-content">

        {prestamos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📖</div>
            <h3>No hay préstamos registrados</h3>
            <p>¡Registra el primer préstamo para comenzar!</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="prestamos-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Alumno</th>
                  <th>Libro</th>
                  <th>Fecha Entrega</th>
                  <th>Fecha Devolución</th>
                  <th>Días Restantes</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {prestamos
                  .sort((a, b) => new Date(a.fechaDevolucion) - new Date(b.fechaDevolucion))
                  .map((prestamo, index) => {
                    const diasRestantes = getDiasRestantes(prestamo.fechaDevolucion)
                    const vencido = isVencido(prestamo.fechaDevolucion)
                    const porVencer = diasRestantes <= 3 && diasRestantes >= 0

                    return (
                      <tr
                        key={prestamo.id}
                        className={`${index % 2 === 0 ? "row-even" : "row-odd"} ${
                          vencido ? "row-vencido" : porVencer ? "row-por-vencer" : ""
                        }`}
                      >
                        <td className="id-cell">#{prestamo.id}</td>
                        <td className="alumno-cell">{getNombreAlumno(prestamo.alumnoId)}</td>
                        <td className="libro-cell">{getTituloLibro(prestamo.libroId)}</td>
                        <td className="fecha-cell">{new Date(prestamo.fechaEntrega).toLocaleDateString()}</td>
                        <td className="fecha-cell">{new Date(prestamo.fechaDevolucion).toLocaleDateString()}</td>
                        <td className="dias-cell">
                          <span className={`dias-badge ${vencido ? "vencido" : porVencer ? "por-vencer" : "normal"}`}>
                            {vencido ? `${Math.abs(diasRestantes)} días vencido` : `${diasRestantes} días`}
                          </span>
                        </td>
                        <td className="estado-cell">
                          <span className={`status-badge ${vencido ? "vencido" : "activo"}`}>
                            {vencido ? "Vencido" : "Activo"}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <button
                            className="btn-edit-table"
                            onClick={() => handleEditButton(prestamo.id)}
                            title="Editar préstamo"
                          >
                            ✏️
                          </button>
                          <button
                            className="btn-return-table"
                            onClick={() => handleDelete(prestamo.id)}
                            title="Marcar como devuelto"
                          >
                            📤
                          </button>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Prestamos
