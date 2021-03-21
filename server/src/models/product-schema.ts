import mongoose, { Document } from 'mongoose';

interface ProductData extends Document
{
    name: string,
    price: string,
    description?: string,
    sale?: number,
    stock: number,
    details?: string,
}

const productSchema: mongoose.Schema = new mongoose.Schema( {
    name: { type: String, require: true, unique: true },
    price: { type: Number, require: true, unique: false },
    description: { type: String, default: '' },
    details: { type: String, default: '' },
    sale: { type: Number, default: 0 },
    stock: { type: Number, default: 0, require: true }
} );


export default mongoose.model<ProductData>( "product", productSchema );