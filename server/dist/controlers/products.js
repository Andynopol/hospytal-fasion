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
    const post = req.body;
    const newProduct = new ProductMessage(post);
    try {
        await newProduct.save();
        res.status(201).json({ status: 'succes', product: newProduct });
    }
    catch (error) {
        res.status(409).json({ status: 'fail', message: 'Unsuccesfull save', error: error.message });
    }
};
//# sourceMappingURL=products.js.map