import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/integrantes.css";

function Integrantes() {
    const [integrantes, setIntegrantes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4004/integrantes")
            .then(response => {
                setIntegrantes(response.data);
            })
            .catch(error => {
                console.error("Error al obtener integrantes:", error);
            });
    }, []);

    console.log(integrantes);

    return (
    <div className="integrantes-container">
      <h1>Integrantes del equipo</h1>
      <div className="contenedor-integrantes">
        {integrantes.map((persona) => (
          <div key={persona.id} className="tarjeta-integrante">
            <img src={persona.foto} />
            <h3>{persona.nombre}</h3>
            <p>{persona.legajo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Integrantes;