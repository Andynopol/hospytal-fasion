import bcrypt from 'bcrypt';
export const getUser = async (req, res) => {
    const userData = req.body;
    try {
        const hasedPassword = bcrypt.hash(userData.password, 10);
    }
    catch (error) {
        res.status(501).json({ status: 'fail', message: 'Server error' });
    }
};
export const registerUser = async (req, res) => {
};
//# sourceMappingURL=users.js.map