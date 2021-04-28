import mongoose from 'mongoose';
import Users from '../models/users-schema.js';
import bcrypt from 'bcrypt';


// TODO: More messages need to be added in order to send the correct error message to the client
enum ErrorMessages
{
    no_user = 'User not found',
    duplicate = 'There is an account with this email',
    unknown = 'Something went wrong. We are investigating right awai!',
    wrong_password = 'Incorrect Password'
}

interface User
{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    cart: Array<any>,
    isVerified: boolean,
    favorites: Array<any>,
    icon: any,
}

// products root user request
export const login = async ( req: any, res: any ) =>
{
    console.log( req.body );
    try
    {
        const user = await Users.find( { email: req.body.email } );
        if ( user.length )
        {
            const foundUser = user[ 0 ];
            if ( bcrypt.compareSync( req.body.password, foundUser.password ) )
            {
                //userInfo is the data that is sent to the frontend so we need to remove the password object.
                res.status( 200 ).json( { status: 'success', user: foundUser, message: 'Login success.' } );
            }
            else
            {
                throw new Error( ErrorMessages.wrong_password );
            }
        }
        else
        {
            throw new Error( ErrorMessages.no_user );

        }
    } catch ( err )
    {
        if ( err.message === ErrorMessages.no_user || ErrorMessages.wrong_password )
        {
            res.status( 401 ).json( { status: 'fail', hint: err.message, message: 'Email or Password incorrect' } );
            return;
        }
        res.status( 403 ).json( { status: 'fail', message: ErrorMessages.unknown } );
    };
};


export const registerUser = async ( req: any, res: any ) =>
{

    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash( password, 10 );

    const userObject: User = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        cart: [],
        favorites: [],
        isVerified: false,
        icon: '',
    };
    try
    {
        const newUser = new Users( userObject );
        console.log( newUser );
        await newUser.save();
        res.status( 200 ).json( { status: 'success', message: 'User registered. Logging in...' } );
    }
    catch ( err )
    {
        console.log( err );
        if ( err.message === ErrorMessages.duplicate )
        {
            res.status( 403 ).json( { status: 'fail', message: err.message } );
            return;
        }
        res.status( 403 ).json( { status: 'fail', message: ErrorMessages.unknown } );
    }
};

const checkEmailDuplication = async ( email: string ) =>
{
    const users = await Users.find( { email: email } );
    if ( users.length )
    {
        return true;
    }
    return false;

};