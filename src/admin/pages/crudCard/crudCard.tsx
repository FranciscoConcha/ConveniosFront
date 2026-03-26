import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { cardAdminServices } from "../../Services/CardServices";
import { loginServices } from "../../../services/loginServices";
import type { ViewCardListDto } from "../../interfaces/cardAdmin.type";
import "./crudCard.css";
import HamburgerMenu from "../../../components/SideMenu/sideMenu";

export default function CardAdmin() {
    const [cards, setCards] = useState<ViewCardListDto[]>([]);
    const [filteredCards, setFilteredCards] = useState<ViewCardListDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    
    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    const navigate = useNavigate();
    const hasCalledRef = useRef(false);

    useEffect(() => {
        if (hasCalledRef.current) return;
        hasCalledRef.current = true;
        loadCards();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredCards(cards);
        } else {
            const filtered = cards.filter(card =>
                card.nameStudent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.idCardPublic.includes(searchTerm) ||
                card.career.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCards(filtered);
            setCurrentPage(1);
        }
    }, [searchTerm, cards]);

    const loadCards = async () => {
        try {
            setLoading(true);
            const response = await cardAdminServices.getAllCards();
            
            if (response?.success && response?.student) {
                setCards(response.student);
                setFilteredCards(response.student);
            } else {
                setError(response?.message || "No se pudieron cargar las tarjetas");
            }
        } catch (err: unknown) {
            setError("Error al cargar tarjetas");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        loginServices.logout();
        navigate('/AdminLogin');
    };

    // Calcular paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCards.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const getPaginationNumbers = () => {
        const pages: (number | string)[] = [];
        const range = 3;
        
        if (totalPages <= 9) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            
            const start = Math.max(2, currentPage - range);
            const end = Math.min(totalPages - 1, currentPage + range);
            
            if (start > 2) {
                pages.push('...');
            }
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            if (end < totalPages - 1) {
                pages.push('...');
            }
            
            pages.push(totalPages);
        }
        
        return pages;
    };

    if (loading) {
        return (
            <div className="admin-container">
                <div className="loading-message">Cargando tarjetas...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-container">
                <div className="error-message">{error}</div>
                <button className="btn btn-back" onClick={() => navigate("/")}>
                    Volver al inicio
                </button>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <HamburgerMenu />
            
            {/* HEADER */}
            <div className="admin-header">
                <h1 className="admin-title">Gestión de Tarjetas</h1>
                <div className="header-actions">
                    <button className="btn btn-logout" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                    <button className="btn btn-back" onClick={() => navigate("/")}>
                        Volver al inicio
                    </button>
                </div>
            </div>

            {/* BÚSQUEDA Y CONTROLES */}
            <div className="table-controls">
                <input
                    type="text"
                    placeholder="Buscar por nombre, ID o carrera..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                
                <div className="items-per-page">
                    <label>Mostrar:</label>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="select-items"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                    <span>tarjetas</span>
                </div>
            </div>

            {/* TABLA */}
            <div className="table-container">
                {currentItems.length === 0 ? (
                    <p className="no-results">No se encontraron tarjetas</p>
                ) : (
                    <table className="cards-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ID Tarjeta</th>
                                <th>Nombre</th>
                                <th>Carrera</th>
                                <th>Período</th>
                                <th>Usos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((card) => (
                                <tr key={card.id}>
                                    <td>{card.id}</td>
                                    <td className="card-id-cell">{card.idCardPublic}</td>
                                    <td>{card.nameStudent}</td>
                                    <td>{card.career}</td>
                                    <td>{new Date(card.periodStundet).toLocaleDateString()}</td>
                                    <td className="uses-cell">{card.uses}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* PAGINACIÓN */}
            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>
                    
                    <div className="pagination-numbers">
                        {getPaginationNumbers().map((page, index) => (
                            page === '...' ? (
                                <span key={`dots-${index}`} className="pagination-dots">...</span>
                            ) : (
                                <button
                                    key={`page-${index}`}
                                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                                    onClick={() => handlePageChange(page as number)}
                                >
                                    {page}
                                </button>
                            )
                        ))}
                    </div>
                    
                    <button
                        className="pagination-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Siguiente
                    </button>
                    
                    <span className="pagination-info">
                        Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredCards.length)} de {filteredCards.length}
                    </span>
                </div>
            )}
        </div>
    );
}
