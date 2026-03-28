import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import "./CardDisplay.css";
import { cardServices } from "../../services/cardServices";
import type { ViewCardDto } from "../../interfaces/card.type";

export default function CardDisplay() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [data, setData] = useState<ViewCardDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate()
    const location = useLocation();
    const rut = location.state;
    const hasCalledRef = useRef(false);

    useEffect(()=>{
        if (hasCalledRef.current || !rut) return;
        hasCalledRef.current = true;

        const handleGetData = async () => {
            try {
                const response = await cardServices.getDataForCard(rut);
                console.log(response)
                if (response?.card) {
                    setData({
                        ...response.card,
                        periodStundet: new Date(response.card.periodStundet).toISOString()
                    });
                } else {
                    setError(response?.message || "ERROR: No se cargaron los datos");
                }
            } catch(err: unknown) {
                setError("Error al obtener datos");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        
        handleGetData();
    }, [rut]);

    const handleBackToHome = () => {
        navigate("/home");
    }

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    if (loading) {
        return (
            <div className="main-container">
                <h2>Cargando tarjeta...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="main-container">
                <h2 style={{ color: "red" }}>{error}</h2>
                <button className="btn btn-back" onClick={handleBackToHome}>
                    Volver al inicio
                </button>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="main-container">
                <h2>No se encontraron datos</h2>
                <button className="btn btn-back" onClick={handleBackToHome}>
                    Volver al inicio
                </button>
            </div>
        );
    }

    return (
        <div className="main-container">
            <div className="card-container">
                <h2 className="card-instruction">Haz clic en la tarjeta para voltearla</h2>
                
                <div className={`card-flip ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                    {/* CARA FRONTAL */}
                    <div className="card-face card-front">
                        <div className="card-front-content">
                            <div className="card-header-main">
                                <h1 className="card-logo">DISC</h1>
                                <p className="card-subtitle">Tarjeta Estudiantil</p>
                            </div>
                            
                            {/* QR EN LUGAR DEL CHIP */}
                            <div className="card-qr-chip">
                                <QRCode
                                    value={data.idCardPublic}
                                    size={64}
                                    level="H"
                                    fgColor="#000000"
                                    bgColor="#ffffff"
                                />
                            </div>
                            
                            <div className="card-user-data">
                                <div className="data-group full-width">
                                    <label>NOMBRE</label>
                                    <p className="data-value">{data?.nameStudent}</p>
                                </div>
                                
                                <div className="data-row">
                                    <div className="data-group">
                                        <label>RUT</label>
                                        <p className="data-value">{data?.rut}</p>
                                    </div>
                                    <div className="data-group">
                                        <label>CARRERA</label>
                                        <p className="data-value">{data?.career}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Fecha */}
                            <div className="card-validity">
                                <p>Válida hasta: {new Date(data?.periodStundet).toISOString().split("T")[0]}</p>
                            </div>
                        </div>
                    </div>

                    {/* CARA TRASERA */}
                    <div className="card-face card-back">
                        <div className="magnetic-strip"></div>
                        
                        <div className="card-back-content">
                            <h3 className="benefits-title">Beneficios Incluidos</h3>

                            <ul className="benefits-list">
                                <li>✓ Descuentos en alimentación</li>
                                <li>✓ Material académico</li>
                                <li>✓ Actividades deportivas</li>
                            </ul>

                            <div className="card-divider"></div>
                            
                            <div className="card-id-section">
                                <label className="card-id-label">NÚMERO DE TARJETA</label>
                                <p className="card-id-value monospace">{data.idCardPublic}</p>
                            </div>
                            
                            <p className="card-footer-text">Para más información visita disc.cl</p>
                        </div>
                    </div>
                </div>
                
                <button className="btn btn-back" onClick={handleBackToHome}>
                    Volver al inicio
                </button>
            </div>
        </div>
    );
}
