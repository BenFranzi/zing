import {AxiosInstance} from 'axios';

export class AuthService {
    private axiosInstance: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axiosInstance = axios;
    }

    public login = async (email: string, password: string): Promise<any> => {
        const response = await this.axiosInstance
            .post(`/auth/login`, {email, password});
        this.setToken(response.data.token);
        return response;
    }

    public dummy = async (): Promise<any> => {
        return await this.axiosInstance.get(`/todos`);
    }


    //Helper functions

    public setAuthHeader = () => {
        if (this.loggedIn()) {
            this.axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + this.getToken();
        } else {
            this.axiosInstance.defaults.headers.common['Authorization'] = undefined;
        }
    }

    public setToken = (token: string) => {
        // Saves user token to localStorage
        localStorage.setItem('id_token', token);
        this.setAuthHeader();
    }

    public getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }


    public loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        if (!!token) {
            if (this.isTokenValid(token)) {
                return true;
            }
        }
        return false;
    }

    public isTokenValid = (token: string) => {
        if (!!token) {
            const payload = token.split('.')[1];
            if (!!payload) {
                const decoded: any = JSON.parse(atob(payload));
                if (Date.now() / 1000 < decoded.exp) {
                    return true;
                }
            }
        }
        return false;
    }
}