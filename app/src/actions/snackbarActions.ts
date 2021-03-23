interface SnackInfo
{
    message: string,
    variant: string;
}

const showSnackbar = ( snackInfo: SnackInfo ) =>
{
    return {
        type: "SHOW",
        payload: snackInfo
    };
};

const hideSnackbar = () =>
{
    return {
        type: "HIDE",
    };
};



const snackbarActionManager = {
    show: showSnackbar,
    hide: hideSnackbar,
};

export { snackbarActionManager };