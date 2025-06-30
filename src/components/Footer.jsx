import '../styles/footer.css'

function Footer() {
  return (
    <footer >
      <div >
        <p >
          &copy; {new Date().getFullYear()} Biblioteca Escolar.
        </p>
        <p >
          Realizado con react y css
        </p>
      </div>
    </footer>
  );
}

export default Footer;