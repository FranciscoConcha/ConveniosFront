import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css"

export default function Main(){
    const [AdminBtn, SetAdminBtn] = useState(false);
    const [CardBtn, SetCardBtn] = useState(false);
    const [InfoBtn, SetInfoBtn] = useState(false);
    const navigate= useNavigate();
    
    const handleVerificarRUT = () => {
        SetCardBtn(true);
        
        navigate('/VerificateRut');
    };

    const handleIngresarAdmin = () => {
        SetAdminBtn(true);
        // Aquí tu lógica para admin
        // navigate('/admin');
    };

    const handlePadlet = () => {
        SetInfoBtn(true);
        // Aquí tu lógica para padlet
        //window.open('https://padlet.com/...', '_blank'); // Reemplaza con tu URL
    };

    return(
        <div className="main-container">
            <div className="card">
                <div className="card-header">
                    <h1 className="card-title">Beneficios DISC</h1>
                    <div className="card-underline"></div>
                </div>

                <div className="card-buttons">
                    <button 
                        className="btn btn-primary"
                        onClick={handleVerificarRUT}
                    >
                        Tarjeta virtual
                    </button>

                    <button 
                        className="btn btn-primary"
                        onClick={handleIngresarAdmin}
                    >
                        Administrador
                    </button>

                    <button 
                        className="btn btn-secondary"
                        onClick={handlePadlet}
                    >
                        Información del convenio
                    </button>
                </div>

                <div className="card-logos">
                    <img src="/logos/cafco.png" alt="ICCI" className="logo" />
                    <img src="/logos/cecap.png" alt="IenCI" className="logo" />
                    <img src="/logos/cejh.png" alt="ICEL" className="logo" />
                </div>
            </div>
        </div>
    )
}