import mongoose from 'mongoose';
import ProductMessage from '../models/product-schema.js';
export const getProducts = async (req, res) => {
    try {
        const products = await ProductMessage.find();
        res.status(201).json({ status: "success", products: products });
    }
    catch (error) {
        res.status(404).json({ status: "fail", message: "Something went wrong", error: error.message });
    }
};
export const addProduct = async (req, res) => {
    const product = req.body;
    const newProduct = new ProductMessage(product);
    try {
        await newProduct.save();
        res.status(201).json({ status: 'succes', product: newProduct });
    }
    catch (error) {
        res.status(409).json({ status: 'fail', message: 'Unsuccesfull save', error: error.message });
    }
};
export const addProducts = async (req, res) => {
    const proudcts = req.body;
    for (let product of proudcts) {
        const newProduct = new ProductMessage(product);
        try {
            await newProduct.save();
            res.status(201).json({ status: 'succes', product: newProduct });
        }
        catch (error) {
            res.status(409).json({ status: 'fail', message: 'Unsuccesfull save', error: error.message });
        }
    }
};
export const updateProducts = async (req, res) => {
    const { id: _id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
        res.status(404).send({ status: 'fail', message: 'id not found' });
    const updatedProduct = await ProductMessage.findByIdAndUpdate(_id, product, { new: true });
    res.status(200).json({ status: 'success', product: updatedProduct });
};
//# sourceMappingURL=products.js.map