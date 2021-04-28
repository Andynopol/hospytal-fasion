import Users from '../models/users-schema.js';
import bcrypt from 'bcrypt';
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
        const user = await Users.find({ email: req.body.email });
        if (user.length) {
            const foundUser = user[0];
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                res.status(200).json({ status: 'success', user: foundUser, message: 'Login success.' });
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
//# sourceMappingURL=users.js.map