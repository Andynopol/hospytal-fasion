import Users from '../models/users-schema.js';
import bcrypt from 'bcrypt';
export const login = async (req, res) => {
    console.log(req.body);
    try {
        const user = await Users.find({ email: req.body.email });
        if (user.length) {
            const foundUser = user[0];
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                res.status(200).json({ status: 'success', user: foundUser, message: 'Login success.' });
            }
        }
        else {
            res.status(203).json({ status: 'warning', message: 'User not found' });
        }
    }
    catch (err) {
        console.log(err.message);
        res.status(403).json({ status: 'fail', message: 'something went wrong' });
    }
    ;
};
export const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        const userObject = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashPassword,
            cart: [],
            isVerified: false,
        };
        const newUser = new Users(userObject);
        await newUser.save();
        res.status(200).json({ status: 'success', message: 'test' });
    }
    catch (err) {
        console.log(err.message);
        res.status(403).json({ status: 'fail', message: err.message });
    }
};
//# sourceMappingURL=users.js.map