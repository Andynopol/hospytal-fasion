import mongoose from 'mongoose';
import ProductMessage from '../models/product-schema.js';
import { FileManager } from '../lib/FileManager.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
export const getProducts = async (req, res) => {
    try {
        const products = await ProductMessage.find();
        res.status(201).json({ status: "success", products: products });
    }
    catch (error) {
        res.status(404).json({ status: "fail", message: "No database found", error: error.message });
    }
};
export const addProduct = async (req, res) => {
    const product = generateSrclessProduct(req.body);
    const files = req.files;
    let file = files[0];
    const fileName = Date.now();
    const filePath = `uploads/${fileName}.png`;
    product.src = `http://localhost:5000/${filePath}`;
    product.src = product.src.replace(/\\/g, "/");
    try {
        const newProduct = new ProductMessage(product);
        console.log('New Product: ' + newProduct);
        await newProduct.save();
        saveFile(`public/${filePath}`, file.buffer);
        res.status(201).json({ status: 'success', product: newProduct, message: "Product added succesfully" });
    }
    catch (error) {
        res.status(409).json({ status: 'fail', message: 'Unsuccesfull save' });
    }
};
export const addProducts = async (req, res) => {
    const proudcts = req.body;
    const files = req.files;
    for (let product of proudcts) {
        const newProduct = new ProductMessage(product);
        try {
            await newProduct.save();
            res.status(201).json({ status: 'success', product: newProduct, message: "Product(s) added succesfully" });
        }
        catch (error) {
            res.status(409).json({ status: 'fail', message: 'Unsuccesfull save! Product name duplicate' });
        }
    }
};
export const updateProducts = async (req, res) => {
    const { id: _id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).send({ status: 'fail', message: 'Id not found' });
    }
    const updatedProduct = await ProductMessage.findByIdAndUpdate(_id, product, { new: true });
    res.status(200).json({ status: 'success', product: updatedProduct, message: "Update complete" });
};
export const getSpecificProduct = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).send({ status: 'fail', message: 'id not found' });
    }
    const selectedProduct = await ProductMessage.findById(_id);
    console.log(selectedProduct);
    res.status(200).json({ status: 'success', product: selectedProduct });
};
export const deleteProduct = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).send({ status: 'fail', message: 'id not found' });
    }
    const selectedProduct = await ProductMessage.findById(_id);
    await ProductMessage.findByIdAndDelete(_id);
    FileManager.delete(getPathToDelete(selectedProduct.src));
    res.status(201).send({ status: 'success', message: `Item ${_id} was deleted` });
};
const getPathToDelete = (filePath) => {
    const levels = filePath.split('/');
    return `public/uploads/${levels[levels.length - 1]}`;
};
const generateSrclessProduct = (body) => {
    const product = {};
    for (let key of Object.keys(body)) {
        product[key] = body[key];
    }
    product.src = '';
    return product;
};
const saveFile = (filePath, buffer) => {
    try {
        FileManager.saveFile(filePath, buffer);
        return true;
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=products.js.map