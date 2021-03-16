import Users from '../models/users-schema.js';
export const getUser = async (req, res) => {
    const userData = req.body;
    const user = Users.find();
    try {
    }
    catch (error) {
        res.status(501).json({ status: 'fail', message: 'Server error', error: error.message });
    }
};
//# sourceMappingURL=users.js.map