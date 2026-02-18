import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginAdmin.css";

export default function LoginAdmin() {
  const navigate = useNavigate();
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rut.trim() && password.trim()) {
      navigate("/admin");
    } else {
      alert("Por favor ingresa RUT y contraseña");
    }
  };

  return (
    <div className="main-container">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Acceso Administrador</h1>
          <div className="card-underline"></div>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rut">RUT</label>
            <input
              id="rut"
              type="text"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              placeholder="12.345.678-9"
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
                setRut("");
                setPassword("");
              }}
            >
              Limpiar
            </button>
          </div>
        </form>

        <div style={{ marginTop: 24 }}>
          <button className="btn btn-back" onClick={() => window.history.back()}>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
