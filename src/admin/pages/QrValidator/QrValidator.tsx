import { useEffect, useState, useRef } from "react";
import { cardAdminServices } from "../../Services/CardServices";
import { agreementsServices } from "../../Services/AgreementsServices";
import type { ViewCardListDto } from "../../../interfaces/card.type";
import type { GetAgreementsDto } from "../../interfaces/Agreements.type";
import "./qrValidator.css";
import HamburgerMenu from "../../../components/SideMenu/sideMenu";

export default function QRValidator() {
    const [qrInput, setQrInput] = useState("");
    const [cardData, setCardData] = useState<ViewCardListDto | null>(null);
    const [agreements, setAgreements] = useState<GetAgreementsDto[]>([]);
    const [selectedAgreement, setSelectedAgreement] = useState("");
    const [validationResult, setValidationResult] = useState<{ valid: boolean; message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const hasLoadedAgreements = useRef(false);

    // Cargar convenios al montar
    useEffect(() => {
        if (hasLoadedAgreements.current) return;
        hasLoadedAgreements.current = true;
        loadAgreements();
    }, []);

    // Auto-focus en input
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const loadAgreements = async () => {
        try {
            const response = await agreementsServices.getAllAgreements();
            if (response?.success && response?.data) {
                // Filtrar solo los convenios activos
                const activeAgreements = response.data.filter(a => a.isActive);
                setAgreements(activeAgreements);
            }
        } catch (err) {
            console.error("Error al cargar convenios:", err);
        }
    };

    const handleQRScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setQrInput(value);
        setValidationResult(null);

        if (value.length > 5) {
            try {
                setLoading(true);
                setError("");

                // Buscar tarjeta por idCardPublic o ID
                const allCards = await cardAdminServices.getAllCards();
                
                if (allCards?.success && allCards?.student) {
                    const found = allCards.student.find(card =>
                        card.idCardPublic.includes(value) || card.id.toString() === value
                    );

                    if (found) {
                        setCardData(found);
                    } else {
                        setError("Tarjeta no encontrada");
                        setCardData(null);
                    }
                } else {
                    setError("Error al buscar tarjeta");
                }
            } catch (err) {
                setError("Error al buscar tarjeta");
                console.error(err);
                setCardData(null);
            } finally {
                setLoading(false);
            }
        }
    };

    const validateCard = () => {
        if (!cardData) {
            setValidationResult({ valid: false, message: "Escanea una tarjeta primero" });
            return;
        }

        if (!selectedAgreement) {
            setValidationResult({ valid: false, message: "Selecciona un convenio" });
            return;
        }

        // Validación: Verificar fecha de vencimiento de la tarjeta
        const today = new Date();
        const cardDate = new Date(cardData.periodStundet);
        
        if (cardDate < today) {
            setValidationResult({ 
                valid: false, 
                message: "❌ Tarjeta vencida" 
            });
            return;
        }

        // Validación: Verificar que el convenio esté dentro de sus fechas
        const selectedAgreementData = agreements.find(a => a.name === selectedAgreement);
        
        if (selectedAgreementData) {
            const startDate = new Date(selectedAgreementData.startDate);
            const endDate = new Date(selectedAgreementData.endDate);
            
            if (today < startDate) {
                setValidationResult({ 
                    valid: false, 
                    message: `❌ Convenio aún no vigente (inicia el ${startDate.toLocaleDateString()})`
                });
                return;
            }
            
            if (today > endDate) {
                setValidationResult({ 
                    valid: false, 
                    message: `❌ Convenio ya expiró (finalizó el ${endDate.toLocaleDateString()})`
                });
                return;
            }
        }

        // Si todo es válido
        setValidationResult({
            valid: true,
            message: `✅ Acceso válido a: ${selectedAgreement}`
        });
    };

    const handleClear = () => {
        setQrInput("");
        setCardData(null);
        setSelectedAgreement("");
        setValidationResult(null);
        setError("");
        inputRef.current?.focus();
    };

    return (
        <div className="qr-validator-page">
            <HamburgerMenu />

            <div className="qr-validator-container">
                <div className="qr-card">
                    <h2>🔍 Validador de Tarjetas</h2>
                    <p className="subtitle">Escanea el código QR o ingresa el ID</p>

                    {/* INPUT QR */}
                    <div className="qr-input-group">
                        <label>Código QR / ID Tarjeta:</label>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Escanea aquí..."
                            value={qrInput}
                            onChange={handleQRScan}
                            className="qr-input"
                        />
                    </div>

                    {/* LOADING */}
                    {loading && <p className="loading-text">⏳ Buscando tarjeta...</p>}

                    {/* ERROR */}
                    {error && <p className="error-text">⚠️ {error}</p>}

                    {/* DATOS DE TARJETA */}
                    {cardData && (
                        <div className="card-details">
                            <h3>📋 Datos de la Tarjeta</h3>
                            
                            <div className="detail-row">
                                <span className="label">Nombre:</span>
                                <span className="value">{cardData.nameStudent}</span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Carrera:</span>
                                <span className="value">{cardData.career}</span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Vencimiento:</span>
                                <span className="value">
                                    {new Date(cardData.periodStundet).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="detail-row">
                                <span className="label">Usos:</span>
                                <span className="value">{cardData.uses}</span>
                            </div>

                            {/* SELECCIONAR CONVENIO */}
                            <div className="agreement-select">
                                <label>Convenio a validar:</label>
                                {agreements.length === 0 ? (
                                    <p className="no-agreements">No hay convenios disponibles</p>
                                ) : (
                                    <select
                                        value={selectedAgreement}
                                        onChange={(e) => setSelectedAgreement(e.target.value)}
                                        className="select"
                                    >
                                        <option value="">-- Selecciona convenio --</option>
                                        {agreements.map(a => (
                                            <option key={a.id} value={a.name}>
                                                {a.name} - {a.forWhom}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* INFORMACIÓN DEL CONVENIO SELECCIONADO */}
                            {selectedAgreement && (
                                <div className="agreement-info">
                                    {agreements.map(a => a.name === selectedAgreement && (
                                        <div key={a.id}>
                                            <p className="agreement-desc">{a.description}</p>
                                            <p className="agreement-dates">
                                                Vigencia: {new Date(a.startDate).toLocaleDateString()} - {new Date(a.endDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* BOTÓN VALIDAR */}
                            <button className="btn-validate" onClick={validateCard}>
                                Validar Acceso
                            </button>
                        </div>
                    )}

                    {/* RESULTADO VALIDACIÓN */}
                    {validationResult && (
                        <div className={`validation-result ${validationResult.valid ? 'valid' : 'invalid'}`}>
                            {validationResult.message}
                        </div>
                    )}

                    {/* BOTÓN LIMPIAR */}
                    {cardData && (
                        <button className="btn-clear" onClick={handleClear}>
                            Limpiar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
