export interface studentAdmin {
    id: number;
    name: string;
    rut: string;
    career: string;
    isActive: boolean;
}

export interface ApiResponse<T> {
    student: T;
    message: string;
}

export type responseAllStudentAdmin = ApiResponse<studentAdmin[]>;
export type responseStudentAdminGeneric = ApiResponse<studentAdmin>;