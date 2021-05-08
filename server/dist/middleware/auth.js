import jwt from 'jsonwebtoken';
export const auth = (req, res, next) => {
    console.log(req.headers);
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCostumAuth = token.length < 500;
        if (token && isCostumAuth) {
            const decode = jwt.verify(token, process.env.SECRET);
            req.userId = decode?.id;
        }
        else {
            const decode = jwt.decode(token);
            req.userId = decode?.sub;
        }
        next();
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=auth.js.map