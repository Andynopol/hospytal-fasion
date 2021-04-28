import jwt from 'jsonwebtoken';

export const auth = ( req: any, res: any, next: () => void ) =>
{
    console.log( req.headers );
    try
    {
        const token = req.headers.authorization.split( " " )[ 1 ];
        const isCostumAuth = token.length < 500;

        if ( token && isCostumAuth )
        {
            const decode: any = jwt.verify( token, 'test' );
            req.userId = decode?.id;
        }
        else
        {
            const decode: any = jwt.decode( token );
            req.userId = decode?.sub;
        }

        next();

    } catch ( error )
    {
        console.log( error );
    }
};