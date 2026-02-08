import { useState } from "react";
import "./CardDisplay.css";

export default function CardDisplay() {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="main-container">
            <div className="card-container">
                <h2 className="card-instruction">Haz clic en la tarjeta para voltearla</h2>
                
                <div className={`card-flip ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                    {/* Cara frontal */}
                    <div className="card-face card-front">
                        <div className="card-header-virtual">
                            <h1 className="card-logo">DISC</h1>
                            <p className="card-subtitle">Tarjeta Estudiantil</p>
                        </div>
                        
                        <div className="card-body">
                            <div className="card-chip"></div>
                            
                            <div className="card-info">
                                <div className="info-group">
                                    <label>Nombre</label>
                                    <p>Juan Pérez González</p>
                                </div>
                                
                                <div className="info-row">
                                    <div className="info-group">
                                        <label>RUT</label>
                                        <p>12.345.678-9</p>
                                    </div>
                                    <div className="info-group">
                                        <label>Carrera</label>
                                        <p>Ingeniería</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="card-footer-virtual">
                            <p>Válida hasta: 12/2025</p>
                        </div>
                    </div>

                    {/* Cara trasera */}
                    <div className="card-face card-back">
                        <div className="magnetic-strip"></div>
                        
                        <div className="card-back-content">
                            <h3>Beneficios Incluidos</h3>
                            
                            <ul className="benefits-list">
                                <li>✓ Descuentos en alimentación</li>
                                <li>✓ Transporte estudiantil</li>
                                <li>✓ Material académico</li>
                                <li>✓ Actividades deportivas</li>
                                <li>✓ Eventos culturales</li>
                            </ul>
                            
                            <div className="card-number">
                                <label>Número de Tarjeta</label>
                                <p>**** **** **** 5678</p>
                            </div>
                        </div>
                        
                        <div className="card-footer-back">
                            <p>Para más información visita disc.cl</p>
                        </div>
                    </div>
                </div>
                
                <button className="btn btn-back" onClick={() => window.history.back()}>
                    Volver al inicio
                </button>
            </div>
        </div>
    );
}