import * as API from '../api';
import { snackbarActionManager } from './snackbarActions';

const login = ( credientials: FormData ) => async ( dispatch: any ) =>
{
    try
    {
        const response = await ( await API.login( credientials ) ).json();
        console.log( response );
    } catch ( error )
    {
        console.log( error );
    }
};

const logout = () =>
{
    return {
        type: "LOGOUT",
    };
};


const authentificationAction = { login: login, logout: logout };

export { authentificationAction };