import BuscadorLibros from "../components/BuscadorLibros"
import "../styles/home.css"

const HomePage = () => {
  return (
    <div className="home-container">
      <main className="home-main">
        <section className="buscador-section">
          <BuscadorLibros />
        </section>
      </main>
    </div>
  )
}

export default HomePage
