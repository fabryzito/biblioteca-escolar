"use client";

import { useNavigate } from "react-router-dom";
import "../styles/notfound.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="error-animation">
          <div className="error-number">4</div>
          <div className="error-book">📚</div>
          <div className="error-number">4</div>
        </div>

        <div className="error-text">
          <h1 className="error-title">¡Oops! Página no encontrada</h1>
          <p className="error-description">
            La página que estás buscando no existe en nuestra biblioteca
            digital.
            <br />
            Puede que haya sido movida, eliminada o que hayas escrito mal la
            URL.
          </p>
        </div>

        <div className="error-actions">
          <button onClick={handleGoHome} className="btn-primary">
            <span className="btn-icon">🏠</span>
            Ir al inicio
          </button>
          <button onClick={handleGoBack} className="btn-secondary">
            <span className="btn-icon">←</span>
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
