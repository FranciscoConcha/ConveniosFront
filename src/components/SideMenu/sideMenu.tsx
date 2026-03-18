import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sideMenu.css";

export default function SideMenu() {

  const [open, setOpen] = useState(false);
  const navegate = useNavigate();
  
  const handledGoToStudens = ()=>{
    navegate("/Admin/Students");
  }
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

        <a onClick={handledGoToStudens}>Inicio</a>
        <a href="/estudiantes">Estudiantes</a>
        <a href="/admin">Administración</a>
        <a href="/logout">Cerrar sesión</a>
      </div>
    </>
  );
}