// agreementsServices.ts

import { API_CONFIG } from "../../config/api.config";
import api from "../../services/api";
import type { responseGetAgreements } from "../interfaces/Agreements.type";
import axios from "axios";

export const agreementsServices = {
    
    getAllAgreements: async (): Promise<responseGetAgreements | undefined> => {
        try {
            const response = await api.get<responseGetAgreements>(
                API_CONFIG.ENDPOINTS.CONVENIOS.LISTAR
            );
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return error.response.data as responseGetAgreements;
            }
        }
    },

    getAgreementById: async (id: number): Promise<unknown | undefined> => {
        try {
            const response = await api.get<unknown>(
                `${API_CONFIG.ENDPOINTS.CONVENIOS.OBTENER}${id}`
            );
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data) {
                return error.response.data;
            }
        }
    }
};