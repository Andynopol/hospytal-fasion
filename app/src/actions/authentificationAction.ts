import * as API from '../api';
import { snackbarActionManager } from './snackbarActions';
import { userActionTypes, SnackBarVariants } from '../constants';

const login = ( credientials: FormData ) => async ( dispatch: any ) =>
{
    try
    {
        const response = await ( await API.login( credientials ) ).json();
        if ( response.user )
        {
            dispatch( { type: userActionTypes.LOGIN, payload: response.user } );
            dispatch( snackbarActionManager.show( {
                variant: SnackBarVariants.success,
                message: `Welcom ${ response.user.firstName } ${ response.user.lastName }`
            } ) );
        }

    } catch ( error )
    {
        console.log( error );
    }
};

const register = ( credientials: FormData ) => async ( dispatch: any ) =>
{
    try
    {
        const response = await ( await API.register( credientials ) ).json();
        console.log( response );
        if ( response.status === 'success' )
        {
            dispatch( login( credientials ) );
        }

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


const authentificationAction = { login: login, logout: logout, register: register };

export { authentificationAction };