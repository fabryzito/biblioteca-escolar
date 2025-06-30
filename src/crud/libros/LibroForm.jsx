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
            max="2024"
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
        {showAddButton ? <button type="submit" className="submit-btn">Agregar Libro</button> : <button type="submit">Editar Libro</button>}
      </form>
    </div>
  )
}

export default LibroForm
