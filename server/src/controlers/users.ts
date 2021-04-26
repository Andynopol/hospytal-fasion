import mongoose, { Mongoose } from 'mongoose';
import Users from '../models/users-schema.js';
import bcrypt from 'bcrypt';

interface User
{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    cart: Array<any>,
    isVerified: boolean,

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

        }
        else
        {
            res.status( 203 ).json( { status: 'warning', message: 'User not found' } );
        }
    } catch ( err )
    {
        console.log( err.message );
        res.status( 403 ).json( { status: 'fail', message: 'something went wrong' } );
    };
};


export const registerUser = async ( req: any, res: any ) =>
{

    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash( password, 10 );
    try
    {
        const userObject: User = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            cart: [],
            isVerified: false,
        };
        const newUser = new Users( userObject );
        await newUser.save();
        res.status( 200 ).json( { status: 'success', message: 'test' } );
    }
    catch ( err )
    {
        console.log( err.message );
        res.status( 403 ).json( { status: 'fail', message: err.message } );
    }
};