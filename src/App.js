import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Formulario";
import ListadoRobots from "./ListadoRobots";
import DetalleRobot from "./DetalleRobot"; // Importamos el nuevo componente

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/robots" element={<ListadoRobots />} />
          <Route path="/robots/:id" element={<DetalleRobot />} /> {/* Nueva ruta */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
