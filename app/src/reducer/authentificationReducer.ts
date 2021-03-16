interface Action
{
    type: string,
    isForced?: boolean;
}

const authentificationReducer = ( state: boolean = false, action: Action ) =>
{
    switch ( action.type )
    {
        case "LOGIN":
            state = true;
            break;
        case "LOGOUT":
            state = false;
            break;
    }
    return state;
};

export { authentificationReducer };