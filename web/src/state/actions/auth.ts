import {createAction} from "./CreateAction";
import {getApiClient} from '../../api/ApiClient';

export const AUTH_ACTION = {
    AUTH_LOGIN_START: 'AUTH_LOGIN_START',
};

export const AuthAction = {
    loginStart: () => createAction(AUTH_ACTION.AUTH_LOGIN_START),
};

export const login = (email: string, password: string) => async (dispatch: any, getState: any) => {
    try {
        await getApiClient().authService.login(email, password);
    } catch (e) {
        //failed
    }
};