import axios, {AxiosInstance} from 'axios';
import {AuthService} from './services/AuthService';

export class ApiClient {

    private readonly baseURL: string;
    private readonly axiosInstance: AxiosInstance;

    public readonly authService: AuthService;


    public constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.axiosInstance = axios.create({
            baseURL: this.baseURL,
        });

        if (process.env.NODE_ENV === 'development') {
            this.axiosInstance.interceptors.request.use((request: any) => {
                    console.debug('Request', request);
                    return request;
                },
            );
        }

        this.authService = new AuthService(this.axiosInstance);
    }
}




let _api: ApiClient;

export const createApiClient = (apiBaseURL: string): ApiClient => {
    if (!_api) {
        _api = new ApiClient(apiBaseURL);
    }
    return _api;
};

export const getApiClient = (): ApiClient => {
    return _api;
};