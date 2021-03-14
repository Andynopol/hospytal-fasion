import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

const PORT = 5000;

app.use( express.json( { limit: '30mb' } ) );
app.use( express.urlencoded( { limit: '30mb', extended: true } ) );
app.use( cors() );



app.listen( PORT, () => console.log( `listening at ${ PORT }` ) );

