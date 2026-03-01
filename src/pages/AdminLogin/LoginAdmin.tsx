import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginAdmin.css";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (correo.trim() && password.trim()) {
      navigate("/admin");
    } else {
      alert("Por favor ingresa RUT y contraseña");
    }
  };

  const handleInit = ()=>{
    navigate("/home");
  }

  return (
    <div className="main-container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Acceso Administrador</h1>
          <div className="card-underline"></div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rut">Correo</label>
            <input
              id="Correo"
              type="text"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@dirección.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              Ingresar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setCorreo("");
                setPassword("");
              }}
            >
              Limpiar
            </button>
          </div>
        </form>

        <div style={{ marginTop: 24 }}>
          <button className="btn btn-back" onClick={handleInit}>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
