import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sideMenu.css";

export default function SideMenu() {

  const [open, setOpen] = useState(false);
  const navegate = useNavigate();
  
  const handledGoToMain = ()=>{
    navegate("/main");
  }
  const handleGoToStudents = ()=>{
    navegate("/Students");
  }
  const handleGoToCards = ()=>{
    navegate("/Card");
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

        <a onClick={handledGoToMain}>Inicio</a>
        <a onClick={handleGoToStudents} >Estudiantes</a>
        <a onClick={handleGoToCards}>Tarjetas</a>
        <a href="/logout">Cerrar sesión</a>
      </div>
    </>
  );
}