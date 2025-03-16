import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../src/assets/image 4.png";
import { FormattedMessage } from "react-intl";

function Formulario() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const clickSubmit = async () => {
    const credentials = {
      login: formValues.email,
      password: formValues.password,
    };

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (response.ok) {
        setErrorMessage("");
        navigate("/robots", { state: { token: data.token } });
      } else {
        setErrorMessage("Error de autenticación. Revise sus credenciales");
      }
    } catch (error) {
      setErrorMessage("Error conectando con el backend: " + error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", justifyContent: "center" }}>
      <img src={logo} alt="Robot Lovers Logo" style={{ width: "1143px", marginBottom: "20px", height: "311px" }} />
      <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
        <FormattedMessage id="inicio_sesion"/>
      </h2>
      <Form style={{ maxWidth: "400px", width: "100%" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontWeight: "bold" }}>
            <FormattedMessage id="nombre_usuario"/>
            </Form.Label>
          <Form.Control
            type="email"
            placeholder=""
            name="email"
            onChange={handleChange}
            value={formValues.email}
            style={{ backgroundColor: "#e0e0e0", height: "40px" }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontWeight: "bold" }}>
            <FormattedMessage id="contrasena" />
          </Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            name="password"
            onChange={handleChange}
            value={formValues.password}
            style={{ backgroundColor: "#e0e0e0", height: "40px" }}
          />
        </Form.Group>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button style={{ backgroundColor: "#003087", border: "none", width: "48%", height: "40px" }} onClick={clickSubmit}>
              <FormattedMessage id="ingresar" />
          </Button>
          <Button style={{ backgroundColor: "#d9534f", border: "none", width: "48%", height: "40px" }} 
            onClick={() => setFormValues({ email: "", password: "" })}
> 
            <FormattedMessage id="cancelar" />
            </Button>
        </div>
      </Form>
    </div>
  );
}

export default Formulario;