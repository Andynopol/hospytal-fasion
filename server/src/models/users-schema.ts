import mongoose, { Document } from 'mongoose';

interface UserData extends Document
{
    email: string,
    name: string,
    password: string,
}

const userSchema: mongoose.Schema = new mongoose.Schema( {
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true, unique: true },
    password: { type: String, require: true },
} );


export default mongoose.model<UserData>( "user", userSchema, 'users' );