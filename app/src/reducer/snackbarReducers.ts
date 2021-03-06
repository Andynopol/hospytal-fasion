import { snackbarActionTypes } from '../constants';

interface Action
{
    type: string,
    payload: any,
    isForced?: boolean;
}

interface SnackInfo
{
    open: boolean,
    message: string,
    variant: string,
}

const snackbarReducer = ( state: SnackInfo = { open: false, message: '', variant: 'info' }, action: Action ) =>
{
    switch ( action.type )
    {
        case snackbarActionTypes.SHOW:
            return { open: true, ...action.payload };
        case snackbarActionTypes.HIDE:
            return { ...state, open: false };
        default:
            return state;
    }
};


export { snackbarReducer };