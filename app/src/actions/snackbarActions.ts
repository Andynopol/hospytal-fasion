import { snackbarActionTypes } from '../constants';

interface SnackInfo
{
    message: string,
    variant: "error" | "warning" | "info" | "success";
}

const showSnackbar = ( snackInfo: SnackInfo ) =>
{
    return {
        type: snackbarActionTypes.SHOW,
        payload: snackInfo
    };
};

const hideSnackbar = () =>
{
    return {
        type: snackbarActionTypes.HIDE,
    };
};



const snackbarActionManager = {
    show: showSnackbar,
    hide: hideSnackbar,
};

export { snackbarActionManager };