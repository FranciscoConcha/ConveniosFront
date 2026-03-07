import { useState } from "react";
import "./sideMenu.css";

export default function SideMenu() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* zona invisible para activar el menú */}
      <div 
        className="menu-trigger"
        onMouseEnter={() => setOpen(true)}
      />

      {/* menú */}
      <div 
        className={`side-menu ${open ? "open" : ""}`}
        onMouseLeave={() => setOpen(false)}
      >
        <h2>Menú</h2>

        <a href="/">Inicio</a>
        <a href="/estudiantes">Estudiantes</a>
        <a href="/admin">Administración</a>
        <a href="/logout">Cerrar sesión</a>
      </div>
    </>
  );
}