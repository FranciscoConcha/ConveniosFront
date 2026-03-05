import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig  } from 'axios';
import { API_CONFIG } from '../config/api.config';
import Cookies from 'js-cookie';


interface CustomAxiosConfig extends AxiosRequestConfig {
    skipAuth?: boolean;
}
class ApiService {

    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
        baseURL: API_CONFIG.BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });

    
    this.api.interceptors.request.use(
        (config) => {
            const token = Cookies.get('token');
            if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
        },
        (error) => Promise.reject(error)
    );

    
    this.api.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                Cookies.remove('token');
                window.location.href = '/Home';
            }
            return Promise.reject(error);
            }
        );
    }

    public get<T>(url: string, config: CustomAxiosConfig= {}) {
        return this.api.get<T>(url, config);
    }

    public post<T>(url: string, data?: unknown, config: CustomAxiosConfig= {}) {
        return this.api.post<T>(url, data, config);
    }

    public put<T>(url: string, data?: unknown, config: CustomAxiosConfig= {}) {
        return this.api.put<T>(url, data, config);
    }

    public delete<T>(url: string, config: CustomAxiosConfig= {}) {
        return this.api.delete<T>(url, config);
    }
    public patch<T>(url:string,data? :unknown,config: CustomAxiosConfig={}){
        return this.api.patch<T>(url,data,config);
    }
}

export default new ApiService();