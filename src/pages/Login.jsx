import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Estados para el formulario
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Al montar, carga todos los usuarios desde /usuarios
  useEffect(() => {
    axios
      .get('http://localhost:4004/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error("Error al cargar usuarios:", err));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    // Busca coincidencia en username y password
    const usuarioEncontrado = usuarios.find(
      user =>
        user.username === usuario.trim() &&
        user.password === contrasena
    );

    if (usuarioEncontrado) {
      // Guarda en localStorage
      localStorage.setItem('user', JSON.stringify(usuarioEncontrado));

      // Redirige según rol
      if (usuarioEncontrado.rol === 'admin') {
        navigate('/admin/libros');
      } else {
        navigate('/');
      }
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div id="login-container">
      <h2 id="login-h2">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} id="login-form">
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          required
        />

        <div id="password-container">
          <input
            id="password-input"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            required
          />
          <span
            id="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            style={{ cursor: 'pointer' }}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
