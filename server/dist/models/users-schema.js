import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true, unique: false },
    password: { type: String, require: true },
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=users-schema.js.map