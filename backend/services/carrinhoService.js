const { Carrinho, Usuario, Jogo } = require('../models'); 
const { DatabaseError, ValidationError } = require('../errors');

async function adicionarAoCarrinho(usuario_id, jogo_id, quantidade = 1) {
    try {
        // Verifica se o usuário e o jogo existem
        const usuario = await Usuario.findByPk(usuario_id);
        const jogo = await Jogo.findByPk(jogo_id);

        if (!usuario) {
            throw new ValidationError('Usuário não encontrado.');
        }
        if (!jogo) {
            throw new ValidationError('Jogo não encontrado.');
        }

        // Verifica se o item já existe no carrinho
        const itemExistente = await Carrinho.findOne({ where: { usuario_id, jogo_id } });

        if (itemExistente) {
            itemExistente.quantidade += quantidade;
            await itemExistente.save();
            return itemExistente;
        }

        // Cria um novo item no carrinho
        return await Carrinho.create({ usuario_id, jogo_id, quantidade });

    } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
        throw new DatabaseError('Erro ao adicionar item ao carrinho', error);
    }
}

// Listar itens do carrinho
async function listarCarrinho(usuario_id) {
    try {
        const carrinho = await Carrinho.findAll({
            where: { usuario_id },
            include: [{
                model: Jogo,
                attributes: ['id', 'nome', 'preco', 'capa'],  // Certifique-se de que 'capa' é um campo válido
            }]
        });

        if (!carrinho.length) {
            throw new NotFoundError('Carrinho vazio.');
        }

        return carrinho;
    } catch (error) {
        console.error('Erro ao listar o carrinho:', error);
        throw new DatabaseError('Erro ao listar o carrinho', error);
    }
}

// Remover item do carrinho
async function removerDoCarrinho(usuario_id, jogo_id) {
    try {
        const item = await Carrinho.findOne({ where: { usuario_id, jogo_id } });

        if (!item) {
            throw new NotFoundError('Item não encontrado no carrinho');
        }

        await item.destroy();
        return { message: 'Item removido do carrinho' };
    } catch (error) {
        throw new DatabaseError('Erro ao remover item do carrinho', error);
    }
}

module.exports = {
    adicionarAoCarrinho,
    listarCarrinho,
    removerDoCarrinho
};
