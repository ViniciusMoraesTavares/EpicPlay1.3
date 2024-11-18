const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');
const { buscarUsuarioPorEmail, verificarSenha } = require('./usuarioService');

const loginUsuario = async (email, senha) => {
    try {
        const usuario = await buscarUsuarioPorEmail(email);

        if (!usuario) {
            throw new AuthenticationError('Usuário não encontrado.');
        }

        const senhaValida = await verificarSenha(senha, usuario.senha);
        if (!senhaValida) {
            throw new AuthenticationError('Senha inválida.');
        }

        const token = gerarToken(usuario); // Gera o token JWT com os dados do usuário
        return token;
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        throw error; // Repassa o erro para o chamador
    }
};

function gerarToken(usuario) {
    const payload = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role, // Adiciona a role do usuário no payload
    };

    const secret = process.env.JWT_SECRET; // Chave secreta definida no .env
    const options = { expiresIn: '1h' }; // Tempo de expiração de 1 hora

    try {
        const token = jwt.sign(payload, secret, options);
        return token;
    } catch (error) {
        console.error("Erro ao gerar token:", error);
        throw new Error('Erro ao gerar token.');
    }
}

module.exports = { 
    gerarToken,
    loginUsuario,
};
