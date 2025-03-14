import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../src/assets/image 4.png";
import DetalleRobot from "./DetalleRobot";

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
      <h1 className="fw-bold">Adopta un Robot con Robot Lovers!</h1>
      <div className="row">
        {/* Columna de la tabla de robots */}
        <div className={`col-md-${robotSeleccionado ? "8" : "12"} table-responsive`}>
          <table className="table table-bordered mt-3 text-center">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Modelo</th>
                <th>Empresa Fabricante</th>
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
        Contact us: +57 3102102523 - info@robot-lovers.com - @robot-lovers
      </footer>
    </div>
  );
}

export default ListadoRobots;
