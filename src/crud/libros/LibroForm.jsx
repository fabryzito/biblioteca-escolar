"use client"

import "../../styles/form.css"

const LibroForm = (props) => {
  const { form, handleChange, handleSubmit, showAddButton, handleEditSubmit } = props

  return (
    <div className="formulario-container">
      <h2>{showAddButton ? "Agregar Nuevo Libro" : "Editar Libro"}</h2>
      <form className="formulario" onSubmit={showAddButton ? handleSubmit : handleEditSubmit}>
        <div className="form-group">
          <label htmlFor="titulo">Título del libro:</label>
          <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título del libro" required />
        </div>

        <div className="form-group">
          <label htmlFor="autor">Autor:</label>
          <input name="autor" value={form.autor} onChange={handleChange} placeholder="Autor" required />
        </div>

        <div className="form-group">
          <label htmlFor="year">Año de publicación:</label>
          <input
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Año de publicación"
            type="number"
            min="1000"
            max="2025"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Cantidad en stock:</label>
          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Cantidad en stock"
            type="number"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imagen">URL de la imagen:</label>
          <input
            name="imagen"
            value={form.imagen}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
            type="url"
          />
          <small>Opcional: Ingresa la URL de la imagen de portada del libro</small>
        </div>

        {/* Vista previa de la imagen */}
        {form.imagen && (
          <div className="form-group">
            <label>Vista previa:</label>
            <div className="image-preview">
              <img
                src={form.imagen || "/placeholder.svg"}
                alt="Vista previa del libro"
                onError={(e) => {
                  e.target.style.display = "none"
                  e.target.nextSibling.style.display = "block"
                }}
                onLoad={(e) => {
                  e.target.style.display = "block"
                  e.target.nextSibling.style.display = "none"
                }}
              />
              <div className="image-error" style={{ display: "none" }}>
                ❌ No se pudo cargar la imagen. Verifica la URL.
              </div>
            </div>
          </div>
        )}

        {showAddButton ? (
          <button type="submit" className="submit-btn">
            Agregar Libro
          </button>
        ) : (
          <button type="submit" className="submit-btn">
            Editar Libro
          </button>
        )}
      </form>
    </div>
  )
}

export default LibroForm
