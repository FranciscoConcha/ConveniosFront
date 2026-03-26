import api from "./api";
import { API_CONFIG } from "../config/api.config";
import type { LoginResponse } from "../interfaces/login.type";
import axios from "axios";
import Cookies from 'js-cookie';


export const loginServices = {
    login: async (Email: string, Password: string): Promise<LoginResponse> => {
        try{
            const response = await api.post<LoginResponse>(
                API_CONFIG.ENDPOINTS.AUTH.LOGIN,
                {
                    email:Email,
                    password:Password
                }
            );
            if(response.data.data?.token){
                Cookies.set('token', response.data.data.token, { expires: 7,secure: true, sameSite: 'strict' });
            }
            return response.data;
        }catch(error: unknown){
            if(axios.isAxiosError(error) && error.response?.data){
                return error.response.data as LoginResponse;
            }
            return{
                message: "Error de conexión",
                data: null
            };
        }
        
    },


    logout: () => {
        Cookies.remove('token');
    },
    isAuthenticated: (): boolean => {
        return !!Cookies.get('token');
    },
    getToken: (): string | undefined => {
        return Cookies.get('token');
    }
}