import { useNavigate } from "react-router-dom";
import { loginServices } from "../../../services/loginServices";
import SideMenu from "../../../components/SideMenu/sideMenu";
import "./main.css";

export default function AdminMain() {
  const navigate = useNavigate();

  const handleLogout = () => {
    loginServices.logout();
    navigate("/AdminLogin");
  };

  return (
    <div className="admin-main-container">
      <SideMenu />

      <div className="admin-main-header">
        <h1 className="admin-main-title">Panel Administrativo</h1>
        <div className="admin-main-actions">
          <button className="admin-main-btn admin-main-btn-home" onClick={() => navigate("/home")}>
            Volver al inicio
          </button>
          <button className="admin-main-btn admin-main-btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <section className="admin-main-content">
        <article className="admin-main-card">
          <h2>Gestión de Estudiantes</h2>
          <p>Administra estudiantes, búsqueda, edición, estado activo/inactivo y carga de Excel.</p>
          <button className="admin-main-btn admin-main-btn-primary" onClick={() => navigate("/Students")}>
            Ir a estudiantes
          </button>
        </article>

        <article className="admin-main-card">
          <h2>Gestión de Tarjetas</h2>
          <p>Sección de visualización de uso de tarjetas.</p>
          <button className="admin-main-btn admin-main-btn-primary" onClick={()=>navigate("/Card")}>
            Ir a tarjetas
          </button>
        </article>
        <article className="admin-main-card">
          <h2>Verificar qr</h2>
          <p>Sección de visualización de uso de tarjetas.</p>
          <button className="admin-main-btn admin-main-btn-primary" onClick={()=>navigate("/QrVerify")}>
            Ir a tarjetas
          </button>
        </article>
      </section>
      
    </div>
  );
}
