import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(token && (token.length < 500)) {
            let { id } = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = id;
        }

        next();
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            res.status(419).json({
                name: 'TokenExpiredError',
                message: 'Token expired',
            });
        } else {
            res.status(403).json({
                name: 'tokenError',
                message: 'No token passed',
            });
        }
    }
}

export const authRefreshToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if(token && (token.length < 500)) {
            jwt.verify(token, process.env.JWT_SECRET);
        }
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            next();
        } else {
            res.status(403).json({
                name: 'tokenError',
                message: 'No token passed',
            });
        }
    }
}
