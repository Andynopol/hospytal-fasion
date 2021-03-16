import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';


import postRouter from './routes/post-routes.js';

const app = express();

const PORT = process.env.PORT || 5000;

const ENTRYPOINT = 'mongodb+srv://andy95:14karate@main-server.stch8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


app.use( '/posts', postRouter );


app.use( express.json( { limit: '30mb' } ) );
app.use( express.urlencoded( { limit: '30mb', extended: true } ) );
app.use( cors() );


mongoose.connect( ENTRYPOINT, { useUnifiedTopology: true, useNewUrlParser: true } )
    .then( () => app.listen( PORT, () => console.log( `listening at ${ PORT }` ) ) )
    .catch( () => console.log( `data not sent from the cloud` ) );

mongoose.set( 'useFindAndModify', false );

