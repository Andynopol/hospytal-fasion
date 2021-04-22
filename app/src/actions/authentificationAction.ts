import * as API from '../api';

const login = ( profile: any ) =>
{
    return {
        type: "LOGIN",
        payload: profile
    };
};

const logout = () =>
{
    return {
        type: "LOGOUT",
    };
};


const authentificationAction = { login: login, logout: logout };

export { authentificationAction };