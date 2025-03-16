import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../src/assets/image 4.png";
import DetalleRobot from "./DetalleRobot";
import { FormattedMessage } from "react-intl";

function ListadoRobots() {
  const [robots, setRobots] = useState([]);
  const [error, setError] = useState("");
  const [robotSeleccionado, setRobotSeleccionado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/robots")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los robots");
        }
        return response.json();
      })
      .then((data) => setRobots(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="container mt-4 text-center">
      <img src={logo} alt="Robot Lovers" className="img-fluid mb-3" style={{ maxWidth: "600px" }} />
      <h1 className="fw-bold">
        <FormattedMessage id="titulo_adopcion" />
      </h1>
      <div className="row">
        {/* Columna de la tabla de robots */}
        <div className={`col-md-${robotSeleccionado ? "8" : "12"} table-responsive`}>
          <table className="table table-bordered mt-3 text-center">
            <thead className="table-dark">
              <tr>
                <th>
                  <FormattedMessage id="id" />
                </th>
                <th>
                  <FormattedMessage id="nombre" />
                </th>
                <th>
                  <FormattedMessage id="modelo" />
                </th>
                <th>
                  <FormattedMessage id="empresa_fabricante" />
                </th>
              </tr>
            </thead>
            <tbody>
              {robots.map((robot) => (
                <tr key={robot.id} onClick={() => setRobotSeleccionado(robot.id)} style={{ cursor: "pointer" }}>
                  <td>{robot.id}</td>
                  <td>{robot.nombre}</td>
                  <td>{robot.modelo}</td>
                  <td>{robot.empresaFabricante}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {robotSeleccionado && (
          <div className="col-md-4">
            <DetalleRobot id={robotSeleccionado} />
          </div>
        )}
      </div>

      <footer className="mt-4 text-muted">
      <FormattedMessage id="contacto" />
      </footer>
    </div>
  );
}

export default ListadoRobots;
