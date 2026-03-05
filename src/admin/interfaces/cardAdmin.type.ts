export interface cardAll{
    id : number;
    idCardPublic:string;
    nameStudent:string;
    periodStudent:string;
    career:string;
    uses:number;
}
export interface responseCardAll{
    student: cardAll[];
    message: string;
}
export interface responseCardAllById{
    student: cardAll;
    message: string;
}