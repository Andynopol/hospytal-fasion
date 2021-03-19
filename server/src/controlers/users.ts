import Users from '../models/users-schema.js';

// products root user request
export const getUser = async ( req: any, res: any ) =>
{
    const userData = req.body;
    const user = Users.find();
    try
    {
        
    } catch ( error )
    {
        res.status( 501 ).json( { status: 'fail', message: 'Server error', error: error.message } );
    }
};