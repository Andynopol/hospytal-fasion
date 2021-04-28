import mongoose, { Document } from 'mongoose';

interface UserData extends Document
{
    email: string,
    firstName: string,
    lastName: string,
    isVerified: boolean,
    favorites: Array<any>,
    cart: Array<any>,
    admin?: boolean,
    icon?: string,
    password?: string,
}

const userSchema: mongoose.Schema = new mongoose.Schema( {
    email: { type: String, require: true, unique: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    isVerified: { type: Boolean, required: true },
    favorites: { type: Array, required: true },
    cart: { type: Array, required: true },
    admin: { type: Boolean, require: false },
    icon: { type: String, require: false },
    password: { type: String, require: false },
}, { autoIndex: false } );


export default mongoose.model<UserData>( "user", userSchema, 'users' );