// cardServices.ts

import { API_CONFIG } from "../../config/api.config";
import api from "../../services/api";
import type { ResponseViewCardDto, ResponseViewCardListDto, ResponseVerificateRut } from "../interfaces/cardAdmin.type";
import axios from "axios";

export const cardServices = {
    
    // GET /api/card/{rut} - obtener tarjeta por RUT
    getDataForCard: async (rut: string): Promise<ResponseViewCardDto | undefined> => {
        try {
            const response = await api.get<ResponseViewCardDto>(
                `${API_CONFIG.ENDPOINTS.TARJETA.OBTENER}${rut}`
            );
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return error.response.data as ResponseViewCardDto;
            }
        }
    },

    // GET /api/card/verificate/{rut} - verificar si RUT es válido
    verifityRut: async (rut: string): Promise<ResponseVerificateRut | undefined> => {
        try {
            const response = await api.get<ResponseVerificateRut>(
                `${API_CONFIG.ENDPOINTS.TARJETA.VERIFICAR}${rut}`
            );
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return error.response.data as ResponseVerificateRut;
            }
        }
    }
};

// Servicio para admin
export const cardAdminServices = {
    
    // GET /api/card/ - obtener todas las tarjetas
    getAllCards: async (): Promise<ResponseViewCardListDto | undefined> => {
        try {
            const response = await api.get<ResponseViewCardListDto>(
                API_CONFIG.ENDPOINTS.TARJETAADMIN.OBTENERLISTA
            );
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return error.response.data as ResponseViewCardListDto;
            }
        }
    },

    // GET /api/card/id={id} - obtener tarjeta por ID
    getCardById: async (id: number): Promise<unknown | undefined> => {
        try {
            const response = await api.get<unknown>(
                `${API_CONFIG.ENDPOINTS.TARJETAADMIN.OBTENERPORID}${id}`
            );
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return error.response.data;
            }
        }
    },
    checkData: async(idPublic:string ) =>{
        try{
            const response =await api.get(
            `${API_CONFIG.ENDPOINTS.TARJETA.COMPORBAR}/${idPublic}`,
                
            );
            return response.data;
        }catch(error: unknown){
            if(axios.isAxiosError(error)){
                return error.response?.data || {success: false, message:"Datos no encontrados"};
            }
            return {success: false, message:"datos no encontrados"};
        }

    },
    incrementUseCard: async (idPublic: string)=>{
        try{
            const response =await api.patch(
                API_CONFIG.ENDPOINTS.TARJETAADMIN.INCREMENTUSE,
                    {publicIdCard:idPublic}
            );
            return response.data;
        }catch(error: unknown){
            if(axios.isAxiosError(error)){
                return error.response?.data || {success: false, message:"Datos no encontrados"};
            }
            return {success: false, message:"datos no encontrados"};
        }
    }
};