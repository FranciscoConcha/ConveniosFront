export interface CardResponse {
    idCardPublic: string,
    nameStudent: string,
    rut: string,
    periodStundet: Date,
    career: string
}
export interface CardListOrIdResponse{
    id:number,
    idCardPublic: string,
    nameStudent: string,
    periodStundet: Date,
    career: string,
    uses:number
}
export interface VerifyResponse{
    message:string,
    card: CardResponse
}
export interface VerifyAdminResponse{
    message:string,
    card: CardListOrIdResponse
}
export interface ResponseVerificateRut {
    message:string,
    isValid:boolean
}