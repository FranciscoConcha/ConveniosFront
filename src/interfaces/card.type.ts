export interface CardResponse {
    idCardPublic: string;
    nameStudent: string;
    rut: string;
    periodStundet: string;
    career: string;
}

export interface CardListOrIdResponse {
    id: number;
    idCardPublic: string;
    nameStudent: string;
    periodStundet: string;
    career: string;
    uses: number;
}

// ← AGREGAR ESTOS
export type ViewCardDto = CardResponse;
export type ViewCardListDto = CardListOrIdResponse;

export interface VerifyResponse {
    message: string;
    success: boolean;
    card?: CardResponse;
}

export interface VerifyAdminResponse {
    message: string;
    success: boolean;
    student?: CardListOrIdResponse[];
}

export interface ResponseVerificateRut {
    message: string;
    isValid: boolean;
}