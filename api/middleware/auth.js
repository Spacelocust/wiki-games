import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedData.id;
        }

        next();
    } catch ({ response }) {
        if (response) {
            console.log(response)
        }
        res.status(403).send({
            "message": 'No token or token expired'
        });
    }
}

export default auth;
