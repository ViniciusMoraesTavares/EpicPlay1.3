const carrinhoService = require('../services/carrinhoService');
const { ValidationError, DatabaseError } = require('../errors');

// Adicionar item ao carrinho
async function adicionarAoCarrinho(req, res) {
    try {
        const { usuario_id, jogo_id, quantidade } = req.body;

        if (!usuario_id || !jogo_id) {
            throw new ValidationError('Usuário e Jogo são obrigatórios');
        }

        const item = await carrinhoService.adicionarAoCarrinho(usuario_id, jogo_id, quantidade);
        res.status(201).json(item);
    } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error); // Log para depuração
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

// Listar itens do carrinho
async function listarCarrinho(req, res) {
    try {
        const { usuario_id } = req.params;

        if (!usuario_id) {
            throw new ValidationError('ID do usuário é obrigatório');
        }

        const carrinho = await carrinhoService.listarCarrinho(usuario_id);

        const itensCarrinho = carrinho.map(item => ({
            jogo: {
                nome: item.Jogo.nome,
                preco: item.Jogo.preco,
                capa: item.Jogo.capa, 
            },
            quantidade: item.quantidade,
        }));

        res.status(200).json(itensCarrinho);
    } catch (error) {
        console.error('Erro ao listar carrinho:', error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

// Remover item do carrinho
async function removerDoCarrinho(req, res) {
    try {
        const { usuario_id, jogo_id } = req.body;

        if (!usuario_id || !jogo_id) {
            throw new ValidationError('Usuário e Jogo são obrigatórios');
        }

        const result = await carrinhoService.removerDoCarrinho(usuario_id, jogo_id);
        res.json(result);
    } catch (error) {
        console.error('Erro ao remover item do carrinho:', error); // Log para depuração
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

module.exports = {
    adicionarAoCarrinho,
    listarCarrinho,
    removerDoCarrinho,
};
