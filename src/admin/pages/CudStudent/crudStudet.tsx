import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { studentAdminServices } from "../../Services/StudentAdminServices";
import type { studentAdmin } from "../../interfaces/studentAdmin.type";
import { loginServices } from "../../../services/loginServices";
import "./crudStudent.css";

export default function StudentAdmin() {
    const [students, setStudents] = useState<studentAdmin[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<studentAdmin[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState({ name: "", career: "" });
    
    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
    const navigate = useNavigate();

    useEffect(() => {
        loadStudents();
    }, []);

    useEffect(() => {
        // Filtrar estudiantes cuando cambia el término de búsqueda
        if (searchTerm.trim() === "") {
            setFilteredStudents(students);
        } else {
            const filtered = students.filter(student =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.rut.includes(searchTerm) ||
                student.career.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredStudents(filtered);
            setCurrentPage(1); // Resetear a página 1 al buscar
        }
    }, [searchTerm, students]);

    const loadStudents = async () => {
        try {
            setLoading(true);
            const response = await studentAdminServices.getAllStudents();
            
            if (response?.student) {
                setStudents(response.student);
                setFilteredStudents(response.student);
            } else {
                setError(response?.message || "No se pudieron cargar los estudiantes");
            }
        } catch (err: unknown) {
            setError("Error al cargar estudiantes");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (student: studentAdmin) => {
        setEditingId(student.id);
        setEditForm({
            name: student.name,
            career: student.career,
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({ name: "", career: "" });
    };

    const handleSaveEdit = async (id: number) => {
        try {
            const response = await studentAdminServices.UpdateStudent(
                id,
                editForm.name,
                editForm.career
            );

            if (response?.student) {
                setStudents(students.map(s => 
                    s.id === id ? response.student : s
                ));
                setEditingId(null);
                setEditForm({ name: "", career: "" });
            } else {
                alert(response?.message || "Error al actualizar");
            }
        } catch (err: unknown) {
            alert("Error al actualizar estudiante");
            console.error(err);
        }
    };

    const handleToggleActive = async (id: number) => {
        try {
            const response = await studentAdminServices.UpdateStateStudent(id);

            if (response?.student) {
                setStudents(students.map(s => 
                    s.id === id ? response.student : s
                ));
            } else {
                alert(response?.message || "Error al cambiar estado");
            }
        } catch (err: unknown) {
            alert("Error al cambiar estado del estudiante");
            console.error(err);
        }
    };

    const handleLogout = () => {
        loginServices.logout();
        navigate('/AdminLogin');
    };

    // Calcular paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="admin-container">
                <div className="loading-message">Cargando estudiantes...</div>
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
            {/* HEADER */}
            <div className="admin-header">
                <h1 className="admin-title">Gestión de Estudiantes</h1>
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
                    placeholder="Buscar por nombre, RUT o carrera..."
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
                    </select>
                    <span>estudiantes</span>
                </div>
            </div>

            {/* TABLA */}
            <div className="table-container">
                {currentItems.length === 0 ? (
                    <p className="no-results">No se encontraron estudiantes</p>
                ) : (
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>RUT</th>
                                <th>Carrera</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((student) => (
                                <tr key={student.id} className={!student.isActive ? 'inactive-row' : ''}>
                                    <td>{student.id}</td>
                                    
                                    {editingId === student.id ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editForm.name}
                                                    onChange={(e) =>
                                                        setEditForm({ ...editForm, name: e.target.value })
                                                    }
                                                    className="edit-input"
                                                />
                                            </td>
                                            <td>{student.rut}</td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={editForm.career}
                                                    onChange={(e) =>
                                                        setEditForm({ ...editForm, career: e.target.value })
                                                    }
                                                    className="edit-input"
                                                />
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{student.name}</td>
                                            <td>{student.rut}</td>
                                            <td>{student.career}</td>
                                        </>
                                    )}
                                    
                                    <td>
                                        <span className={`status-badge ${student.isActive ? 'active' : 'inactive'}`}>
                                            {student.isActive ? "Activo" : "Inactivo"}
                                        </span>
                                    </td>
                                    
                                    <td>
                                        <div className="table-actions">
                                            {editingId === student.id ? (
                                                <>
                                                    <button
                                                        className="btn-table btn-save"
                                                        onClick={() => handleSaveEdit(student.id)}
                                                    >
                                                        Guardar
                                                    </button>
                                                    <button
                                                        className="btn-table btn-cancel"
                                                        onClick={handleCancelEdit}
                                                    >
                                                        Cancelar
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        className="btn-table btn-edit"
                                                        onClick={() => handleEdit(student)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className={`btn-table ${student.isActive ? 'btn-deactivate' : 'btn-activate'}`}
                                                        onClick={() => handleToggleActive(student.id)}
                                                    >
                                                        {student.isActive ? "Desactivar" : "Activar"}
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
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
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
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
                        Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredStudents.length)} de {filteredStudents.length}
                    </span>
                </div>
            )}
        </div>
    );
}