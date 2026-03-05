export interface loginData {
    email: string,
    token: string,
    rol: string,
    charge: string
}

export interface LoginResponse {
    message: string,
    data: loginData |null
}
