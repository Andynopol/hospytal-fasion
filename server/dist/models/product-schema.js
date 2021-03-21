import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    price: { type: Number, require: true, unique: false },
    description: { type: String, default: '' },
    details: { type: String, default: '' },
    sale: { type: Number, default: 0 },
    stock: { type: Number, default: 0, require: true }
});
export default mongoose.model("product", productSchema);
//# sourceMappingURL=product-schema.js.map