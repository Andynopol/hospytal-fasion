import mongoose, { Document } from 'mongoose';

interface UserData extends Document
{
    email: string,
    firstName: string,
    lastName: string,
    password: string,
}

const userSchema: mongoose.Schema = new mongoose.Schema( {
    email: { type: String, require: true, unique: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    password: { type: String, require: true },
    cart: { type: Array, required: true },
    isVerified: { type: Boolean, required: true },
    icon: { type: String, require: false },
    // admin:{type:Boolean, require: false},
} );


export default mongoose.model<UserData>( "user", userSchema, 'users' );