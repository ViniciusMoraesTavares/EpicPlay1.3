const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // prefixo "Bearer" do JWT

    if (!token) {
        throw new AuthenticationError('Token não fornecido.');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw new AuthenticationError('Token inválido.');
        }

        req.user = decoded;
        next();
    });
}

module.exports = { authenticate };
