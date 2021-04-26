import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    password: { type: String, require: true },
    cart: { type: Array, required: true },
    isVerified: { type: Boolean, required: true },
    icon: { type: String, require: false },
});
export default mongoose.model("user", userSchema, 'users');
//# sourceMappingURL=users-schema.js.map