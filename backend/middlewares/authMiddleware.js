const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Captura o token após "Bearer"

        if (!token) {
            return res.status(401).json({ error: 'Token não fornecido.' });
        }
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("Erro ao verificar o token:", err);
                return res.status(403).json({ error: 'Token inválido.' });
            }
            
            console.log("Decoded token:", decoded);
            req.user = decoded; 
            next(); 
        });
    } catch (error) {
        console.error("Erro na autenticação:", error);
        return res.status(500).json({ error: 'Erro no middleware de autenticação.' });
    }
}

module.exports = { authenticate };