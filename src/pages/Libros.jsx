"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LibroForm from "../crud/libros/LibroForm";
import { scrollToTop } from "../utils/scrollToTop";
import "../styles/libros.css";

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [showAddButton, setShowAddButton] = useState(true);

  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    year: "",
    stock: "",
    imagen: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4004/libros", form)
      .then((res) => {
        alert("Libro agregado correctamente");
        setLibros([...libros, res.data]);
        setForm({
          titulo: "",
          autor: "",
          year: "",
          stock: "",
          imagen: "",
        });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:4004/libros")
      .then((res) => setLibros(res.data));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este libro?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:4004/libros/${id}`)
        .then(() => {
          setLibros(libros.filter((libro) => libro.id !== id));
          alert("Libro eliminado correctamente");
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEditButton = (id) => {
    setShowAddButton(false);
    axios
      .get(`http://localhost:4004/libros/${id}`)
      .then((res) => {
        setForm({
          ...res.data,
          imagen: res.data.imagen || "", // Asegurar que imagen tenga un valor
        });
        scrollToTop();
      })
      .catch((err) => console.error(err));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4004/libros/${form.id}`, form)
      .then((res) => {
        setLibros(
          libros.map((libro) => (libro.id === form.id ? res.data : libro))
        );
        alert("Libro editado correctamente");
        setForm({
          titulo: "",
          autor: "",
          year: "",
          stock: "",
          imagen: "",
        });
        setShowAddButton(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="libros-container">
      <div className="libros-header">
        <h1 className="libros-title">Gestión de Libros</h1>
        <p className="libros-subtitle">
          Administra tu biblioteca de forma eficiente
        </p>
      </div>

      <LibroForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        showAddButton={showAddButton}
        handleEditSubmit={handleEditSubmit}
      />

      <div className="libros-actions">
        <button
          className="btn-primary"
          onClick={() => {
            setShowAddButton(true);
            setForm({
              titulo: "",
              autor: "",
              year: "",
              stock: "",
              imagen: "",
            });
            scrollToTop();
          }}
        >
          <span className="btn-icon">+</span>
          Agregar Nuevo Libro
        </button>
      </div>

      <div className="libros-content">
        {libros.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No hay libros registrados</h3>
            <p>Comienza agregando tu primer libro a la biblioteca</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="libros-table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Año</th>
                  <th>Stock</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {libros.map((libro, index) => (
                  <tr
                    key={libro.id}
                    className={index % 2 === 0 ? "row-even" : "row-odd"}
                  >
                    <td className="imagen-cell">
                      <div className="book-image-container">
                        <img
                          src={
                            libro.imagen ||
                            "/placeholder.svg?height=60&width=40"
                          }
                          alt={`Portada de ${libro.titulo}`}
                          className="book-image"
                        />
                      </div>
                    </td>
                    <td className="id-cell">#{libro.id}</td>
                    <td className="titulo-cell">
                      <div className="titulo-content">
                        <span className="titulo-text">{libro.titulo}</span>
                      </div>
                    </td>
                    <td className="autor-cell">{libro.autor}</td>
                    <td className="year-cell">{libro.year}</td>
                    <td className="stock-cell">{libro.stock}</td>
                    <td className="estado-cell">
                      <span
                        className={`status-badge ${
                          libro.stock > 0 ? "disponible" : "agotado"
                        }`}
                      >
                        {libro.stock > 0 ? "Disponible" : "Agotado"}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button
                        className="btn-edit-table"
                        onClick={() => handleEditButton(libro.id)}
                        title="Editar libro"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn-delete-table"
                        onClick={() => handleDelete(libro.id)}
                        title="Eliminar libro"
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
  );
};

export default Libros;
