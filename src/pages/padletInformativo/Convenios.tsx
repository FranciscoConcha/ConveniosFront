import "./Convenios.css";
import { useNavigate } from "react-router-dom";

export default function Convenios() {
        const navigate= useNavigate();

    const handleBackToHome =()=>{
        navigate("/home");
    }
    return (
        <div className="main-container">
            <div className="convenios-container">
                <h1 className="convenios-title">Convenios DISC</h1>
                <p className="convenios-subtitle">Descubre todos los beneficios disponibles para estudiantes</p>
                
                <div className="convenios-grid">
                    {/* Convenio 1 */}
                    <div className="convenio-card">
                        <div className="convenio-image">
                            <img src="/convenios/restaurante.jpg" alt="Restaurantes" />
                        </div>
                        <div className="convenio-content">
                            <h3>Restaurantes</h3>
                            <p className="convenio-description">
                                Obtén descuentos de hasta 20% en restaurantes adheridos.
                            </p>
                            <div className="convenio-how">
                                <h4>¿Cómo canjear?</h4>
                                <ol>
                                    <li>Muestra tu tarjeta DISC al momento de pagar</li>
                                    <li>El descuento se aplicará automáticamente</li>
                                    <li>Válido de lunes a viernes</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Convenio 2 */}
                    <div className="convenio-card">
                        <div className="convenio-image">
                            <img src="/convenios/transporte.jpg" alt="Transporte" />
                        </div>
                        <div className="convenio-content">
                            <h3>Transporte</h3>
                            <p className="convenio-description">
                                Tarifa especial en transporte público urbano.
                            </p>
                            <div className="convenio-how">
                                <h4>¿Cómo canjear?</h4>
                                <ol>
                                    <li>Registra tu tarjeta en el sistema de transporte</li>
                                    <li>Pasa tu tarjeta al subir al bus</li>
                                    <li>El descuento se carga automáticamente</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Convenio 3 */}
                    <div className="convenio-card">
                        <div className="convenio-image">
                            <img src="/convenios/libreria.jpg" alt="Librerías" />
                        </div>
                        <div className="convenio-content">
                            <h3>Librerías</h3>
                            <p className="convenio-description">
                                15% de descuento en material académico y papelería.
                            </p>
                            <div className="convenio-how">
                                <h4>¿Cómo canjear?</h4>
                                <ol>
                                    <li>Presenta tu tarjeta antes de pagar</li>
                                    <li>Válido para libros, cuadernos y material</li>
                                    <li>No acumulable con otras promociones</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Convenio 4 */}
                    <div className="convenio-card">
                        <div className="convenio-image">
                            <img src="/convenios/gimnasio.jpg" alt="Gimnasios" />
                        </div>
                        <div className="convenio-content">
                            <h3>Gimnasios</h3>
                            <p className="convenio-description">
                                Acceso preferencial y descuentos en membresías deportivas.
                            </p>
                            <div className="convenio-how">
                                <h4>¿Cómo canjear?</h4>
                                <ol>
                                    <li>Muestra tu tarjeta al momento de inscribirte</li>
                                    <li>Obtén 25% de descuento en la membresía</li>
                                    <li>Válido en gimnasios adheridos</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Convenio 5 */}
                    <div className="convenio-card">
                        <div className="convenio-image">
                            <img src="/convenios/cine.jpg" alt="Entretenimiento" />
                        </div>
                        <div className="convenio-content">
                            <h3>Entretenimiento</h3>
                            <p className="convenio-description">
                                Descuentos en cines, teatros y eventos culturales.
                            </p>
                            <div className="convenio-how">
                                <h4>¿Cómo canjear?</h4>
                                <ol>
                                    <li>Compra tus entradas en boletería o online</li>
                                    <li>Ingresa tu número de tarjeta DISC</li>
                                    <li>Disfruta hasta 30% de descuento</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Convenio 6 */}
                    <div className="convenio-card">
                        <div className="convenio-image">
                            <img src="/convenios/tecnologia.jpg" alt="Tecnología" />
                        </div>
                        <div className="convenio-content">
                            <h3>Tecnología</h3>
                            <p className="convenio-description">
                                Ofertas especiales en equipos tecnológicos y software.
                            </p>
                            <div className="convenio-how">
                                <h4>¿Cómo canjear?</h4>
                                <ol>
                                    <li>Visita las tiendas autorizadas</li>
                                    <li>Presenta tu tarjeta DISC</li>
                                    <li>Accede a precios preferenciales</li>
                                </ol>
                            </div>
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