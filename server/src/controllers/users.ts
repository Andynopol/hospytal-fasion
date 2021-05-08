import Users from '../models/users-schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// TODO: More messages need to be added in order to send the correct error message to the client
enum ErrorMessages
{
    no_user = 'User not found',
    duplicate = 'User already exists.',
    unknown = 'Something went wrong. Contact us to investigate.',
    wrong_password = 'Invalid credientials'
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

export const login = async ( req: any, res: any ) =>
{
    const { email, password } = req.body;
    try
    {
        const user = await Users.findOne( { email } );

        if ( !user ) return res.status( 404 ).json( { status: 'fail', message: ErrorMessages.wrong_password } );


        const isPasswordCorrect = await bcrypt.compare( password, user.password );

        if ( !isPasswordCorrect ) return res.status( 400 ).json( { status: 'fail', messasge: ErrorMessages.wrong_password } );

        console.log( req.headers.authorization );
        const token = req.headers.authorization ? req.headers.authorization : jwt.sign( { email: user.email, id: user._id }, process.env.SECRET, { expiresIn: "1h" } );

        res.status( 200 ).json( { status: 'success', result: user, token } );
    } catch ( error )
    {
        res.status( 500 ).json( { message: ErrorMessages.unknown } );
    }
};

export const register = async ( req: any, res: any ) =>
{
    const { firstName, lastName, email, password, icon } = req.body;

    try
    {
        const existingUser = await Users.findOne( { email } );

        if ( existingUser ) return res.status( 400 ).json( { status: 'fail', message: ErrorMessages.duplicate } );

        const hashedPassword = await bcrypt.hash( password, 12 );

        const newUser: User = {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            cart: [],
            favorites: [],
            isVerified: false,
            icon: icon ? icon : ''
        };

        const result = await Users.create( newUser );

        console.log( req.headers.authorization );
        const token = req.headers.authorization ? req.headers.authorization : jwt.sign( { email: result.email, id: result._id }, process.env.SECRET, { expiresIn: "1h" } );
        res.status( 200 ).json( { status: 'success', result, token } );

    } catch ( error )
    {
        res.status( 500 ).json( { message: ErrorMessages.unknown } );
    }
};