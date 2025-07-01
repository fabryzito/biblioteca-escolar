"use client"

import BuscadorLibros from "../components/BuscadorLibros"
import "../styles/home.css"

const HomePage = () => {
  return (
    <div className="home-container">
      <main className="home-main">
        {/* Sección de libros con buscador */}
        <section className="libros-section">
          <BuscadorLibros />
        </section>
      </main>
    </div>
  )
}

export default HomePage
