// convenios.type.ts

export interface GetAgreementsDto {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    forWhom: string;
}

export interface responseGetAgreements {
    success: boolean;
    message: string;
    data?: GetAgreementsDto[];
}

export interface CreateAgreements {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    forWhom: string;
}

export interface ResponseCreateAgreements {
    success: boolean;
    message: string;
    data?: {
        id: number;
        name: string;
        description: string;
        startDate: string;
        endDate: string;
        isActive: boolean;
        forWhom: string;
    };
}