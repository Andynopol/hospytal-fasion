import * as API from '../api';

const login = () =>
{
    return {
        type: "LOGIN"
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