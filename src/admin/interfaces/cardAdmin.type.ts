// card.type.ts

export interface ViewCardDto {
    idCardPublic: string;
    nameStudent: string;
    rut: string;
    periodStundet: string;
    career: string;
}

export interface ViewCardListDto {
    id: number;
    idCardPublic: string;
    nameStudent: string;
    periodStundet: string;
    career: string;
    uses: number;
}

export interface ResponseViewCardDto {
    message: string;
    success: boolean;
    card?: ViewCardDto;
}

export interface ResponseViewCardListDto {
    message: string;
    success: boolean;
    student?: ViewCardListDto[];
}

export interface ResponseVerificateRut {
    message: string;
    isValid: boolean;
}

export interface cardAll extends ViewCardListDto {
    isActive?: boolean;
}