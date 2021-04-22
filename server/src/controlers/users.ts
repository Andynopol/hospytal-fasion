import mongoose, { Mongoose } from 'mongoose';
import Users from '../models/users-schema.js';
import bcrypt from 'bcrypt';

// products root user request
export const getUser = async ( req: any, res: any ) =>
{
    const userData = req.body;
    try
    {
        const hasedPassword = bcrypt.hash( userData.password, 10 );
    } catch ( error )
    {
        res.status( 501 ).json( { status: 'fail', message: 'Server error' } );
    }
};

export const registerUser = async ( req: any, res: any ) =>
{

};