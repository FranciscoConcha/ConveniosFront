import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./RutVerificate.css"


export default function RutVerificate(){

    const [Verificate,SetVerificate] = useState(false);
    const [Rut,SetRut] = useState("");
    const [Error, SetError] = useState("");
    const navigate= useNavigate();

    const ValidateRut=(rut: string)=>{
        rut = rut.trim();
        const re = /^[0-9]{7,9}$|^[0-9]{7,8}-[0-9kK]$|^[0-9]{1,2}(\.[0-9]{3}){2}-[0-9kK]$/;
        return re.test(rut);
    }
    

    const handleVerificateRut=()=>{
        if(!ValidateRut(Rut)){
            SetError("Rut no valido en formato no valido");    
            console.log(Error);        
            return;
        }
        SetError("");
        SetVerificate(true);
        navigate('/CardDisplay')
        
    }
    const handleBackToHome =()=>{
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
                    <h1 className="card-title">Comprobar rut</h1>
                    <div className="card-underline"></div>
                </div>

                <div className="card-buttons">
                    <input 
                        value={Rut}
                        onChange={handleRutChange}
                        placeholder="Ingrese RUT: 12.345.678-k o 12345678K"
                        className="input-Rut"
                    ></input>
                    {Error &&<p className="error-message" style={{color :"red"}}>{Error}</p>}
                    {Verificate && <p style={{color: "green"}}>RUT verificado correctamente</p>}

                    <button 
                        className="btn btn-primary"
                        
                        onClick={handleVerificateRut}
                    >
                        Ingresar a la tarjeta
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