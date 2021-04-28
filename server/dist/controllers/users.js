import Users from '../models/users-schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["no_user"] = "User not found";
    ErrorMessages["duplicate"] = "User already exists.";
    ErrorMessages["unknown"] = "Something went wrong. Contact us to investigate.";
    ErrorMessages["wrong_password"] = "Invalid credientials";
})(ErrorMessages || (ErrorMessages = {}));
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user)
            return res.status(404).json({ status: 'fail', message: ErrorMessages.wrong_password });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ status: 'fail', messasge: ErrorMessages.wrong_password });
        const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ status: 'success', result: user, token });
    }
    catch (error) {
        res.status(500).json({ message: ErrorMessages.unknown });
    }
};
export const register = async (req, res) => {
    const { firstName, lastName, email, password, icon } = req.body;
    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser)
            return res.status(400).json({ status: 'fail', message: ErrorMessages.duplicate });
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            cart: [],
            favorites: [],
            isVerified: false,
            icon: icon ? icon : ''
        };
        const result = await Users.create(newUser);
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ status: 'success', result, token });
    }
    catch (error) {
        res.status(500).json({ message: ErrorMessages.unknown });
    }
};
//# sourceMappingURL=users.js.map