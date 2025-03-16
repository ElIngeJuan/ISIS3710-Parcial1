import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

function DetalleRobot({ id }) {
  const [robot, setRobot] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3001/robots/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se encontró el robot");
        }
        return response.json();
      })
      .then((data) => setRobot(data))
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;
  if (!robot) return <p>
    <FormattedMessage id="cargando" />
  </p>;

  return (
    <div
      className="flex flex-col items-center border-2 border-blue-500 p-4 rounded-lg max-w-sm mx-auto shadow-lg"
      style={{ backgroundColor: "rgba(217, 217, 217, 0.5)" }} 
    >
      <h4 className="text-xl font-bold mb-2">{robot.nombre}</h4>
      <img
        src={robot.imagen}
        alt={robot.nombre}
        className="object-cover rounded-full border-2 border-gray-300 mb-4"
        style={{ width: "210px", height: "200px" }}
      />
      <div className="text-left">
        <p>
          <strong>
            <FormattedMessage id="anio_fabricacion" />
            :</strong> {robot.añoFabricacion}
        </p>
        <p>
          <strong>
            <FormattedMessage id="capacidad_procesamiento" />
            :</strong> {robot.capacidadProcesamiento} GHz
        </p>
        <p>
          <strong>
            <FormattedMessage id="humor" />
            :</strong> {robot.humor}
        </p>
      </div>
    </div>
  );
}

export default DetalleRobot;