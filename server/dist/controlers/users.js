import Users from '../models/users-schema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
var ErrorMessages;
(function (ErrorMessages) {
    ErrorMessages["no_user"] = "User not found";
    ErrorMessages["duplicate"] = "There is an account with this email";
    ErrorMessages["unknown"] = "Something went wrong. We are investigating right awai!";
    ErrorMessages["wrong_password"] = "Incorrect Password";
})(ErrorMessages || (ErrorMessages = {}));
export const login = async (req, res) => {
    console.log(req.body);
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.status(200).json({ status: 'success', user: user, message: 'Login success.' });
            }
            else {
                throw new Error(ErrorMessages.wrong_password);
            }
        }
        else {
            throw new Error(ErrorMessages.no_user);
        }
    }
    catch (err) {
        if (err.message === ErrorMessages.no_user || ErrorMessages.wrong_password) {
            res.status(401).json({ status: 'fail', hint: err.message, message: 'Email or Password incorrect' });
            return;
        }
        res.status(403).json({ status: 'fail', message: ErrorMessages.unknown });
    }
    ;
};
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const userObject = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        cart: [],
        favorites: [],
        isVerified: false,
        icon: '',
    };
    try {
        const newUser = new Users(userObject);
        console.log(newUser);
        await newUser.save();
        res.status(200).json({ status: 'success', message: 'User registered. Logging in...' });
    }
    catch (err) {
        console.log(err);
        if (err.message === ErrorMessages.duplicate) {
            res.status(403).json({ status: 'fail', message: err.message });
            return;
        }
        res.status(403).json({ status: 'fail', message: ErrorMessages.unknown });
    }
};
const checkEmailDuplication = async (email) => {
    const users = await Users.find({ email: email });
    if (users.length) {
        return true;
    }
    return false;
};
export const newLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user)
            return res.status(404).json({ status: 'fail', message: 'User not found' });
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ status: 'fail', messasge: 'Invalid credientials' });
        const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result: user, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong. Contact us to investigate' });
    }
};
export const newRegister = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser)
            return res.status(400).json({ status: 'fail', message: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            cart: [],
            favorites: [],
            isVerified: false,
            icon: ''
        };
        const result = await Users.create(newUser);
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });
        res.status(200).json({ result, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong. Contact us to investigate' });
    }
};
//# sourceMappingURL=users.js.map