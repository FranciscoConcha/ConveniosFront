import { API_CONFIG } from "../../config/api.config";
import api from "../../services/api";
import type {responseStudentAdminGeneric,responseAllStudentAdmin  } from "../interfaces/studentAdmin.type";
import axios from "axios";

export const studentAdminServices = {
    getAllStudents: async (): Promise<responseAllStudentAdmin | undefined> => {
        try{
            const response = await api.get<responseAllStudentAdmin>(
                API_CONFIG.ENDPOINTS.ESTUDIANTES.OBTENERLISTA
            );
            return response.data;
        }catch(error: unknown){
            if(axios.isAxiosError(error) && error.response?.data){
                return error.response.data as responseAllStudentAdmin;
            }   
        }
    },
    getAllStudentsById: async (id: number): Promise<responseStudentAdminGeneric | undefined> => {
        try{
            const response = await api.get<responseStudentAdminGeneric>(
                `${API_CONFIG.ENDPOINTS.ESTUDIANTES.OBTENERLISTA}/id=${id}`
            );
            return response.data;
        }catch(error: unknown){
            if(axios.isAxiosError(error) && error.response?.data){
                return error.response.data as responseStudentAdminGeneric;
            }
        }
    },
    UpdateStudent: async ( id :number,name: string,  career: string):  Promise<responseStudentAdminGeneric | undefined> => {
        try{
            const response = await api.patch<responseStudentAdminGeneric>(
                `${API_CONFIG.ENDPOINTS.ESTUDIANTES.ACTUALIZAR}/${id}`,
                { name, career }
            );
            return response.data;
        }catch(error: unknown){
            if(axios.isAxiosError(error) && error.response?.data){
                return error.response.data as responseStudentAdminGeneric;
            }
        }
    },
    UpdateStateStudent: async ( id :number):  Promise<responseStudentAdminGeneric | undefined> => {
        try{
            const response = await api.patch<responseStudentAdminGeneric>(
                `${API_CONFIG.ENDPOINTS.ESTUDIANTES.ACTUALIZARESTADO}/${id}`
            );
            return response.data;
        }catch(error: unknown){
            if(axios.isAxiosError(error) && error.response?.data){
                return error.response.data as responseStudentAdminGeneric;
            }
        }
    }
}
