const jwt = require('jsonwebtoken');
const env = require('../.env');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    } else {
        const token = req.body.token || req.query.token || req.headers['authorization'];

        if (!token) {
            return res.status(403).send({ errors: ['No token provided.'] });
        }

        // Extração do token no formato "Bearer <token>"
        let extractedToken = token;
        if (token.startsWith('Bearer ')) {
            extractedToken = token.slice(7, token.length);
        }

        console.log('token:', extractedToken);
        console.log('env.authSecret:', env.authSecret);

        jwt.verify(extractedToken, env.authSecret, function (err, decoded) {
            if (err) {
                console.log('err:', err);
                return res.status(403).send({
                    errors: ['Failed to authenticate token.']
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    }
};
