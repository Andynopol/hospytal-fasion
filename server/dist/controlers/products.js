import mongoose from 'mongoose';
import ProductMessage from '../models/product-schema.js';
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
    const product = req.body;
    const newProduct = new ProductMessage(product);
    try {
        await newProduct.save();
        res.status(201).json({ status: 'success', product: newProduct, message: "Product added succesfully" });
    }
    catch (error) {
        res.status(409).json({ status: 'fail', message: 'Unsuccesfull save' });
    }
};
export const addProducts = async (req, res) => {
    const proudcts = req.body;
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
    await ProductMessage.findByIdAndDelete(_id);
    res.status(201).send({ status: 'success', message: `Item ${_id} was deleted` });
};
//# sourceMappingURL=products.js.map