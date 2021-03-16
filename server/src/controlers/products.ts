
import ProductMessage from '../models/product-schema.js';

// users root products request
export const getProducts = async ( req: any, res: any ) =>
{
    // res.send( 'THIS POSTS IS WORKING' );
    try
    {
        const products = await ProductMessage.find();
        res.status( 201 ).json( { status: "success", products: products } );
    } catch ( error )
    {
        res.status( 404 ).json( { status: "fail", message: "Something went wrong", error: error.message } );
    }
};

export const addProduct = async ( req: any, res: any ) =>
{
    const post = req.body;

    const newProduct = new ProductMessage( post );
    try
    {
        await newProduct.save();
        res.status( 201 ).json( { status: 'succes', product: newProduct } );
    } catch ( error )
    {
        res.status( 409 ).json( { status: 'fail', message: 'Unsuccesfull save', error: error.message } );
    }
};