import { userActionTypes } from "../constants";

interface Action
{
    type: string,
    payload: Crediantials | GoogleResults,
    isForced?: boolean;
}

interface Crediantials
{
    username?: string,
    email?: string,
    password: string,

}

interface GoogleResults
{
    result: any,
    token: string,
}

const authentificationReducer = ( state: Crediantials | GoogleResults = null, action: Action ) =>
{
    switch ( action.type )
    {
        case userActionTypes.LOGIN:
            localStorage.setItem( 'profile', JSON.stringify( { ...action?.payload } ) );
            state = action.payload;
            break;
        case userActionTypes.LOGOUT:
            state = null;
            localStorage.removeItem( 'profile' );
            break;
    }
    return state;
};

export { authentificationReducer };