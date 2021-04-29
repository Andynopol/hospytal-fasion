
import mongoose from 'mongoose';
import ProductMessage from '../models/product-schema.js';
import { FileManager } from '../lib/FileManager.js';
// import path from 'path';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';



// const __dirname = dirname( fileURLToPath( import.meta.url ) );

interface Product {
    name: string,
    price: number,
    description: string,
    details: string,
    sale: number,
    stock: number,
    src: string,
}


export const getProducts = async (req: any, res: any) => {
    try {
        const products = await ProductMessage.find();
        res.status(201).json({ status: "success", products: products });
    } catch (error) {
        res.status(404).json({ status: "fail", message: "No database found", error: error.message });
    }
};


export const addProduct = async (req: any, res: any) => {
    const product = generateSrclessProduct(req.body);
    const files = req.files;
    const file = files[0];
    let fileName;
    let filePath;
    if (file) {
        fileName = Date.now();
        filePath = `${process.env.UPLOAD_FOLDER}/${fileName}.png`;
        const src = `http://${process.env.DOMAIN}:${process.env.PORT}/${filePath}`;
        product.src = src.replace(/\\/g, "/");
    }


    try {
        const newProduct = new ProductMessage(product);
        console.log(newProduct);
        //saving the product to the db
        await newProduct.save();
        //saving the file to the uploads folder
        if (file) {
            saveFile(`${filePath}`, file.buffer);
        }

        res.status(201).json({ status: 'success', product: newProduct, message: "Product added succesfully" });
    } catch (error) {
        res.status(409).json({ status: 'fail', message: 'Unsuccesfull save' });
    }

};

//deprecated for now
export const addProducts = async (req: any, res: any) => {
    const proudcts = req.body;


    for (let product of proudcts) {
        const newProduct = new ProductMessage(product);
        try {
            await newProduct.save();
            res.status(201).json({ status: 'success', product: newProduct, message: "Product(s) added succesfully" });
        } catch (error) {
            res.status(409).json({ status: 'fail', message: 'Unsuccesfull save! Product name duplicate' });
        }
    }
};


export const updateProducts = async (req: any, res: any) => {
    const { id: _id } = req.params;
    const file = req.files[0];
    const product: Product = generateSrclessProduct(req.body);
    const selectedProduct = await ProductMessage.findById(_id);
    let filePath;
    if (selectedProduct.src) {
        filePath = `${selectedProduct.src.split('/')[selectedProduct.src.split('/').length - 2]}/${selectedProduct.src.split('/')[selectedProduct.src.split('/').length - 1]}`;
    }
    else {
        filePath = `${process.env.UPLOAD_FOLDER}/${Date.now()}.png`;
    }
    const src = `http://${process.env.DOMAIN}:${process.env.PORT}/${filePath}`;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).send({ status: 'fail', message: 'Id not found' });
    }

    if (file) {
        saveFile(filePath, file.buffer);
        product.src = src;
    }
    else {
        if (!product.src) {
            FileManager.delete(filePath);
        }
    }

    const updatedProduct = await ProductMessage.findByIdAndUpdate(_id, product, { new: true });
    res.status(200).json({ status: 'success', product: updatedProduct, message: "Update complete" });
};


export const getSpecificProduct = async (req: any, res: any) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(204).send({ status: 'fail', message: 'id not found' });
    }

    const selectedProduct = await ProductMessage.findById(_id);

    res.status(200).json({ status: 'success', product: selectedProduct });
};


export const deleteProduct = async (req: any, res: any) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).send({ status: 'fail', message: 'id not found' });
    }

    const selectedProduct = await ProductMessage.findById(_id);
    await ProductMessage.findByIdAndDelete(_id);

    if (selectedProduct.src)
        FileManager.delete(getPathToDelete(selectedProduct.src));

    res.status(201).send({ status: 'success', message: `Item ${_id} was deleted` });

};




// helper functions

const getPathToDelete: (filePath: string) => string = (filePath) => {
    const levels = filePath.split('/');
    return `${process.env.UPLOAD_FOLDER}/${levels[levels.length - 1]}`;
};

const generateSrclessProduct: (body: any) => Product = (body: any) => {
    const product: any = {};

    for (let key of Object.keys(body)) {
        product[key] = body[key];
    }
    if (!product.src)
        product.src = '';
    return product;
};

const saveFile: (filePath: string, buffer: Buffer) => void = (filePath, buffer) => {
    try {
        FileManager.saveFile(filePath, buffer);
        return true;
    }
    catch (err) {
        throw err;
    }
};