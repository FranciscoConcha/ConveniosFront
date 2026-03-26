import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { cardServices } from "../../services/cardServices";
import "./RutVerificate.css"

export default function RutVerificate(){
    const [Verificate,SetVerificate] = useState(false);
    const [Rut,SetRut] = useState("");
    const [Error, SetError] = useState("");
    const navigate= useNavigate();

    const ValidateRut=(rut: string)=>{
        if(!rut.trim()){
            SetError("Por favor ingrese un rut");
            return false;
        }
        rut = rut.trim();
        const re = /^[0-9]{7,9}$|^[0-9]{7,8}-[0-9kK]$|^[0-9]{1,2}(\.[0-9]{3}){2}-[0-9kK]$/;
        return re.test(rut);
    }
    
    const getErrorMessage = (error: unknown): string => {
        if (axios.isAxiosError(error)) {
            return error.response?.data?.message || "ERROR: PROBLEMAS CON EL SERVIDOR";
        }
        return "ERROR: PROBLEMAS CON EL SERVIDOR";
    };

    const handleVerificateRut = async () => {
        if(!ValidateRut(Rut)){
            SetError("Rut no válido o formato inválido");    
            return;
        }
        
        SetError("");
        
        try {
            SetVerificate(true);
            const response = await cardServices.verifityRut(Rut);
            
            if (response?.isValid) {
                SetVerificate(false);
                navigate('/CardDisplay', { state: Rut });
                return;
            }
            
            SetError(response?.message || "RUT no registrado");
            SetVerificate(false);

        } catch(error: unknown) {
            SetError(getErrorMessage(error));
            SetVerificate(false);
        }
    }

    const handleBackToHome = () => {
        navigate("/home");
    }

    const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        SetRut(e.target.value);
        SetError(""); 
    }

    return(
        <div className="main-container">
            <div className="card">
                <div className="card-header">
                    <h1 className="card-title">Comprobar RUT</h1>
                    <div className="card-underline"></div>
                </div>

                <div className="card-buttons">
                    <input 
                        value={Rut}
                        onChange={handleRutChange}
                        placeholder="Ingrese RUT: 12345678K"
                        className="input-Rut"
                    />
                    
                    {Error && <p className="error-message" style={{color:"red"}}>{Error}</p>}
                    
                    {Verificate && <p style={{color: "green"}}>Verificando RUT...</p>}

                    <button 
                        className="btn btn-primary"
                        onClick={handleVerificateRut}
                        disabled={Verificate}
                    >
                        {Verificate ? "Verificando..." : "Ingresar a la tarjeta"}
                    </button>
                    
                    <button 
                        className="btn btn-primary"
                        onClick={handleBackToHome}
                    >
                        Menú principal
                    </button>
                </div>
            </div>
        </div>
    )
}
