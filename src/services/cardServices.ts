import api from "./api";
import { API_CONFIG } from "../config/api.config";
import type { ResponseVerificateRut, VerifyResponse, VerifyAdminResponse } from "../interfaces/card.type";

export const cardServices = {
    verifityRut: async (rut: string): Promise<ResponseVerificateRut> =>{
        const response = await api.get<ResponseVerificateRut>(
            `${API_CONFIG.ENDPOINTS.TARJETA.VERIFICAR}${rut}`
        )
        return response.data;
    },
    getDataForCard: async (rut: string): Promise<VerifyResponse> =>{
        const response = await  api.get<VerifyResponse>(
            `${API_CONFIG.ENDPOINTS.TARJETA.OBTENER}${rut}`
        )
        return response.data;
    },
    getAllData: async (): Promise<VerifyAdminResponse[]> =>{
        const response = await api.get<VerifyAdminResponse[]> (
            API_CONFIG.ENDPOINTS.TARJETAADMIN.OBTENERLISTA
        )
        return response.data;
    },
    getByIdData: async (id:number): Promise<VerifyAdminResponse> =>{
        const response = await api.get<VerifyAdminResponse> (
            `${API_CONFIG.ENDPOINTS.TARJETAADMIN.OBTENERPORID}${id}`
        )
        return response.data;
    }

}