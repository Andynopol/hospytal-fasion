import fs from 'fs';
import { PathLike } from 'node:fs';

class FileManager
{
    static readRawData ( file: number | PathLike )
    {
        return fs.readFileSync( file );
    }
    static write ( path: string, data: string | Buffer )
    {
        try
        {
            fs.writeFileSync( path.toString(), data );
        } catch ( err )
        {
            console.log( err );
        }
    }

    static saveFile ( path: string, buffer: Buffer )
    {
        fs.writeFile( path, buffer, ( err ) =>
        {
            if ( err )
            {
                throw new Error( 'File not saved! Something went wrong! Check the buffer data!' );
            }
        } );
    }

    static delete ( path: string )
    {
        try
        {
            if ( fs.existsSync( path ) )
            {
                fs.unlinkSync( path );
            }
        } catch ( err )
        {
            console.error( err );
        }


    }
}

export { FileManager };