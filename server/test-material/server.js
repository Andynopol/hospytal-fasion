const express = require( 'express' );
const path = require( 'path' );
const app = express();

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( express.json() );

app.get( '/ceva', ( req, res ) => {
    res.status( 201 ).json( { statusCode: 201, status: 'success' } );
} );

// app.get( '/*', function ( req, res ) {
//     res.sendFile( path.join( __dirname, 'public', 'index.html' ) );
// } );

app.listen( 5000 );

