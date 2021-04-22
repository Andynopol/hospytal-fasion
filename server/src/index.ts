import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routes/poroducts-routes.js';
import usersRouter from './routes/users-routes.js';
import dotenv from 'dotenv';

import UserModel from './models/users-schema';

const app = express();
dotenv.config();
const __dirname = dirname( fileURLToPath( import.meta.url ) );
const PORT = process.env.PORT || 5000;

// TODO: Make this api call more secure
// const ENTRYPOINT = 'mongodb+srv://andy95:14karate@main-server.stch8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

`mongodb+srv://andy95:14karate@main-server.stch8.mongodb.net/develop?retryWrites=true&w=majority`;
const ENTRYPOINT = `mongodb+srv://${ process.env.MONGO_USER }:${ process.env.MONGODB_PASSWORD }@${ process.env.MONGO_SERVER_NAME }.stch8.mongodb.net/${ process.env.MONGODB_DATABASE_NAME }?retryWrites=true&w=majority`;

// console.log( ENTRYPOINT );



app.use( express.static( path.join( __dirname, '../public' ) ) );


app.get( '/', function ( req, res )
{
    res.sendFile( path.join( __dirname, '../public', 'index.html' ) );
} );

//uncomment for production
// app.get( '/*', function ( req, res )
// {
//     res.sendFile( path.join( __dirname, '../public', 'index.html' ) );
// } );



app.use( `/${ process.env.UPLOAD_FOLDER }`, express.static( path.join( __dirname, `../${ process.env.UPLOAD_FOLDER }` ) ) );
app.use( express.static( path.normalize( `/${ process.env.UPLOAD_FOLDER }` ) ) );

app.use( express.json( { limit: '30mb' } ) );
app.use( express.urlencoded( { limit: '30mb', extended: true } ) );
app.use( cors() );
app.use( '/products', productsRouter );
app.use( '/user', usersRouter );

// app.listen( PORT, () => console.log( `listening at ${ PORT }` ) );

mongoose.connect( ENTRYPOINT, { useUnifiedTopology: true, useNewUrlParser: true } )
    .then( () => console.log( `Connection established! We are online!` ) )
    .catch( () => console.log( `Database connection failed` ) );

mongoose.set( 'useFindAndModify', false );

app.listen( PORT, () => console.log( `listening at ${ PORT }` ) );;