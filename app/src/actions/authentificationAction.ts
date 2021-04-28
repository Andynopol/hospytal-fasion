import * as API from '../api';
import { snackbarActionManager } from './snackbarActions';
import { userActionTypes, SnackBarVariants, snackbarActionTypes } from '../constants';


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
            const response = await ( await API.login( credientials ) ).json();
            if ( response.user )
            {
                dispatch( { type: userActionTypes.LOGIN, payload: response.user } );
                if ( successCallback )
                {
                    successCallback( SnackBarVariants.success, `Welcome ${ response.user.firstName } ${ response.user.lastName }` );
                }

            }
            else
            {
                if ( failCallback )
                {
                    failCallback( SnackBarVariants.fail, response.message );
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

const register = (
    credientials: FormData,
    successCallback?: ( variant: SnackBarVariants, message: string ) => void,
    failCallback?: ( variant: SnackBarVariants, message: string ) => void ) => async ( dispatch: any ) =>
    {
        try
        {
            const response = await ( await API.register( credientials ) ).json();
            console.log( response );
            if ( response.status === 'success' )
            {
                dispatch( login( credientials, successCallback, failCallback ) );
                dispatch( snackbarActionManager.show( { variant: SnackBarVariants.success, message: response.message } ) );
            } else
            {
                failCallback( SnackBarVariants.fail, response.message );
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