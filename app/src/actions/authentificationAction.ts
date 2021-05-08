import * as API from '../api';
import { snackbarActionManager } from './snackbarActions';
import { userActionTypes, SnackBarVariants, snackbarActionTypes } from '../constants';

interface User
{
    email: string;
    firstName: string;
    lastName: string;
    cart: Array<any>;
    favorites: Array<any>;
    passowrd: string;
    icon: string;
    isVerified: boolean;
    admin?: boolean;
}


/** 
 *  @param credientials the form data sent to the server
 *  @param successCallback callback function that you should call if the request is considered a success one.
 *  @param failCallback callback function that you should call if the request is considered an unsuccessful one
*/



const login = (
    credientials: FormData,
    successCallback?: ( variant: SnackBarVariants, message: string ) => void,
    failCallback?: ( variant: SnackBarVariants, message: string ) => void ) => async ( dispatch: any ) =>
    {
        try
        {
            const { data } = await API.login( credientials );
            if ( data.status === 'success' )
            {
                const user = data.result;
                dispatch( { type: userActionTypes.LOGIN, payload: { result: user, token: data.token } } );
                if ( successCallback )
                {
                    successCallback( SnackBarVariants.success, `Welcome ${ user.firstName } ${ user.lastName }` );
                }

            }
            else
            {
                if ( failCallback )
                {
                    failCallback( SnackBarVariants.fail, data.message );
                }
            }

        } catch ( error )
        {
            dispatch( snackbarActionManager.show( {
                variant: SnackBarVariants.fail,
                message: error.message
            } ) );
            console.log( error );
        }
    };


const googleLogin = (
    credientials: FormData,
    successCallback?: ( variant: SnackBarVariants, message: string ) => void,
    failCallback?: ( variant: SnackBarVariants, message: string ) => void
) => async ( dispatch: any ) =>
    {
        try
        {
            const { data } = await API.login( credientials );
            if ( data.status === 'success' )
            {
                const user = data.result;
                dispatch( { type: userActionTypes.LOGIN, payload: { result: user, token: data.token } } );
                if ( successCallback )
                {
                    successCallback( SnackBarVariants.success, `Welcome ${ user.firstName } ${ user.lastName }` );
                }

            }
            else
            {
                if ( failCallback )
                {
                    failCallback( SnackBarVariants.fail, data.message );
                }
            }

        } catch ( error )
        {
            dispatch( register( credientials, successCallback, failCallback ) );
        }
    };

const register = (
    credientials: FormData,
    successCallback?: ( variant: SnackBarVariants, message: string ) => void,
    failCallback?: ( variant: SnackBarVariants, message: string ) => void ) => async ( dispatch: any ) =>
    {
        try
        {
            const { data } = await API.register( credientials );
            if ( data.status === 'success' )
            {
                const user = data.result;
                dispatch( { type: userActionTypes.LOGIN, payload: { result: user, token: data.token } } );
                if ( successCallback )
                {
                    successCallback( SnackBarVariants.success, `Welcome ${ user.firstName } ${ user.lastName }` );
                }
            } else
            {
                if ( failCallback )
                {
                    failCallback( SnackBarVariants.fail, data.message );
                }

            }

        } catch ( error )
        {
            dispatch( snackbarActionManager.show( {
                variant: SnackBarVariants.fail,
                message: error.message
            } ) );
            dispatch( logout() );
            console.log( error );
        }
    };

const logout = () =>
{
    return {
        type: userActionTypes.LOGOUT,
    };
};

const relog = ( user: User ) =>
{
    return {
        type: userActionTypes.RELOG,
        payload: user
    };
};


const authentificationAction = { login, logout, register, relog, googleLogin };

export { authentificationAction };