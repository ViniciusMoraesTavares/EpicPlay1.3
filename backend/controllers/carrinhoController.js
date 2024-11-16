const carrinhoService = require('../services/carrinhoService');
const { ValidationError } = require('../errors');

// Adicionar item ao carrinho
async function adicionarAoCarrinho(req, res) {
    try {
        const { usuario_id, jogo_id, quantidade } = req.body;

        if (!usuario_id || !jogo_id) {
            throw new ValidationError('Usuário e Jogo são obrigatórios.');
        }
        if (quantidade && quantidade <= 0) {
            throw new ValidationError('Quantidade deve ser maior que zero.');
        }

        const item = await carrinhoService.adicionarAoCarrinho(
            parseInt(usuario_id, 10),
            parseInt(jogo_id, 10),
            quantidade || 1
        );

        res.status(201).json(item);
    } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

// Listar itens do carrinho
async function listarCarrinho(req, res) {
    try {
        const { usuario_id } = req.params;

        if (!usuario_id) {
            throw new ValidationError('ID do usuário é obrigatório.');
        }

        const carrinho = await carrinhoService.listarCarrinho(parseInt(usuario_id, 10));

        // Formatar a resposta para o frontend
        const itensCarrinho = carrinho.map(item => ({
            jogo: {
                id: item.Jogo.id,
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
            throw new ValidationError('Usuário e Jogo são obrigatórios.');
        }

        const result = await carrinhoService.removerDoCarrinho(
            parseInt(usuario_id, 10),
            parseInt(jogo_id, 10)
        );

        res.json(result);
    } catch (error) {
        console.error('Erro ao remover item do carrinho:', error);
        res.status(error.statusCode || 500).json({ message: error.message });
    }
}

module.exports = {
    adicionarAoCarrinho,
    listarCarrinho,
    removerDoCarrinho,
};